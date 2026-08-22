import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type FC } from "react";

/** Fades + slides content into view the first time it scrolls into the
 *  viewport. Respects prefers-reduced-motion. Pure inline-style, no CSS class. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

interface RevealProps {
  children: ReactNode;
  style?: CSSProperties;
  delayMs?: number;
}

const Reveal: FC<RevealProps> = ({ children, style, delayMs = 0 }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .6s ease ${delayMs}ms, transform .6s ease ${delayMs}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
