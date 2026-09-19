import { IconBike, IconChain, IconCassette, IconWheel, IconBrake, IconGears, IconFrame } from './icons'

type Status = 'ok' | 'needs_service' | 'critical'

function StatusBadge({ status, pct }: { status: Status; pct: number }) {
  const cls = status === 'ok' ? 'badge--ok' : status === 'needs_service' ? 'badge--needs' : 'badge--critical'
  const label = status === 'ok' ? 'в порядке' : status === 'needs_service' ? 'скоро ТО' : 'пора на ТО'
  return (
    <span className={`badge ${cls}`} role="status" aria-label={`Износ ${pct}%, ${label}`}>
      <span className="badge-dot" aria-hidden="true" />
      {label} · {pct}%
    </span>
  )
}

export function Garage() {
  const nbs = '\u00A0'
  const kmFmt = new Intl.NumberFormat('ru-RU')
  const components: { key: string; icon: React.ReactNode; name: string; km: number; wear: number; status: Status }[] = [
    { key: 'chain', icon: <IconChain size={18} />, name: 'Цепь', km: 1120, wear: 68, status: 'needs_service' },
    { key: 'cassette', icon: <IconCassette size={18} />, name: 'Кассета', km: 890, wear: 42, status: 'ok' },
    { key: 'wheel', icon: <IconWheel size={18} />, name: 'Колёса', km: 1248, wear: 89, status: 'critical' },
    { key: 'brake', icon: <IconBrake size={18} />, name: 'Тормоза', km: 640, wear: 31, status: 'ok' },
    { key: 'gears', icon: <IconGears size={18} />, name: 'Трансмиссия', km: 1000, wear: 77, status: 'needs_service' },
    { key: 'frame', icon: <IconFrame size={18} />, name: 'Рама', km: 1248, wear: 12, status: 'ok' },
  ]

  return (
    <section id="garage" className="section" aria-labelledby="garage-title" style={{ background: 'var(--color-abyss)', borderTop: '1px solid var(--color-slate-edge)', borderBottom: '1px solid var(--color-slate-edge)' }}>
      <div className="container">
        <p className="section-label section-label--green" aria-hidden="true">Гараж</p>
        <h2 id="garage-title" className="section-title">Твой гараж — помнит всё</h2>
        <p className="section-sub">Не список функций, а пайплайн. Загрузил поездку — получил расчёт и прогноз.</p>

        {/* Pipeline */}
        <div className="pipeline" role="list" aria-label="Как работает гараж">
          <div className="pipeline-step" role="listitem">
            <div className="pipeline-num" aria-hidden="true">01</div>
            <h3>Загрузка поездки</h3>
            <p>Дистанция, погода, покрытие. Хранится вместе с велосипедом — без ручных таблиц.</p>
            <div className="pipeline-meta mono">distance · weather · style</div>
          </div>
          <div className="pipeline-arrow" aria-hidden="true">→</div>
          <div className="pipeline-step" role="listitem">
            <div className="pipeline-num" aria-hidden="true">02</div>
            <h3>Пересчёт ресурса</h3>
            <p>Каждый узел получает прибавку износа. Формула учитывает пробег и условия.</p>
            <div className="pipeline-formula" aria-label="Формула износа">
              <code>W<sub>eff</sub> = W<sub>ride</sub> + W<sub>age</sub></code>
              <code>W<sub>ride</sub> = (d / R) · (α<sub>w</sub> · α<sub>s</sub>)</code>
            </div>
          </div>
          <div className="pipeline-arrow" aria-hidden="true">→</div>
          <div className="pipeline-step" role="listitem">
            <div className="pipeline-num" aria-hidden="true">03</div>
            <h3>Предиктивный контроль</h3>
            <p>Прогноз до ТО и рекомендация. Без спама — только когда пора.</p>
            <div className="pipeline-graph" role="img" aria-label="График износа: рост к порогу 85 процентов">
              <svg viewBox="0 0 120 40" width="100%" height="40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 32 C20 30, 40 28, 60 18 C80 8, 100 4, 120 2" fill="none" stroke="var(--color-phosphor)" strokeWidth="1.6" />
                <line x1="0" y1="12" x2="120" y2="12" stroke="rgba(234,179,8,0.5)" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="0" y1="6" x2="120" y2="6" stroke="rgba(239,68,68,0.6)" strokeDasharray="3 3" strokeWidth="1" />
                <circle cx="74" cy="10" r="2.5" fill="var(--color-phosphor)" />
              </svg>
              <div className="pipeline-graph-labels mono"><span>сейчас</span><span>прогноз ~180{ nbs}км</span></div>
            </div>
          </div>
        </div>

        {/* Components grid - fixed */}
        <div className="garage-grid">
          <div className="glass garage-card garage-card--bike">
            <div className="garage-bike-head">
              <div className="garage-bike-icon" aria-hidden="true"><IconBike size={24} /></div>
              <div>
                <div className="garage-bike-title">Trek Marlin 7</div>
                <div className="garage-bike-sub">Квартира · {kmFmt.format(1248)}{nbs}км всего</div>
              </div>
            </div>
            <img
              src="/bike.png"
              alt="Trek Marlin 7 в гараже Велобрата — 1248 км"
              width={640}
              height={400}
              style={{ width: '100%', height: 'auto', borderRadius: 12, marginTop: 12, display: 'block', border: '1px solid var(--color-slate-edge)', background: 'var(--color-obsidian)' }}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement
                t.style.display = 'none'
                const fallback = t.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'block'
              }}
            />
            <p style={{ fontSize: 13, color: 'var(--color-pearl)', margin: '12px 0 0', lineHeight: 1.5, display: 'none' }}>Каждый компонент — отдельный ресурс. Обнови пробег — всё пересчитается атомарно.</p>
          </div>

          <div className="glass garage-card garage-card--components">
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-moss)',
                paddingLeft: 0,
              }}
              id="components-heading"
            >
              Компоненты
            </h3>
            <ul className="component-grid" aria-labelledby="components-heading" role="list">
              {components.map((c) => (
                <li key={c.key} className="component-cell" role="listitem">
                  <div className="comp-icon" aria-hidden="true">{c.icon}</div>
                  <div className="comp-main">
                    <div className="comp-name">{c.name}</div>
                    <div className="comp-meta mono">{kmFmt.format(c.km)}{nbs}км</div>
                    <div className="comp-bar" aria-hidden="true">
                      <div
                        className="comp-bar-fill"
                        style={{
                          width: `${c.wear}%`,
                          background: c.status === 'ok' ? 'var(--wear-ok)' : c.status === 'needs_service' ? 'var(--wear-needs)' : 'var(--wear-critical)',
                        }}
                      />
                    </div>
                  </div>
                  <StatusBadge status={c.status} pct={c.wear} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
