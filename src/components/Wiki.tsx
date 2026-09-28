import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ApiSuccess = { answer: string; sources: string[]; suggestions: string[] }
type ApiError = { detail: { loc: (string|number)[]; msg: string; type: string }[] }

const API_URL = ((import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:8080')
// Прод-гард: без VITE_API_URL запросы уходили бы в localhost — показываем честное состояние вместо молчаливой ошибки сети
const API_CONFIGURED = Boolean(import.meta.env.VITE_API_URL as string | undefined)
const ASK_URL = `${API_URL}/api/v1/ai/ask`

export function Wiki() {
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState<ApiSuccess | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ask = async (question: string) => {
    const trimmed = question.trim()
    if (!trimmed) return
    if (!API_CONFIGURED) {
      setError('not-configured')
      setAnswer(null)
      return
    }
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
      className="section section--band"
      aria-labelledby="wiki-title"
    >
      <div className="container wiki-inner">
        <p className="section-label section-label--center" aria-hidden="true">
          Интерактивный справочник
        </p>
        <h2 id="wiki-title" className="section-title section-title--center">
          Справочник, который отвечает
        </h2>
        <p className="section-sub section-sub--center">
          Спроси про настройку, обслуживание и ПДД — ответим по 60 статьям справочника. Прямо здесь, без гуглежа.
        </p>

        {/* Single search line — шире и по центру */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void ask(q)
          }}
          role="search"
          aria-label="Поиск по справочнику"
          className="wiki-search"
        >
          <label htmlFor="wiki-search" className="sr-only">
            Поиск по справочнику
          </label>
          <div className="wiki-search-form wiki-search-row">
            <input
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
            />
            <button type="submit" className="btn-primary" disabled={loading || !q.trim()} aria-label="Найти ответ">
              {loading ? 'Ищу…' : 'Спросить'}
            </button>
          </div>
          {error && (
            <div className="wiki-error">
              <p role="alert" className="mono">
                {error === 'not-configured'
                  ? 'Демо ассистента не подключено — полный справочник живёт внутри приложения.'
                  : 'Не получилось найти ответ — проверь соединение и попробуй ещё.'}
              </p>
              {error !== 'not-configured' && (
                <button type="button" className="btn-ghost wiki-retry" onClick={() => void ask(q)} disabled={loading || !q.trim()}>
                  Попробовать ещё
                </button>
              )}
            </div>
          )}
        </form>

        {/* Подсказка до первого поиска — empty state */}
        {!answer && !loading && !error && (
          <div className="wiki-examples">
            {['Как настроить переключение передач?', 'Когда менять цепь?', 'Что проверить перед поездкой?'].map((ex) => (
              <button key={ex} type="button" className="chip" onClick={() => { setQ(ex); void ask(ex) }}>{ex}</button>
            ))}
          </div>
        )}

        {/* Answer */}
        {(answer || loading || error) && (
          <div className="wiki-answer">
            {loading && <div className="bubble bubble--ai" role="status">Ищу в справочнике…</div>}
            {answer && !loading && (
              <div className="bubble bubble--ai">
                <div className="markdown-answer">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer.answer}</ReactMarkdown>
                </div>
                {(answer.sources ?? []).length > 0 && (
                  <div className="bubble-sources">
                    <strong>Источники:</strong>{' '}
                    {(answer.sources ?? []).map((s, i) => (
                      <span key={s}>
                        {i > 0 ? ', ' : ''}
                        <span className="wiki-source">{s}</span>
                      </span>
                    ))}
                  </div>
                )}
                {answer.suggestions.length > 0 && (
                  <div className="wiki-suggest">
                    {answer.suggestions.map((s) => (
                      <button key={s} type="button" className="chip" onClick={() => { setQ(s); void ask(s) }}>{s}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Наполнение справочника — только папки */}
        <div className="wiki-lib">
          <div className="wiki-folders">
            {[
              { title: 'Выбор', count: 12, h: 114 },
              { title: 'Обслуживание', count: 18, h: 138 },
              { title: 'ПДД', count: 7, h: 96 },
              { title: 'Апгрейд', count: 9, h: 126 },
              { title: 'Советы', count: 14, h: 108 },
            ].map((f) => (
              <div key={f.title} className="wiki-folder">
                <div
                  className="wiki-folder-art"
                  style={{ height: f.h }}
                >
                  <div className="wf-tab" />
                  <div className="wf-l1" />
                  <div className="wf-l2" />
                  <div className="wf-l3" />
                  <div className="wf-count">{f.count}</div>
                </div>
                <span className="mono wiki-folder-title">{f.title}</span>
              </div>
            ))}
          </div>
          <p className="mono wiki-lib-note">60 статей — справочник растёт каждую неделю</p>
        </div>
      </div>
    </section>
  )
}
