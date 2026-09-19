import { IconUser, IconGauge, IconBike } from './icons'

export function Audience() {
  return (
    <section
      className="section section--audience"
      aria-labelledby="audience-title"
      style={{ position: 'relative', overflow: 'clip', background: 'var(--color-abyss)', borderTop: '1px solid var(--color-slate-edge)', borderBottom: '1px solid var(--color-slate-edge)' }}
    >
      <video className="about-video" autoPlay muted loop playsInline preload="none" poster="/Frame_2087327138.webp" aria-hidden="true">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="about-overlay" aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <p className="section-label" aria-hidden="true">
          Для кого
        </p>
        <h2 id="audience-title" className="section-title">
          От первой прогулки до ежедневных заездов
        </h2>
        <ul className="grid-3" style={{ marginTop: 24, listStyle: 'none', padding: 0, margin: '24px 0 0' }} role="list">
          <li className="glass audience-card">
            <span className="audience-level">
              <IconUser size={14} aria-hidden="true" /> Новичок
            </span>
            <h3>Выбор и первое ТО</h3>
            <p>Только начинаешь — подскажем как выбрать и когда делать первое обслуживание.</p>
          </li>
          <li className="glass audience-card glass--ultraviolet">
            <span className="audience-level">
              <IconGauge size={14} aria-hidden="true" /> Регуляр
            </span>
            <h3>Учёт погоды и грязи</h3>
            <p>Катаешь регулярно — учитываем погоду и грязь, напоминаем про ТО.</p>
          </li>
          <li className="glass audience-card">
            <span className="audience-level">
              <IconBike size={14} aria-hidden="true" /> Опытный
            </span>
            <h3>Несколько велосипедов</h3>
            <p>Несколько велосипедов и разные стили — от прогулок по городу до гравия и шоссе.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
