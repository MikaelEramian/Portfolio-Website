import { cn } from "@/lib/utils";

interface JellyNameProps {
  text: string;
  className?: string;
}

/**
 * Splits text into individual letter spans. On hover,
 * letters lift slightly in a smooth cascade and turn amber.
 */
const JellyName = ({ text, className }: JellyNameProps) => {
  return (
    <span className={cn("group inline-flex cursor-default select-none overflow-hidden pb-2 -mb-2", className)}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:text-amber group-hover:drop-shadow-[0_0_8px_hsl(var(--amber)/0.5)]"
          style={{ 
            transitionDelay: `${i * 15}ms`,
            whiteSpace: char === " " ? "pre" : undefined 
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default JellyName;
