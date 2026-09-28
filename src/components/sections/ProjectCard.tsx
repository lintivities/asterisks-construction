import React from 'react';
import { Project } from '../../types';
import { Badge } from '../common/Badge';

export interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  // Extract key highlighted spaces for preview
  const previewHighlights = project.amenities.slice(0, 3);

  return (
    <div className="project-card digital-project-card" data-category={project.category}>
      <div className="project-card-media-wrap">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="project-card-img"
        />
        <div className="project-card-badges-top">
          <Badge variant="dark">Project {project.id}</Badge>
          <Badge variant="light">{project.categoryLabel}</Badge>
        </div>
        <div className="project-card-location-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{project.location}</span>
        </div>
      </div>

      <div className="project-card-body-content">
        <h3 className="project-card-heading">{project.title}</h3>
        <p className="project-card-summary">{project.summary}</p>

        <div className="project-card-specs-row">
          <div className="spec-metric-chip">
            <span className="spec-label">Land Parcel</span>
            <span className="spec-val">{project.landSize}</span>
          </div>
          <div className="spec-metric-chip">
            <span className="spec-label">Floor Area</span>
            <span className="spec-val">{project.floorArea}</span>
          </div>
        </div>

        <div className="project-spaces-preview-chips">
          {previewHighlights.map((highlight, idx) => (
            <span className="space-chip" key={idx}>
              ✦ {highlight}
            </span>
          ))}
          {project.amenities.length > 3 && (
            <span className="space-chip more-chip">
              +{project.amenities.length - 3} More Spaces
            </span>
          )}
        </div>

        <div className="project-card-action-bar">
          <button
            type="button"
            className="project-inspect-btn"
            onClick={() => onOpenDetails(project)}
          >
            <span>Inspect Project & Labeled Spaces</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
