import Container from '../common/Container.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import TechBadge from '../common/TechBadge.jsx';
import ProjectMeta from './ProjectMeta.jsx';
import ProjectCard from './ProjectCard.jsx';
import Reveal from '../common/Reveal.jsx';
import { getArchiveProjects, getFeaturedProjects } from '../../data/projects.js';
import { projectPath } from '../../lib/hashRoute.js';

/* Project Archive — WasteGuardian stays the featured/highlighted
   build (implementation untouched); below it an archive index
   grids all real projects (01 WasteGuardian, 02 MausamHub,
   03 FitNova). No placeholders, no metrics, no fake demos. */

const ROLE_MAP = ['User', 'Admin', 'Driver', 'Worker'];
const SYSTEM_MAP = ['Pickup', 'Requests', 'Services', 'Complaints', 'Payments'];

export default function FeaturedProject() {
  const featured = getFeaturedProjects();
  const archive = getArchiveProjects();
  const project = featured[0];

  if (!project) return null;

  const archiveId = `WG-${project.number ?? '01'}`;

  return (
    <section id="projects" className="section work" aria-label="Project archive">
      <Container>
        <div className="section__inner">
          <Reveal>
            <SectionHeader
              centered
              index="03"
              kicker="Project archive"
              title="PROJECT ARCHIVE"
              lede="Three real builds, documented honestly — no placeholders, no fake metrics."
            />
          </Reveal>
          <Reveal>
            <article className="feature" aria-label={`${project.title} — featured project`}>
              <div className="feature__info">
                <p className="tech-label feature__eyebrow">
                  <span className="status__dot status__dot--live" aria-hidden="true" />
                  ARCHIVE // {archiveId} — {project.status}
                </p>
                <h3 className="feature__title">
                  <span className="glitch-hover" data-text={project.title} aria-hidden="true">
                    {project.title}
                  </span>
                  <span className="sr-only">{project.title}</span>
                </h3>
                {project.subtitle ? (
                  <p className="feature__subtitle">{project.subtitle}</p>
                ) : null}
                <ProjectMeta status={project.status} year={project.year} type={project.type} />
                <p className="body feature__desc">{project.shortDescription}</p>
                {project.technologies.length > 0 ? (
                  <ul className="tech-badges feature__tech" aria-label={`Technologies used in ${project.title}`}>
                    {project.technologies.map((tech) => (
                      <li key={tech}>
                        <TechBadge label={tech} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="feature__actions">
                  <a className="btn btn--primary" href={projectPath(project.id)}>
                    View case study <span className="btn__arrow" aria-hidden="true">→</span>
                  </a>
                  {project.github ? (
                    <a
                      className="btn btn--secondary"
                      href={project.github}
                      data-external="true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
              <a
                className="feature__visual"
                href={projectPath(project.id)}
                aria-label={`${project.title} case study — project snapshot`}
              >
                <div className="snapshot">
                  <div className="snapshot__head">
                    <span className="tech-label">Project snapshot</span>
                    <span className="tech-label snapshot__head-right" aria-hidden="true">
                      System overview
                    </span>
                  </div>
                  <div className="snapshot__body">
                    <div className="snapshot__col">
                      <p className="tech-label snapshot__label">Roles</p>
                      <ul className="snapshot__roles">
                        {ROLE_MAP.map((role, i) => (
                          <li key={role} className="snapshot__role">
                            <span className="snapshot__role-index" aria-hidden="true">
                              0{i + 1}
                            </span>
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="snapshot__spine" aria-hidden="true">
                      <span className="snapshot__node" />
                      <span className="snapshot__node" />
                      <span className="snapshot__node" />
                      <span className="snapshot__node" />
                    </div>
                    <div className="snapshot__col">
                      <p className="tech-label snapshot__label">System</p>
                      <ul className="snapshot__sys">
                        {SYSTEM_MAP.map((sys) => (
                          <li key={sys} className="snapshot__chip">
                            {sys}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="snapshot__foot">Visual summary — not an architecture diagram.</p>
                </div>
              </a>
            </article>
          </Reveal>
          <p className="caption work__note">Real builds only — this archive grows as I ship.</p>
          <Reveal>
            <div className="archive-index">
              <p className="tech-label archive-index__label" aria-hidden="true">
                ARCHIVE INDEX — {String(archive.length).padStart(2, '0')} ENTRIES
              </p>
              <div className="archive-grid">
                {archive.map((entry, i) => (
                  <Reveal key={entry.id} delay={(i % 3) * 90}>
                    <ProjectCard project={entry} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
