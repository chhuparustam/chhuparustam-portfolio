/* Centralized tech-stack source of truth.
   No TechBadge.jsx yet (per approved scope) — this data + the
   .tech-badges / .tech-badge CSS contract are the whole phase.
   Consumers (Tech Stack section, project badges, filters, About)
   must import from here, never hardcode badge lists.
   Proficiency is internal; UI maps it via PROFICIENCY_LABELS. */

export const PROFICIENCY = {
  USED_IN_PROJECTS: 'used-in-projects',
  FAMILIAR: 'familiar',
  LEARNING: 'learning',
};

export const PROFICIENCY_LABELS = {
  [PROFICIENCY.USED_IN_PROJECTS]: 'Used in Projects',
  [PROFICIENCY.FAMILIAR]: 'Familiar',
  [PROFICIENCY.LEARNING]: 'Currently Learning',
};

export const TECH_CATEGORIES = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks / Runtimes' },
  { key: 'databases', label: 'Database' },
  { key: 'tools', label: 'Tools' },
  { key: 'cybersecurity', label: 'Cybersecurity / Learning' },
];

// Initial population only — conservative claims. `used-in-projects`
// requires project/GitHub evidence; everything else is `familiar`
// or `learning`. Correct proficiencies when project data lands.
export const techStack = {
  languages: [
    { slug: 'python', label: 'Python', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'javascript', label: 'JavaScript', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'php', label: 'PHP', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'java', label: 'Java', proficiency: PROFICIENCY.FAMILIAR },
  ],
  frameworks: [
    { slug: 'laravel', label: 'Laravel', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'react', label: 'React', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'nodejs', label: 'Node.js', proficiency: PROFICIENCY.FAMILIAR },
    { slug: 'django', label: 'Django', proficiency: PROFICIENCY.FAMILIAR },
    { slug: 'flask', label: 'Flask', proficiency: PROFICIENCY.FAMILIAR },
  ],
  databases: [
    { slug: 'mysql', label: 'MySQL', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'sqlite', label: 'SQLite', proficiency: PROFICIENCY.FAMILIAR },
  ],
  tools: [
    { slug: 'git', label: 'Git', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'github', label: 'GitHub', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'vscode', label: 'VS Code', proficiency: PROFICIENCY.USED_IN_PROJECTS },
    { slug: 'postman', label: 'Postman', proficiency: PROFICIENCY.FAMILIAR },
    { slug: 'docker', label: 'Docker', proficiency: PROFICIENCY.FAMILIAR },
  ],
  cybersecurity: [
    { slug: 'linux', label: 'Linux', proficiency: PROFICIENCY.FAMILIAR },
    { slug: 'networking', label: 'Networking', proficiency: PROFICIENCY.LEARNING },
    { slug: 'web-security', label: 'Web Security', proficiency: PROFICIENCY.LEARNING },
    { slug: 'owasp', label: 'OWASP', proficiency: PROFICIENCY.LEARNING },
    { slug: 'cybersecurity-fundamentals', label: 'Cybersecurity Fundamentals', proficiency: PROFICIENCY.LEARNING },
  ],
};
