import { useRef, useCallback, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  /** How far the element can be "pulled" in pixels. Default 6. */
  strength?: number;
  className?: string;
}

/**
 * Wraps any element with a magnetic pull effect.
 * When the cursor hovers near, the element shifts toward the cursor.
 * Smooth spring easing back to center on leave.
 */
const Magnetic = ({ children, strength = 6, className = "" }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-block",
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
