import { useEffect, useRef } from 'react';

/* CursorGlow — very subtle blurred glow following the pointer on
   desktop. Lightweight: single fixed layer, rAF-lerped transform,
   opacity only. Disabled on touch (pointer: coarse) and under
   prefers-reduced-motion. Never intercepts clicks. */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    let visible = false;

    function onMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        node.classList.add('is-on');
      }
    }

    function onLeave() {
      visible = false;
      node.classList.remove('is-on');
    }

    function loop() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      node.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`;
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
