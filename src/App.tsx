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
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const h = document.documentElement
        const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100
        setW(Math.min(100, Math.max(0, scrolled)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(raf)
    }
  }, [])
  return <div aria-hidden="true" className="progress-bar" style={{ width: `${w}%` }} />
}

function StickyCTA() {
  const [pastHero, setPastHero] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        setPastHero(window.scrollY > 480)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const cta = document.getElementById('cta')
    const io = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry?.isIntersecting ?? false),
      { threshold: 0.15 },
    )
    if (cta) io.observe(cta)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])
  useEffect(() => {
    // Не теряем фокус при скрытии: уводим его с размонтируемой ссылки
    if ((!pastHero || ctaVisible) && wrapRef.current?.contains(document.activeElement)) {
      (document.activeElement as HTMLElement).blur()
    }
  }, [pastHero, ctaVisible])
  if (!pastHero || ctaVisible) return null
  return (
    <div ref={wrapRef} className="sticky-cta">
      <a href="#cta" className="sticky-cta-link">
        Хочу в тест <span aria-hidden="true">→</span>
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
