import { useEffect } from "react";

/**
 * Writes the current scroll Y position to a CSS custom property
 * (--scroll-y) on the root element. Background layers in index.css
 * read this value to drift at different rates for a subtle parallax.
 */
const ScrollParallax = () => {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      root.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
};

export default ScrollParallax;
