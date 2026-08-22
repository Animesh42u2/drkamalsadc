import type { FC } from "react";
import { motion, type Variants } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { COLORS, container, eyebrow, heading } from "../theme";
import { CLINIC } from "../data/clinic";

// Swap these for your real photos.
const IMAGE_PRIMARY = "/smile.jpg";
const IMAGE_SECONDARY = "/smily.jpg";

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: "Patient Education and Empowerment",
    description:
      "We provide a full range of treatments, from routine check-ups to advanced cosmetic procedures for each unique patient.",
  },
  {
    title: "Safety First, Always",
    description:
      "Each patient receives individualized care designed to meet their unique needs enhancing both oral and aesthetic appeal.",
  },
];

// --- Motion variants -------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerList: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const visualIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const photoPrimaryIn: Variants = {
  hidden: { opacity: 0, y: 30, x: -20 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.15 },
  },
};

const photoSecondaryIn: Variants = {
  hidden: { opacity: 0, y: 30, x: 20 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.35 },
  },
};

const badgeIn: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.75 },
  },
};

const WhatSetsUsApart: FC = () => {
  return (
    <section style={{ padding: "80px 0", overflow: "hidden" }}>
      <style>{`
        .expertise-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }

        .expertise-divider {
          height: 1px;
          background: #e6e8f0;
          margin: 28px 0 26px;
          border: none;
        }

        .expertise-feature {
          display: flex;
          gap: 14px;
          margin-bottom: 22px;
        }
        .expertise-feature:last-child {
          margin-bottom: 0;
        }
        .expertise-feature-check {
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: ${COLORS.blue};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 3px;
        }
        .expertise-feature-title {
          font-size: 17px;
          font-weight: 700;
          color: ${COLORS.blueDark};
          margin: 0 0 6px;
        }
        .expertise-feature-desc {
          font-size: 14.5px;
          line-height: 1.65;
          color: ${COLORS.textSoft};
          margin: 0;
        }

        /* --- Image side --- */
        .expertise-visual {
          position: relative;
          width: 100%;
          max-width: 540px;
          aspect-ratio: 4 / 3;
          margin: 0 auto;
        }
        .expertise-blob {
          position: absolute;
          top: 7%;
          left: 5%;
          width: 88%;
          height: 88%;
          border-radius: 36px;
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 55%),
            linear-gradient(160deg, #14195c 0%, #0c1040 100%);
          overflow: hidden;
        }
        .expertise-blob::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.5;
          background-image: radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
        }
        /* soft glowing ring, purely decorative, drifts slowly */
        .expertise-blob::before {
          content: "";
          position: absolute;
          top: -20%;
          right: -20%;
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(90,120,255,0.35), transparent 70%);
          animation: expertise-drift 7s ease-in-out infinite;
        }
        @keyframes expertise-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-6%, 6%) scale(1.08); }
        }

        .expertise-photo {
          position: absolute;
          border-radius: 28px;
          object-fit: cover;
          box-shadow: 0 24px 48px -20px rgba(12,16,64,0.45);
        }
        .expertise-photo-primary {
          top: 0;
          left: 0;
          width: 44%;
          height: 78%;
          z-index: 2;
        }
        .expertise-photo-secondary {
          bottom: 0;
          right: 0;
          width: 42%;
          height: 74%;
          z-index: 3;
        }

        /* --- Floating badge inside the visible blue gap --- */
        .expertise-badge {
          position: absolute;
          top: 13%;
          left: 46%;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.96);
          border-radius: 999px;
          padding: 9px 16px 9px 10px;
          box-shadow: 0 12px 28px -10px rgba(8,10,40,0.55);
          cursor: default;
        }
        .expertise-badge-icon {
          flex: 0 0 auto;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: ${COLORS.blue};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .expertise-badge-text {
          font-size: 12.5px;
          font-weight: 700;
          color: ${COLORS.blueDark};
          white-space: nowrap;
        }
        .expertise-badge-dot {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #34d399;
          border: 2px solid #fff;
        }
        .expertise-badge-dot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #34d399;
          animation: expertise-pulse 1.8s ease-out infinite;
        }
        @keyframes expertise-pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @media (max-width: 900px) {
          .expertise-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .expertise-visual {
            max-width: 480px;
          }
        }
        @media (max-width: 600px) {
          section { padding: 56px 0 !important; }
          .expertise-visual {
            max-width: 400px;
          }
          .expertise-blob {
            border-radius: 26px;
          }
          .expertise-photo {
            border-radius: 20px;
          }
          .expertise-badge {
            padding: 7px 13px 7px 8px;
            gap: 6px;
          }
          .expertise-badge-icon {
            width: 22px;
            height: 22px;
          }
          .expertise-badge-text {
            font-size: 11px;
          }
        }
        @media (max-width: 480px) {
          .expertise-feature-title { font-size: 16px; }
          .expertise-feature-desc { font-size: 14px; }
          .expertise-visual { max-width: 320px; }
          .expertise-badge-text { font-size: 10px; }
        }

        /* Respect reduced-motion preference: framer-motion handles the JS
           side, this just makes sure the CSS loop animations calm down too. */
        @media (prefers-reduced-motion: reduce) {
          .expertise-blob::before,
          .expertise-badge-dot::after {
            animation: none;
          }
        }
      `}</style>

      <div style={container}>
        <div className="expertise-grid">
          {/* Left: copy */}
          <motion.div
            variants={staggerList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p variants={fadeUp} style={eyebrow}>
              Expertise
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ ...heading, fontSize: "clamp(26px, 3.6vw, 36px)", marginBottom: 18 }}
            >
              What Sets Us A part?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: 15, lineHeight: 1.75, color: COLORS.textSoft, margin: 0 }}
            >
              At {CLINIC.name}, we're here to guide you every step of the way, ensuring that
              you feel informed, comfortable, and confident in the care you receive. Start your
              journey with us today and discover a world of compassionate, expert care.
            </motion.p>

            <motion.hr variants={fadeUp} className="expertise-divider" />

            {FEATURES.map((feature) => (
              <motion.div className="expertise-feature" key={feature.title} variants={featureItem}>
                <div className="expertise-feature-check">
                  <Check size={14} color="#fff" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="expertise-feature-title">{feature.title}</h3>
                  <p className="expertise-feature-desc">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: overlapping photos over decorative blob */}
          <motion.div
            className="expertise-visual"
            variants={visualIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="expertise-blob" />
            <motion.img
              src={IMAGE_PRIMARY}
              alt="Patient receiving dental care"
              className="expertise-photo expertise-photo-primary"
              loading="lazy"
              variants={photoPrimaryIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
            <motion.img
              src={IMAGE_SECONDARY}
              alt="Dentist performing a procedure"
              className="expertise-photo expertise-photo-secondary"
              loading="lazy"
              variants={photoSecondaryIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
            <motion.div
              className="expertise-badge"
              variants={badgeIn}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <span className="expertise-badge-icon">
                <Sparkles size={13} color="#fff" strokeWidth={2.5} />
              </span>
              <span className="expertise-badge-text">3,000+ Happy Smiles</span>
              <span className="expertise-badge-dot" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;