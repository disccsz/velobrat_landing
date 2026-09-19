import { useState } from 'react'
import { submitZapLead } from '../lib/zapnoty'

function isValidContact(v: string) {
  const s = v.trim()
  if (!s) return false
  // email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return true
  // vk: vk.com/id..., vk.com/username, @username, https://vk.com/...
  if (/^(https?:\/\/)?(m\.)?vk\.com\/[a-zA-Z0-9_.]+$/.test(s)) return true
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
      setError('Укажи VK (vk.com/...) или email — проверим и напишем')
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
      const msg = err instanceof Error ? err.message : 'Ошибка отправки'
      // если ушли в офлайн-очередь — показываем как успех с пояснением
      if (msg.includes('сохранили')) {
        setStatus('success')
        setError(msg)
        setContact('')
        setHp('')
        window.setTimeout(() => { setStatus('idle'); setError('') }, 6000)
      } else {
        setError(msg)
        setStatus('error')
      }
    }
  }

  return (
    <section id="cta" className="cta-section" aria-labelledby="cta-title">
      <div className="cta-halo" aria-hidden="true" />
      <div className="container">
        <div className="cta-inner">
          <h2 id="cta-title">Присоединиться к тестированию</h2>
          <p>Закрытый бета-доступ — оставь контакт, пригласим в VK Mini App первым</p>
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 480, margin: '0 auto' }}
            aria-label="Заявка на тестирование"
            noValidate
          >
            <label htmlFor="cta-contact" className="sr-only">Контакт для приглашения</label>
            <input
              id="cta-contact"
              name="contact"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="vk.com/твой_профиль или email…"
              required
              aria-required="true"
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'cta-error' : status === 'success' ? 'cta-success' : undefined}
              value={contact}
              onChange={(e) => { setContact(e.target.value); if (status === 'error') setStatus('idle') }}
              className="chat-input"
              style={{ flex: '1 1 200px', maxWidth: 280 }}
              disabled={status === 'loading'}
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
              style={{ position: 'absolute', left: '-5000px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
            />
            <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ fontSize: 16, padding: '12px 22px', whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? 'Отправляем…' : <>Присоединиться <span aria-hidden="true">→</span></>}
            </button>
          </form>
          <div role="status" aria-live="polite" style={{ minHeight: 20, marginTop: 10 }}>
            {status === 'error' && <p id="cta-error" className="mono" style={{ fontSize: 13, color: '#fca5a5', margin: 0 }}>{error}</p>}
            {status === 'success' && <p id="cta-success" className="mono" style={{ fontSize: 13, color: '#4ade80', margin: 0 }}>{error || 'Спасибо! Заявка отправлена — напишем в VK первым.'}</p>}
            {status === 'loading' && <p className="mono" style={{ fontSize: 12, color: 'var(--color-moss)', margin: 0 }}>Отправляем…</p>}
            {status === 'idle' && <p className="mono" style={{ fontSize: 12, color: 'var(--color-moss)', margin: 0 }}>Без спама — только приглашение в тест · 1 клик через VK</p>}
          </div>
          <p className="mono" style={{ fontSize: 11, color: 'var(--color-moss)', marginTop: 8, opacity: 0.85 }}>Нажимая «Присоединиться», соглашаешься на обработку контакта для приглашения</p>
        </div>
      </div>
    </section>
  )
}
