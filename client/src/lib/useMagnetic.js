import { useEffect, useRef } from 'react';

/* useMagnetic — slight magnetic pull for primary CTAs. Translates
   the element a few px toward the pointer, springs back on leave.
   Transform-only, desktop pointers only, inert under
   prefers-reduced-motion. Returns a ref to spread onto the target. */
const PULL = 5;

export default function useMagnetic() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    function onMove(event) {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));
      node.style.transform = `translate(${(nx * PULL).toFixed(1)}px, ${(ny * PULL).toFixed(1)}px)`;
    }

    function onLeave() {
      node.style.transform = '';
    }

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return ref;
}
