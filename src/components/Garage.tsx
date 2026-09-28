import { IconBike, IconChain, IconCassette, IconWheel, IconBrake, IconGears, IconFrame } from './icons'
import type { ReactNode } from 'react'

type Status = 'ok' | 'needs_service' | 'critical'

function StatusBadge({ status, pct }: { status: Status; pct: number }) {
  const cls = status === 'ok' ? 'badge--ok' : status === 'needs_service' ? 'badge--needs' : 'badge--critical'
  const label = status === 'ok' ? 'в порядке' : status === 'needs_service' ? 'скоро ТО' : 'пора на ТО'
  return (
    <span className={`badge ${cls}`} aria-label={`Износ ${pct}%, ${label}`}>
      <span className="badge-dot" aria-hidden="true" />
      {label} · {pct}%
    </span>
  )
}

export function Garage() {
  const nbs = '\u00A0'
  const kmFmt = new Intl.NumberFormat('ru-RU')
  const components: { key: string; icon: ReactNode; name: string; km: number; wear: number; status: Status }[] = [
    { key: 'chain', icon: <IconChain size={18} />, name: 'Цепь', km: 1120, wear: 68, status: 'needs_service' },
    { key: 'cassette', icon: <IconCassette size={18} />, name: 'Кассета', km: 890, wear: 42, status: 'ok' },
    { key: 'wheel', icon: <IconWheel size={18} />, name: 'Колёса', km: 1248, wear: 89, status: 'critical' },
    { key: 'brake', icon: <IconBrake size={18} />, name: 'Тормоза', km: 640, wear: 31, status: 'ok' },
    { key: 'gears', icon: <IconGears size={18} />, name: 'Трансмиссия', km: 1000, wear: 77, status: 'needs_service' },
    { key: 'frame', icon: <IconFrame size={18} />, name: 'Рама', km: 1248, wear: 12, status: 'ok' },
  ]

  return (
    <section id="garage" className="section section--band" aria-labelledby="garage-title">
      <div className="container">
        <p className="section-label section-label--green" aria-hidden="true">Гараж</p>
        <h2 id="garage-title" className="section-title">Твой гараж — помнит всё</h2>
        <p className="section-sub">Не список функций, а пайплайн. Загрузил поездку — получил расчёт и прогноз.</p>

        {/* Pipeline */}
        <div className="pipeline" role="list" aria-label="Как работает гараж">
          <div className="pipeline-step" role="listitem">
            <div className="pipeline-num" aria-hidden="true">01</div>
            <h3>Загрузка поездки</h3>
            <p>Укажи пройденное расстояние или выбери 2 точки на карте. Погоду, стиль катания и покрытие подтянем сами. «Автопоездка» предложит добавить километры за день на основе твоих прошлых поездок.</p>
            <div className="pipeline-meta mono">distance · weather · style · auto</div>
          </div>
          <div className="pipeline-arrow" aria-hidden="true">→</div>
          <div className="pipeline-step" role="listitem">
            <div className="pipeline-num" aria-hidden="true">02</div>
            <h3>Пересчёт ресурса</h3>
            <p>Износ каждого узла рассчитывается независимо, учитывая необратимое стачивание узлов трения и растяжение.</p>
            <div className="pipeline-formula" role="group" aria-label="Формула износа">
              <code>W<sub>eff</sub> = W<sub>ride</sub> + W<sub>age</sub></code>
              <code>W<sub>ride</sub> = (d / R) · (α<sub>w</sub> · α<sub>s</sub>)</code>
              <span className="mono pipeline-formula-caption">W<sub>eff</sub> — эффективный износ, W<sub>ride</sub> — за поездку, W<sub>age</sub> — возрастной; α<sub>w</sub> — погода, α<sub>s</sub> — стиль</span>
            </div>
          </div>
          <div className="pipeline-arrow" aria-hidden="true">→</div>
          <div className="pipeline-step" role="listitem">
            <div className="pipeline-num" aria-hidden="true">03</div>
            <h3>Предиктивный контроль</h3>
            <p>Напоминания об обслуживании и персонализированные рекомендации.</p>
            <div className="pipeline-graph" role="img" aria-label="График износа: рост к порогу 85 процентов">
              <svg viewBox="0 0 120 40" width="100%" height="40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 32 C20 30, 40 28, 60 18 C80 8, 100 4, 120 2" fill="none" stroke="var(--color-phosphor)" strokeWidth="1.6" />
                <line x1="0" y1="12" x2="120" y2="12" stroke="var(--wear-needs)" strokeOpacity="0.5" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="0" y1="6" x2="120" y2="6" stroke="var(--wear-critical)" strokeOpacity="0.6" strokeDasharray="3 3" strokeWidth="1" />
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
                <div className="garage-bike-title">Panaride Alpine</div>
                <div className="garage-bike-sub">Пробег — всего {kmFmt.format(13424)}{nbs}км</div>
              </div>
            </div>
            <img
              src="/bike.webp"
              alt="Panaride Alpine в гараже Велобрата — 13 424 км"
              width={640}
              height={400}
              className="garage-bike-img"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement
                t.style.display = 'none'
                const fallback = t.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'block'
              }}
            />
            <p className="garage-bike-fallback">Каждый компонент — отдельный ресурс. Обнови пробег — всё пересчитается атомарно.</p>
          </div>

          <div className="glass garage-card garage-card--components">
            <h3
              className="components-title"
              id="components-heading"
            >
              Компоненты
            </h3>
            <ul className="component-grid" aria-labelledby="components-heading">
              {components.map((c) => (
                <li key={c.key} className="component-cell">
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
