/*
  MERIDIAN PRECISION — scroll reveal: adds .is-visible to .reveal elements.
  14px rise, 500ms ease-out, staggered by CSS. Honors prefers-reduced-motion via CSS.
*/
import { useEffect } from "react";
import { useLocation } from "wouter";

export function useReveal() {
  const [location] = useLocation();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            target.style.transitionDelay = `${Math.min((i % 4) * 60, 180)}ms`;
            target.classList.add("is-visible");
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location]);
}
