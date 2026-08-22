import { useState, useEffect, useRef, type FC } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CLINIC, STATS, telLink, whatsappLink } from "../data/clinic";
import { COLORS, FONT, container,heading, btnPrimary, btnPrimaryHover, btnGhost, btnGhostHover } from "../theme";
import { useHover, useIsMobile } from "../hooks";

const AUTO_INTERVAL = 5000;

const slides = [
  {
    heading: (
      <>
        Meet <span style={{ color: COLORS.blue }}>Dr. Kamal</span>
        <br />
        Mohapatra, BDS.
      </>
    ),
    bullets: [
      "3,000+ patients treated in Udala",
      "Known for his curved-root extraction technique",
      "Available Mon–Sat, 9:30 AM – 9:30 PM",
    ],
    image: "/doctor-desk.jpeg",
    imageAlt: "Dr. Kamal Mohapatra at his desk",
  },
  {
    heading: (
      <>
        A steadier way <br />
        to sit in the <span style={{ color: COLORS.blue }}>chair.</span>
      </>
    ),
    bullets: [
      "Digital X-ray mapping before every extraction",
      "Local anaesthesia tuned to the individual patient",
      "Painless, curved-root wisdom tooth removal",
    ],
    image: "/clinic-front.jpeg",
    imageAlt: "Anupama Dental Clinic entrance",
  },
  {
    heading: (
      <>
        A calm space, <br />
        right from the <span style={{ color: COLORS.blue }}>waiting room.</span>
      </>
    ),
    bullets: [
      "Clean, comfortable seating for every visit",
      "Short wait times, appointments respected",
      "Friendly staff to guide first-time patients",
    ],
    image: "/waiting-area.jpeg",
    imageAlt: "Clinic waiting area",
  },
  {
    heading: (
      <>
        Modern equipment, <br />
        <span style={{ color: COLORS.blue }}>gentle hands.</span>
      </>
    ),
    bullets: [
      "Sterile, fully-equipped treatment rooms",
      "UV sanitisation between every patient",
      "Latest chairside dental technology",
    ],
    image: "/treatment-room-1.jpeg",
    imageAlt: "Dental treatment room",
  },
  {
    heading: (
      <>
        Care that feels <br />
        <span style={{ color: COLORS.blue }}>personal.</span>
      </>
    ),
    bullets: [
      "Every treatment plan explained clearly",
      "Odia or English — whichever you're comfortable in",
      "8 services under one roof, no referrals needed",
    ],
    image: "/treatment-room-2.jpeg",
    imageAlt: "Anupama Dental Clinic treatment suite",
  },
];

const easeInOut = [0.42, 0, 0.58, 1] as const;

const textV = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.48, ease: easeInOut } },
  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.32, ease: easeInOut } }),
};
const imgV = {
  enter: (d: number) => ({ y: d > 0 ? 30 : -30, opacity: 0, scale: 0.97 }),
  center: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.52, ease: easeInOut } },
  exit: (d: number) => ({ y: d > 0 ? -30 : 30, opacity: 0, scale: 0.97, transition: { duration: 0.34, ease: easeInOut } }),
};

// ─── Animated stat counter ──────────────────────────────────────────────
// Parses a value like "3,000+" or "8" into a numeric target, then counts
// up from 0 once the stat scrolls into view. Prefix/suffix (commas, "+")
// are re-applied on every frame so formatting never breaks mid-count.
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

