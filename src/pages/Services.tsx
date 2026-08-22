import { useEffect, useRef, useState, type FC } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  ChevronDown,
  Mic,
  Video,
  PhoneOff,
  ArrowRight,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Users,
  MessageCircle,
} from "lucide-react";
import ToothMark from "../components/ToothMark";
import { SERVICES, TREATMENT_FAQS, CLINIC, whatsappLink, telLink } from "../data/clinic";
import { COLORS, container, section, sectionTint, eyebrow, heading } from "../theme";
import { Link } from "react-router-dom";

// Same image set used on the homepage "What We Offer" teaser, matched
// by array position to SERVICES in data/clinic.ts.
const SERVICE_IMAGES: string[] = [
  "/extraction.jpg",
  "/dental-checkup.jpg",
  "/root-canal.jpg",
  "/dental-xray.jpg",
  "/orthodontic.jpg",
  "/scaling-bleaching.jpg",
  "/crown-bridge-implant.jpg",
  "/tooth-filling.jpg",
];

const LARGE_COUNT = 2;

// --- Motion variants --------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const headerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

// --- "Why Choose Us" stat data ---------------------------------------------
const STAT_BARS = { satisfaction: 99, experience: 8, successRate: 98 };
const SUCCESS_SEGMENTS = 26; // number of little bars in the progress strip

// Staggered "fill in" animation for the success-rate progress bars.
const barStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.2 } },
};
const barItem: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

