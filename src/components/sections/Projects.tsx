import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../types';
import { projectsData } from '../../data/projectsData';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export interface ProjectsProps {
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  selectedProject,
  onSelectProject
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  const filters: { key: 'all' | ProjectCategory; label: string; count: number; desc: string }[] = [
    {
      key: 'all',
      label: 'All Landmark Projects',
      count: 12,
      desc: 'Browse all 12 premier residential, commercial, and hospitality developments engineered by Asterisks Construction across Kenya.'
    },
    {
      key: 'mansions',
      label: 'Mansions & Luxury Villas',
      count: 5,
      desc: 'Exclusive high-caliber estates (Kilifi, Thika, Kabete, Kitengela) featuring 12-bedroom coastal compounds, underground parking, and private pools.'
    },
    {
      key: 'bungalows',
      label: 'Contemporary Bungalows',
      count: 4,
      desc: 'Modern single-storey master-ensuite homes (Ruai, Syokimau, Kenol, Limuru) designed for elegant suburban living and natural ventilation.'
    },
    {
      key: 'apartments',
      label: 'Commercial & Residential Towers',
      count: 2,
      desc: 'High-density multi-floor developments (Joy Ville 15-Floor Towers, Bustani 4-Floor Complex) engineered for safety, aesthetics, and high rental yield.'
    },
    {
      key: 'resorts',
      label: 'Hospitality & Eco-Resorts',
      count: 1,
      desc: 'Comprehensive 6-acre nature getaway resort (The Crest Resort, Kitui) complete with luxury A-frame chalets, quad bike tracks, and conference suites.'
    }
  ];

  const currentFilterInfo = filters.find((f) => f.key === activeFilter) || filters[0];

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <SectionHeader
          tag="Verified Portfolio"
          title="Landmark Developments & Architectural Showcase"
          description="Explore our complete catalog of 12 landmark projects faithfully extracted from the Asterisks Construction 2026 Corporate Profile. Click any project to inspect high-resolution photos with labeled spaces."
          align="center"
        />

        {/* Clear Filter Tabs Bar */}
        <div className="project-category-filter-bar">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`project-filter-pill ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <span className="pill-title">{f.label}</span>
              <span className="pill-counter">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Active Group Description Banner */}
        <div className="project-group-banner">
          <div className="group-banner-indicator"></div>
          <div className="group-banner-text">
            <h4>{currentFilterInfo.label} ({filteredProjects.length} Projects Shown)</h4>
            <p>{currentFilterInfo.desc}</p>
          </div>
        </div>

        {/* Well-Spaced Projects Grid */}
        <div className="projects-grid-container">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => onSelectProject(p)}
            />
          ))}
        </div>

        {/* Project Expanded Modal with Labeled Spaces */}
        <ProjectModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => onSelectProject(null)}
        />
      </div>
    </section>
  );
};

export default Projects;
