

export function Hero() {
  return (
    <section className="hero hero--fullscreen" aria-labelledby="hero-title">
      <div className="hero-halo" aria-hidden="true" />
      <div className="container">
        <div className="hero-inner hero-inner--compact">
          <div className="hero-copy">
            <h1 id="hero-title">Когерентная экосистема для велосипедистов и их велосипедов</h1>
            <p className="hero-lead">Совершенно другой уровень владения велосипедом: повысьте качество пользовательского опыта, обеспечьте безопасность и надежность.</p>
            <div className="hero-ctas">
              <a href="#cta" className="btn-primary btn-primary--large">
                Попробовать <span aria-hidden="true">→</span>
              </a>
              <a href="#about" className="btn-ghost" aria-label="Узнать как работает">
                Как это работает
              </a>
            </div>
          </div>
          <div aria-hidden="true" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/hero.png"
              alt="Велосипед Panaride Alpine"
              width={640}
              height={400}
              fetchPriority="high"
              decoding="async"
              style={{ width: '100%', height: 'auto', maxWidth: 520, maxHeight: 360, objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))' }}
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
