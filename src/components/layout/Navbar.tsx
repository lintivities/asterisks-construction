import React, { useState, useEffect } from 'react';
import { companyData } from '../../data/companyData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="container nav-container">
        {/* BIG CENTERED BRAND LOGO LOCKUP */}
        <a href="#hero" className="brand-logo centered-brand-logo" onClick={closeMobile} title="Asterisks Construction">
          <div className="brand-emblem-wrap brand-emblem-large">
            <img src="/assets/logo.png" alt="Asterisks Construction Official Logo" className="brand-emblem-img" />
          </div>
          <div className="brand-centered-lockup">
            <span className="brand-name-centered">ASTERISKS</span>
            <span className="brand-sub-centered">CONSTRUCTION</span>
            <span className="brand-tagline-centered">{companyData.tagline}</span>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#about" className="nav-link" onClick={closeMobile}>About Us</a>
          <a href="#services" className="nav-link" onClick={closeMobile}>Activities & Services</a>
          <a href="#vision-obs" className="nav-link" onClick={closeMobile}>Vision & OBS</a>
          <a href="#projects" className="nav-link" onClick={closeMobile}>Projects (12)</a>
          <a href="#team" className="nav-link" onClick={closeMobile}>Leadership Team</a>
          <a href="#contact" className="nav-link" onClick={closeMobile}>Contact</a>
        </nav>

        <a href="#contact" className="nav-cta" onClick={closeMobile}>
          <span>Request a Quote</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
