import { useEffect, useRef, useState } from 'react'
import './Projects.css'
import f1Gif from '../assets/img/f1.gif'
import suppleGif from '../assets/img/SuppleScan.gif'


const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

const AnimatedBlock = ({ inView, delay, className, children }) => (
  <div
    className={`anim-block ${inView ? 'anim-in' : ''} ${className || ''}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
)

export const Projects = () => {
  const [f1Ref, f1InView] = useInView()
  const [suppRef, suppInView] = useInView()

  return (
    <div className="projects-wrapper" id="projects">

      {/* F1 Section */}
      <section className="project-section red-theme" ref={f1Ref}>
        <AnimatedBlock inView={f1InView} delay={0}>
          <p className="project-section-label">PROJECTS — 01</p>
        </AnimatedBlock>

        <div className="project-block">
          <AnimatedBlock inView={f1InView} delay={0.2} className="project-block-image">
            <img src={f1Gif} alt="F1 Race Predictor" className="project-block-gif" />
          </AnimatedBlock>

          <div className="project-block-info">
            <AnimatedBlock inView={f1InView} delay={0.35}>
              <span className="project-label">Machine Learning · Live</span>
            </AnimatedBlock>
            <AnimatedBlock inView={f1InView} delay={0.5}>
              <h3 className="project-block-title">F1 Race Predictor</h3>
            </AnimatedBlock>
            <AnimatedBlock inView={f1InView} delay={0.65} className="project-block-desc">
              <p>
                Trained an XGBoost classifier on <span className="accent-red">15 years of F1 data</span> across <span className="accent-red">6,900+ race entries</span>, hitting <strong className="accent-red">0.088 log-loss</strong> on a held-out 2025 season, roughly <strong>3x more accurate</strong> than a naive baseline. Used time-aware validation to genuinely simulate predicting races before they happen.
              </p>
              <p>
                Engineered rolling features with <strong className="accent-red">shift(1) to prevent data leakage</strong>, capturing driver form, circuit win rate, and team performance across regulation eras. Runs <strong className="accent-red">10,000 Monte Carlo simulations</strong> per race, modelling DNF rates and safety car probabilities to produce calibrated win distributions.
              </p>
              <p>
                Built a <strong className="accent-red">fully automated GitHub Actions pipeline</strong> that fetches new race results from the Jolpica F1 API after every Grand Prix, retrains the model, and redeploys with <strong>zero manual intervention</strong>.
              </p>
            </AnimatedBlock>
            <AnimatedBlock inView={f1InView} delay={0.8} className="project-block-tags">
              {['Python', 'XGBoost', 'React', 'Pandas', 'Streamlit', 'GitHub Actions'].map(tag => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </AnimatedBlock>
            <AnimatedBlock inView={f1InView} delay={0.95} className="project-block-links">
              <a href="https://github.com/mahip16/f1-race-predictor" target="_blank" rel="noreferrer" className="page-btn">GitHub Repo</a>
              <a href="https://f1-race-predictor-taupe.vercel.app/" target="_blank" rel="noreferrer" className="page-btn live">Live Demo</a>
            </AnimatedBlock>
          </div>
        </div>
      </section>

      <div className="project-divider" />

      {/* Supplement App Section */}
      <section className="project-section blue-theme" ref={suppRef}>
        <AnimatedBlock inView={suppInView} delay={0}>
          <p className="project-section-label">PROJECTS — 02</p>
        </AnimatedBlock>

        <div className="project-block reverse">
          <AnimatedBlock inView={suppInView} delay={0.2} className="project-block-image">
            <img src={suppleGif} alt="SuppleScan" className="project-block-gif" />
          </AnimatedBlock>

          <div className="project-block-info">
            <AnimatedBlock inView={suppInView} delay={0.35}>
              <span className="project-label">Full Stack · Mobile</span>
            </AnimatedBlock>
            <AnimatedBlock inView={suppInView} delay={0.5}>
              <h3 className="project-block-title">SuppleScan</h3>
            </AnimatedBlock>
            <AnimatedBlock inView={suppInView} delay={0.65} className="project-block-desc">
              <p>
                Full stack mobile app that scans supplement barcodes in real time and instantly surfaces <span className="accent-blue">ingredient breakdowns</span>, <span className="accent-blue">allergen warnings</span>, and a <strong className="accent-blue">0 to 10 safety score</strong>. Integrates the Open Food Facts API with a custom ingredient analysis layer to flag caffeine content, allergens, and risky additives.
              </p>
              <p>
                Built <strong className="accent-blue">role-based authentication</strong> with Firebase Auth and <strong>real-time Firestore sync</strong> across scan history, favourites, and user profiles. Supports <span className="accent-blue">UPC, EAN, Code128, and QR barcodes</span> with low-light flash detection, search, filtering, and a personalized health dashboard.
              </p>
            </AnimatedBlock>
            <AnimatedBlock inView={suppInView} delay={0.8} className="project-block-tags">
              {['React Native', 'Expo', 'Firebase', 'Firestore', 'REST APIs'].map(tag => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </AnimatedBlock>
            <AnimatedBlock inView={suppInView} delay={0.95} className="project-block-links">
              <a href="https://github.com/mahip16/supplement-verification-app" target="_blank" rel="noreferrer" className="page-btn">GitHub Repo</a>
            </AnimatedBlock>
          </div>
        </div>
      </section>

    </div>
  )
}