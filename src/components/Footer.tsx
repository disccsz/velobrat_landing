export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#main" className="logo" aria-label="Велобрат — наверх" style={{ marginBottom: 12, display: 'inline-flex' }}>
              <img src="/logo.svg" alt="Велобрат" height={36} style={{ display: 'block', height: 36, width: 'auto' }} loading="lazy" decoding="async" />
            </a>
            <p className="footer-brand">
              <strong>Велобрат — единый цифровой сервис для велосипедистов</strong>
            </p>
          </div>
          <nav className="footer-col" aria-label="Продукт">
            <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-moss)', margin: '0 0 12px' }}>Продукт</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#about">О проекте</a></li>
              <li><a href="#garage">Гараж</a></li>
              <li><a href="#wiki">Справочник</a></li>
            </ul>
          </nav>
          <nav className="footer-col" aria-label="Ссылки">
            <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-moss)', margin: '0 0 12px' }}>Ссылки</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#wiki">Поддержка</a></li>
              <li><a href="#cta">Присоединиться к тесту</a></li>
              <li><a href="https://vk.com/app54768103?ref=landing" target="_blank" rel="noopener noreferrer">Открыть в VK <span aria-hidden="true">↗</span></a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Велобрат</span>
          <span style={{ fontSize: 12, color: 'var(--color-moss)' }} lang="ru">ru</span>
        </div>
      </div>
    </footer>
  )
}
