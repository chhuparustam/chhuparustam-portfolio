import SocialIcon from '../common/SocialIcon.jsx';
import { getActiveSocialLinks } from '../../data/socialLinks.js';

/* Footer — minimal polished close: CHHUPARUSTAM://PYTHON brand,
   tagline, exact social URLs from the single source of truth. */
export default function Footer() {
  const year = new Date().getFullYear();
  const socials = getActiveSocialLinks();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__brand" aria-label="Chhuparustam Python">
          CHHUPA<span className="site-footer__brand-dim">RUSTAM</span>
          <span className="nav-brand__py" aria-hidden="true">
            ://PYTHON
          </span>
        </p>
        <p className="site-footer__tag">Python Developer × Cybersecurity Enthusiast</p>
        <p className="site-footer__status">
          <span className="status__dot status__dot--live" aria-hidden="true" />
          <span>OPEN TO OPPORTUNITIES</span>
          <span className="site-footer__status-sep" aria-hidden="true">·</span>
          <span>KTM 27.71°N 85.32°E</span>
        </p>
        {socials.length > 0 ? (
          <ul className="site-footer__socials" aria-label="Social links">
            {socials.map((link) => (
              <li key={link.key}>
                <a
                  className="site-footer__link link-animated"
                  href={link.href}
                  aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
                  {...(link.external
                    ? {
                        'data-external': 'true',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {})}
                >
                  <SocialIcon name={link.icon} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="site-footer__meta">
          <p className="caption">© {year} · Kathmandu, Nepal</p>
          <p className="caption">Built with React + Vite · Vanilla CSS</p>
        </div>
      </div>
    </footer>
  );
}