const AnimatedStat: FC<{ value: string; label: string }> = ({ value, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = value.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
  const prefix = match?.[1] ?? "";
  const numeric = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
  const suffix = match?.[3] ?? "";
  const hasDigits = match !== null;

  const count = useCountUp(numeric, 1400, inView);
  const display = hasDigits ? count.toLocaleString("en-IN") : value;

  return (
    <div ref={ref}>
      <dt
        style={{
          fontFamily: FONT.display,
          fontSize: "clamp(20px, 4vw, 26px)",
          fontWeight: 600,
          color: COLORS.blue,
          margin: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hasDigits ? `${prefix}${display}${suffix}` : value}
      </dt>
      <dd style={{ margin: "2px 0 0", fontSize: "clamp(11px, 2.4vw, 12.5px)", color: COLORS.textSoft }}>{label}</dd>
    </div>
  );
};

const Hero: FC = () => {
  const isMobile = useIsMobile();
  const primaryHover = useHover();
  const ghostHover = useHover();

  const [[active, dir], setSlide] = useState<[number, number]>([0, 1]);
  const [dotKey, setDotKey] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => setSlide(([p]) => [idx, idx >= p ? 1 : -1]);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setSlide(([p]) => [(p + 1) % slides.length, 1]),
      AUTO_INTERVAL
    );
  };
  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDotKey("paused");
  };
  const resumeInterval = () => {
    startInterval();
    setDotKey("");
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = slides[active];

  return (
    <section
      onMouseDown={stopInterval}
      onMouseUp={resumeInterval}
      onMouseLeave={resumeInterval}
      style={{
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(ellipse at 85% 100%, ${COLORS.blueTint} 0%, transparent 55%), ${COLORS.white}`,
      }}
    >
      <div
        style={{
          ...container,
          position: "relative",
          zIndex: 2,
          paddingTop: "clamp(12px, 2.5vw, 32px)",
          paddingBottom: "clamp(24px, 4vw, 40px)",
        }}
      >

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: "clamp(20px, 4vw, 48px)",
            marginTop: 12,
          }}
        >
          <div
            style={{
              flex: isMobile ? "none" : "1 1 0%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              order: isMobile ? -1 : 2,
            }}
          >
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={active + "-img"}
                custom={dir}
                variants={imgV}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: isMobile ? 480 : 620,
                  height: "clamp(220px, 42vw, 460px)",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(10,37,89,.18)",
                  border: `1px solid ${COLORS.line}`,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: isMobile ? 2 : 1 }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div key={active + "-text"} custom={dir} variants={textV} initial="enter" animate="center" exit="exit">
                <h1 style={{ ...heading, fontSize: "clamp(28px, 6vw, 52px)", lineHeight: 1.1 }}>{slide.heading}</h1>

                <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {slide.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: "clamp(13.5px, 3vw, 15px)",
                        color: COLORS.textSoft,
                        lineHeight: 1.55,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                        <circle cx="10" cy="10" r="9" stroke={COLORS.blue} strokeWidth="1.5" />
                        <path d="M6 10.5l2.8 2.8 5-5.6" stroke={COLORS.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: "clamp(24px, 5vw, 40px)" }}>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    style={primaryHover.hovered ? { ...btnPrimary, ...btnPrimaryHover } : btnPrimary}
                    {...primaryHover.bind}
                  >
                    Book an appointment
                  </a>

                  <a
                    href={telLink(CLINIC.phones[0])}
                    style={ghostHover.hovered ? { ...btnGhost, ...btnGhostHover } : btnGhost}
                    {...ghostHover.bind}
                  >
                    Call {CLINIC.phones[0]}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <dl
              style={{
                display: "flex",
                gap: "clamp(18px, 4vw, 36px)",
                margin: 0,
                paddingTop: 24,
                borderTop: `1px solid ${COLORS.line}`,
                flexWrap: "wrap",
              }}
            >
              {STATS.map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} />
              ))}
            </dl>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start", gap: 9, marginTop: 28 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{ position: "relative", width: 24, height: 24, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {i === active && (
                <svg style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" fill="none" stroke={COLORS.blueTint} strokeWidth="2" />
                  <motion.circle
                    key={active + dotKey}
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke={COLORS.blue}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={56.55}
                    initial={{ strokeDashoffset: 56.55 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                  />
                </svg>
              )}
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  margin: "8.5px",
                  background: i === active ? COLORS.blue : COLORS.line,
                  transition: "background .3s",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;