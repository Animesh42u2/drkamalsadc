import { useState } from "react";
import type { FC, CSSProperties, ReactNode } from "react";
import Reveal from "../components/Reveal";
import { CLINIC, HOURS, STATS, telLink, whatsappLink } from "../data/clinic";
import {
  COLORS,
  GRADIENT_BLUE,
  container,
  section,
  sectionTint,
  eyebrow,
  heading,
  btnPrimary,
  btnGhost,
} from "../theme";
import { useIsMobile } from "../hooks";

const Check: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flex: "0 0 auto", marginTop: 2 }}>
    <circle cx="8" cy="8" r="8" fill={COLORS.blue} />
    <path d="M4.5 8.2L6.8 10.5L11.5 5.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Small rounded icon tile used in front of each checklist row.
const IconTile: FC<{ children: ReactNode }> = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: hovered ? COLORS.blue : COLORS.blueTint,
        border: `1px solid ${hovered ? COLORS.blue : COLORS.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? COLORS.white : COLORS.blue,
        flex: "0 0 auto",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all .2s ease",
      }}
    >
      {children}
    </div>
  );
};

const iconProps = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ToothIcon: FC = () => (
  <svg {...iconProps}>
    <path d="M12 3c-1.8 0-2.6 1-4 1S5.2 3.3 4 4.3C2.8 5.3 2.5 7 3 9c.4 1.7.9 2.6 1.3 4.6.3 1.6.4 3.3.9 4.9.3 1 .8 2 1.6 2 1.1 0 1.2-1.7 1.4-2.8.2-1.2.4-2.7 1.5-2.7s1.3 1.5 1.5 2.7c.2 1.1.3 2.8 1.4 2.8.8 0 1.3-1 1.6-2 .5-1.6.6-3.3.9-4.9.4-2 .9-2.9 1.3-4.6.5-2-.2-3.7-1.4-4.7C15.4 3.3 13.8 3 12 3z" />
  </svg>
);

const SyringeIcon: FC = () => (
  <svg {...iconProps}>
    <path d="M18 3l3 3M16.5 4.5L20 8M4 20l3.5-3.5M9 8l7 7M6 15l3-3M11 6l7 7-3.5 3.5-7-7L11 6z" />
  </svg>
);

const ClipboardIcon: FC = () => (
  <svg {...iconProps}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const PeopleIcon: FC = () => (
  <svg {...iconProps}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
    <circle cx="17" cy="8" r="2.4" />
    <path d="M15.5 15.2c2.7.3 4.5 2 4.5 4.8" />
  </svg>
);

const ClipboardToothIcon: FC = () => (
  <svg {...iconProps}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M9 3V2h6v1" />
    <path d="M12 8c-1.1 0-1.6.6-2.4.6S8.3 8 7.7 8.6c-.6.6-.8 1.5-.5 2.5.2.9.5 1.4.7 2.4.2.9.2 1.8.5 2.6.2.5.5 1 .9 1 .6 0 .7-.9.8-1.5.1-.6.2-1.4.8-1.4s.7.8.8 1.4c.1.6.2 1.5.8 1.5.4 0 .7-.5.9-1 .3-.8.3-1.7.5-2.6.2-1 .5-1.5.7-2.4.3-1-.1-1.9-.5-2.5-.6-.6-1.5-.6-2.1-.6z" />
  </svg>
);

const ShieldCheckIcon: FC = () => (
  <svg {...iconProps}>
    <path d="M12 3l7 3v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4.5" />
  </svg>
);

const ChairIcon: FC = () => (
  <svg {...iconProps}>
    <circle cx="9" cy="6" r="2.6" />
    <path d="M9 9.2c-2.5 0-4 1.7-4 4.3v3" />
    <path d="M14 9v10" />
    <path d="M14 9h4.5a1.5 1.5 0 0 1 1.5 1.5V13" />
    <path d="M5 16.5h9" />
  </svg>
);

const PinIcon: FC = () => (
  <svg {...iconProps}>
    <path d="M12 21s7-7.2 7-12.2A7 7 0 0 0 5 8.8C5 13.8 12 21 12 21z" />
    <circle cx="12" cy="8.6" r="2.4" />
  </svg>
);

// ------------------------------------------------------------------------
// BorderBeam — a thin, glowing line of light that continuously travels
// around the border of a `position: relative; overflow: hidden` parent.
// Pure CSS (conic-gradient + mask), no extra dependencies.
// Drop <BorderBeam /> as the FIRST child of the target box, and give that
// box `position: relative`, `overflow: hidden`, and a `borderRadius`.
// ------------------------------------------------------------------------
const BorderBeam: FC<{ duration?: number; size?: number }> = ({ duration = 6, size = 46 }) => (
  <span
    aria-hidden
    style={
      {
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        padding: 1.5,
        background: `conic-gradient(from var(--beam-angle), transparent 0deg, transparent ${360 - size}deg, ${COLORS.blueMid ?? COLORS.blue} ${360 - size / 2}deg, ${COLORS.blue} 360deg)`,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude" as CSSProperties["maskComposite"],
        animation: `border-beam-spin ${duration}s linear infinite`,
        pointerEvents: "none",
        zIndex: 2,
      } as CSSProperties
    }
  />
);

// One-time keyframes/@property injection for the beam. Rendered once at the
// top of the page; harmless if it were rendered more than once.
const BorderBeamStyles: FC = () => (
  <style>{`
    @property --beam-angle {
      syntax: '<angle>';
      inherits: false;
      initial-value: 0deg;
    }
    @keyframes border-beam-spin {
      to { --beam-angle: 360deg; }
    }
    @keyframes star-twinkle {
      0%, 100% { opacity: .3; filter: drop-shadow(0 0 0px rgba(37,99,235,0)); }
      50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(37,99,235,.9)); }
    }

    /* ---- Responsive fine-tuning: graduated breakpoints on top of the
       existing isMobile on/off switch, so tablets and small phones don't
       just jump straight from 2-column to 1-column. ---- */
    @media (max-width: 1080px) {
      .about-hero-grid { gap: 36px !important; }
      .about-doctor-grid { gap: 32px !important; }
      .about-process-grid { gap: 40px !important; }
    }
    @media (max-width: 900px) {
      .about-hero-grid,
      .about-doctor-grid,
      .about-process-grid,
      .about-hours-grid {
        grid-template-columns: 1fr !important;
      }
      .about-photocard {
        max-width: 320px !important;
        margin: 0 auto !important;
      }
      .about-tooth-illustration {
        top: 6px !important;
        right: 6px !important;
        width: 150px !important;
        opacity: 0.9;
      }
    }
    @media (max-width: 760px) {
      .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 560px) {
      .about-values-grid { grid-template-columns: 1fr !important; }
      .about-stats-col { gap: 12px !important; }
      .about-checklist { gap: 16px !important; }
      .about-tooth-illustration {
        top: 4px !important;
        right: 4px !important;
        width: 120px !important;
      }
      .about-dotgrid-corner {
        left: 12px !important;
        bottom: 12px !important;
        width: 70px !important;
        height: 46px !important;
      }
    }
    @media (max-width: 420px) {
      .about-doctor-ctas > a,
      .about-process-cta {
        width: 100% !important;
        text-align: center !important;
      }
      .about-social-row { justify-content: center !important; }
      .about-tooth-illustration {
        width: 100px !important;
        right: 4px !important;
      }
    }
  `}</style>
);

// Checklist copy, split into a bold lead-in + the rest, matched to WISDOM_POINTS.
const CHECKLIST = [
  { icon: <ToothIcon />, bold: "Digital X-ray mapping", rest: "before every extraction" },
  { icon: <SyringeIcon />, bold: "Local anaesthesia", rest: "tuned to the individual patient" },
  { icon: <ClipboardIcon />, bold: "Clear aftercare", rest: "instructions, in Odia or English" },
];

// One of the three "About" stats. Highlight state is now controlled by the
// parent (click-to-activate) instead of local hover, so only one card is
// ever "lit" at a time — no more multiple cards flashing blue together
// when the cursor sweeps across the column.
const StatCard: FC<{
  active: boolean;
  onActivate: () => void;
  icon: ReactNode;
  value: string;
  label: string;
  decoration: (active: boolean) => ReactNode;
  isMobile: boolean;
}> = ({ active, onActivate, icon, value, label, decoration, isMobile }) => {
  const lit = active;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: lit ? GRADIENT_BLUE : COLORS.blueTint,
        border: lit ? "none" : `1px solid ${COLORS.line}`,
        borderRadius: 20,
        padding: isMobile ? "18px 20px" : lit ? "26px 28px" : "24px 28px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        cursor: "pointer",
        userSelect: "none",
        transform: lit ? "translateY(-6px)" : "translateY(0)",
        boxShadow: lit
          ? "0 26px 44px -16px rgba(30,79,214,.5)"
          : "0 0 0 0 rgba(0,0,0,0)",
        transition: "transform .25s ease, box-shadow .25s ease, background .3s ease, border-color .25s ease, padding .25s ease",
      }}
    >
      {decoration(lit)}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: lit ? "rgba(255,255,255,.18)" : COLORS.white,
          border: lit ? "none" : `1px solid ${COLORS.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: lit ? COLORS.white : COLORS.blue,
          flex: "0 0 auto",
          zIndex: 1,
          transform: lit ? "scale(1.08)" : "scale(1)",
          transition: "transform .25s ease, background .3s ease, color .3s ease",
        }}
      >
        {icon}
      </div>
      <div style={{ zIndex: 1, minWidth: 0 }}>
        <div
          style={{
            ...heading,
            fontSize: lit ? "clamp(20px, 4.5vw, 32px)" : "clamp(18px, 3.8vw, 28px)",
            color: lit ? COLORS.white : COLORS.blueDark,
            transition: "color .3s ease",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 13,
            color: lit ? "rgba(255,255,255,.9)" : COLORS.textSoft,
            marginTop: 2,
            transition: "color .3s ease",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};


// Small round social icon button — matching the reference card's icon row.
// Swap the `href="#"` values for your real profile links.
const socialIconStyle: CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: COLORS.white,
  border: `1px solid ${COLORS.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 6px 16px -10px rgba(15,42,102,.35)",
  flex: "0 0 auto",
};

const SocialIcon: FC<{ href: string; label: string; path: string }> = ({ href, label, path }) => (
  <a href={href} aria-label={label} style={socialIconStyle} target="_blank" rel="noreferrer">
    <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.blue}>
      <path d={path} />
    </svg>
  </a>
);

const VALUES = [
  {
    icon: <ChairIcon />,
    title: "One dentist, start to finish",
    body: "No hand-off between the person who diagnoses and the person who treats — you see the same face every visit.",
  },
  {
    icon: <ClipboardToothIcon />,
    title: "Explained before it's done",
    body: "Every treatment plan is walked through in plain Odia or English before any work begins, so there are no surprises.",
  },
  {
    icon: <PinIcon />,
    title: "Built around the neighbourhood",
    body: `Set in ${CLINIC.address.split(",")[0]}, close enough that most patients walk in — and walk-ins are welcome.`,
  },
];

// A "how we work" card — icon badge (flips to blue on hover, matching
// IconTile above), title, body, a faint index numeral, and a blue accent
// bar that grows from a short stub to full width on hover.
const ValueCard: FC<{ icon: ReactNode; title: string; body: string; index: number }> = ({ icon, title, body, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: COLORS.white,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 18,
        padding: "30px 26px 26px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 36px -22px rgba(15,42,102,.3)" : "0 0 0 0 rgba(0,0,0,0)",
        transition: "transform .22s ease, box-shadow .22s ease",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 14,
          bottom: -6,
          fontSize: 68,
          fontWeight: 700,
          fontFamily: heading.fontFamily,
          color: COLORS.blueTint,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {String(index).padStart(2, "0")}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: hovered ? GRADIENT_BLUE : COLORS.blueTint, // matches the "patients treated" stat card
            border: hovered ? "none" : `1px solid ${COLORS.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hovered ? COLORS.white : COLORS.blue,
            transform: hovered ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)",
            boxShadow: hovered ? "0 10px 20px -10px rgba(30,79,214,.6)" : "none",
            transition: "background .25s ease, color .25s ease, transform .25s ease, border-color .25s ease, box-shadow .25s ease",
          }}
        >
          {icon}
        </div>
        <span style={{ display: "block", width: 24, height: 2, background: COLORS.blue, margin: "16px 0 16px" }} />
        <h3 style={{ ...heading, fontSize: 18, marginBottom: 8 }}>{title}</h3>
        <p style={{ color: COLORS.textSoft, fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: "28ch" }}>{body}</p>
      </div>

      {/* Growing accent bar: starts as a short stub, expands to full width on hover */}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 4,
          width: hovered ? "100%" : "28%",
          background: COLORS.blue,
          transformOrigin: "left",
          transition: "width .3s ease",
        }}
      />
    </div>
  );
};

