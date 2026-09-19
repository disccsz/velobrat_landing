import { useEffect, useRef, useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    const onClickOutside = (e: MouseEvent) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClickOutside)
    }
  }, [open])

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <a className="logo" href="#main" aria-label="Велобрат — наверх" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              src="/logo.svg"
              alt="Велобрат"
              height={36}
              style={{ display: 'block', height: 36, width: 'auto' }}
              loading="eager"
              decoding="async"
            />
          </a>
          <nav className="nav" aria-label="Основная навигация">
            <a className="nav-link" href="#about">О проекте</a>
            <a className="nav-link" href="#garage">Гараж</a>
            <a className="nav-link" href="#wiki">Справочник</a>
          </nav>
          <a href="#cta" className="header-cta header-cta--desktop">
            Присоединиться
          </a>
          <a href="#cta" className="header-cta header-cta--mobile">
            Присоединиться
          </a>
          <button
            ref={btnRef}
            type="button"
            className="burger"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? <path d="M6 6L18 18M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        <nav
          id="mobile-nav"
          ref={panelRef}
          className={`mobile-nav ${open ? 'open' : ''}`}
          aria-label="Мобильная навигация"
          aria-hidden={!open}
          hidden={!open}
        >
          <a href="#about" onClick={() => setOpen(false)}>О проекте</a>
          <a href="#garage" onClick={() => setOpen(false)}>Гараж</a>
          <a href="#wiki" onClick={() => setOpen(false)}>Справочник</a>
        </nav>
      </div>
    </header>
  )
}
