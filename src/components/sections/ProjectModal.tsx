import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type SpaceCategory = 'all' | 'living' | 'bedroom' | 'kitchen' | 'landscape' | 'blueprint';

interface SpaceDefinition {
  id: SpaceCategory;
  name: string;
  icon: string;
  photoLabel: string;
  description: string;
}

const spaceDefinitions: SpaceDefinition[] = [
  {
    id: 'all',
    name: 'Full Overview',
    icon: '🏛️',
    photoLabel: 'Architectural Elevation & Complete Compound',
    description: 'High-resolution composite rendering capturing the master facade, floor layout, and structural elevation.'
  },
  {
    id: 'living',
    name: 'Living Room & Lounge',
    icon: '🛋️',
    photoLabel: 'Living Room & Executive Family Lounge',
    description: 'Bespoke open-plan living room with expansive ceiling heights, ambient natural illumination, and premium porcelain tile finishes.'
  },
  {
    id: 'bedroom',
    name: 'Bedrooms & Master Suite',
    icon: '🛏️',
    photoLabel: 'Master Suite & Luxury Ensuite Bedrooms',
    description: 'Master bedroom suite engineered with private viewing balcony, walk-in designer wardrobes, and spa-grade ensuite bathrooms.'
  },
  {
    id: 'kitchen',
    name: 'Kitchen & Dining Area',
    icon: '🍳',
    photoLabel: 'Gourmet Chef Kitchen & Formal Dining',
    description: 'Modern fitted kitchen featuring custom cabinetry, granite countertops, walk-in pantry storage, and direct terrace connectivity.'
  },
  {
    id: 'landscape',
    name: 'Landscaping, Pool & Grounds',
    icon: '🌿',
    photoLabel: 'Outdoor Landscaping, Gazebo & Pool Grounds',
    description: 'Master-planned manicured perimeter lawns, resort-style swimming pool, outdoor leisure gazebo, and architectural exterior lighting.'
  },
  {
    id: 'blueprint',
    name: 'Blueprint & Engineering Specs',
    icon: '📐',
    photoLabel: 'Structural Blueprints & Cadastral Layout',
    description: 'High-precision geospatial site layout, structural seismic engineering parameters, and municipal authority compliance.'
  }
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  if (!project) return null;

  const [activeSpace, setActiveSpace] = useState<SpaceCategory>('all');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>(project.image);

  useEffect(() => {
    if (project) {
      setCurrentPhoto(project.image);
      setActiveSpace('all');
      setIsZoomed(false);
    }
  }, [project]);

  // Filter amenities relevant to the selected space
  const getSpaceAmenities = (space: SpaceCategory): string[] => {
    if (space === 'all') return project.amenities;

    const lowerKeywords: Record<SpaceCategory, string[]> = {
      all: [],
      living: ['living', 'lounge', 'dining', 'family', 'theater', 'cinema', 'study', 'office', 'library', 'porch'],
      bedroom: ['bedroom', 'master', 'suite', 'ensuite', 'closet', 'attic', 'guest'],
      kitchen: ['kitchen', 'pantry', 'dining', 'breakfast'],
      landscape: ['lawn', 'yard', 'garden', 'gazebo', 'pool', 'parking', 'perimeter', 'terrace', 'balcony', 'outdoor'],
      blueprint: ['floor', 'area', 'plot', 'water', 'generator', 'fire', 'elevator', 'security', 'cctv']
    };

    const keywords = lowerKeywords[space] || [];
    const matched = project.amenities.filter((item) =>
      keywords.some((kw) => item.toLowerCase().includes(kw))
    );

    return matched.length > 0 ? matched : project.amenities.slice(0, 4);
  };

  const currentSpaceInfo = spaceDefinitions.find((s) => s.id === activeSpace) || spaceDefinitions[0];
  const spaceAmenities = getSpaceAmenities(activeSpace);
  const allImages = [project.image, ...(project.additionalImages || [])];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="project-expanded-modal">
        {/* Modal Top Header Bar */}
        <div className="modal-top-bar">
          <div className="modal-title-group">
            <div className="modal-category-badges">
              <Badge variant="dark">Project {project.id}</Badge>
              <span className="modal-cat-tag">{project.categoryLabel}</span>
              <span className="modal-location-chip">📍 {project.location}</span>
            </div>
            <h2 className="modal-main-title">{project.title}</h2>
            <p className="modal-subtitle-text">{project.subtitle}</p>
          </div>

          <div className="modal-header-metrics">
            <div className="modal-metric-card">
              <span className="metric-title">Land Size</span>
              <span className="metric-data">{project.landSize}</span>
            </div>
            <div className="modal-metric-card">
              <span className="metric-title">Floor Area</span>
              <span className="metric-data">{project.floorArea}</span>
            </div>
          </div>
        </div>

        {/* Labeled Spaces Navigation Tabs */}
        <div className="modal-spaces-tab-bar">
          <div className="spaces-tab-label">
            <span>Labeled Spaces:</span>
          </div>
          <div className="spaces-tab-scroll">
            {spaceDefinitions.map((space) => (
              <button
                key={space.id}
                type="button"
                className={`space-nav-btn ${activeSpace === space.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSpace(space.id);
                  setIsZoomed(false);
                }}
              >
                <span className="space-btn-icon">{space.icon}</span>
                <span className="space-btn-name">{space.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* High-Resolution Photo Viewer with Labeled Overlay */}
        <div className={`modal-photo-viewer-container ${isZoomed ? 'zoomed' : ''}`}>
          <div className="modal-photo-display-frame">
            <img
              src={currentPhoto}
              alt={`${project.title} - ${currentSpaceInfo.photoLabel}`}
              className="modal-photo-img"
            />

            {/* Clear Labeled Space Overlay Tag */}
            <div className="modal-photo-label-overlay">
              <div className="label-badge-core">
                <span className="label-pulse-dot"></span>
                <span className="label-category-name">{currentSpaceInfo.icon} LABELED SPACE:</span>
                <span className="label-space-title">{currentSpaceInfo.photoLabel}</span>
              </div>
              <span className="label-watermark">Asterisks Construction • Project #{project.id}</span>
            </div>

            {/* Zoom / Fullscreen Button */}
            <button
              type="button"
              className="modal-zoom-toggle-btn"
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? 'Exit Zoom' : 'Zoom High-Resolution Photo'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {isZoomed ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </>
                )}
              </svg>
              <span>{isZoomed ? 'Reset View' : 'Zoom View'}</span>
            </button>
          </div>

          {/* Optional Extra Gallery Thumbnails if client uploaded more photos */}
          {allImages.length > 1 && (
            <div className="modal-thumbnails-strip">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPhoto(img)}
                  className={`modal-thumb-btn ${currentPhoto === img ? 'active' : ''}`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Space Detailed Specifications Card */}
        <div className="modal-space-details-card">
          <div className="space-details-header">
            <div className="space-icon-wrap">
              <span>{currentSpaceInfo.icon}</span>
            </div>
            <div className="space-header-text">
              <h4>{currentSpaceInfo.name} Specifications</h4>
              <p>{currentSpaceInfo.description}</p>
            </div>
          </div>

          <div className="space-features-grid">
            {spaceAmenities.map((feature, idx) => (
              <div className="space-feature-item" key={idx}>
                <div className="feature-check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Project Room Breakdown & Amenities */}
        <div className="modal-all-amenities-section">
          <div className="all-amenities-header">
            <h4>Complete Architectural Room List & Infrastructure ({project.amenities.length} Verified Spaces)</h4>
            <p>Every room, floor area, and utility system engineered into this development:</p>
          </div>

          <div className="all-amenities-compact-grid">
            {project.amenities.map((item, idx) => (
              <div className="amenity-chip" key={idx}>
                <span className="chip-bullet">✦</span>
                <span className="chip-text">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Direct Hotline & WhatsApp Inquiries Bar */}
        <div className="modal-footer-inquiry-bar">
          <div className="modal-footer-contact-info">
            <span className="hotline-micro-tag">Direct Project Desk & Feasibility:</span>
            <a href="tel:+254113743026" className="modal-hotline-link">
              📞 +254 113 743 026
            </a>
          </div>

          <div className="modal-footer-actions">
            <a
              href={`https://wa.me/254113743026?text=Hello%20Asterisks%20Construction,%20I%20would%20like%20to%20inquire%20about%20a%20development%20similar%20to%20${encodeURIComponent(project.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>Inquire via WhatsApp</span>
            </a>
            <a href="#contact" onClick={onClose} className="btn btn-outline" style={{ color: '#000', borderColor: '#ccc' }}>
              <span>Request Formal BOQ Quote</span>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
