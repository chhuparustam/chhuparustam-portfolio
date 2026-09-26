import { useEffect } from 'react';
import Container from '../components/common/Container.jsx';
import TechBadge from '../components/common/TechBadge.jsx';
import ProjectMeta from '../components/projects/ProjectMeta.jsx';
import ProjectCaseStudy from '../components/projects/ProjectCaseStudy.jsx';

/* Project detail — premium case-study page.
   Hierarchy: title → summary → facts → narrative stages.
   Data-driven; unknown ids render an honest not-found state. */
export default function ProjectDetail({ project }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project?.id]);

  if (!project) {
    return (
      <section className="section" aria-label="Project not found">
        <Container>
          <div className="section__inner">
            <p className="tech-label">03 — Projects</p>
            <p className="body">This project doesn&apos;t exist in the archive.</p>
            <a href="#projects">← All projects</a>
          </div>
        </Container>
      </section>
    );
  }

  const { number, title, subtitle, shortDescription, status, year, type, technologies, github, githubLabel, demo, caseStudy } =
    project;
  const sourceLabel = githubLabel ?? 'GitHub';

  return (
    <>
      <section className="section project-hero" aria-label={title}>
        <Container>
          <div className="section__inner">
            <a className="project-hero__back link-animated" href="#projects">
              <span aria-hidden="true">←</span> All projects
            </a>
            <div className="project-hero__head">
              <p className="tech-label project-hero__eyebrow">
                Case study / {number} — {type}
              </p>
              <h1 className="display display--sm project-hero__title">{title}</h1>
              {subtitle ? <p className="project-hero__subtitle">{subtitle}</p> : null}
              <p className="lead project-hero__summary">{shortDescription}</p>
            </div>
            <div className="project-hero__facts">
              <ProjectMeta status={status} year={year} type={type} />
              <div className="project-hero__links">
                {github ? (
                  <a
                    className="btn btn--secondary"
                    href={github}
                    data-external="true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sourceLabel}
                  </a>
                ) : null}
                {demo ? (
                  <a
                    className="btn btn--secondary"
                    href={demo}
                    data-external="true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                ) : null}
              </div>
            </div>
            {technologies.length > 0 ? (
              <div className="project-hero__stack">
                <p className="tech-label">Technology</p>
                <ul className="tech-badges" aria-label={`Technologies used in ${title}`}>
                  {technologies.map((tech) => (
                    <li key={tech}>
                      <TechBadge label={tech} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
      <section className="section project-body" aria-label={`${title} case study`}>
        <Container>
          <div className="section__inner">
            <ProjectCaseStudy caseStudy={caseStudy} projectTitle={title} />
          </div>
        </Container>
      </section>
    </>
  );
}
