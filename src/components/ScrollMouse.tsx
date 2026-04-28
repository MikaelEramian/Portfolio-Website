import { useEffect, useState } from "react";

/**
 * Hand-drawn scroll cue. A sketchy triple chevron drips downward,
 * paired with a small handwritten tag. Fades out once the user starts
 * scrolling so it doesn't linger.
 */
const ScrollMouse = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`flex flex-col items-center gap-3 text-muted-foreground transition-all duration-500 ${
        hidden ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] opacity-80">
      </span>

      <svg
        aria-hidden
        width="34"
        height="44"
        viewBox="0 0 34 44"
        className="text-amber glow-amber overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M5 4 Q 16.6 14 17 14 Q 17.4 14 29 4.4"
          className="sketchy animate-chevron-fall"
          style={{ animationDelay: "0s", opacity: 0.35 }}
        />
        <path
          d="M5 16 Q 16.8 26.2 17 26.2 Q 17.2 26.2 29 16.4"
          className="sketchy animate-chevron-fall"
          style={{ animationDelay: "0.2s", opacity: 0.7 }}
        />
        <path
          d="M5 28 Q 16.7 38.4 17 38.4 Q 17.3 38.4 29 28.3"
          className="sketchy animate-chevron-fall"
          style={{ animationDelay: "0.4s" }}
        />
      </svg>
    </div>
  );
};

export default ScrollMouse;
