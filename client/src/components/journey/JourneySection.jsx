import Container from '../common/Container.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import TechBadge from '../common/TechBadge.jsx';
import Status from '../common/Status.jsx';
import Reveal from '../common/Reveal.jsx';
import { PROFICIENCY } from '../../data/techStack.js';
import { currentlyLearning, training } from '../../data/journey.js';

/* Experience Log — MY JOURNEY timeline as a technical log.
   Verified records only: BCA studies, KMC SEEP MELA training,
   and the current-learning list. No invented dates, roles, or
   employers. The active node glows; past nodes read LOGGED. */
export default function JourneySection() {
  return (
    <section id="journey" className="section journey" aria-label="Experience log">
      <Container>
        <div className="section__inner">
          <Reveal>
            <SectionHeader
              centered
              index="04"
              kicker="Experience log"
              title="EXPERIENCE LOG"
              lede="Training so far, and what I'm studying now — kept separate from project-used skills."
            />
          </Reveal>
          <ol className="timeline">
            <Reveal as="li" className="timeline__item">
              <span className="timeline__dot" aria-hidden="true" />
              <div className="timeline__content">
                <p className="tech-label timeline__time">
                  Studies — BCA
                  <span className="timeline__status" aria-hidden="true"> · LOGGED</span>
                </p>
                <h3 className="timeline__title">BCA Undergraduate</h3>
                <p className="body-sm timeline__meta">Final-year project — WasteGuardian · Smart waste management web app</p>
              </div>
            </Reveal>
            {training.map((item) => (
              <Reveal as="li" key={item.id} className="timeline__item">
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__content">
                  <p className="tech-label timeline__time">
                    Training{item.year ? ` — ${item.year}` : ''}
                    <span className="timeline__status" aria-hidden="true"> · LOGGED</span>
                  </p>
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="body-sm timeline__meta">{item.organizer}</p>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" className="timeline__item timeline__item--now">
              <span className="timeline__dot timeline__dot--now" aria-hidden="true" />
              <div className="timeline__content">
                <p className="tech-label timeline__time timeline__time--now">
                  <Status text="Currently" tone="learning" />
                  <span className="timeline__status timeline__status--active" aria-hidden="true">
                    {' '}· ACTIVE
                  </span>
                </p>
                <h3 className="timeline__title">Studying now</h3>
                <ul className="tech-badges" aria-label="Currently learning">
                  {currentlyLearning.map((item) => (
                    <li key={item.slug}>
                      <TechBadge label={item.label} proficiency={PROFICIENCY.LEARNING} />
                    </li>
                  ))}
                </ul>
                <p className="caption">Studying now — not claimed as professional expertise.</p>
              </div>
            </Reveal>
          </ol>
        </div>
      </Container>
    </section>
  );
}
