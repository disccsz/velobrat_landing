// Универсальный адаптер лидов — бесплатно, без VPN, РФ-доступно 2026
// Поддерживает: Telegram Bot, Zapnoty Forms, QForm, Yandex Forms, Formhook, Google Sheets via Apps Script
// Настройка через .env: VITE_LEAD_URL и опционально VITE_LEAD_TOKEN
// Примеры URL:
//  Telegram: https://api.telegram.org/bot<TOKEN>/sendMessage  (поле contact уйдет в text)
//  Zapnoty: https://zapnoty.ru/f/<form_id>  -> {contact, page, at}
//  QForm: https://uapi.qform.io/api/leads/<formId>/add  (x-www-form-urlencoded)
//  Yandex Forms webhook: любой твой https endpoint
//  Google Apps Script Web App: https://script.google.com/macros/s/<id>/exec

export type LeadPayload = { contact: string; page: string; at: string; ua: string }

export async function sendLead(contact: string): Promise<void> {
  const payload: LeadPayload = {
    contact,
    page: typeof window !== 'undefined' ? window.location.href : '',
    at: new Date().toISOString(),
    ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  }

  // 1) локально — всегда
  try {
    const raw = localStorage.getItem('velobrat_leads')
    const arr: string[] = raw ? JSON.parse(raw) : []
    arr.push(JSON.stringify(payload))
    localStorage.setItem('velobrat_leads', JSON.stringify(arr))
  } catch {}

  // 2) внешний хук — если задан
  const url = (import.meta.env.VITE_LEAD_URL as string | undefined)?.trim()
  if (!url) {
    console.log('[velobrat] lead (local only):', payload)
    return
  }

  const token = (import.meta.env.VITE_LEAD_TOKEN as string | undefined)?.trim()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Определяем формат по URL
  const isTelegram = url.includes('api.telegram.org')
  const isQForm = url.includes('qform.io')
  let body: string
  let reqHeaders = headers

  if (isTelegram) {
    // Telegram ожидает {chat_id, text, parse_mode}
    const chatId = (import.meta.env.VITE_TG_CHAT_ID as string | undefined) || ''
    body = JSON.stringify({
      chat_id: chatId,
      text: `🚲 Велобрат — новый лид\nКонтакт: ${payload.contact}\nСтраница: ${payload.page}\nВремя: ${payload.at}`,
      parse_mode: 'HTML',
    })
  } else if (isQForm) {
    // QForm: application/x-www-form-urlencoded, поле data как JSON-массив
    reqHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' }
    const data = encodeURIComponent(JSON.stringify([{ name: 'contact', value: payload.contact }]))
    const params = new URLSearchParams()
    params.set('status', '0')
    // data уже encoded, собираем вручную чтобы не двойное кодирование
    body = `status=0&data=${data}&pageSource=${encodeURIComponent(payload.page)}`
    if (token) reqHeaders['Authorization'] = `Bearer ${token}`
  } else {
    // Универсальный JSON: Zapnoty, Formhook, Apps Script, Yahook и т.д.
    body = JSON.stringify(payload)
  }

  const res = await fetch(url, { method: 'POST', headers: reqHeaders, body })
  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new Error(`Lead hook ${res.status}: ${txt.slice(0, 300)}`)
  }
}
