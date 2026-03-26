import { useEffect, useRef, useState } from 'react'
import './Contactmodal.css'

export const ContactModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const overlayRef = useRef(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

    const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await fetch('https://formspree.io/f/xkopnvvv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    })
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    }


  return (
    <div
      ref={overlayRef}
      className={`cm-overlay ${isOpen ? 'cm-open' : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div className={`cm-panel ${isOpen ? 'cm-panel-open' : ''}`} role="dialog" aria-modal="true">

        {/* Close button */}
        <button className="cm-close" onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>

        {/* Header */}
        <div className="cm-header">
          <p className="cm-label">CONTACT</p>
          <h2 className="cm-title">
            Let's build<br />
            <span className="cm-accent">something real.</span>
          </h2>
          <p className="cm-sub">
            Open to co-op roles, collabs, or just a good conversation about tech.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="cm-success">
            <div className="cm-success-icon">✓</div>
            <p className="cm-success-title">Message sent!</p>
            <p className="cm-success-sub">I'll get back to you soon.</p>
            <button className="cm-btn" onClick={() => { setStatus('idle'); onClose() }}>Close</button>
          </div>
        ) : (
          <form className="cm-form" onSubmit={handleSubmit} noValidate>
            <div className="cm-field">
              <label className="cm-field-label" htmlFor="cm-name">Name</label>
              <input
                id="cm-name"
                className="cm-input"
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="cm-field">
              <label className="cm-field-label" htmlFor="cm-email">Email</label>
              <input
                id="cm-email"
                className="cm-input"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="cm-field">
              <label className="cm-field-label" htmlFor="cm-message">Message</label>
              <textarea
                id="cm-message"
                className="cm-input cm-textarea"
                name="message"
                placeholder="Tell me about the role, project, or idea..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <button
              className={`cm-btn ${status === 'sending' ? 'cm-btn-sending' : ''}`}
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span className="cm-spinner" />
              ) : (
                'Send Message →'
              )}
            </button>
          </form>
        )}

        {/* Decorative corner glow */}
        <div className="cm-glow" />
      </div>
    </div>
  )
}