import { useState, useEffect } from "react";
import navIcon1 from "../assets/img/nav-icon1.svg";
import gitHub from "../assets/img/github.svg";

export const NavBar = ({ onConnect }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { 
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); 
      } else {
        setScrolled(false); 
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`custom-navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="navbar-logo">MP</a>

      <div className="navbar-right">
        <nav className="nav-pill">
          <a href="#home" className={`nav-pill-link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => setActiveLink('home')}>Home</a>
          <a href="#skills" className={`nav-pill-link ${activeLink === 'skills' ? 'active' : ''}`} onClick={() => setActiveLink('skills')}>Skills</a>
          <a href="#projects" className={`nav-pill-link ${activeLink === 'projects' ? 'active' : ''}`} onClick={() => setActiveLink('projects')}>Projects</a>
        </nav>

        <div className="social-icon">
          <a href="https://www.linkedin.com/in/mahiptl/"><img src={navIcon1} alt="LinkedIn" /></a>
          <a href="https://github.com/mahip16"><img src={gitHub} alt="GitHub" /></a>
        </div>
        <button className="vvd" onClick={onConnect}><span>Let's Connect</span></button>
      </div>
    </div>
  )
}