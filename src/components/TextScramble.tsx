import { useEffect, useRef, useState } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  /** Delay in ms before the scramble starts */
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

/**
 * Decodes text from random characters into the final string,
 * one character at a time. Creates a satisfying "resolving" effect.
 */
const TextScramble = ({ text, className = "", delay = 0 }: TextScrambleProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<number>(0);
  const resolvedCount = useRef(0);

  // Start after delay
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Run the scramble
  useEffect(() => {
    if (!started) return;

    resolvedCount.current = 0;

    // Tick every 40ms — scramble unresolved chars, lock in one more each ~3 ticks
    let tick = 0;
    intervalRef.current = window.setInterval(() => {
      tick++;

      // Every 3rd tick, lock in the next character
      if (tick % 3 === 0 && resolvedCount.current < text.length) {
        resolvedCount.current++;
      }

      // Build the display string
      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolvedCount.current) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayed(result);

      // Done!
      if (resolvedCount.current >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayed(text);
      }
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, [started, text]);

  if (!started) {
    // Show blank space of correct width before starting
    return (
      <span className={className} style={{ visibility: "hidden" }}>
        {text}
      </span>
    );
  }

  return <span className={className}>{displayed}</span>;
};

export default TextScramble;
