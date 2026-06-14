import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  /** Stagger delay in ms. */
  delay?: number;
};

const variantClass: Record<NonNullable<RevealProps["variant"]>, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

/**
 * Scroll-reveal wrapper. The hidden state is applied via JS and only to elements
 * that start below the fold, so server-rendered / no-JS content is always visible
 * and there's no above-the-fold flash. Respects prefers-reduced-motion.
 */
export function Reveal({ children, className = "", variant = "up", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return; // stay visible, no motion

    // Already on screen at load → leave it visible (no hide/flash, no animation).
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variantClass[variant]} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
