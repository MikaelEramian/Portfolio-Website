import { useEffect, useRef } from "react";

/**
 * A beautiful, fluid canvas-based cursor trail.
 * It uses a spring physics model to draw a continuous ribbon that tapers off
 * and collapses smoothly when the mouse stops.
 */
const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduceMotion || isTouch) return;

    let mouse = { x: width / 2, y: height / 2 };
    
    // Physics model for the trail points
    const trail: {x: number, y: number}[] = Array(40).fill({ x: mouse.x, y: mouse.y });

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Spring physics
      // The head follows the mouse closely
      trail[0] = {
        x: trail[0].x + (mouse.x - trail[0].x) * 0.6,
        y: trail[0].y + (mouse.y - trail[0].y) * 0.6
      };

      // The rest of the body follows the point ahead of it
      for (let i = 1; i < trail.length; i++) {
        trail[i] = {
          x: trail[i].x + (trail[i - 1].x - trail[i].x) * 0.45,
          y: trail[i].y + (trail[i - 1].y - trail[i].y) * 0.45
        };
      }

      // Draw the fluid trail using bezier curves
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = (trail[i].x + trail[i + 1].x) / 2;
        const yc = (trail[i].y + trail[i + 1].y) / 2;

        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        
        // Taper the thickness from head to tail
        const thickness = (1 - (i / trail.length)) * 7;
        ctx.lineWidth = thickness;
        
        // Fade out
        const alpha = (1 - (i / trail.length)) * 0.8;
        ctx.strokeStyle = `hsla(32, 95%, 60%, ${alpha})`; // Amber
        ctx.stroke();
      }

      // Draw a subtle glowing head
      ctx.beginPath();
      ctx.arc(trail[0].x, trail[0].y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(32, 95%, 65%, 1)`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `hsla(32, 95%, 60%, 0.6)`;
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[10000] sm:block hidden mix-blend-screen"
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
