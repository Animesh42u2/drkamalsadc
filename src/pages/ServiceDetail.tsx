import { useEffect, useRef, useState, type FC } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence, animate, useInView, useMotionValue, useTransform, type Variants } from "framer-motion";
import { Phone, Plus, Minus, MessageCircle, ShieldCheck, Clock3 } from "lucide-react";
import { getServiceBySlug } from "../data/servicesConfig";
import { CLINIC, telLink, whatsappLink } from "../data/clinic";
import {
  COLORS,
  FONT,
  container,
  eyebrow,
  heading,
  btnPrimary,
  btnPrimaryHover,
  btnGhost,
  btnGhostHover,
  section,
  sectionTint,
} from "../theme";
import { useHover, useIsMobile } from "../hooks";

// Simple tooth-outline icon reused across the "Types of" grid.
const ToothIcon: FC<{ color: string }> = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3c-1.6 0-2.7.9-3.6.9-1 0-2.2-.9-3.6-.4C2.9 4.1 2 5.9 2 8.2c0 2.1.7 3.8 1.3 5.4.6 1.7 1.1 3.4 1.5 5.5.2 1.1.9 2 1.9 2 1.2 0 1.3-1.7 1.6-3 .3-1.4.7-2.7 1.7-2.7s1.4 1.3 1.7 2.7c.3 1.3.4 3 1.6 3 1 0 1.7-.9 1.9-2 .4-2.1.9-3.8 1.5-5.5.6-1.6 1.3-3.3 1.3-5.4 0-2.3-.9-4.1-2.8-4.7-1.4-.5-2.6.4-3.6.4z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon: FC<{ color: string }> = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M6 10.5l2.8 2.8 5-5.6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Bare checkmark (no outer ring) sized for sitting inside a colored badge circle.
const BadgeCheckIcon: FC<{ color: string }> = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M4.5 10.5l3.5 3.5 7-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Real WhatsApp glyph (brand mark), used instead of the generic chat-bubble icon.
const WhatsAppIcon: FC<{ size?: number; color?: string }> = ({ size = 14, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.7 2 12.04 2zm0 18.15h-.01c-1.51 0-2.99-.4-4.29-1.17l-.31-.18-3.11.82.83-3.04-.2-.31a8.192 8.192 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
  </svg>
);

// Small reusable dot-grid pattern used in the two top corners of the CTA
const DotGrid: FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: 90,
      height: 60,
      backgroundImage: `radial-gradient(rgba(255,255,255,0.35) 1.5px, transparent 1.5px)`,
      backgroundSize: "12px 12px",
      pointerEvents: "none",
      ...style,
    }}
  />
);

