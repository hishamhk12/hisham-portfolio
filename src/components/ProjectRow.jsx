import React from 'react';

function ProjectRow({ project }) {
  return (
    <article className={`project-row ${project.featured ? 'project-row-featured' : ''}`}>
      <div className="project-number">
        <span>{project.index}</span>
        {project.featured && <strong>Featured System</strong>}
      </div>

      <div className="project-content">
        <div className="project-main">
          <p className="project-subtitle">{project.subtitle}</p>
          <h3>{project.title}</h3>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="project-side">
          <div className="project-categories" aria-label={`${project.title} categories`}>
            {project.categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
          <div>
            <p className="project-focus-label">Focus areas</p>
            <ul className="project-focus-list">
              {project.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectRow;
