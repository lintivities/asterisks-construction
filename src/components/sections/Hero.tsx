import React from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { companyData } from '../../data/companyData';
import { Project } from '../../types';

export interface HeroProps {
  featuredProject: Project;
  onSelectProject: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredProject, onSelectProject }) => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-backdrop-pattern"></div>
      <div className="hero-digital-grid-overlay"></div>
      
      <img
        src="/assets/blueprint-sketch.png"
        alt="Architectural Blueprint Texture"
        className="hero-blueprint-accent"
      />

      <div className="container hero-container-layout">
        {/* BIG BRAND HIGHLIGHT CENTERPIECE: Crown Jewel of the Website */}
        <div className="hero-brand-highlight-banner">
          <div className="hero-brand-emblem-container">
            <div className="hero-brand-emblem-glow"></div>
            <div className="hero-brand-emblem-frame">
              <img src="/assets/logo.png" alt="Asterisks Construction Official Logo" className="hero-brand-emblem-large" />
            </div>
          </div>
          <div className="hero-brand-title-lockup">
            <span className="hero-brand-eyebrow">OFFICIAL BRAND IDENTITY • PAN-AFRICA</span>
            <h2 className="hero-brand-heading">
              ASTERISKS <span className="gold-sub">CONSTRUCTION</span>
            </h2>
            <p className="hero-brand-motto">"{companyData.tagline}"</p>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge digital-hud-badge">
              <span className="live-indicator-dot"></span>
              <span>2026 Corporate Portfolio • Civil Engineering & Architecture</span>
            </div>

            <h1 className="hero-title">
              Pioneering Africa’s <span className="highlight-gold">Built Environment</span> with Structural Precision.
            </h1>

            <p className="hero-subtitle">
              From high-yield commercial apartments to 12-bedroom coastal luxury estates, Asterisks Construction executes turnkey engineering with uncompromising quality, integrity, and sustainability.
            </p>

            <div className="hero-actions">
              <Button
                variant="primary"
                href="#projects"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                }
              >
                Inspect 12 Landmark Projects
              </Button>
              <Button variant="outline" href="#contact">
                Direct Engineering Desk
              </Button>
            </div>

            <div className="hero-stats-row">
              {companyData.stats.map((stat, i) => (
                <div className="stat-box" key={i}>
                  <h4>{stat.number}</h4>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-card-preview">
            <div className="hero-featured-card">
              <div className="hero-card-img-wrap">
                <img src={featuredProject.image} alt={featuredProject.title} />
                <div className="hero-card-badge">
                  <Badge variant="dark">Showcase 01 • Mansions</Badge>
                </div>
                <div className="hero-card-tag-overlay">
                  <span>5-Acre Coastal Estate</span>
                </div>
              </div>
              <div className="hero-card-details">
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.summary}</p>
                <div className="hero-card-meta">
                  <span className="hero-spec-tag">📍 {featuredProject.location}</span>
                  <button
                    type="button"
                    className="hero-inspect-btn"
                    onClick={() => onSelectProject(featuredProject)}
                  >
                    Inspect Labeled Spaces →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
