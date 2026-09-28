import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { companyData } from '../../data/companyData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Mansion / Bungalow',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitterName, setSubmitterName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitterName(formData.name);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Residential Mansion / Bungalow',
      location: '',
      message: ''
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 7000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <SectionHeader
          tag="Let's Build Together"
          title="Start Your Project With Asterisk Construction"
          description="Reach out to our engineering and architectural directors for land appraisals, project design consultations, structural assessments, or quote inquiries."
          align="center"
        />

        <div className="contact-grid">
          <div className="contact-info-panel">
            {/* Email */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-card-text">
                <h5>Email Us Directly</h5>
                <a href={`mailto:${companyData.contacts.email}`}>{companyData.contacts.email}</a>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-card-text">
                <h5>Executive Hotline & WhatsApp</h5>
                <a href={`tel:${companyData.contacts.directPhone}`} style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.05rem' }}>
                  {companyData.contacts.directPhoneDisplay}
                </a>
                <span style={{ fontSize: '0.8rem', color: '#8892a0', display: 'block', marginTop: '3px' }}>
                  Main Office: <a href={`tel:${companyData.contacts.phone}`} style={{ color: 'inherit' }}>{companyData.contacts.phoneDisplay}</a>
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card-text">
                <h5>Headquarters</h5>
                <p>{companyData.location} • {companyData.reach}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="contact-card-text">
                <h5>Social Media Channels</h5>
                <p>{companyData.contacts.social}</p>
                <div className="social-links-row">
                  <a href={companyData.contacts.instagram} target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href={companyData.contacts.facebook} target="_blank" rel="noopener noreferrer" className="social-btn" title="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a href={companyData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Consultation Form */}
          <div className="contact-form-panel">
            <h3>Request a Quote or Consultation</h3>
            <p>Tell us about your upcoming project and our project management team will contact you promptly.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="clientName">Full Name *</label>
                <input
                  type="text"
                  id="clientName"
                  className="form-input"
                  placeholder="e.g. John Mwangi"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="clientEmail">Email Address *</label>
                <input
                  type="email"
                  id="clientEmail"
                  className="form-input"
                  placeholder="e.g. john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="clientPhone">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  id="clientPhone"
                  className="form-input"
                  placeholder="+254 7XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectType">Service / Project Category</label>
                <select
                  id="projectType"
                  className="form-select"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                >
                  <option value="Residential Mansion / Bungalow">Residential (Mansion, Villa, Bungalow)</option>
                  <option value="Commercial / Apartments">Commercial & Residential Apartments</option>
                  <option value="Hospitality / Resort Development">Hospitality & Resort Development</option>
                  <option value="Architectural & Interior Design Only">Architectural & Interior Design Only</option>
                  <option value="Structural & MEP Engineering">Structural & MEP Engineering</option>
                  <option value="Equipment Hire & Demolition">Equipment Hire / Demolition / Materials</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="projectLocation">Project Location / County</label>
                <input
                  type="text"
                  id="projectLocation"
                  className="form-input"
                  placeholder="e.g. Kilifi, Nairobi, Kiambu, Machakos..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="clientMessage">Project Details / Message *</label>
                <textarea
                  id="clientMessage"
                  className="form-textarea"
                  placeholder="Describe your land size, desired bedrooms, timeline, or specific requirements..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="form-submit-btn">
                Send Project Inquiry
              </button>

              {submitted && (
                <div className="form-status-msg">
                  Thank you, {submitterName}! Your project inquiry has been received. Our team will contact you within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

