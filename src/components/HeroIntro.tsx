import { useEffect, useState, type ReactNode } from "react";

interface HeroIntroProps {
  children: ReactNode;
  /** Which phase this element appears at (1-5) */
  phase: number;
  className?: string;
}

/**
 * Phase-based hero intro wrapper. Instead of scroll-triggered Reveal,
 * this uses a timed sequence so the hero content choreographs on load:
 *
 *   Phase 1 (0.4s) — amber dot appears with glow
 *   Phase 2 (1.0s) — "Hi, I am" text
 *   Phase 3 (1.4s) — Name
 *   Phase 4 (1.9s) — Subtitle
 *   Phase 5 (2.4s) — Social icons / scroll mouse
 */

const PHASE_TIMES = [0, 400, 1000, 1400, 1900, 2400];

const HeroIntro = ({ children, phase, className = "" }: HeroIntroProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const delay = PHASE_TIMES[phase] ?? 0;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div
      className={`hero-intro-element ${visible ? "hero-intro-visible" : "hero-intro-hidden"} ${className}`}
    >
      {children}
    </div>
  );
};

export default HeroIntro;