// Animates a number counting up from 0 to `target` once it scrolls into view.
const Counter: FC<{ target: number; suffix?: string; duration?: number }> = ({
  target,
  suffix = "",
  duration = 1.4,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

const Treatments: FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number>(-1);

  const filledSegments = Math.round((STAT_BARS.successRate / 100) * SUCCESS_SEGMENTS);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* HERO + TREATMENT GRID                                            */}
      {/* ---------------------------------------------------------------- */}
      <section style={section}>
        <style>{`
          .treat-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 18px;
            margin-top: 44px;
          }
          .treat-card {
            background: ${COLORS.blueTint};
            border-radius: 18px;
            text-decoration: none;
            display: flex;
            align-items: stretch;
            overflow: hidden;
            transition: background 0.25s ease, box-shadow 0.25s ease;
          }
          .treat-card:hover {
            background: ${COLORS.blue};
            box-shadow: 0 16px 32px -18px rgba(47,111,234,0.55);
          }
          .treat-card--lg { grid-column: span 3; min-height: 230px; }
          .treat-card--md { grid-column: span 2; min-height: 190px; }

          .treat-card-content {
            flex: 1 1 auto;
            min-width: 0;
            padding: 24px 12px 24px 22px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .treat-card-title {
            font-size: 17px;
            line-height: 1.3;
            font-weight: 600;
            color: ${COLORS.blueDark};
            margin: 0 0 10px;
            transition: color 0.25s ease;
          }
          .treat-card:hover .treat-card-title { color: #fff; }
          .treat-card-link {
            font-size: 13px;
            font-weight: 600;
            color: ${COLORS.blue};
            white-space: nowrap;
            transition: color 0.25s ease;
          }
          .treat-card:hover .treat-card-link { color: #fff; }

          .treat-card-image-frame {
            flex: 0 0 50%;
            position: relative;
            overflow: hidden;
          }
          .treat-card-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transition: transform 0.35s ease;
          }
          .treat-card:hover .treat-card-image { transform: scale(1.06); }

          @media (max-width: 900px) {
            .treat-grid { grid-template-columns: repeat(2, 1fr); }
            .treat-card--lg, .treat-card--md { grid-column: span 1; min-height: 190px; }
          }
          @media (max-width: 560px) {
            .treat-grid { grid-template-columns: 1fr; }
            .treat-card-content { padding: 20px 10px 20px 18px; }
          }
        `}</style>

        <div style={container}>
          <motion.div
            variants={headerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            style={{ textAlign: "center" }}
          >
            <motion.p
              variants={fadeUp}
              style={{ ...eyebrow, letterSpacing: "2.5px", fontWeight: 700 }}
            >
              OUR TREATMENT
            </motion.p>
            <motion.h1
              variants={fadeUp}
              style={{
                ...heading,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4.2vw, 42px)",
                lineHeight: 1.2,
                marginBottom: 18,
              }}
            >
              Complete Dental Care Built Around Your{" "}
              <span style={{ color: COLORS.blue }}>Healthy Smile</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: COLORS.textSoft,
                margin: "0 auto",
                maxWidth: 980,
              }}
            >
              A confident smile says a lot about you, and at {CLINIC.name}, we make
              sure it gets the attention it deserves. Dental care goes far beyond
              appearance — it plays a vital role in your overall wellbeing. If you're
              looking for dependable, all-round dental treatment, you've found the
              right clinic.
            </motion.p>
          </motion.div>

          <motion.div
            className="treat-grid"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {SERVICES.map((service, i) => {
              const image = SERVICE_IMAGES[i];
              const size = i < LARGE_COUNT ? "lg" : "md";
              return (
                <motion.div
  key={service.en}
  className={`treat-card treat-card--${size}`}
  variants={cardItem}
  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
  transition={{ type: "spring", stiffness: 260, damping: 22 }}
>
  <Link to={`/Treatments/${service.slug}`} style={{ display: "flex", width: "100%", textDecoration: "none" }}>
                  <div className="treat-card-content">
                    <h3 className="treat-card-title">{service.en}</h3>
                    <span className="treat-card-link">Click here →</span>
                  </div>
                  <div className="treat-card-image-frame">
                    <img src={image} alt={service.en} className="treat-card-image" loading="lazy" />
                  </div>
                                 </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHY CHOOSE US                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section style={sectionTint}>
        <style>{`
          .why-wrap {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: center;
          }
          .why-left-cards {
            display: grid;
            grid-template-columns: minmax(180px, 240px) 1fr;
            gap: 22px;
            align-items: center;
            margin-top: 32px;
          }
          .why-video-card {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            aspect-ratio: 3 / 3.4;
            background: ${COLORS.blueTint};
          }
          .why-video-card img.main {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .why-mini-avatar {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 46px;
            height: 46px;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid #fff;
            box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          }
          .why-mini-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .why-call-bar {
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 10px;
            display: flex;
            justify-content: center;
            gap: 10px;
            background: rgba(10, 15, 35, 0.55);
            backdrop-filter: blur(6px);
            border-radius: 999px;
            padding: 8px;
          }
          .why-call-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.18);
          }
          .why-call-btn--end { background: #E5484D; }

          .why-avatars {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 10px 0 14px;
          }
          .why-avatars .stack {
            display: flex;
          }
          .why-avatars .stack img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #fff;
            margin-left: -8px;
          }
          .why-avatars .stack img:first-child { margin-left: 0; }

          .why-right-photo {
            position: relative;
            border-radius: 22px;
            overflow: hidden;
          }
          .why-right-photo img.main {
            width: 100%;
            display: block;
            object-fit: cover;
            aspect-ratio: 4 / 3.1;
          }
          .why-float-card {
            position: relative;
            margin-top: -54px;
            margin-left: 20px;
            margin-right: 20px;
            background: #fff;
            border-radius: 16px;
            padding: 18px 22px;
            box-shadow: 0 20px 40px -20px rgba(20,30,60,0.3);
          }
          .why-float-row {
            display: flex;
            justify-content: space-between;
            gap: 20px;
          }
          .why-float-stat .value {
            font-size: 20px;
            font-weight: 700;
            color: ${COLORS.blueDark};
          }
          .why-float-stat .label {
            font-size: 12px;
            color: ${COLORS.textSoft};
            margin-top: 2px;
          }
          .why-divider {
            width: 1px;
            background: #e6e9f2;
          }
          .why-progress {
            margin-top: 16px;
          }
          .why-progress-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: ${COLORS.textSoft};
            margin-bottom: 8px;
          }
          .why-progress-bars {
            display: flex;
            gap: 3px;
          }
          .why-progress-bars span {
            flex: 1;
            height: 8px;
            border-radius: 3px;
            background: #e3e8f5;
            transform-origin: left center;
          }
          .why-progress-bars span.filled { background: ${COLORS.blue}; }

          @media (max-width: 900px) {
            .why-wrap { grid-template-columns: 1fr; }
            .why-left-cards { grid-template-columns: 1fr; }
            .why-video-card { max-width: 260px; margin: 0 auto; }
          }
          @media (max-width: 560px) {
            .why-float-card { margin-left: 8px; margin-right: 8px; padding: 16px; }
            .why-float-row { flex-wrap: wrap; gap: 14px; }
            .why-float-stat .value { font-size: 18px; }
          }
        `}</style>

        <div style={container}>
          <motion.div
            className="why-wrap"
            variants={headerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* LEFT: heading + video-call style photo + copy */}
            <div>
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
              >
                <span style={{ ...eyebrow, letterSpacing: "2px" }}>[ WHY CHOOSE US ]</span>
                <span style={{ flex: 1, height: 1, background: "#d7ddef" }} />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                style={{ ...heading, fontSize: "clamp(24px, 3.4vw, 34px)", marginBottom: 14 }}
              >
                Why Choose Us for Exceptional Dental Care
              </motion.h2>

              <motion.p
                variants={fadeUp}
                style={{ fontSize: 14.5, lineHeight: 1.75, color: COLORS.textSoft, maxWidth: 480 }}
              >
                Discover compassionate care, advanced technology, and an experienced dental
                team dedicated to keeping your smile healthy, beautiful, and confident.
              </motion.p>

              <motion.div className="why-left-cards" variants={fadeUp}>
                <div className="why-video-card">
                  <img className="main" src="/vc.avif" alt={CLINIC.doctor} />
                  <div className="why-mini-avatar">
                    <img src="/about.png" alt="" />
                  </div>
                  <div className="why-call-bar">
                    <div className="why-call-btn">
                      <Mic size={14} color="#fff" />
                    </div>
                    <div className="why-call-btn">
                      <Video size={14} color="#fff" />
                    </div>
                    <div className="why-call-btn why-call-btn--end">
                      <PhoneOff size={14} color="#fff" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: "0 0 2px", fontSize: 17, fontWeight: 700, color: COLORS.blueDark }}>
                    Experienced Dental Team
                  </h4>
                  <p style={{ margin: 0, fontSize: 13, color: COLORS.textSoft }}>
                    Committed to Healthy Smiles
                  </p>

                  <div className="why-avatars">
                    <div className="stack">
                      <img src="/patient-1.jpg" alt="" />
                      <img src="/patient-2.jpg" alt="" />
                      <img src="/patient-3.jpg" alt="" />
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.blueDark }}>
                      Trusted by 3,000+ Patients
                    </span>
                  </div>

                  <p style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.textSoft, marginBottom: 18 }}>
                    Dedicated to providing gentle, precise, and patient-focused dental care with
                    advanced techniques, personalized treatment plans, and results you can trust
                    for every smile.
                  </p>

                  <motion.a
                    href="/Treatments"
                    whileHover={prefersReducedMotion ? undefined : { x: 3 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: COLORS.blueTint,
                      color: COLORS.blue,
                      fontSize: 13,
                      fontWeight: 700,
                      padding: "10px 8px 10px 18px",
                      borderRadius: 999,
                      textDecoration: "none",
                    }}
                  >
                    Our Treatments
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
                      <ArrowRight size={14} color="#fff" />
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: clinic photo + floating stats card */}
            <motion.div variants={fadeUp}>
              <div className="why-right-photo">
                <img className="main" src="/treatment-room-2.jpeg" alt="Treatment chair" />
              </div>

              <div className="why-float-card">
                <div className="why-float-row">
                  <div className="why-float-stat">
                    <div className="value">
                      <Counter target={STAT_BARS.satisfaction} suffix="%" />
                    </div>
                    <div className="label">Patient Satisfaction</div>
                  </div>
                  <div className="why-divider" />
                  <div className="why-float-stat">
                    <div className="value">
                      <Counter target={STAT_BARS.experience} suffix="+ Years" />
                    </div>
                    <div className="label">Years of Experience</div>
                  </div>
                </div>

                <div className="why-progress">
                  <div className="why-progress-row">
                    <span>Treatment Success Rate</span>
                    <span style={{ color: COLORS.blueDark, fontWeight: 700 }}>
                      <Counter target={STAT_BARS.successRate} suffix="%" />
                    </span>
                  </div>
                  <motion.div
                    className="why-progress-bars"
                    variants={barStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                  >
                    {Array.from({ length: SUCCESS_SEGMENTS }).map((_, i) =>
                      i < filledSegments ? (
                        <motion.span key={i} className="filled" variants={barItem} />
                      ) : (
                        <span key={i} />
                      )
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section style={section}>
        <style>{`
          .cta-card {
            position: relative;
            overflow: hidden;
            border-radius: 44px;
            background: #F5F8FE;
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            min-height: 560px;
            box-shadow: 0 40px 80px -40px rgba(20,30,60,0.28);
          }
          .cta-dots {
            position: absolute;
            top: 40px;
            left: 40px;
            width: 78px;
            height: 50px;
            background-image: radial-gradient(${COLORS.blue}55 1.8px, transparent 1.8px);
            background-size: 13px 13px;
            z-index: 1;
            pointer-events: none;
          }
          .cta-left {
            position: relative;
            z-index: 2;
            padding: 64px 56px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .cta-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            align-self: flex-start;
            background: #EAF0FC;
            color: ${COLORS.blue};
            font-size: 12.5px;
            font-weight: 700;
            letter-spacing: 0.6px;
            padding: 7px 18px 7px 7px;
            border-radius: 999px;
            margin-bottom: 26px;
          }
          .cta-badge-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: ${COLORS.blue};
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .cta-heading {
            font-family: Georgia, 'Times New Roman', serif;
            font-weight: 700;
            color: ${COLORS.blueDark};
            font-size: clamp(32px, 4.6vw, 50px);
            line-height: 1.14;
            margin: 0 0 22px;
          }
          .cta-buttons {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin: 28px 0 36px;
          }
          .cta-trust-row {
            display: flex;
            align-items: flex-start;
            gap: 28px;
            flex-wrap: wrap;
          }
          .cta-trust-item {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .cta-trust-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #EAF0FC;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .cta-trust-item strong {
            display: block;
            font-size: 13.5px;
            font-weight: 700;
            color: ${COLORS.blueDark};
            white-space: nowrap;
          }
          .cta-trust-item span {
            font-size: 11.5px;
            color: ${COLORS.textSoft};
            white-space: nowrap;
          }

          .cta-right {
            position: relative;
            overflow: hidden;
            border-top-left-radius: 260px;
          }
          .cta-right img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .cta-wave {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 42%;
            z-index: 2;
            pointer-events: none;
          }
          .cta-wave svg { width: 100%; height: 100%; display: block; }
          .cta-floating-badge {
            position: absolute;
            right: 26px;
            bottom: 26px;
            z-index: 3;
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255,255,255,0.14);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.55);
            border-radius: 18px;
            padding: 13px 20px;
            max-width: 280px;
          }
          .cta-floating-badge strong {
            display: block;
            font-size: 13px;
            font-weight: 700;
            color: #fff;
          }
          .cta-floating-badge span {
            font-size: 11.5px;
            color: rgba(255,255,255,0.9);
          }

          @media (max-width: 900px) {
            .cta-card { grid-template-columns: 1fr; border-radius: 32px; }
            .cta-right { min-height: 340px; border-top-left-radius: 0; border-top-right-radius: 0; }
            .cta-left { padding: 40px 28px 36px; order: 2; }
            .cta-right { order: 1; }
            .cta-floating-badge { left: 20px; right: 20px; max-width: none; bottom: 18px; }
            .cta-heading { font-size: clamp(28px, 7vw, 38px); }
          }
          @media (max-width: 560px) {
            .cta-left { padding: 32px 20px 30px; }
            .cta-buttons { flex-direction: column; }
            .cta-buttons a { justify-content: center; width: 100%; }
            .cta-trust-row { gap: 16px; }
            .cta-trust-item strong, .cta-trust-item span { white-space: normal; }
            .cta-floating-badge { padding: 11px 16px; }
            .cta-floating-badge strong { font-size: 12px; }
            .cta-floating-badge span { font-size: 10.5px; }
          }
        `}</style>

        <div style={container}>
          <motion.div
            className="cta-card"
            variants={headerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="cta-dots" />

            <div className="cta-left">
              <motion.span variants={fadeUp} className="cta-badge">
                <span className="cta-badge-icon">
                  <ToothMark style={{ width: 14, height: 15 }} color="#fff" />
                </span>
                YOUR SMILE, OUR PRIORITY
              </motion.span>

              <motion.h2 variants={fadeUp} className="cta-heading">
                Ready for a Healthier, Brighter{" "}
                <span style={{ color: COLORS.blue }}>Smile?</span>{" "}
                <Sparkles size={26} style={{ verticalAlign: "middle", color: COLORS.blue, opacity: 0.75 }} />
                <Sparkles
                  size={16}
                  style={{ verticalAlign: "top", color: COLORS.blue, opacity: 0.5, marginLeft: 2 }}
                />
              </motion.h2>

              <motion.p
                variants={fadeUp}
                style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: COLORS.textSoft, maxWidth: 460 }}
              >
                Book your visit at {CLINIC.name} today — clear guidance in Odia or English,
                and a treatment plan built around you.
              </motion.p>

              <motion.div variants={fadeUp} className="cta-buttons">
                <motion.a
                  href={whatsappLink("Hi, I'd like to book an appointment.")}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: COLORS.blue,
                    color: "#fff",
                    fontSize: 14.5,
                    fontWeight: 700,
                    padding: "14px 26px",
                    borderRadius: 999,
                    textDecoration: "none",
                    boxShadow: `0 16px 28px -14px ${COLORS.blue}99`,
                  }}
                >
                  <MessageCircle size={17} />
                  Book on WhatsApp
                </motion.a>
                <motion.a
                  href={telLink(CLINIC.phones[0])}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#fff",
                    border: "1px solid #d7ddef",
                    color: COLORS.blue,
                    fontSize: 14.5,
                    fontWeight: 700,
                    padding: "14px 26px",
                    borderRadius: 999,
                    textDecoration: "none",
                  }}
                >
                  <PhoneCall size={17} />
                  Call Now
                </motion.a>
              </motion.div>

              <motion.div variants={fadeUp} className="cta-trust-row">
                <div className="cta-trust-item">
                  <span className="cta-trust-icon">
                    <ShieldCheck size={17} color={COLORS.blue} />
                  </span>
                  <div>
                    <strong>Trusted Care</strong>
                    <span>Expert &amp; Compassionate</span>
                  </div>
                </div>
                <div className="cta-trust-item">
                  <span className="cta-trust-icon">
                    <Users size={17} color={COLORS.blue} />
                  </span>
                  <div>
                    <strong>Personalized Plans</strong>
                    <span>Made Just for You</span>
                  </div>
                </div>
                <div className="cta-trust-item">
                  <span className="cta-trust-icon">
                    <Sparkles size={17} color={COLORS.blue} />
                  </span>
                  <div>
                    <strong>Modern Technology</strong>
                    <span>Comfortable &amp; Safe</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="cta-right">
              <img src="/ptt.png" alt="Smiling patient at Anupama Dental Clinic" />

              <div className="cta-wave">
                <svg viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ctaWaveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={COLORS.blue} />
                      <stop offset="100%" stopColor="#2450C9" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,120 C90,55 200,15 300,35 C390,53 450,95 500,55 L500,200 L0,200 Z"
                    fill="url(#ctaWaveGradient)"
                  />
                </svg>
              </div>

              <div className="cta-floating-badge">
                <ShieldCheck size={20} color="#fff" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Your smile is safe with us.</strong>
                  <span>Book today. Smile tomorrow.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section style={section}>
        <style>{`
          @media (max-width: 560px) {
            .faq-item { padding: 16px 18px !important; }
            .faq-question { font-size: 14px !important; }
          }
        `}</style>
        <div style={{ ...container, maxWidth: 760 }}>
          <motion.div
            variants={headerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            style={{ textAlign: "center", marginBottom: 36 }}
          >
            <motion.p variants={fadeUp} style={eyebrow}>
              FAQs
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ ...heading, fontSize: "clamp(24px, 3vw, 32px)", margin: "0 auto" }}
            >
              Everything You Need To Know Regarding Dental Care
            </motion.h2>
          </motion.div>

          <motion.div
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {TREATMENT_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.question}
                  variants={fadeUp}
                  className="faq-item"
                  style={{
                    borderRadius: 20,
                    background: isOpen ? COLORS.blue : "#fff",
                    boxShadow: isOpen
                      ? "0 16px 32px -18px rgba(47,111,234,0.55)"
                      : "0 6px 20px -14px rgba(20,30,60,0.18)",
                    padding: "20px 24px",
                    cursor: "pointer",
                    transition: "background 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <span
                      className="faq-question"
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: isOpen ? "#fff" : COLORS.blueDark,
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ flexShrink: 0, display: "flex", color: isOpen ? "#fff" : COLORS.blueDark }}
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </div>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        margin: "14px 0 0",
                        fontSize: 13.5,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Treatments;