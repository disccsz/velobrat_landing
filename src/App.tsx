import { useEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Inside } from './components/Inside'
import { Garage } from './components/Garage'
import { Wear } from './components/Wear'
import { Wiki } from './components/Wiki'
import { Audience } from './components/Audience'
import { Roadmap } from './components/Roadmap'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

function ProgressBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100
      setW(Math.min(100, Math.max(0, scrolled)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, height: 2, width: `${w}%`, background: 'var(--brand)', zIndex: 60, transition: 'width 0.1s linear' }} />
}

function StickyCTA() {
  const [show, setShow] = useState(false)
  const ctaRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    ctaRef.current = document.getElementById('cta')
    const onScroll = () => {
      const y = window.scrollY
      const ctaTop = ctaRef.current?.offsetTop ?? 99999
      // show after hero (400px) and hide when cta in view
      setShow(y > 480 && y + window.innerHeight < ctaTop + 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <div style={{ position: 'fixed', bottom: 12, left: 12, right: 12, zIndex: 55, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <a href="#cta" style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--brand)', color: '#fff', borderRadius: 9999, padding: '12px 20px', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.35)', textDecoration: 'none' }}>
        Присоединиться <span aria-hidden="true">→</span>
      </a>
    </div>
  )
}

export default function App() {
  return (
    <div className="landing">
      <ProgressBar />
      <a href="#main" className="skip-link">Перейти к содержимому</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Inside />
        <Garage />
        <Wear />
        <Wiki />
        <Audience />
        <Roadmap />
        <CTA />
      </main>
      <StickyCTA />
      <Footer />
    </div>
  )
}
