import { useState, useEffect } from 'react'
import "./Hero.css"
import pfp from '../assets/img/pfp.png'
import { PfpTerminal } from './Pfpterminal'
import resumePdf from '../assets/img/Resume.pdf'


function Hero() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);


    useEffect(() => {
    const phrases = ['Full Stack Developer', 'CS Student @ TMU', 'ML Enthusiast'];
    const currentPhrase = phrases[index];

    if (!isDeleting && text === currentPhrase) {
        const pause = setTimeout(() => setIsDeleting(true), 1500);
        return () => clearTimeout(pause);
    }

    if (isDeleting && text === '') {
        const next = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
        }, 0);
        return () => clearTimeout(next);
    }

    const timer = setTimeout(() => {
        if (!isDeleting) {
        setText(currentPhrase.slice(0, text.length + 1));
        } else {
        setText(currentPhrase.slice(0, text.length - 1));
        }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timer);
    }, [text, isDeleting, index]);
  
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }

  return (
    <>
    <section className="hero-section" id="home">
        <div className="hero-content">
            <h1 className="hero-title">Mahi Patel</h1>
            <p className="hero-subtitle">{text}<span className="cursor">|</span></p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
              <button className="hero-btn" style={{ marginTop: 0 }} onClick={scrollToProjects}>View My Work</button>
              <a
                href={resumePdf}
                download="Mahi_Patel_Resume.pdf"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'color 0.3s ease',
                  animation: 'fadeSlideUp 0.8s ease 1.2s forwards',
                  opacity: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(232,121,176,0.9)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="12" x2="12" y2="18"/>
                  <line x1="9" y1="15" x2="12" y2="18"/>
                  <line x1="15" y1="15" x2="12" y2="18"/>
                </svg>
                Download Resume
              </a>
            </div>

            </div>
        <div className="hero-image">
            <div className="hero-pfp-wrapper" onClick={() => setTerminalOpen(true)}>
                <img
                src={pfp}
                alt="Mahi Patel"
                className="hero-pfp"
                />
            </div>
            <span className="hero-pfp-label" onClick={() => setTerminalOpen(true)}>
                ↑ click to learn more
                </span>
            </div>
    </section>

    <PfpTerminal key={terminalOpen ? 'open' : 'closed'} isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  )
}

export default Hero
