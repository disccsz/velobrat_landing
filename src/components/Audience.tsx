import { useEffect, useRef, useState } from 'react'
import { IconUser, IconGauge, IconBike } from './icons'

export function Audience() {
  const videoRef = useRef<HTMLVideoElement>(null)
  // 11 МБ фона — только десктоп: на мобильных постер без скачивания видео
  const [canPlayBg] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    // Декоративный фон: при prefers-reduced-motion не крутим видео
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause()
    }
  }, [])
  return (
    <section
      id="audience"
      className="section section--audience"
      aria-labelledby="audience-title"
    >
      {canPlayBg ? (
        <video ref={videoRef} className="about-video" autoPlay muted loop playsInline preload="metadata" poster="/Frame_2087327138.webp" aria-hidden="true">
          <source src="/video.mp4" type="video/mp4" />
        </video>
      ) : (
        <img className="about-video" src="/Frame_2087327138.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      )}
      <div className="about-overlay" aria-hidden="true" />
      <div className="container audience-inner">
        <p className="section-label" aria-hidden="true">
          Для кого
        </p>
        <h2 id="audience-title" className="section-title">
          От первой прогулки до ежедневных заездов
        </h2>
        <ul className="grid-3 audience-grid">
          <li className="glass audience-card">
            <span className="audience-level">
              <IconUser size={14} aria-hidden="true" /> Новичок
            </span>
            <h3>Выбор и первое ТО</h3>
            <p>Только начинаешь — подскажем как выбрать и когда делать первое обслуживание.</p>
            <p className="mono audience-proof">Справочник: 60 статей с нуля</p>
          </li>
          <li className="glass audience-card glass--ultraviolet">
            <span className="audience-level">
              <IconGauge size={14} aria-hidden="true" /> Регуляр
            </span>
            <h3>Учёт погоды и грязи</h3>
            <p>Катаешь регулярно — учитываем погоду и грязь, напоминаем про ТО.</p>
            <p className="mono audience-proof">Гараж: 6 узлов под контролем</p>
          </li>
          <li className="glass audience-card">
            <span className="audience-level">
              <IconBike size={14} aria-hidden="true" /> Опытный
            </span>
            <h3>Несколько велосипедов</h3>
            <p>Несколько велосипедов и разные стили — от прогулок по городу до гравия и шоссе.</p>
            <p className="mono audience-proof">Пробег: хоть 13 424 км</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
