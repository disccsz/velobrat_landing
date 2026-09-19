

import heroImg from '../assets/hero.png'

export function Hero() {
  return (
    <section className="hero hero--fullscreen" aria-labelledby="hero-title">
      <div className="hero-halo" aria-hidden="true" />
      <div className="container">
        <div className="hero-inner hero-inner--compact">
          <div className="hero-copy">
            <h1 id="hero-title">
              Велосипед<span style={{ color: 'var(--color-phosphor)' }}>.</span> под контролем<span style={{ color: 'var(--color-sky)' }}>.</span>
            </h1>
            <p className="hero-lead">Гараж считает пробег, износ и подсказывает когда на ТО. Справочник отвечает на вопросы. Всё внутри VK.</p>
            <div className="hero-ctas">
              <a href="#cta" className="btn-primary btn-primary--large">
                Попробовать — бесплатно <span aria-hidden="true">→</span>
              </a>
              <a href="#about" className="btn-ghost" aria-label="Узнать как работает">
                Как это работает
              </a>
            </div>
            <span className="mono" style={{ fontSize: 12, color: 'var(--color-moss)', marginTop: 10, display: 'inline-block' }}>Без регистрации — через VK · 1 клик</span>
          </div>
          <div aria-hidden="true" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={heroImg}
              alt=""
              width={560}
              height={560}
              fetchPriority="high"
              decoding="async"
              style={{ width: '100%', height: 'auto', maxWidth: 480, maxHeight: 420, objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
