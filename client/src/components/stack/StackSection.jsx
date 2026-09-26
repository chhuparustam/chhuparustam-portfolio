import Container from '../common/Container.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import TechBadge from '../common/TechBadge.jsx';
import Reveal from '../common/Reveal.jsx';
import { techStack } from '../../data/techStack.js';

/* Skill Matrix — the full documented stack regrouped into four
   technical domains. No percentages, no progress bars — grouping,
   status (dashed = studying now) and hover do the work. Every
   entry resolves from techStack.js (single source of truth);
   this file only maps slugs to domains. */

function pick(category, slugs) {
  const entries = techStack[category] ?? [];
  return slugs
    .map((slug) => entries.find((entry) => entry.slug === slug))
    .filter(Boolean);
}

const SKILL_GROUPS = [
  {
    label: 'Cybersecurity',
    entries: pick('cybersecurity', [
      'linux',
      'networking',
      'web-security',
      'owasp',
      'cybersecurity-fundamentals',
    ]),
  },
  {
    label: 'Python / Backend',
    entries: [
      ...pick('languages', ['python', 'java']),
      ...pick('frameworks', ['django', 'flask']),
    ],
  },
  {
    label: 'Web Development',
    entries: [
      ...pick('languages', ['javascript', 'php']),
      ...pick('frameworks', ['laravel', 'react', 'nodejs']),
    ],
  },
  {
    label: 'Tools / DevOps',
    entries: [
      ...pick('tools', ['git', 'github', 'docker', 'vscode', 'postman']),
      ...pick('databases', ['mysql', 'sqlite']),
    ],
  },
];

const GROUP_LABELS = {
  Cybersecurity: 'SEC // 01',
  'Python / Backend': 'PY // 02',
  'Web Development': 'WEB // 03',
  'Tools / DevOps': 'OPS // 04',
};

export default function StackSection() {
  return (
    <section id="skills" className="section stack-section" aria-label="Skills and expertise">
      <Container>
        <div className="section__inner">
          <Reveal>
            <SectionHeader
              centered
              index="02"
              kicker="Skill matrix"
              title="SKILL MATRIX"
              lede="The documented stack, grouped by domain — what I ship with, and what I'm hardening next."
            />
          </Reveal>
          <div className="stack-grid matrix-grid">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal key={group.label} className="stack-block" delay={(i % 4) * 90}>
                <div className="stack-block__head">
                  <h3 className="stack-block__label">{group.label}</h3>
                  <span className="tech-label stack-block__meta" aria-hidden="true">
                    {GROUP_LABELS[group.label]}
                  </span>
                </div>
                <p className="tech-label stack-block__count" aria-hidden="true">
                  {String(group.entries.length).padStart(2, '0')} units
                </p>
                <ul className="stack-block__chips" aria-label={group.label}>
                  {group.entries.map((entry) => (
                    <li key={entry.slug}>
                      <TechBadge label={entry.label} proficiency={entry.proficiency} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="caption stack-section__note">
            Dashed badges mark what I&apos;m studying now — not claimed as expertise.
          </p>
        </div>
      </Container>
    </section>
  );
}
