import TechBadge from '../common/TechBadge.jsx';
import ProjectMeta from './ProjectMeta.jsx';

/* Engineering-archive project entry — number-led row with rules
   and metadata, not a card grid. featured gets stronger hierarchy
   via the locked .project-entry--featured rule. The case-study link
   is an internal route (text arrow); external links keep the
   data-external glyph behavior. */
export default function ProjectEntry({ project }) {
  const { id, number, title, shortDescription, status, year, type, technologies, github, demo, featured } =
    project;

  return (
    <article className={featured ? 'project-entry project-entry--featured' : 'project-entry'}>
      <span className="project-entry__number" aria-hidden="true">
        {number}
      </span>
      <div className="stack">
        <h3 className="h3">{title}</h3>
        <p className="body-sm">{shortDescription}</p>
        <ProjectMeta status={status} year={year} type={type} />
        {technologies.length > 0 ? (
          <ul className="tech-badges" aria-label={`Technologies used in ${title}`}>
            {technologies.map((tech) => (
              <li key={tech}>
                <TechBadge label={tech} />
              </li>
            ))}
          </ul>
        ) : null}
        {github || demo ? (
          <div className="cluster">
            {github ? (
              <a href={github} data-external="true" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            ) : null}
            {demo ? (
              <a href={demo} data-external="true" target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            ) : null}
          </div>
        ) : null}
        <a className="project-entry__link" href={`#/project/${id}`}>
          View case study <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
