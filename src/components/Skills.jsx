import React, { useEffect, useRef, useState } from 'react'
import './Skills.css'

const lines = [
  { type: 'cmd', text: 'skills --list' },
  { type: 'key', key: 'languages  ', val: 'Java · Python · JavaScript · HTML · CSS · C' },
  { type: 'key', key: 'frameworks ', val: 'React · React Native · Firebase · Expo · Git' },
  { type: 'key', key: 'databases  ', val: 'SQL · Firestore · Realtime DB' },
  { type: 'key', key: 'ml tools   ', val: 'XGBoost · Streamlit · Pandas' },
  { type: 'key', key: 'concepts   ', val: 'OOP · REST APIs · Agile · Data Structures' },
]

const stats = [
  { value: 2, suffix: '+', label: 'Years of Experience' },
  { value: 2, suffix: '', label: 'Projects Shipped' },
  { value: 1, suffix: '', label: 'Live Deployment' },
  { value: 10, suffix: '+', label: 'Technologies' },
]

const useCountUp = (target, started) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = 1
    const interval = Math.floor(2000 / target)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, interval)
    return () => clearInterval(timer)
  }, [started, target])
  return count
}

const StatCard = ({ value, suffix, label, started, delay }) => {
  const count = useCountUp(value, started)
  return (
    <div className={`stat-card ${started ? 'animate' : ''}`} style={{ animationDelay: `${delay}s` }}>
      <span className="stat-value">
        {count}<span className="stat-suffix">{suffix}</span>
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export const Skills = () => {
  const [visibleLines, setVisibleLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || lineIndex >= lines.length) {
      const t = setTimeout(() => setIsTyping(false), 0)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setIsTyping(true), 0)

    const line = lines[lineIndex]
    const fullText = line.type === 'cmd' ? line.text : line.key + line.val

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      }, 15)
      return () => { clearTimeout(t); clearTimeout(timer) }
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line, fullText }])
        setCurrentText('')
        setCharIndex(0)
        setLineIndex(l => l + 1)
      }, 100)
      return () => { clearTimeout(t); clearTimeout(timer) }
    }
  }, [started, lineIndex, charIndex])

  const renderLine = (line, text, typing) => {
    if (line.type === 'cmd') {
      return <div className="t-line"><span className="t-prompt">~ </span><span className="t-cmd">{text}</span>{typing && <span className="t-cursor">|</span>}</div>
    }
    const keyPart = text.slice(0, line.key.length)
    const valPart = text.slice(line.key.length)
    return (
      <div className="t-line">
        <span className="t-key">{keyPart}</span>
        <span className="t-val">{valPart}</span>
        {typing && <span className="t-cursor">|</span>}
      </div>
    )
  }

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <h2 className="skills-title">SKILLS</h2>
      <div className="skills-layout">
        <div className={`terminal ${isTyping ? 'typing-glow' : ''}`}>
          <div className="terminal-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-body">
            {visibleLines.map((line, i) => (
              <div key={i}>{renderLine(line, line.fullText, false)}</div>
            ))}
            {lineIndex < lines.length && renderLine(lines[lineIndex], currentText, true)}
            {lineIndex >= lines.length && (
              <div className="t-line"><span className="t-prompt">~ </span><span className="t-cursor">|</span></div>
            )}
          </div>
        </div>

        <div className="stats-block">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} started={started} delay={i * 0.15} />
          ))}
          <div className={`stat-card stat-card-full ${started ? 'animate' : ''}`} style={{ animationDelay: '0.6s' }}>
            <span className="stat-exploring">
                <span style={{ color: '#e879b0', fontWeight: 700, fontFamily: 'Courier New', fontSize: '16px' }}>currently exploring →</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Courier New', fontSize: '16px' }}>System Design · Machine Learning</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}