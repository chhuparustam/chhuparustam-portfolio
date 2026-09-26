import { useEffect, useState } from 'react';
import { profile } from '../../data/socialLinks.js';

/* Floating cyberpunk nav — rounded translucent pill with thin
   purple/blue border, backdrop blur, active purple/blue highlight,
   smooth-scroll links. Scroll compacts it; mobile uses an
   accessible hamburger + slide/fade panel (Escape closes, body
   scroll locked while open). */

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];

function GithubGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="cybernav__icon"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open ]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-38% 0px -55% 0px', threshold: 0 },
    );
    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={scrolled ? 'cybernav cybernav--scrolled' : 'cybernav'}>
      <div className="container cybernav__wrap">
        <div className="cybernav__pill">
          <a className="nav-brand cybernav__brand" href="#home" aria-label="Chhuparustam — home">
            CHHUPA<span className="nav-brand__accent">RUSTAM</span>
            <span className="nav-brand__py" aria-hidden="true">
              .KR
            </span>
          </a>
          <nav aria-label="Primary">
            <ul className="cybernav__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    className={active === item.href.slice(1) ? 'nav-link is-active' : 'nav-link'}
                    href={item.href}
                    {...(active === item.href.slice(1) ? { 'aria-current': 'page' } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="cybernav__actions">
            <a
              className="cybernav__github"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <GithubGlyph />
              <span className="cybernav__github-text">GitHub</span>
            </a>
            <button
              type="button"
              className="cybernav__toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={open ? 'cybernav__bars is-open' : 'cybernav__bars'} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        {open ? (
          <nav id="mobile-nav" className="cybernav__mobile" aria-label="Mobile">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    className={
                      active === item.href.slice(1)
                        ? 'cybernav__mlink is-active'
                        : 'cybernav__mlink'
                    }
                    href={item.href}
                    onClick={() => setOpen(false)}
                    {...(active === item.href.slice(1) ? { 'aria-current': 'page' } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  className="cybernav__mlink cybernav__mlink--github"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <GithubGlyph /> GitHub
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
