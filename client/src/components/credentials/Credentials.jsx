import Container from '../common/Container.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import Reveal from '../common/Reveal.jsx';
import { training } from '../../data/journey.js';

/* Credentials — real training records only (training from
   journey.js). Undated items show their kind (Training), never a
   fake year. No invented certificate names or achievements. */
export default function Credentials() {
  if (training.length === 0) return null;

  return (
    <section id="credentials" className="section credentials" aria-label="Credentials">
      <Container>
        <div className="section__inner">
          <Reveal>
            <SectionHeader
              centered
              index="REC"
              kicker="Credentials"
              title="CREDENTIALS"
              lede="Verified training records — nothing more, nothing less."
            />
          </Reveal>
          <ul className="credentials-grid" aria-label="Training records">
            {training.map((item, i) => (
              <Reveal as="li" key={item.id} className="credential-card" delay={i * 90}>
                <span className="tech-label credential-card__index" aria-hidden="true">
                  C-{String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="credential-card__title">{item.title}</h3>
                <p className="body-sm credential-card__org">{item.organizer}</p>
                <p className="tech-label credential-card__kind">
                  Training{item.year ? ` — ${item.year}` : ' record'}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
