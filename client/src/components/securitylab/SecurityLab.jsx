import Container from '../common/Container.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import Reveal from '../common/Reveal.jsx';
import { currentlyLearning } from '../../data/journey.js';

/* Security Lab — visual framework over existing learning data
   only (currentlyLearning from journey.js). Active focus areas
   with status indicators. No papers, certs, or achievements are
   claimed — these are study focuses, labelled as such. */
export default function SecurityLab() {
  return (
    <section id="lab" className="section lab" aria-label="Security lab">
      <Container>
        <div className="section__inner">
          <Reveal>
            <SectionHeader
              centered
              index="LAB"
              kicker="Security lab"
              title="SECURITY LAB"
              lede="What I'm actively studying — focus areas, not credentials."
            />
          </Reveal>
          <ul className="lab-grid" aria-label="Active focus areas">
            {currentlyLearning.map((item, i) => (
              <Reveal as="li" key={item.slug} className="lab-card" delay={(i % 5) * 80}>
                <span className="tech-label lab-card__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="lab-card__name">{item.label}</span>
                <span className="status status--learning lab-card__status">
                  <span className="status__dot status__dot--live" aria-hidden="true" />
                  Active
                </span>
              </Reveal>
            ))}
          </ul>
          <p className="caption lab__note">Active focus — not claimed as professional expertise.</p>
        </div>
      </Container>
    </section>
  );
}
