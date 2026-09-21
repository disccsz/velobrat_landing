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
          Велосипед — большее, чем средство передвижения. Это спорт, драйв и состояние души. По причине незнания подавляющее большинство владельцев велотранспорта не уделяют должного внимания его состоянию и совершают ошибки при эксплуатации. В перспективе это приводит к финансовым расходам, разочарованию или травмам прямо во время поездки. Приложение Велобрат призвано упростить владение велосипедом на всех уровнях: от получения знаний, ответов на вопросы и технического обслуживания до учёта поездок и роста физических показателей, планомерного повышения выносливости, силы и укрепления здоровья.
        </p>
      </div>
    </section>
  )
}
