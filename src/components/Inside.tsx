import { useEffect, useRef, useState } from 'react'

export function Inside() {
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
    <section id="about" className="section section--about" aria-labelledby="about-title">
      {/* Видео-фон: положи файл в src/assets/video.mp4 или public/video.mp4 — автоматически подхватится. Пока нет файла — показывается градиент */}
      {canPlayBg ? (
        <video
          ref={videoRef}
          className="about-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/Frame_2087327138.webp"
          aria-hidden="true"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      ) : (
        <img className="about-video" src="/Frame_2087327138.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      )}
      <div className="about-overlay" aria-hidden="true" />
      <div className="container about-inner">
        <p className="section-label section-label--center" aria-hidden="true">
          О проекте
        </p>
        <h2 id="about-title" className="section-title section-title--center">
          Делают велосипедисты — для велосипедистов
        </h2>
        <p className="section-sub section-sub--center">
          Велосипед — это спорт, драйв и состояние души. Но большинство владельцев не следят за его состоянием и ошибаются в обслуживании.
        </p>
        <p className="section-sub section-sub--center section-sub--stack">
          Итог — лишние траты, разочарование, а иногда и травма прямо в поездке. Велобрат упрощает владение: знания, ответы на вопросы, учёт поездок и своевременное ТО.
        </p>
      </div>
    </section>
  )
}
