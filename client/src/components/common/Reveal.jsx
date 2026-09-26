import { useEffect, useRef } from 'react';

/* Reveal — IntersectionObserver-driven section reveal. Adds
   `.is-visible` once the wrapped block enters the viewport.
   Content is visible by default without JS (see .reveal CSS).
   Optional `delay` (ms) staggers grouped cards. */
export default function Reveal({ as: Tag = 'div', className = '', children, delay = 0, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('js');
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const merged = ['reveal', className].filter(Boolean).join(' ');
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <Tag ref={ref} className={merged} style={style} {...rest}>
      {children}
    </Tag>
  );
}
