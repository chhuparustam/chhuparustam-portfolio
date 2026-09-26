import Container from '../common/Container.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import SocialIcon from '../common/SocialIcon.jsx';
import Reveal from '../common/Reveal.jsx';
import ContactForm from './ContactForm.jsx';
import { getActiveSocialLinks, socialLinks } from '../../data/socialLinks.js';

/* Contact — strong final CTA, direct channels from the
   centralized socialLinks data, then the request form
   (POST /api/contact, logic untouched). */
export default function ContactPreview() {
  const activeHrefs = new Map(getActiveSocialLinks().map((link) => [link.key, link]));

  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <Container>
        <div className="section__inner">
          <Reveal>
            <SectionHeader
              centered
              index="05"
              kicker="Contact"
              title="LET'S BUILD SOMETHING USEFUL."
              lede="Open to learning opportunities, collaborations, and honest feedback on my work."
            />
          </Reveal>
          <div className="grid-12 contact__grid">
            <Reveal className="span-5 contact__channels">
              <ul className="contact__list">
                {socialLinks.map((channel) => {
                  const active = activeHrefs.get(channel.key);
                  return (
                    <li key={channel.key} className="contact__row">
                      <span className="tech-label">{channel.label}</span>
                      {active ? (
                        <a
                          className="contact__link"
                          href={active.href}
                          {...(active.external
                            ? {
                                'data-external': 'true',
                                target: '_blank',
                                rel: 'noopener noreferrer',
                              }
                            : {})}
                        >
                          <SocialIcon name={active.icon} />
                          <span className="contact__text">{active.text}</span>
                        </a>
                      ) : (
                        <span className="contact__pending">Not published yet</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="caption">
                Requests are validated and emailed to the site owner — nothing is stored.
              </p>
            </Reveal>
            <Reveal className="span-7">
              <div className="contact__form-panel">
                <h3 className="contact__form-title">Send a request</h3>
                <p className="body-sm contact__form-note">
                  Prefer email? Write directly — otherwise use the form and I&apos;ll get back to you.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
