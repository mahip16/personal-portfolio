import { useEffect, useRef, useState, useCallback } from 'react'
import './About.css'

const events = [
  {
    year: '2024',
    title: 'Started CS Co-op at TMU',
    desc: 'Began the transition from a casual interest in tech to building real-world projects.',
  },
  {
    year: 'Sep 2025',
    title: 'Shipped SuppleScan',
    desc: 'React Native mobile app with barcode scanning, Firebase auth, and real-time sync. Zero to production.',
  },
  {
    year: 'Mar 2026',
    title: 'Launched F1 Race Predictor',
    desc: '15 years of data. 10,000 simulations per race. 0.088 log-loss on an unseen season. Live on Vercel.',
  },
  {
    year: 'May 2026',
    title: 'First Co-op Term: Lyvechat (Software & Product Specialist)',
    desc: 'Gained hands-on experience in a startup software development environment.',
    active: true,
  },
  {
    year: 'Sept 2026',
    title: 'Second Co-op Term: TD Bank (Quality Engineer)',
    desc: 'Starting soon.',
    active: true,
  }
]

const TimelineItem = ({ event, index, onLineRef, onDotRef }) => {
  const [visible, setVisible] = useState(false)
  const itemRef  = useRef(null)
  const lineRef  = useRef(null)
  const dotRef   = useRef(null)

  // Each item fades up independently as it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (itemRef.current) observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [])

  // Pass refs up so the parent can drive the scroll-fill
  useEffect(() => {
    if (lineRef.current) onLineRef(index, lineRef.current)
    if (dotRef.current)  onDotRef(index, dotRef.current)
  }, [index, onLineRef, onDotRef])

  const isLast = index === events.length - 1

  return (
    <div ref={itemRef} className={`tl-item ${visible ? 'tl-visible' : ''}`}>
      <div className="tl-connector">
        <div
          ref={dotRef}
          className={`tl-dot ${event.active ? 'tl-dot-active' : ''}`}
        />
        {!isLast && (
          <div className="tl-line">
            <div ref={lineRef} className="tl-line-fill" />
          </div>
        )}
      </div>

      <div className="tl-content">
        <div className="tl-header">
          <span className="tl-title">{event.title}</span>
          <span className="tl-year">{event.year}</span>
        </div>
        <p className="tl-desc">{event.desc}</p>
      </div>
    </div>
  )
}

export const About = () => {
  const sectionRef = useRef(null)
  const [started, setStarted]   = useState(false)

  // lineRefs[i] → the .tl-line-fill div for line i (between dot i and dot i+1)
  const lineRefs = useRef({})
  // dotRefs[i]  → the .tl-dot div for dot i
  const dotRefs  = useRef({})

  const handleLineRef = useCallback((i, el) => { lineRefs.current[i] = el }, [])
  const handleDotRef  = useCallback((i, el) => { dotRefs.current[i]  = el }, [])

  // Kick off entrance animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Scroll-driven line fill
  useEffect(() => {
    const handleScroll = () => {
      const items = sectionRef.current?.querySelectorAll('.tl-item')
      if (!items) return

      items.forEach((item, i) => {
        const dot  = dotRefs.current[i]
        const line = lineRefs.current[i]   // undefined for last item
        const nextDot = dotRefs.current[i + 1]

        if (!dot) return

        // Dot lights up when its top edge scrolls into the middle of the viewport
        const dotRect = dot.getBoundingClientRect()
        const dotMid  = dotRect.top + dotRect.height / 2
        if (dotMid <= window.innerHeight * 0.72) {
          dot.classList.add('tl-dot-lit')
        } else {
          dot.classList.remove('tl-dot-lit')
        }

        // Fill the line between dot i and dot i+1
        if (!line || !nextDot) return

        const lineEl   = line.parentElement          // .tl-line wrapper
        const lineRect  = lineEl.getBoundingClientRect()
        const nextRect  = nextDot.getBoundingClientRect()

        // lineStart = top of the line in viewport coords
        // lineEnd   = top of the next dot
        const lineStart = lineRect.top
        const lineEnd   = nextRect.top + nextRect.height / 2

        const totalPx   = lineEnd - lineStart
        const scrolled  = window.innerHeight * 0.72 - lineStart
        const pct       = Math.min(100, Math.max(0, (scrolled / totalPx) * 100))

        line.style.height = `${pct}%`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()   // run once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-inner">

        <div className={`about-header ${started ? 'anim-in' : ''}`}>
          <p className="about-label">ABOUT</p>
          <h2 className="about-heading">
            CS student.<br />
            <span className="about-accent">Always Building.</span>
          </h2>
          <p className="about-sub">
            I build full-stack apps and ML systems that solve real problems. Here's the timeline.
          </p>
        </div>

        <div className="tl-wrapper">
          {events.map((event, i) => (
            <TimelineItem
              key={event.year}
              event={event}
              index={i}
              onLineRef={handleLineRef}
              onDotRef={handleDotRef}
            />
          ))}
        </div>

        <div className={`about-pills ${started ? 'anim-in' : ''}`}>
          <span className="about-pill">📍 Markham, ON</span>
          <span className="about-pill">🎓 CS Co-op at TMU</span>
          <span className="about-pill about-pill-active">💼 Open to 4, 8 or 12-month co-op</span>
        </div>

      </div>
    </section>
  )
}