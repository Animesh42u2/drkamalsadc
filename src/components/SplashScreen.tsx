import { useEffect, useState } from "react";
import type { FC } from "react";
import { COLORS } from "../theme";
import logo from "/logo.jpeg"; // swap for a transparent PNG if you have one

const SplashScreen: FC = () => {
  const [mounted, setMounted] = useState(true);
  const [revealed, setRevealed] = useState(false); // triggers the wipe
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const unmountTimer = setTimeout(() => setMounted(false), 2800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        background: COLORS.white,
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
        transition: "opacity .6s ease",
      }}
    >
      <div
        style={{
          width: "clamp(200px, 45vw, 320px)",
          overflow: "hidden",
        }}
      >
        <img
          src={logo}
          alt="Dr. Kamal's ADC — Anupama Dental Clinic"
          style={{
            width: "100%",
            display: "block",
            clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", // wipes left → right
            transition: "clip-path 1.4s cubic-bezier(.65,0,.35,1)",
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;