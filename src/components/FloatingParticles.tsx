import { useEffect, useRef } from "react";

const COLORS = [
  { r: 245, g: 158, b: 11 },   // amber
  { r: 224, g: 122, b: 95 },   // terracotta
];

interface Fairy {
  baseX: number;
  baseY: number;
  time: number;
  speed1: number;
  speed2: number;
  speed3: number;
  radiusX: number;
  radiusY: number;
  thickness: number;
  numSegments: number;
  color: { r: number, g: number, b: number };
  points: { x: number, y: number }[];
}

/**
 * Autonomous "fairies" (wisps of light) that wander around the gutters.
 * They leave a beautiful, fluid, tapering ribbon tail EXACTLY like the mouse cursor,
 * creating a magical, living atmosphere perfectly cohesive with the cursor.
 */
const FloatingParticles = () => {
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
    if (reduceMotion) return;

    const fairies: Fairy[] = [];
    // 12 fairies (6 per side) ensures it looks magical without being cluttered
    const numFairies = 12; 

    for (let i = 0; i < numFairies; i++) {
      const isLeft = Math.random() > 0.5;
      // Anchor them in the outer gutters
      const baseX = isLeft ? Math.random() * (width * 0.15) : width - Math.random() * (width * 0.15);
      const baseY = Math.random() * height;
      const numSegments = Math.floor(Math.random() * 20) + 25; // Long, sweeping elegant tails (25-45 points)
      
      fairies.push({
        baseX,
        baseY,
        time: Math.random() * 1000,
        // Extremely slow, controlled, majestic swooping
        speed1: (Math.random() * 0.002) + 0.001, // X wobble speed
        speed2: (Math.random() * 0.002) + 0.001, // Y wobble speed
        speed3: (Math.random() * 0.002) + 0.001, // Y secondary wobble
        radiusX: Math.random() * 70 + 40, // majestic swoop radius X
        radiusY: Math.random() * 120 + 60, // majestic swoop radius Y
        thickness: Math.random() * 2 + 1.5, // slightly thinner than cursor
        numSegments,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        points: Array.from({ length: numSegments }, () => ({ x: baseX, y: baseY }))
      });
    }

    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      fairies.forEach(f => {
        f.time += 1;
        
        // Complex Lissajous curve for magical wandering fairy flight
        // We add a slow global upward drift to baseY so they eventually cycle the screen
        f.baseY -= 0.3;
        
        let didWrap = false;
        // Increase the buffer so they fully disappear before wrapping
        if (f.baseY < -300) {
          f.baseY = height + 300;
          didWrap = true;
        }

        const targetX = f.baseX + Math.sin(f.time * f.speed1) * f.radiusX;
        const targetY = f.baseY + Math.cos(f.time * f.speed2) * Math.sin(f.time * f.speed3) * f.radiusY;

        if (didWrap) {
          // Instantly snap all tail points to the new hidden location so they don't streak across the screen
          f.points = Array.from({ length: f.numSegments }, () => ({ x: targetX, y: targetY }));
        }

        // Spring physics for the fairy tail (identical to mouse trail)
        f.points[0] = {
          x: f.points[0].x + (targetX - f.points[0].x) * 0.3,
          y: f.points[0].y + (targetY - f.points[0].y) * 0.3
        };

        for (let i = 1; i < f.numSegments; i++) {
          f.points[i] = {
            x: f.points[i].x + (f.points[i - 1].x - f.points[i].x) * 0.45,
            y: f.points[i].y + (f.points[i - 1].y - f.points[i].y) * 0.45
          };
        }

        // Draw the fluid tail using bezier curves
        for (let i = 1; i < f.numSegments - 1; i++) {
          const xc = (f.points[i].x + f.points[i + 1].x) / 2;
          const yc = (f.points[i].y + f.points[i + 1].y) / 2;

          ctx.beginPath();
          ctx.moveTo(f.points[i - 1].x, f.points[i - 1].y);
          ctx.quadraticCurveTo(f.points[i].x, f.points[i].y, xc, yc);
          
          const progress = 1 - (i / f.numSegments);
          ctx.lineWidth = progress * f.thickness;
          
          const alpha = progress * 0.7; // slightly more transparent tail
          ctx.strokeStyle = `rgba(${f.color.r}, ${f.color.g}, ${f.color.b}, ${alpha})`;
          ctx.stroke();
        }

        // Draw the glowing fairy head
        ctx.beginPath();
        ctx.arc(f.points[0].x, f.points[0].y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${f.color.r}, ${f.color.g}, ${f.color.b}, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${f.color.r}, ${f.color.g}, ${f.color.b}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-2] sm:block hidden mix-blend-screen"
      style={{ filter: "url(#sketchy-filter)" }}
      aria-hidden="true"
    />
  );
};

export default FloatingParticles;
