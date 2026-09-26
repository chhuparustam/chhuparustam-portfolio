import TechBadge from '../common/TechBadge.jsx';
import { projectPath } from '../../lib/hashRoute.js';

/* ProjectCard — technical archive entry. Renders only data-driven
   content: project ID, category, name, subtitle, description,
   stack tags, and two CTAs. Python projects get a subtle yellow
   identity accent; everything else stays purple/blue. No metrics,
   no demos, no invented content. */
export default function ProjectCard({ project }) {
  const githubLabel = project.githubLabel ?? 'GitHub';
  const cardClass =
    project.accent === 'python' ? 'project-card project-card--python' : 'project-card';

  return (
    <article className={cardClass} aria-label={`${project.title} — archive entry`}>
      <p className="tech-label project-card__id" aria-hidden="true">
        PROJECT {project.number} // {project.code}
      </p>
      <p className="tech-label project-card__category">{project.category}</p>
      <h3 className="project-card__title">
        <span className="glitch-hover" data-text={project.title} aria-hidden="true">
          {project.title}
        </span>
        <span className="sr-only">{project.title}</span>
      </h3>
      {project.subtitle ? <p className="project-card__subtitle">{project.subtitle}</p> : null}
      <p className="body-sm project-card__desc">{project.shortDescription}</p>
      {project.technologies.length > 0 ? (
        <ul className="tech-badges project-card__tech" aria-label={`Technologies used in ${project.title}`}>
          {project.technologies.map((tech) => (
            <li key={tech}>
              <TechBadge label={tech} />
            </li>
          ))}
        </ul>
      ) : null}
      <div className="project-card__actions">
        <a className="btn btn--secondary project-card__btn" href={projectPath(project.id)}>
          View Case Study <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
        {project.github ? (
          <a
            className="project-card__github link-animated"
            href={project.github}
            data-external="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            {githubLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
}
