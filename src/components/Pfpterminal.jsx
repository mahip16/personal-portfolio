import { useEffect, useRef, useState } from 'react'
import './Pfpterminal.css'

const lines = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Mahi Patel · CS Co-op Student @ TMU' },
  { type: 'cmd', text: 'cat profile.txt' },
  { type: 'kv',  key: 'available    ', val: '4, 8, or 12 months' },
  { type: 'kv',  key: 'currently    ', val: 'learning system design · building StatTalk' },
  { type: 'kv',  key: 'response time', val: 'within 24hrs' },
  { type: 'kv',  key: 'timezone     ', val: 'EST · flexible' },
  { type: 'kv',  key: 'outside code ', val: 'travelling, gym, and good movies' },
]

export const PfpTerminal = ({ isOpen, onClose }) => {
  const [visibleLines, setVisibleLines] = useState([])
  const [currentText, setCurrentText]   = useState('')
  const [lineIdx, setLineIdx]           = useState(0)
  const [charIdx, setCharIdx]           = useState(0)
  const bodyRef = useRef(null)

  // Typewriter
  useEffect(() => {
    if (!isOpen) return
    if (lineIdx >= lines.length) return

    const line = lines[lineIdx]

    // 'out' lines appear instantly
    if (line.type === 'out') {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        setLineIdx(i => i + 1)
        setCharIdx(0)
      }, 120)
      return () => clearTimeout(t)
    }

    const fullText = line.type === 'cmd'
      ? line.text
      : `${line.key} · ${line.val}`

    if (charIdx < fullText.length) {
      const speed = line.type === 'cmd' ? 50 : 18
      const t = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, speed)
      return () => clearTimeout(t)
    }

    // finished typing this line
    const t = setTimeout(() => {
      setVisibleLines(prev => [...prev, { ...line, fullText }])
      setCurrentText('')
      setCharIdx(0)
      setLineIdx(i => i + 1)
    }, line.type === 'cmd' ? 200 : 60)
    return () => clearTimeout(t)
  }, [isOpen, lineIdx, charIdx])

  // Auto scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [visibleLines, currentText])

  // Close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const isDone = lineIdx >= lines.length
  const currentLine = !isDone ? lines[lineIdx] : null

  const renderLine = (line, i) => {
    if (line.type === 'out') return (
      <div key={i} className="pt-out">{line.text}</div>
    )
    if (line.type === 'cmd') return (
      <div key={i} className="pt-line">
        <span className="pt-prompt">~ </span>
        <span className="pt-cmd">{line.fullText ?? line.text}</span>
      </div>
    )
    if (line.type === 'kv') {
      return (
        <div key={i} className="pt-line">
          <span className="pt-key">{line.key}</span>
          <span className="pt-dot"> · </span>
          <span className="pt-val">{line.val}</span>
        </div>
      )
    }
    return null
  }

  const renderTyping = () => {
    if (!currentLine || currentText === '') return null
    if (currentLine.type === 'cmd') return (
      <div className="pt-line">
        <span className="pt-prompt">~ </span>
        <span className="pt-cmd">{currentText}</span>
        <span className="pt-cursor">▋</span>
      </div>
    )
    if (currentLine.type === 'kv') {
      const keyLen = currentLine.key.length + 3 // key + ' · '
      const keyPart = currentText.slice(0, Math.min(currentText.length, currentLine.key.length))
      const dotPart = currentText.length > currentLine.key.length
        ? currentText.slice(currentLine.key.length, Math.min(currentText.length, keyLen))
        : ''
      const valPart = currentText.length > keyLen ? currentText.slice(keyLen) : ''
      return (
        <div className="pt-line">
          <span className="pt-key">{keyPart}</span>
          <span className="pt-dot">{dotPart}</span>
          <span className="pt-val">{valPart}</span>
          <span className="pt-cursor">▋</span>
        </div>
      )
    }
    return null
  }

  return (
    <div
      className={`pt-overlay ${isOpen ? 'pt-open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className={`pt-window ${isOpen ? 'pt-window-open' : ''}`}>
        {/* Title bar */}
        <div className="pt-bar">
          <button className="pt-close-btn" onClick={onClose} aria-label="Close">
            <span /><span />
          </button>
          <span className="pt-bar-title">mahi@portfolio ~ profile.txt</span>
        </div>

        {/* Body */}
        <div className="pt-body" ref={bodyRef}>
          {visibleLines.map((line, i) => renderLine(line, i))}
          {renderTyping()}
          {isDone && (
            <div className="pt-line">
              <span className="pt-prompt">~ </span>
              <span className="pt-cursor">▋</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}