import React from 'react';
import { experienceEntries } from '../data/experience.js';

function ExperienceTimeline() {
  return (
    <div className="experience-timeline">
      {experienceEntries.map((entry) => (
        <article key={`${entry.period}-${entry.company}`} className="experience-row">
          <div className="experience-period">{entry.period}</div>
          <div className="experience-role">
            <h3>{entry.company}</h3>
            <p>{entry.role}</p>
          </div>
          <div className="experience-detail">
            <p>{entry.description}</p>
            <ul className="experience-tags" aria-label={`${entry.company} key areas`}>
              {entry.keyAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ExperienceTimeline;