// Numbered circle used in the Process steps — starts as a soft light-blue
// tint (matching IconTile's resting state) and fills solid blue with a
// lift + glow on hover.
const StepNumber: FC<{ n: number }> = ({ n }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: hovered ? GRADIENT_BLUE : COLORS.blueTint,
        border: hovered ? "none" : `1.5px solid ${COLORS.blue}55`,
        color: hovered ? COLORS.white : COLORS.blue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: heading.fontFamily,
        fontWeight: 700,
        fontSize: 18,
        flex: "0 0 auto",
        transform: hovered ? "translateY(-3px) scale(1.06)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 12px 22px -10px rgba(30,79,214,.6)" : "none",
        transition: "background .25s ease, color .25s ease, transform .25s ease, border-color .25s ease, box-shadow .25s ease",
      }}
    >
      {n}
    </div>
  );
};

// "What to expect" / process steps — three-column numbered layout, matching
// the target screenshot: small blue "01/02/03" index, bold navy title,
// soft gray body copy, no cards/borders, generous top spacing under the
// section heading.
const PROCESS = [
  {
    step: "01",
    title: "Initial consultation",
    body: "A digital X-ray and a straight assessment of what's actually wrong, before anything is recommended.",
  },
  {
    step: "02",
    title: "Plain-language plan",
    body: "The diagnosis and the options are explained in the language you're comfortable in — no jargon, no rush.",
  },
  {
    step: "03",
    title: "Treatment & aftercare",
    body: "Anaesthesia tuned to you where needed, then clear aftercare instructions to take home.",
  },
];

