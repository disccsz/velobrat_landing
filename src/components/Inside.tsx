export function Inside() {
  return (
    <section id="about" className="section section--about" aria-labelledby="about-title">
      {/* Видео-фон: положи файл в src/assets/video.mp4 или public/video.mp4 — автоматически подхватится. Пока нет файла — показывается градиент */}
      <video
        className="about-video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/Frame_2087327138.webp"
        aria-hidden="true"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="about-overlay" aria-hidden="true" />
      <div className="container" style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        <p className="section-label" style={{ justifyContent: 'center' }} aria-hidden="true">
          О проекте
        </p>
        <h2 id="about-title" className="section-title" style={{ textWrap: 'balance', textAlign: 'center' }}>
          Делают велосипедисты — для велосипедистов
        </h2>
        <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center', textWrap: 'pretty' }}>
          Велобрат — один гараж вместо трёх приложений. Начни как новичок, вырасти до регуляра. Мы сами катаем каждый день и знаем, когда цепь просит внимания до того как она порвёт поездку.
        </p>
      </div>
    </section>
  )
}
