import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { companyData } from '../../data/companyData';

export const About: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-main-img-wrap">
            <img src="/assets/hero-building.png" alt="Asterisks Construction Modern High-Rise Project" />
          </div>
          <div className="about-floating-badge">
            <h4>{companyData.founded}</h4>
            <p>Founded in Nairobi, Kenya with a Pan-African vision for sustainable engineering.</p>
          </div>
        </div>

        <div className="about-content">
          <SectionHeader
            tag="About Asterisks Construction"
            title="Committed to Quality, Safety & Sustainable Growth"
            description="Asterisks Construction is a premier design-build and civil engineering firm founded in 2025. Our core operations encompass turnkey infrastructure, luxury residential estates, and commercial complexes across East Africa and beyond."
            align="left"
          />

          <p className="about-text">
            We take immense pride in providing sustainable, value-driven construction services. Our architectural and structural designs are precisely optimized to guarantee operational efficiency while anticipating our clients' evolving spaces.
          </p>

          {/* Direct Consultation Hotline Banner requested by client */}
          <div className="about-hotline-card">
            <div className="hotline-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="hotline-info">
              <span className="hotline-tag">Direct Executive & Engineering Hotline</span>
              <a href="tel:+254113743026" className="hotline-number">+254 113 743 026</a>
              <span className="hotline-desc">Available for direct land appraisals, architectural consultations, and structural feasibility reviews.</span>
            </div>
            <div className="hotline-actions">
              <a href="tel:+254113743026" className="hotline-btn call-btn">
                <span>Call Hotline</span>
              </a>
              <a
                href="https://wa.me/254113743026?text=Hello%20Asterisks%20Construction,%20I%20am%20reaching%20out%20for%20a%20project%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="hotline-btn whatsapp-btn"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4>Rigorous Site Safety</h4>
              <p>Provision of PPEs, comprehensive health and safety training, certified onsite health officers, and full medical insurance coverage for all staff and visitors.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <h4>Green Architecture</h4>
              <p>Incorporating energy-efficient green building elements into structural designs, partnering with active NGOs and CBOs on environmental conservation.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4>Local Labor Empowerment</h4>
              <p>Our construction activities are prioritized for local communities, creating sustainable jobs, skills transfer, and regional economic prosperity.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4>On-Time & On-Budget</h4>
              <p>Engineering excellence ensures every structure is completed to exact architectural specifications within scheduled timelines and budget boundaries.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
