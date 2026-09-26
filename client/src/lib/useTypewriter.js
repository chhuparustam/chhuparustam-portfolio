import { useEffect, useState } from 'react';

/* Typewriter — types each phrase character by character, pauses,
   deletes, then types the next. Respects prefers-reduced-motion by
   rendering the first phrase statically (no animation). */

const TYPE_MS = 70;
const DELETE_MS = 32;
const HOLD_MS = 1600;
const START_DELAY_MS = 500;

export default function useTypewriter(phrases) {
  const first = phrases[0] ?? '';
  const [text, setText] = useState(first);
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

  useEffect(() => {
    if (reduced) return undefined;
    let phraseIndex = 0;
    let charIndex = phrases[0] ? phrases[0].length : 0;
    let deleting = true;
    let timer = 0;
    let cancelled = false;

    // Start from the full first phrase, hold, then cycle.

    function tick() {
      if (cancelled) return;
      const current = phrases[phraseIndex] ?? '';
      if (!deleting) {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          deleting = true;
          timer = window.setTimeout(tick, HOLD_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPE_MS);
        return;
      }
      charIndex -= 1;
      setText(current.slice(0, Math.max(charIndex, 0)));
      if (charIndex <= 0) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        deleting = false;
        timer = window.setTimeout(tick, 320);
        return;
      }
      timer = window.setTimeout(tick, DELETE_MS);
    }

    timer = window.setTimeout(tick, HOLD_MS + START_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced, phrases]);

  return { text, reduced };
}
