import { useRef, useCallback, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * A card wrapper that renders a glowing amber border that follows the mouse.
 * The glow is a conic-gradient rotating around the card edge.
 * When the mouse leaves, the glow fades smoothly.
 */
const GlowCard = ({ children, className = "" }: GlowCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
    el.style.setProperty("--glow-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`glow-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        // Ensure CSS variables have defaults
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-opacity": "0",
      } as React.CSSProperties}
    >
      {/* The glow border effect — sits behind the card content */}
      <div
        aria-hidden
        className="glow-card-border"
      />
      {/* Actual card content */}
      <div className="glow-card-content">
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
