import Container from '../common/Container.jsx';
import SocialIcon from '../common/SocialIcon.jsx';
import useTypewriter from '../../lib/useTypewriter.js';
import useMagnetic from '../../lib/useMagnetic.js';
import { getActiveSocialLinks } from '../../data/socialLinks.js';

/* Hero — 55/45 cyberpunk split. Left: identity hierarchy
   (name → PYTHON DEVELOPER → typewriter → kept description →
   CTAs → verified stats → socials). Right: personal visual core —
   no photo asset exists in the repo, so the visual is a designed
   monogram identity frame (never a stock/AI person) with orbital
   rings, floating tech nodes and Python/security labels. */

const ROLES = [
  'Python Developer',
  'Cybersecurity Enthusiast',
  'Backend Builder',
  'Software Developer',
  'Problem Solver',
];

const TECH_NODES = [
  { label: 'PYTHON', className: 'float-node--d1', side: 'left' },
  { label: 'LINUX', className: 'float-node--d2', side: 'right' },
  { label: 'SECURITY', className: 'float-node--d3', side: 'down' },
  { label: 'DJANGO', className: 'float-node--d4', side: 'right' },
  { label: 'GIT', className: 'float-node--d5', side: 'left' },
  { label: 'NETWORK', className: 'float-node--d2', side: 'right' },
  { label : 'PHP', className: 'float-node--d3', side: 'up' },
  { label: 'SQL', className: 'float-node--d4', side: 'left' },
];

const STATS = [
  { value: 'BCA', label: 'Undergraduate · Final-year build' },
  { value: 'Python', label: 'Current focus' },
  { value: 'WasteGuardian', label: 'Featured project' },
];

function HeroVisual() {
  return (
    <div className="hero-visual rise rise--4" role="img" aria-label="Stylized Chhuparustam Python identity visual">
      <div className="hero-visual__orbit orbit-ring" aria-hidden="true">
        <span className="hero-visual__orbit-dot hero-visual__orbit-dot--a" />
      </div>
      <div className="hero-visual__orbit hero-visual__orbit--inner orbit-ring orbit-ring--reverse" aria-hidden="true">
        <span className="hero-visual__orbit-dot hero-visual__orbit-dot--b" />
      </div>
      <div className="hero-visual__core">
        <p className="tech-label hero-visual__kicker">CHHUPARUSTAM.KR</p>
        <p className="hero-visual__mono" aria-hidden="true">
          CR
        </p>
        <p className="hero-visual__name">Chhuparustam</p>
        <p className="tech-label hero-visual__sub">Python · Security · Build</p>
        <div className="hero-visual__status">
          <span className="status status--learning">
            <span className="status__dot status__dot--live" aria-hidden="true" />
            KTM / NPL
          </span>
          <span className="tech-label hero-visual__coords" aria-hidden="true">
            27.71°N 85.32°E
          </span>
        </div>
      </div>
      {TECH_NODES.map((node, i) => (
        <span
          key={`${node.label}-${i}`}
          aria-hidden="true"
          className={`hero-visual__node float-node ${node.className} hero-visual__node--${node.side}`}
        >
          {node.label}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const { text, reduced } = useTypewriter(ROLES);
  const magneticRef = useMagnetic();
  const socials = getActiveSocialLinks();

  return (
    <section id="home" className="section hero" aria-label="Home">
      <Container>
        <div className="hero__grid">
          <div className="hero__main">
            <p className="tech-label hero__hello rise rise--1">
              <span className="hero__hello-dot" aria-hidden="true" />
              HELLO, I&apos;M
            </p>
            <h1 className="hero__name rise rise--2">
              <span className="hero__name-line">CHHUPARUSTAM</span>
            </h1>
            <p className="hero__role-title rise rise--2" aria-label="Python Developer">
              <span className="glitch" data-text="PYTHON DEVELOPER" aria-hidden="true">
                KUMAR <span className="hero__role-title--grad">KUSHWAHA</span>
              </span>
            </p>
            <p className="hero__typewriter rise rise--3" aria-live={reduced ? 'off' : 'polite'}>
              <span className="hero__type-prefix"></span>
              <span className="hero__type-text">{text}</span>
              <span className="typewriter-cursor" aria-hidden="true" />
              <span className="hero__type-sr">Python Developer, Cybersecurity Enthusiast, Backend Builder, Software Developer, Problem Solver</span>
            </p>
            <p className="lead hero__intro rise rise--3">
              I&apos;m ChhupRustam a BCA student building practical
              software, exploring secure systems, and learning by shipping.
            </p>
            <div className="hero__ctas rise rise--4">
              <a
                ref={magneticRef}
                className="hero__cv"
                href="/cv.pdf"
                download="Chhuparustam-Kumar-Kushwaha-CV.pdf"
              >
                <span className="hero__cv-icon" aria-hidden="true">↓</span>
                Download CV
              </a>
              <a className="hero__connect" href="#contact">
                <span className="hero__connect-dot" aria-hidden="true" />
                Let&apos;s Connect
                <span className="hero__connect-arrow" aria-hidden="true">→</span>
              </a>
            </div>
            <dl className="hero__stats rise rise--5" aria-label="Highlights">
              {STATS.map((stat) => (
                <div key={stat.value} className="hero__stat">
                  <dt className="hero__stat-label">{stat.label}</dt>
                  <dd className="hero__stat-value">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="hero__socials rise rise--5" aria-label="Social links">
              {socials.map((link) => (
                <li key={link.key}>
                  <a
                    className="hero__social"
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
          <div className="hero__side">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
