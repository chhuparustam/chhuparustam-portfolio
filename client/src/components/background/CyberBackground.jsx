import { useEffect, useMemo, useState } from 'react';
import './CyberBackground.css';

/* CyberBackground — sophisticated fixed cyberpunk atmosphere:
   subtle grid, soft purple/blue radial glows, blurred orbs, and a
   small field of drifting dot particles. Decorative only
   (aria-hidden). Particle motion is CSS-driven and disabled under
   prefers-reduced-motion. */

const PARTICLE_COUNT = 42;

function buildParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: (i * 37.7 + 11) % 100,
    top: (i * 53.3 + 7) % 100,
    size: 1 + ((i * 7) % 3),
    delay: -((i * 1.37) % 7),
    duration: 6 + ((i * 13) % 5),
    blue: i % 3 === 0,
  }));
}

export default function CyberBackground() {
  const particles = useMemo(() => buildParticles(), []);
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    function onChange(event) {
      setReduced(event.matches);
    }
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="cyber-bg" aria-hidden="true">
      <div className="cyber-bg__grid" />
      <div className="cyber-bg__glow cyber-bg__glow--purple" />
      <div className="cyber-bg__glow cyber-bg__glow--blue" />
      <div className="cyber-bg__orb cyber-bg__orb--one" />
      <div className="cyber-bg__orb cyber-bg__orb--two" />
      <div className="cyber-bg__orb cyber-bg__orb--three" />
      <div className="fx-scanlines" />
      <div className="fx-vignette" />
      {reduced ? null : (
        <div className="cyber-bg__particles">
          {particles.map((p) => (
            <span
              key={p.id}
              className={p.blue ? 'cyber-particle cyber-particle--blue' : 'cyber-particle'}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
