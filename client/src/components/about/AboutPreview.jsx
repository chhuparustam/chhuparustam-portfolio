import Container from '../common/Container.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import SocialIcon from '../common/SocialIcon.jsx';
import Reveal from '../common/Reveal.jsx';
import { profile, socialLinks } from '../../data/socialLinks.js';

/* About — cybersecurity-inspired identity layout. LEFT: large
   PROFILE://IDENTITY card reusing the existing monogram personal
   visual (no photo asset exists in the repo; never a stock or
   AI-generated person). CENTER: decorative connection rail.
   RIGHT: three stacked info cards built from the existing About
   prose — no filler, no invented facts. */

const PROFILE_SOCIALS = ['github', 'linkedin', 'instagram', 'email'];

const META_ROWS = [
  { key: 'EMAIL', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { key: 'PHONE', value: profile.phone, href: `tel:${profile.phone}`, external: false },
  { key: 'EDUCATION', value: 'BCA Undergraduate', href: null, external: false },
  { key: 'LOCATION', value: 'Kathmandu, Nepal', href: null, external: false },
];

const INFO_CARDS = [
  {
    index: '01',
    tag: 'DEV // BUILD',
    title: 'DEVELOPER',
    body: 'I\u2019m a BCA student based in Kathmandu, focused on Python development and practical web projects. My final-year project, WasteGuardian, is a waste-management web application built with PHP, Laravel, MySQL, Stripe, Khalti, and chart-based analytics.',
  },
  {
    index: '02',
    tag: 'SEC // HARDEN',
    title: 'CYBERSECURITY',
    body: 'Alongside coursework I study cybersecurity fundamentals Linux, networking, and web security. ',
  },
  {
    index: '03',
    tag: 'PY // ENGINEER',
    title: 'PYTHON / ENGINEERING',
    body: 'Python is my current focus. I keep building with Django and React, prefer simple readable systems, and learn by shipping practical real-world projects.',
  },
];

function ProfileCard() {
  const socials = socialLinks.filter((link) => PROFILE_SOCIALS.includes(link.key));

  return (
    <div className="profile-card">
      <div className="profile-card__head" aria-hidden="true">
        <span className="profile-card__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="tech-label profile-card__frame">PROFILE://IDENTITY</span>
      </div>
      <div className="profile-card__visual">
        <div className="profile-card__orbit orbit-ring" aria-hidden="true">
          <span className="profile-card__orbit-dot" />
        </div>
        <div className="profile-card__medallion" role="img" aria-label="Chhuparustam personal monogram">
          CR
        </div>
      </div>
      <p className="profile-card__name">
        CHHUPARUSTAM KUMAR
        <span className="profile-card__name-line">KUSHWAHA</span>
      </p>
      <p className="profile-card__roles">
        <span className="profile-card__role">Python Developer</span>
        <span className="profile-card__role">Cybersecurity Enthusiast</span>

      </p>
      <dl className="profile-card__meta" aria-label="Personal details">
        {META_ROWS.map((row) => (
          <div key={row.key} className="profile-card__row">
            <dt>{row.key}</dt>
            <dd>
              {row.href ? (
                <a
                  className="profile-card__link"
                  href={row.href}
                  {...(row.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
      <ul className="profile-card__socials" aria-label="Social links">
        {socials.map((link) => (
          <li key={link.key}>
            <a
              className="profile-card__social"
              href={link.href}
              aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
              {...(link.external
                ? { 'data-external': 'true', target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <SocialIcon name={link.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPreview() {
  return (
    <section id="about" className="section about" aria-label="About">
      <Container>
        <div className="section__inner">
          <Reveal>
            <SectionHeader
              centered
              index="01"
              kicker=" About"
              title="ABOUT_ME"
              lede="BCA student in Kathmandu — Python, web projects, and security fundamentals."
              glitch
            />
          </Reveal>
          <div className="about-redesign__grid">
            <Reveal className="about-redesign__left">
              <ProfileCard />
            </Reveal>
            <div className="about-rail" aria-hidden="true">
              <span className="about-rail__line" />
              <span className="about-rail__node" />
              <span className="about-rail__node about-rail__node--mid" />
              <span className="about-rail__node about-rail__node--low" />
            </div>
            <div className="about-redesign__right">
              {INFO_CARDS.map((card, i) => (
                <Reveal key={card.index} className="info-card" delay={i * 110}>
                  <div className="info-card__head">
                    <span className="tech-label info-card__index" aria-hidden="true">
                      {card.index}
                    </span>
                    <span className="tech-label info-card__tag">{card.tag}</span>
                  </div>
                  <h3 className="info-card__title">{card.title}</h3>
                  <p className="body info-card__body">{card.body}</p>
                </Reveal>
              ))}
              <Reveal delay={330}>
                <a className="about__more link-animated" href="#journey">
                  More about my journey <span aria-hidden="true">→</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
