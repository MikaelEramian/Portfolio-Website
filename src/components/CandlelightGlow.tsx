import { useEffect, useRef } from "react";

/**
 * Full-screen overlay that creates a "reading by candlelight" effect.
 * 
 * - A soft dark vignette was removed to keep the site light.
 * - A warm amber radial glow follows the cursor, "illuminating" the area
 *   around it like a lantern held over a dark sketchbook.
 * - The glow gently flickers via subtle opacity/scale oscillation.
 * - On mobile (no mouse), the effect disables itself gracefully.
 */
const CandlelightGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const visible = useRef(false);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Check for touch-only devices — bail early
    const mq = window.matchMedia("(hover: hover)");
    if (!mq.matches) return;

    // Flicker state
    let flickerPhase = 0;

    // Smooth follow loop — glow lags slightly behind cursor for organic feel
    const animate = () => {
      const lerp = 0.1;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;

      // Subtle candle flicker — slight scale and opacity oscillation
      flickerPhase += 0.02;
      const flicker = 1 + Math.sin(flickerPhase * 2.3) * 0.03 + Math.sin(flickerPhase * 5.1) * 0.02;
      const flickerOpacity = 0.9 + Math.sin(flickerPhase * 3.7) * 0.1;

      glow.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(${flicker})`;
      glow.style.opacity = visible.current ? String(flickerOpacity) : "0";

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half glow size so the glow centers on cursor
      mousePos.current.x = e.clientX - 350;
      mousePos.current.y = e.clientY - 350;

      if (!visible.current) {
        visible.current = true;
      }
    };

    const handleMouseLeave = () => {
      visible.current = false;
    };

    rafRef.current = requestAnimationFrame(animate);
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="candlelight-glow"
    />
  );
};

export default CandlelightGlow;