// "Types of [service]" card — on hover the card lifts, gains a blue border,
// and its background becomes fully visible/solid.
const TypeCard: FC<{ title: string; index: number }> = ({ title, index }) => {
  const hover = useHover();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      style={{
        background: COLORS.white,
        border: `1.5px solid ${hover.hovered ? COLORS.blue : COLORS.line}`,
        borderRadius: 14,
        padding: "22px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "default",
        transform: hover.hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover.hovered ? "0 16px 30px -12px rgba(10,37,89,.35)" : "0 0px 0px rgba(0,0,0,0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      {...hover.bind}
    >
      <ToothIcon color={COLORS.blue} />
      <p style={{ fontFamily: FONT.display, fontSize: 13.5, fontWeight: 600, color: COLORS.blueDark, margin: 0, textAlign: "center", lineHeight: 1.3 }}>
        {title}
      </p>
    </motion.div>
  );
};

// "Process of [service]" step card — on hover the panel becomes more visible
// (lighter fill) and gains a blue-tinted border.
const ProcessCard: FC<{ title: string; description: string; index: number }> = ({ title, description, index }) => {
  const hover = useHover();
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${hover.hovered ? COLORS.white : "rgba(255,255,255,0.1)"}`,
        borderRadius: 14,
        padding: 18,
        cursor: "default",
        transition: "border-color 0.25s ease",
      }}
      {...hover.bind}
    >
      <p
        style={{
          fontFamily: FONT.display,
          fontSize: 22,
          fontWeight: 700,
          color: hover.hovered ? COLORS.white : "rgba(255,255,255,0.35)",
          margin: "0 0 10px",
          transition: "color 0.25s ease",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 style={{ fontFamily: FONT.display, fontSize: 14.5, fontWeight: 600, color: COLORS.white, margin: "0 0 6px" }}>
        {title}
      </h3>
      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.55, margin: 0 }}>{description}</p>
    </div>
  );
};

// "What's Included" step card — numbered badge fills solid blue on hover,
// since these steps happen in a real, fixed order during the visit.
const IncludedCard: FC<{ title: string; description: string; index: number }> = ({ title, description, index }) => {
  const hover = useHover();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{
        background: COLORS.white,
        border: `1px solid ${hover.hovered ? COLORS.blue : COLORS.line}`,
        borderRadius: 16,
        padding: 22,
        cursor: "default",
        transform: hover.hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover.hovered ? "0 18px 34px -20px rgba(10,37,89,.4)" : "0 0px 0px rgba(0,0,0,0)",
        transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
      }}
      {...hover.bind}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hover.hovered ? COLORS.blue : COLORS.blueTint,
          color: hover.hovered ? COLORS.white : COLORS.blue,
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: 13,
          marginBottom: 16,
          transition: "background 0.25s ease, color 0.25s ease",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 style={{ fontFamily: FONT.display, fontSize: 16, fontWeight: 600, color: COLORS.blueDark, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontSize: 13.5, color: COLORS.textSoft, lineHeight: 1.6, margin: 0 }}>{description}</p>
    </motion.div>
  );
};

// "Consider this if…" card — not a sequence, so a check badge (not a number)
// marks each condition; the badge fills solid blue on hover.
const ForWhomCard: FC<{ title: string; description: string; index: number }> = ({ title, description, index }) => {
  const hover = useHover();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{
        background: COLORS.white,
        border: `1px solid ${hover.hovered ? COLORS.blue : COLORS.line}`,
        borderRadius: 16,
        padding: 22,
        cursor: "default",
        transform: hover.hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover.hovered ? "0 18px 34px -20px rgba(10,37,89,.4)" : "0 0px 0px rgba(0,0,0,0)",
        transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
      }}
      {...hover.bind}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hover.hovered ? COLORS.blue : COLORS.blueTint,
          marginBottom: 16,
          transition: "background 0.25s ease",
        }}
      >
        <BadgeCheckIcon color={hover.hovered ? COLORS.white : COLORS.blue} />
      </div>
      <h3 style={{ fontFamily: FONT.display, fontSize: 15.5, fontWeight: 600, color: COLORS.blueDark, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontSize: 13.5, color: COLORS.textSoft, lineHeight: 1.6, margin: 0 }}>{description}</p>
    </motion.div>
  );
};

// Animated stat — parses a value like "300+" or "96%" into a numeric target
// and a suffix, then counts up from 0 to that number once it scrolls into
// view. Same effect as the reference site's "0+ → 300+" counters.
const StatCounter: FC<{ value: string; label: string }> = ({ value, label }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Split "300+" into (300, "+") and "96%" into (96, "%"); falls back to
  // showing the raw string if it isn't a leading number (e.g. "24/7").
  const match = value.match(/^([\d,.]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView && target !== null) {
      const controls = animate(count, target, { duration: 1.6, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, target, count]);

  return (
    <div>
      <p
        ref={ref}
        style={{ fontFamily: FONT.display, fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: COLORS.blue, margin: 0 }}
      >
        {target !== null ? <motion.span>{rounded}</motion.span> : value}
        {suffix}
      </p>
      <p style={{ fontSize: 12.5, color: COLORS.textSoft, margin: "2px 0 0" }}>{label}</p>
    </div>
  );
};

const benefitsSection: React.CSSProperties = {
  background: `linear-gradient(135deg, ${COLORS.blueDark} 0%, #0a2559 100%)`,
  padding: "clamp(48px, 7vw, 88px) 0 clamp(40px, 6vw, 64px)",
};

const darkEyebrow: React.CSSProperties = {
  ...eyebrow,
  color: "rgba(255,255,255,0.65)",
};

const darkHeading: React.CSSProperties = {
  ...heading,
  color: COLORS.white,
};

// Reusable scroll-reveal variants so every section animates in consistently.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeFromLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const fadeFromRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Fallback content so any service entry that predates the What Is / Types /
// Benefits / Process / Checklist sections renders instead of crashing.
const FALLBACK_SECTION = {
  whatIs: { description: "", image: "/treatment-room-1.jpeg", stats: [] as { value: string; label: string }[] },
  types: [] as { title: string }[],
  benefits: { intro: "", image: "/treatment-room-2.jpeg", items: [] as { title: string; description: string }[] },
  process: [] as { title: string; description: string }[],
  checklist: { title: "", description: "", image: "/doctor-desk.jpeg", points: [] as string[] },
};

const ServiceDetail: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug ?? "");
  const isMobile = useIsMobile();
  const primaryHover = useHover();
  const ghostHover = useHover();
  const whatIsBtnHover = useHover();
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  if (!service) {
    return (
      <div style={{ ...container, padding: "120px 0", textAlign: "center" }}>
        <h1 style={{ ...heading, fontSize: 28, marginBottom: 12 }}>Service not found</h1>
        <p style={{ color: COLORS.textSoft, marginBottom: 24 }}>
          We couldn't find a service matching "{slug}".
        </p>
        <Link to="/Treatments" style={btnPrimary}>
          Back to Treatments
        </Link>
      </div>
    );
  }

  // Guard against older/incomplete entries in servicesConfig that predate
  // the What Is / Types / Benefits / Process / Checklist sections.
  const whatIs = service.whatIs ?? FALLBACK_SECTION.whatIs;
  const types = service.types ?? FALLBACK_SECTION.types;
  const benefits = service.benefits ?? FALLBACK_SECTION.benefits;
  const process = service.process ?? FALLBACK_SECTION.process;
  const checklist = service.checklist ?? FALLBACK_SECTION.checklist;

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `radial-gradient(ellipse at 85% 100%, ${COLORS.blueTint} 0%, transparent 55%), ${COLORS.white}`,
        }}
      >
        <div
          style={{
            ...container,
            paddingTop: "clamp(24px, 4vw, 56px)",
            paddingBottom: "clamp(32px, 5vw, 56px)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 24 : 48,
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: isMobile ? 2 : 1 }}
          >
            <motion.p variants={fadeUp} style={eyebrow}>{service.tagline}</motion.p>
            <motion.h1 variants={fadeUp} style={{ ...heading, fontSize: "clamp(28px, 5vw, 46px)", lineHeight: 1.12, marginBottom: 16 }}>
              {service.title}
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: COLORS.textSoft, fontSize: "clamp(14px, 2vw, 16px)", lineHeight: 1.65, marginBottom: 24 }}>
              {service.heroDescription}
            </motion.p>

            <motion.ul variants={fadeUp} style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
              {service.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: COLORS.textSoft, lineHeight: 1.55 }}
                >
                  <CheckIcon color={COLORS.blue} />
                  {b}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                style={
                  primaryHover.hovered
                    ? { ...btnPrimary, ...btnPrimaryHover, display: "inline-flex", alignItems: "center", gap: 10 }
                    : { ...btnPrimary, display: "inline-flex", alignItems: "center", gap: 10 }
                }
                {...primaryHover.bind}
              >
                <WhatsAppIcon size={16} color={COLORS.white} />
                Book on WhatsApp
              </a>
              <a
                href={telLink(CLINIC.phones[0])}
                style={ghostHover.hovered ? { ...btnGhost, ...btnGhostHover } : btnGhost}
                {...ghostHover.bind}
              >
                Call {CLINIC.phones[0]}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: isMobile ? 1 : 2, display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isMobile ? 480 : 560,
                height: "clamp(220px, 40vw, 420px)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(10,37,89,.18)",
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS [SERVICE] ── */}
      <section style={section}>
        <div
          style={{
            ...container,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 28 : 56,
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeFromLeft}
            style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: 1 }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(220px, 32vw, 360px)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(10,37,89,.14)",
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <img
                src={whatIs.image}
                alt={`What is ${service.title}`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeFromRight}
            style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: 2 }}
          >
            <p style={eyebrow}>Understanding the Treatment</p>
            <h2 style={{ ...heading, fontSize: "clamp(22px, 3.5vw, 34px)", marginBottom: 16 }}>
              What is {service.title}
            </h2>
            <p style={{ color: COLORS.textSoft, fontSize: 14.5, lineHeight: 1.7, marginBottom: 28 }}>
              {whatIs.description}
            </p>

            <div style={{ display: "flex", gap: 36, marginBottom: 28, flexWrap: "wrap" }}>
              {whatIs.stats.map((s, i) => (
                <StatCounter key={i} value={s.value} label={s.label} />
              ))}
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              style={whatIsBtnHover.hovered ? { ...btnPrimary, ...btnPrimaryHover } : btnPrimary}
              {...whatIsBtnHover.bind}
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── TYPES OF [SERVICE] ── */}
      {types.length > 0 && (
      <section style={sectionTint}>
        <div style={{ ...container, textAlign: "center" }}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            style={{ ...heading, fontSize: "clamp(20px, 3vw, 28px)", marginBottom: 28 }}
          >
            Types of {service.title}
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 16,
            }}
          >
            {types.map((t, i) => (
              <TypeCard key={i} title={t.title} index={i} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── WHAT'S INCLUDED ── */}
      <section style={section}>
        <div style={container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <p style={eyebrow}>What's Included</p>
            <h2 style={{ ...heading, fontSize: "clamp(22px, 3.5vw, 34px)", marginBottom: 32 }}>
              What happens during {service.title.toLowerCase()}
            </h2>
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {service.whatsIncluded.map((item, i) => (
              <IncludedCard key={i} title={item.title} description={item.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS (dark) ── */}
      <section style={benefitsSection}>
        <div style={container}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 24 : 48,
              alignItems: "center",
              marginBottom: 44,
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeFromLeft}
              style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: 1 }}
            >
              <h2 style={{ ...darkHeading, fontSize: "clamp(22px, 3.5vw, 32px)", marginBottom: 20 }}>
                Benefits of Choosing {service.title} In Our Clinic
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14.5, lineHeight: 1.75, margin: "0 0 28px" }}>
                {benefits.intro}
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: COLORS.blue,
                  color: COLORS.white,
                  padding: "13px 26px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14.5,
                  textDecoration: "none",
                }}
              >
                Book An Appointment
              </a>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeFromRight}
              style={{
                flex: isMobile ? "none" : "1 1 0%",
                width: "100%",
                order: 2,
                position: "relative",
                height: "clamp(200px, 28vw, 320px)",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <img
                src={benefits.image}
                alt={`Benefits of ${service.title}`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            {benefits.items.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.12)",
                      color: COLORS.white,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT.display,
                      fontWeight: 600,
                      fontSize: 12.5,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: COLORS.white, margin: 0, lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOR WHOM ── */}
      <section style={sectionTint}>
        <div style={container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <p style={eyebrow}>Is This For You?</p>
            <h2 style={{ ...heading, fontSize: "clamp(22px, 3.5vw, 34px)", marginBottom: 32 }}>
              Consider this if…
            </h2>
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {service.forWhom.map((item, i) => (
              <ForWhomCard key={i} title={item.title} description={item.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS (same color as Why Choose Us) ── */}
      <section style={benefitsSection}>
        <div style={container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <p style={darkEyebrow}>The Process</p>
            <h2 style={{ ...darkHeading, fontSize: "clamp(20px, 3vw, 28px)", marginBottom: 24 }}>
              Process of {service.title}
            </h2>
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {process.map((step, i) => (
              <ProcessCard key={i} title={step.title} description={step.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKLIST / REASSURANCE ── */}
      {checklist.title && (
      <section style={section}>
        <div
          style={{
            ...container,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 24 : 48,
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeFromLeft}
            style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: 1 }}
          >
            <h2 style={{ ...heading, fontSize: "clamp(20px, 3vw, 28px)", marginBottom: 14 }}>
              {checklist.title}
            </h2>
            <p style={{ color: COLORS.textSoft, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              {checklist.description}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {checklist.points.map((p, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: COLORS.textSoft, lineHeight: 1.55 }}>
                  <CheckIcon color={COLORS.blue} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeFromRight}
            style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", order: 2, display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isMobile ? 420 : 480,
                height: "clamp(220px, 32vw, 360px)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(10,37,89,.14)",
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <img
                src={checklist.image}
                alt={checklist.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>
      </section>
      )}
      {/* ── CTA ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${COLORS.blueDark} 0%, #0a2559 55%, ${COLORS.blue} 100%)`,
          padding: "clamp(56px, 8vw, 96px) 0 clamp(96px, 12vw, 140px)",
        }}
      >
        {/* decorative corner dot grids */}
        <DotGrid style={{ top: 28, left: 24 }} />
        <DotGrid style={{ top: 28, right: 24 }} />

        <div
          style={{
            ...container,
            position: "relative",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 32 : 48,
          }}
        >
          {/* Left: copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", textAlign: isMobile ? "center" : "left", order: isMobile ? 2 : 1 }}
          >
            <motion.div
              variants={fadeUp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 999,
                padding: "8px 18px",
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: COLORS.blue,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ToothIcon color={COLORS.white} />
              </span>
              <span style={{ color: COLORS.white, fontSize: 13.5, fontWeight: 500 }}>{service.tagline}</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: FONT.display,
                fontSize: "clamp(30px, 5vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: COLORS.white,
                margin: "0 0 20px",
              }}
            >
              Ready to book your{" "}
              <span style={{ color: "#5CC8FF" }}>{service.title.toLowerCase()}</span>?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 15.5,
                lineHeight: 1.7,
                margin: "0 0 30px",
                maxWidth: 460,
                marginLeft: isMobile ? "auto" : 0,
                marginRight: isMobile ? "auto" : 0,
              }}
            >
              {service.heroDescription}
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
                marginBottom: 34,
              }}
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: COLORS.white,
                  color: COLORS.blueDark,
                  padding: "13px 24px 13px 14px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#25D366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WhatsAppIcon size={14} color="#fff" />
                </span>
                Book on WhatsApp
              </a>

              <a
                href={telLink(CLINIC.phones[0])}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: COLORS.white,
                  padding: "13px 24px 13px 14px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Phone size={13} color={COLORS.white} />
                </span>
                Call {CLINIC.phones[0]}
              </a>
            </motion.div>

            {!isMobile && (
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: 28,
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              {[
                { icon: <ShieldCheck size={16} color={COLORS.white} />, title: "Safe & Hygienic", sub: "Sterilized environment" },
                { icon: <MessageCircle size={16} color={COLORS.white} />, title: "Expert Care", sub: "Experienced dentists" },
                { icon: <Clock3 size={16} color={COLORS.white} />, title: "Quick Recovery", sub: "Get back to your routine" },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {t.icon}
                  </span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.white, margin: 0 }}>{t.title}</p>
                    <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", margin: 0 }}>{t.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            )}
          </motion.div>

          {/* Right: glowing image on a platform — shown first on mobile, resized */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scaleIn}
            style={{ flex: "1 1 0%", width: "100%", display: "flex", justifyContent: "center", order: isMobile ? 1 : 2 }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: isMobile ? 280 : 420 }}>
              <div
                style={{
                  position: "absolute",
                  inset: "-10%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(92,200,255,0.35) 0%, transparent 70%)",
                  filter: "blur(10px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: isMobile ? 220 : 320,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  width: "80%",
                  height: 20,
                  margin: "18px auto 0",
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(92,200,255,0.4) 0%, transparent 70%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* curved bottom edge */}
        <svg
          viewBox="0 0 1440 80"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 80, display: "block" }}
          preserveAspectRatio="none"
        >
          <path d="M0,40 C360,90 1080,0 1440,40 L1440,80 L0,80 Z" fill={COLORS.white} />
        </svg>
      </section>

      {/* ── FAQ ── */}
      <section style={sectionTint}>
        <div
          style={{
            ...container,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 32 : 56,
            alignItems: "flex-start",
          }}
        >
          {/* Left: heading + contact card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            style={{ flex: isMobile ? "none" : "0 1 380px", width: "100%", minWidth: isMobile ? undefined : 280 }}
          >
            <p style={eyebrow}>FAQ</p>
            <h2 style={{ ...heading, fontSize: "clamp(24px, 3.5vw, 34px)", marginBottom: 14 }}>
              Everything you need to know about {service.title.toLowerCase()}
            </h2>
            <p style={{ color: COLORS.textSoft, fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
              Here are some common questions patients ask about {service.title.toLowerCase()}.
            </p>

            <div
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 18,
                padding: 20,
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                boxShadow: "0 12px 30px -20px rgba(10,37,89,.25)",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: COLORS.blueTint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Phone size={19} color={COLORS.blue} />
              </div>
              <div>
                <h3 style={{ fontFamily: FONT.display, fontSize: 15.5, fontWeight: 600, color: COLORS.blueDark, margin: "0 0 4px" }}>
                  Still Have Questions?
                </h3>
                <p style={{ fontSize: 13, color: COLORS.textSoft, lineHeight: 1.5, margin: "0 0 6px" }}>
                  We're happy to talk it through with you.
                </p>
                <a
                  href={telLink(CLINIC.phones[0])}
                  style={{ fontSize: 13.5, fontWeight: 600, color: COLORS.blue, textDecoration: "none" }}
                >
                  {CLINIC.phones[0]}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <div style={{ flex: isMobile ? "none" : "1 1 0%", width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            {service.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                  style={{
                    background: isOpen ? COLORS.blue : COLORS.white,
                    border: `1px solid ${isOpen ? COLORS.blue : COLORS.line}`,
                    borderRadius: 16,
                    padding: "18px 22px",
                    cursor: "pointer",
                    transition: "background 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <h3
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 15,
                        fontWeight: 600,
                        color: isOpen ? COLORS.white : COLORS.blueDark,
                        margin: 0,
                      }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: isOpen ? "rgba(255,255,255,0.2)" : COLORS.blueTint,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isOpen ? <Minus size={14} color={COLORS.white} /> : <Plus size={14} color={COLORS.blue} />}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontSize: 13.5,
                            color: "rgba(255,255,255,0.9)",
                            lineHeight: 1.65,
                            margin: "12px 0 0",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ServiceDetail;