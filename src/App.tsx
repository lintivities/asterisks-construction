import React, { useState } from 'react';
import { Project } from './types';
import { projectsData } from './data/projectsData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { VisionObs } from './components/sections/VisionObs';
import { Projects } from './components/sections/Projects';
import { Team } from './components/sections/Team';
import { Contact } from './components/sections/Contact';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="site-wrapper digital-modern-theme">
      <Navbar />

      <main className="main-content">
        <Hero
          featuredProject={projectsData[0]}
          onSelectProject={(p) => setSelectedProject(p)}
        />
        
        <About />
        
        <Services />
        
        <VisionObs />
        
        <Projects
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />
        
        <Team />
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