const About: FC = () => {
  const isMobile = useIsMobile();

  // Which of the three "About" stat cards is currently highlighted.
  // Click-driven (not hover-driven) so only ever one card is lit at a
  // time; defaults to the first card ("3,000+ patients treated").
  const [activeStat, setActiveStat] = useState(0);

  return (
    <>
      <BorderBeamStyles />

      {/* ---------------------------------------------------------------- */}
      {/* Hero / intro                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section style={section}>
        <div style={container}>
          <Reveal>
            <div
              className="about-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.05fr .95fr",
                gap: 56,
                alignItems: "start",
              }}
            >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ width: 22, height: 2, background: COLORS.blue, display: "inline-block" }} />
                <p style={{ ...eyebrow, margin: 0 }}>About the clinic</p>
              </div>

              <h1 style={{ ...heading, fontSize: "clamp(24px, 4.6vw, 38px)", margin: "0 0 20px", maxWidth: "16ch" }}>
                Run by one dentist who{" "}
                <span style={{ position: "relative", display: "inline-block", color: COLORS.blue }}>
                  knows the town.
                  <svg
                    aria-hidden
                    width="100%"
                    height="10"
                    viewBox="0 0 220 10"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", left: 0, bottom: -6, width: "100%" }}
                  >
                    <path d="M2 6 C 40 2, 180 2, 218 6" stroke={COLORS.blue} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />
                  </svg>
                </span>
              </h1>

              <p style={{ color: COLORS.textSoft, lineHeight: 1.65 }}>
                {CLINIC.name} sits near Indian Oil in Udala's Ward No. 03 — close
                enough that most patients walk in. {CLINIC.doctor} keeps the
                practice small on purpose: one dentist, one chair, no hand-off
                between the person who diagnoses and the person who treats.
              </p>
              <p style={{ marginTop: 14, color: COLORS.textSoft, lineHeight: 1.65 }}>
                {CLINIC.tagline}.
              </p>

              <div className="about-checklist" style={{ display: "flex", flexDirection: "column", gap: 20, margin: "26px 0 0" }}>
                {CHECKLIST.map((c) => (
                  <div key={c.bold} style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                    <IconTile>{c.icon}</IconTile>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <Check />
                      <span style={{ fontSize: 14.5, color: COLORS.text, lineHeight: 1.5 }}>
                        <strong>{c.bold}</strong> {c.rest}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="about-stats-col"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 16,
              }}
            >
              <StatCard
                active={activeStat === 0}
                onActivate={() => setActiveStat(0)}
                isMobile={isMobile}
                value={STATS[0].value}
                label={STATS[0].label}
                icon={<PeopleIcon />}
                decoration={() => (
                  <svg aria-hidden width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="0.8" style={{ position: "absolute", right: -14, bottom: -18, opacity: 0.16 }}>
                    <path d="M12 3c-1.8 0-2.6 1-4 1S5.2 3.3 4 4.3C2.8 5.3 2.5 7 3 9c.4 1.7.9 2.6 1.3 4.6.3 1.6.4 3.3.9 4.9.3 1 .8 2 1.6 2 1.1 0 1.2-1.7 1.4-2.8.2-1.2.4-2.7 1.5-2.7s1.3 1.5 1.5 2.7c.2 1.1.3 2.8 1.4 2.8.8 0 1.3-1 1.6-2 .5-1.6.6-3.3.9-4.9.4-2 .9-2.9 1.3-4.6.5-2-.2-3.7-1.4-4.7C15.4 3.3 13.8 3 12 3z" />
                  </svg>
                )}
              />

              <StatCard
                active={activeStat === 1}
                onActivate={() => setActiveStat(1)}
                isMobile={isMobile}
                value={STATS[1].value}
                label={STATS[1].label}
                icon={<ClipboardToothIcon />}
                decoration={(lit) => (
                  <svg aria-hidden width="90" height="60" style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", opacity: lit ? 0.22 : 0.35, transition: "opacity .3s ease" }}>
                    {Array.from({ length: 4 }).map((_, row) =>
                      Array.from({ length: 6 }).map((_, col) => (
                        <circle
                          key={`${row}-${col}`}
                          cx={6 + col * 15}
                          cy={6 + row * 15}
                          r="1.6"
                          fill={lit ? "#fff" : COLORS.blue}
                          style={{ transition: "fill .3s ease" }}
                        />
                      ))
                    )}
                  </svg>
                )}
              />

              <StatCard
                active={activeStat === 2}
                onActivate={() => setActiveStat(2)}
                isMobile={isMobile}
                value={STATS[2].value}
                label={STATS[2].label}
                icon={<ShieldCheckIcon />}
                decoration={(lit) => (
                  <svg
                    aria-hidden
                    width="90"
                    height="90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={lit ? "#fff" : COLORS.blue}
                    strokeWidth="0.8"
                    style={{ position: "absolute", right: -10, bottom: -14, opacity: lit ? 0.22 : 0.18, transition: "opacity .3s ease, stroke .3s ease" }}
                  >
                    <path d="M12 21s-7-4.35-9.5-9C.5 8 2 4 6 4c2 0 3.5 1.2 4 2.2C10.5 5.2 12 4 14 4c4 0 5.5 4 3.5 8-2.5 4.65-5.5 9-5.5 9z" />
                  </svg>
                )}
              />
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Values                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section style={{ ...sectionTint, position: "relative", overflow: "hidden" }}>
        <svg
          aria-hidden
          className="about-tooth-illustration"
          width="320"
          height="320"
          viewBox="0 0 300 300"
          style={{
            position: "absolute",
            top: 30,
            right: 20,
            width: "clamp(200px, 32vw, 320px)",
            height: "auto",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="toothGloss" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor={COLORS.blueTint} />
            </linearGradient>
            <filter id="toothShadowBlur" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          {/* Soft blurred shadow sitting behind the tooth for depth */}
          <ellipse cx="165" cy="175" rx="105" ry="95" fill={COLORS.blue} opacity="0.16" filter="url(#toothShadowBlur)" />

          {/* Thin halo ring, like the reference */}
          <ellipse cx="165" cy="150" rx="128" ry="58" fill="none" stroke={COLORS.blue} strokeOpacity="0.18" strokeWidth="1.5" />

          {/* Tooth body — smooth crown with two lobes, tapering to two roots */}
          <path
            d="M165 40c-18 0-27 14-42 14-20 0-35 15-33 38 2 21 12 30 16 51 4 22 11 45 21 45 9 0 12-17 14-31 2-13 6-24 24-24s22 11 24 24c2 14 5 31 14 31 10 0 17-23 21-45 4-21 14-30 16-51 2-23-13-38-33-38-15 0-24-14-42-14z"
            fill="url(#toothGloss)"
            stroke={COLORS.blue}
            strokeOpacity="0.15"
            strokeWidth="1.5"
          />

          {/* Gloss highlight */}
          <ellipse cx="140" cy="90" rx="17" ry="9" fill="#ffffff" opacity="0.65" transform="rotate(-20 140 90)" />

          {/* Sparkle accent, top right of the tooth — twinkles continuously */}
          <path
            d="M258 55l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"
            fill={COLORS.blue}
            style={{
              animation: "star-twinkle 1.8s ease-in-out infinite",
            }}
          />
        </svg>

        {/* Small dotted grid accent, bottom-left corner of the section */}
        <svg
          aria-hidden
          className="about-dotgrid-corner"
          width="90"
          height="60"
          style={{ position: "absolute", left: 24, bottom: 24, opacity: 0.25, pointerEvents: "none" }}
        >
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={6 + col * 15} cy={6 + row * 15} r="1.6" fill={COLORS.blue} />
            ))
          )}
        </svg>

        <div style={{ ...container, position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ width: 22, height: 2, background: COLORS.blue, display: "inline-block" }} />
              <p style={{ ...eyebrow, margin: 0 }}>How we work</p>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.blue, display: "inline-block" }} />
            </div>
            <h2 style={{ ...heading, fontSize: "clamp(21px, 3.6vw, 34px)", margin: "0 0 40px", maxWidth: "16ch", lineHeight: 1.2 }}>
              Three things that <span style={{ color: COLORS.blue }}>don't change</span>, visit to visit.
            </h2>
          </Reveal>
          <Reveal
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} index={i + 1} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Meet the doctor — profile card + copy, styled after the brand's  */}
      {/* "Experience the Difference" layout: photo card on the left,      */}
      {/* headline + bio + socials + CTA on the right.                    */}
      {/* ---------------------------------------------------------------- */}
      <section style={section}>
        <div style={container}>
          <Reveal
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "320px 1fr",
              gap: 48,
              alignItems: "start",
            }}
          >
            {/* Photo card */}
            <div
              className="about-photocard"
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 20,
                padding: 18,
                boxShadow: "0 24px 48px -30px rgba(15,42,102,.3)",
                width: "100%",
                maxWidth: isMobile ? 320 : "none",
                margin: isMobile ? "0 auto" : 0,
              }}
            >
              <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 18 }}>
                <img
                  src="/aboutdr.png"
                  alt={CLINIC.doctor}
                  style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
                />
              </div>
              <h3 style={{ ...heading, fontSize: 19, marginBottom: 3 }}>{CLINIC.doctor}</h3>
              <p style={{ fontSize: 13, color: COLORS.textSoft, margin: "0 0 14px" }}>Founder &amp; Lead Dentist</p>
              <a
                href={whatsappLink(`Hi, I'd like to know more about ${CLINIC.doctor}.`)}
                style={{ fontSize: 13.5, color: COLORS.blue, fontWeight: 600, textDecoration: "none" }}
              >
                Learn more →
              </a>
            </div>

            {/* Copy */}
            <div>
              <p style={eyebrow}>Meet the doctor</p>
              <h2 style={{ ...heading, fontSize: "clamp(22px, 3.4vw, 32px)", margin: "6px 0 18px", lineHeight: 1.25 }}>
                Experience the difference with{" "}
                <span style={{ color: COLORS.blue }}>{CLINIC.doctor}</span>
              </h2>
              <p style={{ color: COLORS.textSoft, lineHeight: 1.7, maxWidth: "56ch" }}>
                {CLINIC.tagline}. Every case at {CLINIC.name} runs through the
                same hands, from the first X-ray to the last aftercare
                instruction — so nothing gets lost between appointments.
              </p>

              {/* Social row — placeholders, point these at your real profiles */}
              <div className="about-social-row" style={{ display: "flex", gap: 10, margin: "24px 0 28px", flexWrap: "wrap" }}>
                <SocialIcon
                  href="https://www.instagram.com/dr_kamal_mohapatra/"
                  label="Instagram"
                  path="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.15-.55.55-.9 1.11-1.15 1.77-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.9 1.77 1.15.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.15.55-.55.9-1.11 1.15-1.77.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77 4.9 4.9 0 0 0-1.77-1.15c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.13.36.3.88.34 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.34 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.13-.88.3-1.86.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.13-.36-.3-.88-.34-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.21-1.5.34-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.13.88-.3 1.86-.34C9.01 3.81 9.33 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"
                />
                <SocialIcon
                  href="#"
                  label="Facebook"
                  path="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.2 4.32 15.19 4.24 14 4.24c-2.4 0-4.04 1.47-4.04 4.16V10.5H7.5v3h2.46V21h3.54z"
                />
                <SocialIcon
                  href="#"
                  label="Twitter"
                  path="M22 5.9c-.66.3-1.37.5-2.11.6a3.7 3.7 0 0 0 1.62-2.04 7.3 7.3 0 0 1-2.33.9 3.65 3.65 0 0 0-6.32 2.5c0 .29.03.56.09.83A10.36 10.36 0 0 1 3.16 4.7a3.66 3.66 0 0 0 1.13 4.88 3.6 3.6 0 0 1-1.66-.46v.05a3.66 3.66 0 0 0 2.93 3.58 3.7 3.7 0 0 1-1.65.06 3.66 3.66 0 0 0 3.42 2.54A7.34 7.34 0 0 1 2 16.6a10.35 10.35 0 0 0 5.6 1.64c6.72 0 10.4-5.57 10.4-10.4l-.01-.47A7.4 7.4 0 0 0 22 5.9z"
                />
                <SocialIcon
                  href="#"
                  label="YouTube"
                  path="M21.6 7.2s-.21-1.48-.86-2.14c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.15c-.42.05-1.34.05-2.16.91C2.6 5.72 2.4 7.2 2.4 7.2S2.2 8.94 2.2 10.68v1.63c0 1.74.2 3.48.2 3.48s.21 1.48.85 2.14c.82.86 1.9.83 2.38.92C7.4 19 12 19 12 19s3.6 0 6.58-.15c.42-.05 1.34-.05 2.16-.92.65-.66.86-2.14.86-2.14s.2-1.74.2-3.48v-1.63c0-1.74-.2-3.48-.2-3.48zM9.98 14.1V8.9l5.4 2.6-5.4 2.6z"
                />
              </div>

              <div className="about-doctor-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={telLink(CLINIC.phones[0])} style={{ ...btnPrimary }}>
                  Call {CLINIC.phones[0]}
                </a>
                <a href={whatsappLink("Hi, I'd like to book a dental appointment.")} style={{ ...btnGhost }}>
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Process — "What to expect": left column carries the eyebrow, a   */}
      {/* big two-line heading, intro copy and a CTA; right column is a   */}
      {/* stacked list of numbered-circle steps. Matches the reference    */}
      {/* "Our Process" layout.                                           */}
      {/* ---------------------------------------------------------------- */}
      <section style={sectionTint}>
        <div style={container}>
          <Reveal
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : ".9fr 1.1fr",
              gap: 56,
              alignItems: "start",
            }}
          >
            {/* Left: intro + CTA */}
            <div>
              <p style={eyebrow}>What to expect</p>
              <h2 style={{ ...heading, fontSize: "clamp(23px, 3.6vw, 34px)", margin: "6px 0 20px", maxWidth: "14ch", lineHeight: 1.2 }}>
                What actually happens <span style={{ color: COLORS.blue }}>when you walk in.</span>
              </h2>
              <p style={{ color: COLORS.textSoft, lineHeight: 1.65, maxWidth: "38ch" }}>
                At {CLINIC.name}, every visit follows the same three steps —
                no surprises, no rushed decisions, no jargon you weren't given
                time to ask about.
              </p>
              <a
                href={whatsappLink("Hi, I'd like to book a dental appointment.")}
                className="about-process-cta"
                style={{ ...btnPrimary, display: "inline-block", marginTop: 26 }}
              >
                Book a visit
              </a>
            </div>

            {/* Right: numbered steps, stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              {PROCESS.map((p, i) => (
                <div key={p.step} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <StepNumber n={i + 1} />
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ ...heading, fontSize: 19, marginBottom: 6 }}>{p.title}</h3>
                    <p style={{ color: COLORS.textSoft, fontSize: 14.5, lineHeight: 1.6, margin: 0, maxWidth: "42ch" }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Hours / Visit us — clinic hours card now carries an animated     */}
      {/* blue "border beam" that continuously travels around its edge.   */}
      {/* ---------------------------------------------------------------- */}
      <section style={section}>
        <div style={container}>
          <div className="about-hours-grid">
            <Reveal
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr .9fr",
                gap: 40,
                alignItems: "center",
              }}
            >
            <div>
              <p style={eyebrow}>Visit us</p>
              <h2 style={{ ...heading, fontSize: "clamp(20px, 2.8vw, 28px)", margin: "6px 0 14px" }}>
                Walk in, or WhatsApp ahead.
              </h2>
              <p style={{ color: COLORS.textSoft, lineHeight: 1.65, maxWidth: "40ch" }}>
                {CLINIC.address}. Most visits don't need a booking — for wisdom
                tooth consultations, a message on WhatsApp first helps us set
                aside enough time.
              </p>
            </div>

            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: COLORS.blueTint,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 18,
                padding: isMobile ? 22 : 28,
              }}
            >
              <BorderBeam duration={6} size={50} />

              <h3 style={{ ...heading, fontSize: 15, marginBottom: 16 }}>Clinic hours</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 6,
                      fontSize: 14,
                      paddingBottom: 10,
                      borderBottom: `1px dashed ${COLORS.line}`,
                      color: COLORS.text,
                    }}
                  >
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 16, fontSize: 12.5, color: COLORS.textSoft }}>
                Walk-ins welcome; WhatsApp ahead for wisdom tooth consultations.
              </p>
            </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;