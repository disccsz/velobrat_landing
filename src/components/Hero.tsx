

export function Hero() {
  return (
    <section className="hero hero--fullscreen" aria-labelledby="hero-title">
      <div className="hero-halo" aria-hidden="true" />
      <div className="container">
        <div className="hero-inner hero-inner--compact">
          <div className="hero-copy">
            <h1 id="hero-title">Гараж считает износ. Справочник отвечает. Всё внутри VK.</h1>
            <p className="hero-lead">Пробег, износ 6 узлов и прогноз ТО — плюс 60 статей и ИИ-ответы. 1 клик через VK, без регистрации.</p>
            <div className="hero-ctas">
              <a href="#cta" className="btn-primary btn-primary--large">
                Хочу в тест <span aria-hidden="true">→</span>
              </a>
              <a href="#about" className="btn-ghost">
                Как это работает
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="/hero.webp"
              alt="Велосипед Panaride Alpine"
              width={640}
              height={400}
              fetchPriority="high"
              decoding="async"
              className="hero-img"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement
                t.style.display = 'none'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
