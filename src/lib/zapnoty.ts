// Zapnoty form client — retry + оффлайн-очередь + idempotency
// ID формы: 2dcf72d8-53eb-45da-a8b4-9e1829f349a4
// min_submit_time_ms = 3000

const t0 = Date.now()
const MIN_SUBMIT_MS = 3000 // = min_submit_time_ms на сервере: клиент ждёт остаток сам, а не падает в очередь

const ZAP_URL = 'https://api.zapnoty.com/f/2dcf72d8-53eb-45da-a8b4-9e1829f349a4'
const ZAP_QUEUE_KEY = 'zap_queue_2dcf72d8-53eb-45da-a8b4-9e1829f349a4'
const ZAP_MAX_QUEUE = 50
const ZAP_ITEM_TTL_MS = 7 * 24 * 60 * 60 * 1000
const ZAP_MAX_ATTEMPTS = 10

function zapUuid(): string {
  return typeof crypto !== 'undefined' && (crypto as Crypto).randomUUID
    ? (crypto as Crypto).randomUUID()
    : 'rq_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
}

type ZapResult = { status: number; ok: boolean; json: Record<string, unknown>; timedOut?: boolean; err?: unknown }

// 4xx (кроме 429) — отказ сервера, а не сети: ретраить и складывать в очередь бессмысленно
class ZapValidationError extends Error {}

function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

async function zapFetchOnce(body: Record<string, unknown>, timeoutMs: number): Promise<ZapResult> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(ZAP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    })
    const text = await res.text()
    let json: Record<string, unknown> = {}
    try { json = JSON.parse(text) as Record<string, unknown> } catch { json = {} }
    return { status: res.status, ok: res.ok, json, timedOut: false }
  } catch (e) {
    const err = e as Error
    return { status: 0, ok: false, json: {}, timedOut: err?.name === 'AbortError', err: e }
  } finally {
    clearTimeout(timer)
  }
}

async function zapSubmitWithRetry(body: Record<string, unknown>): Promise<Record<string, unknown>> {
  const timeouts = [30000, 8000, 8000]
  const backoffs = [500, 1500]
  let lastErr: Error | undefined
  for (let i = 0; i < timeouts.length; i++) {
    const r = await zapFetchOnce(body, timeouts[i])
    if (r.ok) return r.json
    if (r.status >= 400 && r.status < 500 && r.status !== 429) {
      throw new ZapValidationError((r.json.error as string) || 'HTTP ' + r.status)
    }
    // таймаут — тоже повод для ретрая, а не для сдачи: идём на следующую попытку
    lastErr = new Error(r.timedOut ? 'Превышено время ожидания' : (r.status ? 'HTTP ' + r.status : 'Сетевая ошибка'))
    if (i < timeouts.length - 1) {
      const base = backoffs[i]
      await new Promise<void>(resolve => setTimeout(resolve, base + Math.random() * base * 0.4 - base * 0.2))
    }
  }
  throw lastErr
}

type QueueItem = { id: string; body: Record<string, unknown>; created_at: number; attempts: number }

function zapReadQueue(): QueueItem[] {
  try { return JSON.parse(localStorage.getItem(ZAP_QUEUE_KEY) || '[]') as QueueItem[] } catch { return [] }
}
function zapWriteQueue(items: QueueItem[]): void {
  try { localStorage.setItem(ZAP_QUEUE_KEY, JSON.stringify(items)) } catch {}
}
function zapEnqueue(body: Record<string, unknown>): void {
  const items = zapReadQueue()
  const now = Date.now()
  // дедуп: повторный сабмит того же контакта за минуту — не новая заявка
  const last = items[items.length - 1]
  if (last && last.body.contact === body.contact && last.body.page === body.page && (now - last.created_at) < 60000) return
  items.push({ id: zapUuid(), body, created_at: now, attempts: 0 })
  while (items.length > ZAP_MAX_QUEUE) items.shift()
  zapWriteQueue(items)
}
const ZAP_DRAIN_BATCH = 10
async function zapDrainQueue(): Promise<void> {
  let items = zapReadQueue()
  const now = Date.now()
  items = items.filter(it => (now - it.created_at) < ZAP_ITEM_TTL_MS && it.attempts < ZAP_MAX_ATTEMPTS)
  const remaining: QueueItem[] = []
  for (const it of items.slice(0, ZAP_DRAIN_BATCH)) {
    try {
      it.attempts++
      // освежаем _submit_time: тело могло пролежать в очереди, сервер смотрит на свежесть
      await zapSubmitWithRetry({ ...it.body, _submit_time: Date.now() })
    } catch (err) {
      if (err instanceof ZapValidationError) continue // отказ сервера — дроп, не гонять по кругу
      remaining.push(it)
    }
  }
  const rest = items.slice(ZAP_DRAIN_BATCH)
  zapWriteQueue([...remaining, ...rest])
}

if (typeof window !== 'undefined') {
  let drainTimer: number | undefined
  const scheduleDrain = () => {
    window.clearTimeout(drainTimer)
    drainTimer = window.setTimeout(() => { void zapDrainQueue() }, 2000)
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleDrain)
  } else {
    scheduleDrain()
  }
  window.addEventListener('online', scheduleDrain)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') scheduleDrain()
  })
}

export async function submitZapLead(data: Record<string, string>): Promise<Record<string, unknown>> {
  // быстрый сабмит (< 3 с после загрузки) сервер отклонит: ждём остаток здесь, честно в loading
  const elapsed = Date.now() - t0
  if (elapsed < MIN_SUBMIT_MS) await sleep(MIN_SUBMIT_MS - elapsed)
  const body: Record<string, unknown> = {
    ...data,
    _submit_time: Date.now(),
    _request_id: zapUuid(),
    _hp_e3be16085a: (data as Record<string, unknown>)._hp_e3be16085a ?? '',
  }
  // убираем служебный honeypot из внешних данных если он был пустой — сервер ждет именно это поле
  if (!('_hp_e3be16085a' in body)) body._hp_e3be16085a = ''
  try {
    const res = await zapSubmitWithRetry(body)
    void zapDrainQueue() // заодно вытолкнем зависшие заявки
    return res
  } catch (err) {
    if (err instanceof ZapValidationError) throw err
    zapEnqueue(body)
    throw new Error('Связь нестабильна. Заявку сохранили, отправим автоматически.')
  }
}

export { zapDrainQueue, ZAP_URL }
