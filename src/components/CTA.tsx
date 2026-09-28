import { useState } from 'react'
import { submitZapLead } from '../lib/zapnoty'

function isValidContact(v: string) {
  const s = v.trim()
  if (!s) return false
  // email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return true
  // vk: vk.com/id..., vk.ru/username, @username, https://vk.com/...
  // сравнение без query/hash и концевого слеша — вставленная из адресной строки ссылка тоже подходит
  const vkPath = s.split(/[?#]/)[0].replace(/\/+$/, '')
  if (/^(https?:\/\/)?(m\.)?(vk\.com|vk\.ru)\/[a-zA-Z0-9_.-]+$/i.test(vkPath)) return true
  if (/^@?[a-zA-Z0-9_.]{3,32}$/.test(s)) return true
  // phone fallback (ru)
  if (/^\+?7?\d{10,11}$/.test(s.replace(/[\s()-]/g, ''))) return true
  return s.length >= 3
}

export function CTA() {
  const [contact, setContact] = useState('')
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = contact.trim()
    if (!isValidContact(v)) {
      setError('Укажи email, VK или телефон — напишем удобным способом')
      setStatus('error')
      return
    }
    setError('')
    setStatus('loading')
    try {
      await submitZapLead({
        contact: v,
        page: typeof window !== 'undefined' ? window.location.href : '',
        _hp_e3be16085a: hp,
      })
      setStatus('success')
      setContact('')
      setHp('')
      window.setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Ошибка отправки'
      // если ушли в офлайн-очередь — показываем как успех с пояснением
      if (raw.includes('сохранили')) {
        setStatus('success')
        setError(raw)
        setContact('')
        setHp('')
        window.setTimeout(() => { setStatus('idle'); setError('') }, 6000)
      } else {
        // сырые коды сервера пользователю не показываем
        setError(/^HTTP \d+/.test(raw) ? 'Не получилось отправить — проверь контакт и попробуй ещё.' : raw)
        setStatus('error')
      }
    }
  }

  return (
    <section id="cta" className="cta-section" aria-labelledby="cta-title">
      <div className="cta-halo" aria-hidden="true" />
      <div className="container">
        <div className="cta-inner">
          <h2 id="cta-title">Хочу в тест Велобрата</h2>
          <p>Оставь email, VK, телефон или MAX — пригласим в закрытый тест внутри VK. Ответим лично, без спама.</p>
          <form
            onSubmit={onSubmit}
            className="cta-form"
            aria-label="Заявка на тестирование"
            noValidate
          >
            <label htmlFor="cta-contact" className="sr-only">Контакт для приглашения</label>
            <input
              id="cta-contact"
              name="contact"
              type="text"
              inputMode="text"
              autoComplete="off"
              placeholder="email, VK, телефон или MAX…"
              required
              aria-required="true"
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'cta-error' : status === 'success' ? 'cta-success' : undefined}
              value={contact}
              onChange={(e) => { setContact(e.target.value); if (status === 'error') setStatus('idle') }}
              className="chat-input"
              disabled={status === 'loading'}
              enterKeyHint="send"
            />
            {/* honeypot — скрыто от людей, ловля ботов */}
            <input
              type="text"
              name="_hp_e3be16085a"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="hp-trap"
            />
            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Отправляем…' : <>Хочу в тест <span aria-hidden="true">→</span></>}
            </button>
          </form>
          <div className="cta-status" role="status" aria-live="polite">
            {status === 'error' && <p id="cta-error" className="mono cta-status--error">{error}</p>}
            {status === 'success' && <p id="cta-success" className="mono cta-status--success">{error || 'Спасибо! Заявка отправлена — свяжемся по указанному контакту.'}</p>}
            {status === 'loading' && <p className="mono cta-status--muted">Отправляем…</p>}
            {status === 'idle' && <p className="mono cta-status--muted">Без спама — только приглашение в тест</p>}
          </div>
          <p className="mono cta-note">Нажимая «Хочу в тест», соглашаешься на обработку контакта для приглашения</p>
        </div>
      </div>
    </section>
  )
}
