import { PROFICIENCY, PROFICIENCY_LABELS } from '../../data/techStack.js';

/* Technical metadata chip — `[ Python ]`, not a SaaS tag.
   proficiency is optional; project tech renders without it. */
export default function TechBadge({ label, proficiency }) {
  const isLearning = proficiency === PROFICIENCY.LEARNING;
  const className = isLearning ? 'tech-badge tech-badge--learning' : 'tech-badge';

  if (isLearning) {
    return (
      <span className={className} aria-label={`${label} — ${PROFICIENCY_LABELS[proficiency]}`}>
        {label}
      </span>
    );
  }

  return <span className={className}>{label}</span>;
}
