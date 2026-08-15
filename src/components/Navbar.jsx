import { useState, useEffect } from "react";
import navIcon1 from "../assets/img/nav-icon1.svg";
import gitHub from "../assets/img/github.svg";

const sections = ['home', 'about', 'experience', 'skills', 'projects'];

export const NavBar = ({ onConnect }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find which section is currently in view
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = id;
          }
        }
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`custom-navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="navbar-logo">MP</a>

      <div className="navbar-right">
        <nav className="nav-pill">
          {[['home', 'Home'], ['about', 'About'], ['experience', 'Experience'], ['skills', 'Skills'], ['projects', 'Projects']].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-pill-link ${activeLink === id ? 'active' : ''}`}
              onClick={() => setActiveLink(id)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="social-icon">
          <a href="https://www.linkedin.com/in/mahiptl/" target="_blank" rel="noreferrer">
            <img src={navIcon1} alt="LinkedIn" />
          </a>
          <a href="https://github.com/mahip16" target="_blank" rel="noreferrer">
            <img src={gitHub} alt="GitHub" />
          </a>
        </div>
        <button className="vvd" onClick={onConnect}><span>Let's Connect</span></button>
      </div>
    </div>
  )
}