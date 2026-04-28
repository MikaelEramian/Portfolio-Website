import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  requireScroll?: boolean;
}

/**
 * Wraps children in a springy scroll-in animation. Triggers once on enter.
 */
const Reveal = ({ children, delay = 0, className, as: Tag = "div", requireScroll = false }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Decide initial visibility from layout, not from IntersectionObserver
    // (IO fires once on observe even if "intersecting" via large viewport).
    if (!requireScroll) {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Treat "above the fold" as element top within first 70% of viewport.
      if (rect.top < vh * 0.7) {
        setShown(true);
        return;
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShown(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (requireScroll && window.scrollY < 10) {
              window.addEventListener('scroll', handleScroll, { passive: true });
            } else {
              setShown(true);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [requireScroll]);

  const Component = Tag as any;
  return (
    <Component
      ref={ref as any}
      className={cn(
        "opacity-0",
        shown && "animate-spring-up",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
