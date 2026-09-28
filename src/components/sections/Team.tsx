import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { teamData } from '../../data/teamData';

export const Team: React.FC = () => {
  return (
    <section className="team-section" id="team">
      <div className="container">
        <SectionHeader
          tag="Key Personnel"
          title="Leadership & Technical Directors"
          description="A specialized multidisciplinary team of licensed civil engineers, architects, quantity surveyors, environmentalists, and legal counsel driving Asterisks Construction's operations across Africa."
          align="center"
        />

        <div className="team-grid compact-team-grid">
          {teamData.map((member) => (
            <div className="team-card compact-team-card" key={member.id}>
              <div className="team-avatar-wrap">
                <img src={member.image} alt={`${member.name} - ${member.role}`} loading="lazy" />
                <div className="team-avatar-ring"></div>
              </div>
              <div className="team-info compact-team-info">
                <h4 className="compact-team-name">{member.name}</h4>
                <p className="compact-team-role">{member.role}</p>
                <p className="compact-team-dept">{member.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
