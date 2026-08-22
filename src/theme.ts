import type { CSSProperties } from "react";

// ---------------------------------------------------------------------------
// Colour palette — pulled from the clinic's poster (bright blue + navy + white)
// ---------------------------------------------------------------------------
export const COLORS = {
  white: "#FFFFFF",
  bgTint: "#F4F8FF",
  blue: "#2F6FEA",       // primary bright blue — headlines, checkmarks, links
  blueMid: "#1E4FD6",    // gradient midpoint
  blueDark: "#0F2A66",   // deep navy — banners, footer, dark sections
  blueLight: "#8FB4FF",  // light accent on dark backgrounds
  blueTint: "#E7EFFF",   // very light blue — card backgrounds
  line: "#DCE6F8",
  text: "#1F2937",
  textSoft: "#5B6472",
} as const;

export const GRADIENT_BLUE = `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.blueDark} 100%)`;

export const FONT = {
  display: "'Fraunces', serif",
  body: "'Inter', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

// ---------------------------------------------------------------------------
// Reusable inline-style building blocks, shared across pages/components.
// Import and spread these into a component's own style object, e.g.
//   style={{ ...container, paddingTop: 40 }}
// ---------------------------------------------------------------------------

export const container: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "0 clamp(18px, 5vw, 24px)", // scales down gracefully on narrow phones
  width: "100%",
  boxSizing: "border-box",
};

export const section: CSSProperties = {
  padding: "88px 0",
};

export const sectionTint: CSSProperties = {
  ...section,
  background: COLORS.bgTint,
};

export const sectionDark: CSSProperties = {
  ...section,
  background: COLORS.blueDark,
  color: COLORS.white,
};

export const eyebrow: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: COLORS.blue,
  margin: "0 0 10px",
};

export const eyebrowLight: CSSProperties = {
  ...eyebrow,
  color: COLORS.blueLight,
};

export const heading: CSSProperties = {
  fontFamily: FONT.display,
  fontWeight: 600,
  lineHeight: 1.08,
  margin: 0,
  letterSpacing: "-0.01em",
  color: COLORS.blueDark,
};

export const btnBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 24px",
  borderRadius: 999,
  fontWeight: 600,
  fontSize: 15,
  border: "1px solid transparent",
  cursor: "pointer",
  textDecoration: "none",
  transition: "transform .18s ease, box-shadow .18s ease, background .18s ease",
};

export const btnPrimary: CSSProperties = {
  ...btnBase,
  background: COLORS.blue,
  color: COLORS.white,
  boxShadow: "0 12px 26px -14px rgba(47,111,234,.65)",
};

export const btnPrimaryHover: CSSProperties = {
  background: COLORS.blueMid,
  transform: "translateY(-2px)",
};

export const btnGhost: CSSProperties = {
  ...btnBase,
  background: "transparent",
  borderColor: COLORS.blueDark,
  color: COLORS.blueDark,
};

export const btnGhostHover: CSSProperties = {
  transform: "translateY(-2px)",
};

export const btnLight: CSSProperties = {
  ...btnBase,
  background: COLORS.white,
  color: COLORS.blueMid,
};

export const btnLightHover: CSSProperties = {
  transform: "translateY(-2px)",
};
