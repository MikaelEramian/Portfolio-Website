import { useEffect, useState } from "react";

/**
 * Background reveal overlay + scroll lock.
 * - Covers the blueprint grid with solid background color, fades away over ~2.5s
 * - Locks body scroll until the intro completes (2.5s)
 */
const PageIntro = () => {
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Lock scrolling during intro
    document.body.style.overflow = "hidden";

    const t0 = setTimeout(() => setFading(true), 200);

    // Unlock scroll after intro finishes
    const t1 = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2600);

    // Remove overlay from DOM
    const t2 = setTimeout(() => setDone(true), 3200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        backgroundColor: "hsl(24, 20%, 4%)",
        opacity: fading ? 0 : 1,
        transition: "opacity 2.5s ease-out",
      }}
    />
  );
};

export default PageIntro;
