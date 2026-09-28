import React from 'react';
import { companyData } from '../../data/companyData';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/assets/logo.png" alt="Asterisks Construction Emblem" className="footer-emblem" />
              <div className="footer-brand-text">
                <span className="footer-brand-title">ASTERISKS</span>
                <span className="footer-brand-sub">CONSTRUCTION</span>
              </div>
            </div>
            <p>
              A premier African engineering and architectural design-build firm committed to sustainable construction, local empowerment, and landmark excellence.
            </p>
            <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.85rem' }}>
              "{companyData.tagline}."
            </p>
          </div>

          <div className="footer-col">
            <h5>Quick Navigation</h5>
            <ul className="footer-links">
              <li><a href="#about">About Our Firm</a></li>
              <li><a href="#services">Core Activities (11)</a></li>
              <li><a href="#vision-obs">Vision & Structure</a></li>
              <li><a href="#projects">12 Showcase Projects</a></li>
              <li><a href="#team">Leadership Team</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Key Services</h5>
            <ul className="footer-links">
              <li><a href="#services">Architectural & Interior Design</a></li>
              <li><a href="#services">Civil & Structural Engineering</a></li>
              <li><a href="#services">MEP & Green Building</a></li>
              <li><a href="#services">Turnkey Construction</a></li>
              <li><a href="#services">Equipment Hire & Logistics</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Official Contact</h5>
            <ul className="footer-links">
              <li>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.8rem', marginBottom: '2px' }}>Direct Executive Desk:</strong>
                <a href={`tel:${companyData.contacts.directPhone}`} style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
                  {companyData.contacts.directPhoneDisplay}
                </a>
              </li>
              <li style={{ marginTop: '8px' }}>
                <a href={`mailto:${companyData.contacts.email}`}>{companyData.contacts.email}</a>
              </li>
              <li>
                <a href={`tel:${companyData.contacts.phone}`}>{companyData.contacts.phoneDisplay}</a>
              </li>
              <li style={{ color: '#a6b2c4', fontSize: '0.88rem' }}>{companyData.location}</li>
              <li style={{ color: '#a6b2c4', fontSize: '0.88rem' }}>{companyData.reach}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {companyData.profileYear} {companyData.name} Limited. All Rights Reserved.</p>
          <p>Architectural Black & Gold Theme • Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
