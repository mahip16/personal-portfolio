import { useState, useEffect } from 'react'
import "./Hero.css"
import pfp from '../assets/img/pfp.png'
import { PfpTerminal } from './Pfpterminal'


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
            <button className="hero-btn" onClick={scrollToProjects}>View My Work</button>
            </div>
        <div className="hero-image">
          <img
            src={pfp}
            alt="Mahi Patel"
            className="hero-pfp"
            onClick={() => setTerminalOpen(true)}
            style={{ cursor: 'pointer' }}
          />
        </div>
    </section>

    <PfpTerminal key={terminalOpen ? 'open' : 'closed'} isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  )
}

export default Hero
