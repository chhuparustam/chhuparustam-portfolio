/* Status indicator — dot + text, never color-only.
   tone: 'live' | 'learning' | 'inactive'. */
export default function Status({ text, tone = 'live', pulse = false }) {
  const toneClass =
    tone === 'learning' ? 'status status--learning' : tone === 'inactive' ? 'status status--inactive' : 'status';
  const dotClass = pulse ? 'status__dot status__dot--live' : 'status__dot';

  return (
    <span className={toneClass}>
      <span className={dotClass} aria-hidden="true" />
      {text}
    </span>
  );
}
