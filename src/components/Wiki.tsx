import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ApiSuccess = { answer: string; sources: string[]; suggestions: string[] }
type ApiError = { detail: { loc: (string|number)[]; msg: string; type: string }[] }

const API_URL = ((import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:8080')
const ASK_URL = `${API_URL}/api/v1/ai/ask`

export function Wiki() {
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState<ApiSuccess | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ask = async (question: string) => {
    const trimmed = question.trim()
    if (!trimmed) return
    setLoading(true)
    setError(null)
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      const token = (() => {
        try { return localStorage.getItem('velobrat_token') || sessionStorage.getItem('velobrat_token') } catch { return null }
      })()
      if (token) headers['authorization'] = token
      // also try VITE_API_TOKEN if provided
      const envToken = import.meta.env.VITE_API_TOKEN as string | undefined
      if (!headers['authorization'] && envToken) headers['authorization'] = envToken

      const res = await fetch(ASK_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ question: trimmed, scope: 'wiki', bike_id: 0 }),
      })
      if (!res.ok) {
        let msg = `Ошибка ${res.status}`
        try {
          const j = (await res.json()) as ApiError | { detail: string }
          if (typeof (j as {detail:string}).detail === 'string') msg = (j as {detail:string}).detail
          else if (Array.isArray((j as ApiError).detail)) msg = (j as ApiError).detail.map(d => d.msg).join('; ')
        } catch {}
        throw new Error(msg)
      }
      const data = (await res.json()) as ApiSuccess
      const full = { ...data, suggestions: data.suggestions ?? [] }
      setAnswer(full)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось получить ответ')
      setAnswer(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="wiki"
      className="section"
      aria-labelledby="wiki-title"
      style={{ background: 'var(--color-abyss)', borderTop: '1px solid var(--color-slate-edge)', borderBottom: '1px solid var(--color-slate-edge)' }}
    >
      <div className="container" style={{ maxWidth: 960, margin: '0 auto' }}>
        <p className="section-label" style={{ justifyContent: 'center' }} aria-hidden="true">
          Интерактивный справочник
        </p>
        <h2 id="wiki-title" className="section-title" style={{ textAlign: 'center', textWrap: 'balance' }}>
          Ассистент Велобрат
        </h2>
        <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center', textWrap: 'pretty' }}>
          Повышаем качество, безопасность и эффективность владения велотранспортом через осведомлённость пользователей — попробуйте Ассистента Велобрат на базе большой языковой модели и объёмного справочника, доступного для чтения из приложения в формате Вики.
        </p>

        {/* Single search line — шире и по центру */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void ask(q)
          }}
          role="search"
          aria-label="Поиск по справочнику"
          style={{ margin: '24px auto 0', maxWidth: 720 }}
        >
          <label htmlFor="wiki-search" className="sr-only">
            Поиск по справочнику
          </label>
          <div className="wiki-search-form" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              ref={inputRef}
              id="wiki-search"
              className="chat-input"
              type="search"
              name="q"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              placeholder="Например: как настроить переключение передач…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ flex: 1, minWidth: 0 }}
            />
            <button type="submit" className="btn-primary" disabled={loading || !q.trim()} aria-label="Найти ответ" style={{ whiteSpace: 'nowrap' }}>
              {loading ? 'Ищу…' : 'Спросить'}
            </button>
          </div>
          {error && <p role="alert" className="mono" style={{ fontSize: 12, color: '#fca5a5', marginTop: 8, textAlign: 'center' }}>{error}</p>}
        </form>

        {/* Answer */}
        {(answer || loading || error) && (
          <div role="status" aria-live="polite" style={{ margin: '16px auto 0', maxWidth: 720 }}>
            {loading && <div className="bubble bubble--ai" style={{ maxWidth: '100%' }}>Ищу в справочнике…</div>}
            {answer && !loading && (
              <div className="bubble bubble--ai" style={{ maxWidth: '100%' }}>
                <div className="markdown-answer">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer.answer}</ReactMarkdown>
                </div>
                {answer.sources.length > 0 && (
                  <div className="bubble-sources">
                    <strong>Источники:</strong>{' '}
                    {answer.sources.map((s, i) => (
                      <span key={s}>
                        {i > 0 ? ', ' : ''}
                        <span style={{ color: 'var(--color-sky)' }}>{s}</span>
                      </span>
                    ))}
                  </div>
                )}
                {answer.suggestions.length > 0 && (
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {answer.suggestions.map((s) => (
                      <button key={s} type="button" className="chip" style={{ fontSize: 12 }} onClick={() => { setQ(s); void ask(s) }}>{s}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Наполнение справочника — только папки */}
        <div style={{ marginTop: 36, maxWidth: 880, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="wiki-folders" aria-hidden="true" style={{ display: 'flex', gap: 18, alignItems: 'end', justifyContent: 'center', padding: '14px 0', flexWrap: 'wrap' }}>
            {[
              { title: 'Выбор', count: 12, h: 114 },
              { title: 'Обслуживание', count: 18, h: 138 },
              { title: 'ПДД', count: 7, h: 96 },
              { title: 'Апгрейд', count: 9, h: 126 },
              { title: 'Советы', count: 14, h: 108 },
            ].map((f) => (
              <div key={f.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
                <div
                  style={{
                    width: 108,
                    height: f.h,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '9px 9px 3px 3px',
                    position: 'relative',
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                  }}
                >
                  <div style={{ position: 'absolute', top: -9, left: 9, right: 27, height: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--glass-border)', borderBottom: 'none', borderRadius: '6px 6px 0 0' }} />
                  <div style={{ position: 'absolute', top: 15, left: 12, right: 12, height: 12, background: 'var(--color-sky)', opacity: 0.15, borderRadius: 6 }} />
                  <div style={{ position: 'absolute', top: 33, left: 12, right: 18, height: 9, background: 'rgba(255,255,255,0.06)', borderRadius: 6 }} />
                  <div style={{ position: 'absolute', top: 48, left: 12, right: 24, height: 9, background: 'rgba(255,255,255,0.04)', borderRadius: 6 }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--color-pearl)', fontWeight: 600 }}>{f.count}</div>
                </div>
                <span className="mono" style={{ fontSize: 15, color: 'var(--color-moss)' }}>{f.title}</span>
              </div>
            ))}
          </div>
          <p className="mono" style={{ fontSize: 18, color: 'var(--color-moss)', textAlign: 'center', margin: 0, fontWeight: 500 }}>60+ статей — справочник растёт каждую неделю</p>
        </div>
      </div>
    </section>
  )
}
