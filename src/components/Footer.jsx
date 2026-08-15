import { useEffect, useRef, useState } from 'react'
import './Footer.css'
import navIcon1 from '../assets/img/nav-icon1.svg'
import gitHub from '../assets/img/github.svg'

const links = ['Home', 'About', 'Experience', 'Skills', 'Projects']

export const Footer = ({ onConnect }) => {
  const [started, setStarted] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.2 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-inner">

        <div className="footer-top">

          {/* Logo + tagline */}
          <div className="footer-left">
            <a href="#home" className="footer-logo">MP</a>
            <p className={`footer-tagline anim-block ${started ? 'anim-in' : ''}`} style={{ animationDelay: '0s' }}>
                CS student. Always building.
            </p>
          </div>

          {/* Nav links — staggered */}
          <div className="footer-links">
            {links.map((label, i) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className={`footer-link anim-block ${started ? 'anim-in' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.07}s` }}
              >
                {label}
              </a>
            ))}
            <button
              onClick={onConnect}
              className={`footer-link anim-block ${started ? 'anim-in' : ''}`}
              style={{ animationDelay: `${0.1 + links.length * 0.07}s` }}
            >
              Let's Connect
            </button>
          </div>

          {/* Social icons */}
          <div className={`footer-social anim-block ${started ? 'anim-in' : ''}`} style={{ animationDelay: '0.45s' }}>
            <a href="https://www.linkedin.com/in/mahiptl/" target="_blank" rel="noreferrer">
              <img src={navIcon1} alt="LinkedIn" />
            </a>
            <a href="https://github.com/mahip16" target="_blank" rel="noreferrer">
              <img src={gitHub} alt="GitHub" />
            </a>
          </div>

        </div>

        <div className={`footer-divider anim-block ${started ? 'anim-in' : ''}`} style={{ animationDelay: '0.5s' }} />

        <div className={`footer-bottom anim-block ${started ? 'anim-in' : ''}`} style={{ animationDelay: '0.6s' }}>
          <p>© {new Date().getFullYear()} Mahi Patel. All rights reserved.</p>
          <p className="footer-email">
            <a href="https://mail.google.com/mail/?view=cm&to=mahip1606@gmail.com" target="_blank" rel="noreferrer">
                mahip1606@gmail.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}