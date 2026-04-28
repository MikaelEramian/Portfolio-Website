import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: ReactNode;
  eyebrow?: string;
  className?: string;
}

/**
 * Section heading with a marker-style underline that draws itself in
 * once the heading enters the viewport.
 */
const SectionHeading = ({ children, eyebrow, className }: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("mb-5", className)}>
      {eyebrow && (
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h2 className="relative inline-block font-display text-3xl font-bold text-foreground sm:text-4xl">
        <span className="relative z-10">{children}</span>
        <svg
          aria-hidden
          viewBox="0 0 200 14"
          preserveAspectRatio="none"
          className="sketchy absolute -bottom-1 left-0 h-3 w-full text-amber"
        >
          <path
            d="M2 8 C 40 2, 90 12, 140 6 S 195 4, 198 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: 260,
              strokeDashoffset: drawn ? 0 : 260,
              transition: "stroke-dashoffset 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        </svg>
      </h2>
    </div>
  );
};

export default SectionHeading;
