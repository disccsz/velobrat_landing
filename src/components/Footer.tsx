export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#main" className="logo footer-logo" aria-label="Велобрат — наверх">
              <img src="/logo.svg" alt="Велобрат" height={36} className="logo-img" loading="lazy" decoding="async" />
            </a>
            <p className="footer-brand">
              <strong>Велобрат — единый цифровой сервис для велосипедистов</strong>
            </p>
          </div>
          <nav className="footer-col" aria-label="Продукт">
            <p className="footer-col-title">Продукт</p>
            <ul className="footer-list">
              <li><a href="#about">О проекте</a></li>
              <li><a href="#garage">Гараж</a></li>
              <li><a href="#wiki">Справочник</a></li>
              <li><a href="#roadmap">Дорожная карта</a></li>
            </ul>
          </nav>
          <nav className="footer-col" aria-label="Ссылки">
            <p className="footer-col-title">Ссылки</p>
            <ul className="footer-list">
              <li><a href="#wiki">Поддержка</a></li>
              <li><a href="#cta">Присоединиться к тесту</a></li>
              <li><a href="https://vk.com/app54768103?ref=landing" target="_blank" rel="noopener noreferrer">Открыть в VK <span aria-hidden="true">↗</span></a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Велобрат</span>
          <span className="footer-lang" lang="ru">ru</span>
        </div>
      </div>
    </footer>
  )
}
