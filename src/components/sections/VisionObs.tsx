import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { companyData } from '../../data/companyData';

export const VisionObs: React.FC = () => {
  return (
    <section className="vision-obs-section" id="vision-obs">
      <div className="container">
        <SectionHeader
          tag="Strategic Direction"
          title="Vision, Mission & Governance"
          description="Guided by unwavering corporate values and a structured governance model that guarantees flawless execution from board level to site superintendents."
          align="center"
        />

        <div className="vm-cards-grid">
          <div className="vm-card">
            <span className="vm-card-tag">Our Vision</span>
            <h3>Shaping Africa's Built Environment</h3>
            <p>"{companyData.vision}"</p>
          </div>

          <div className="vm-card mission-card">
            <span className="vm-card-tag">Our Mission</span>
            <h3>Delivering Value-Driven Excellence</h3>
            <p>"{companyData.mission}"</p>
          </div>
        </div>

        <div className="values-banner">
          <h3 className="values-title">Our 5 Pillars of Integrity & Performance</h3>
          <div className="values-list">
            {companyData.values.map((val, idx) => (
              <div className="value-pill" key={idx}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="obs-container">
          <div className="obs-header">
            <h3>Organizational Breakdown Structure (OBS)</h3>
            <p>Our clear operational hierarchy guarantees direct accountability, seamless cross-departmental coordination, and rigorous oversight.</p>
          </div>

          <div className="obs-tree">
            <div className="obs-node director">Board of Directors</div>
            <div className="obs-arrow">↓</div>
            <div className="obs-node md">Managing Director</div>
            <div className="obs-arrow">↓</div>

            <div className="obs-branches">
              {companyData.obsBranches.map((b, i) => (
                <div className="obs-branch-card" key={i}>
                  <h5>{b.title}</h5>
                  <span>{b.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

