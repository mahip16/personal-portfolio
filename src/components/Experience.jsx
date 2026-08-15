import { useEffect, useRef, useState } from 'react'
import './Experience.css'
import lyveLogo from '../assets/img/lyvechat-logo.png'
import lyveTeam from '../assets/img/lyvechat-team.jpg'

const roles = [
  {
    id: 'lyvechat',
    company: 'Lyvechat',
    role: 'Software & Product Specialist',
    period: 'May 2026 — Sep 2026',
    status: 'current',
    accent: 'blue',
    blurb: 'First co-op term — startup software development environment.',
    photos: [
      { src: lyveTeam, alt: 'The Lyvechat team', fit: 'cover', caption: 'The Lyvechat team' },
      { src: lyveLogo, alt: 'Lyvechat logo', fit: 'cover', caption: 'Lyvechat' },
    ],
    bullets: [
      {
        text: 'Evaluated WhatsApp Business API and multi-platform livestreaming SDKs, producing an integration feasibility brief that outlined architecture tradeoffs for a React/Firebase stack.',
        kw: ['WhatsApp Business API', 'React/Firebase'],
      },
      {
        text: 'Strengthened user retention by identifying 5+ usability gaps through iterative build testing, translating findings into actionable engineering tickets across bi-weekly sprint cycles.',
        kw: ['5+ usability gaps'],
      },
      {
        text: 'Identified and documented 30+ reproducible bugs, collaborating weekly with dev teams across the UK and Poland to prioritize and unblock critical fixes.',
        kw: ['30+ reproducible bugs', 'UK and Poland'],
      },
      {
        text: 'Translated UX research into engineering-ready specifications, closing the gap between user feedback and sprint-ready tickets across bi-weekly agile cycles.',
        kw: ['engineering-ready specifications'],
      },
      {
        text: 'Surfaced 3 scalability risk areas during roadmap discussions, leading to their inclusion in the Q3 technical backlog.',
        kw: ['3 scalability risk areas', 'Q3 technical backlog'],
      },
    ],
    tags: ['React', 'Firebase', 'WhatsApp Business API', 'Agile', 'Bug Triage'],
  },
  {
    id: 'td',
    company: 'TD Bank',
    role: 'Quality Engineer',
    period: 'Sep 2026 — Dec 2026',
    status: 'upcoming',
    accent: 'green',
    blurb: 'Working with the global technology team.',
    photos: [],
    bullets: [],
    tags: ['QA & Testing', 'Global Technology Team'],
  },
]

// Wraps any keyword phrases found in `text` with a colored, bolded span
const Highlighted = ({ text, kw }) => {
  if (!kw || kw.length === 0) return text
  const escaped = kw.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((part, i) =>
    kw.includes(part)
      ? <strong key={i} className="exp-kw">{part}</strong>
      : <span key={i}>{part}</span>
  )
}

const Carousel = ({ photos, active }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active || photos.length < 2) return
    const t = setInterval(() => setIndex(i => (i + 1) % photos.length), 3800)
    return () => clearInterval(t)
  }, [active, photos.length])

  if (photos.length === 0) return null

  return (
    <div className="exp-carousel">
      <div className="exp-carousel-track">
        {photos.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            className={`exp-carousel-img exp-carousel-img-${p.fit || 'cover'} ${i === index ? 'exp-carousel-img-active' : ''}`}
          />
        ))}
      </div>
      <div className="exp-carousel-caption-row">
        <span className="exp-carousel-caption">{photos[index].caption}</span>
        {photos.length > 1 && (
          <div className="exp-carousel-dots">
            {photos.map((p, i) => (
              <button
                key={p.src}
                className={`exp-carousel-dot ${i === index ? 'exp-carousel-dot-active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIndex(i) }}
                aria-label={`Show photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const Experience = () => {
  const [openIds, setOpenIds] = useState(() => new Set(roles.filter(r => r.status === 'current').map(r => r.id)))
  const [started, setStarted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (id) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section className="exp-section" id="experience" ref={sectionRef}>
      <div className="exp-inner">

        <div className={`exp-header ${started ? 'anim-in' : ''}`}>
          <p className="exp-label">EXPERIENCE</p>
          <h2 className="exp-heading">
            Hands-on<br />
            <span className="exp-accent">work experience.</span>
          </h2>
        </div>

        <div className="exp-list">
          {roles.map((r, i) => {
            const open = openIds.has(r.id)
            const hasPhotos = r.photos.length > 0
            return (
              <div
                key={r.id}
                className={`exp-card ${open ? 'exp-card-open' : ''} ${started ? 'anim-in' : ''}`}
                data-accent={r.accent}
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <button className="exp-card-head" onClick={() => toggle(r.id)}>
                  <div className="exp-card-head-left">
                    <span className={`exp-status-dot exp-status-${r.status}`} />
                    <div>
                      <div className="exp-card-title">
                        <span className="exp-company">{r.company}</span>
                        <span className="exp-role">{r.role}</span>
                      </div>
                      <span className="exp-period">{r.period}</span>
                    </div>
                  </div>
                  <span className={`exp-chevron ${open ? 'exp-chevron-open' : ''}`}>⌄</span>
                </button>

                <div className="exp-card-body" style={{ maxHeight: open ? '1200px' : '0px' }}>
                  <div className="exp-card-body-inner">

                    {hasPhotos && (
                      <div className="exp-card-photos">
                        <Carousel photos={r.photos} active={open} />
                      </div>
                    )}

                    <div className="exp-card-copy">
                      <p className="exp-blurb">{r.blurb}</p>

                      {r.bullets.length > 0 && (
                        <ul className="exp-bullets">
                          {r.bullets.map((b, bi) => (
                            <li key={bi}><Highlighted text={b.text} kw={b.kw} /></li>
                          ))}
                        </ul>
                      )}

                      <div className="exp-tags">
                        {r.tags.map(tag => <span className="exp-tag" key={tag}>{tag}</span>)}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}