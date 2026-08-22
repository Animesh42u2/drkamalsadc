import type { FC } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Users, Cpu, Siren, type LucideIcon } from "lucide-react";
import { CLINIC } from "../data/clinic";
import {
  COLORS,
  FONT,
  container,
  eyebrowLight,
  btnPrimary,
  btnPrimaryHover,
} from "../theme";
import { useHover } from "../hooks";

// Swap for your real doctor photo — the composited version with the dental
// illustrations already baked in (about.png) works great here.
const DOCTOR_IMAGE = "/about.png";

type Reason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const REASONS: Reason[] = [
  {
    title: "Experienced Team",
    description: `Led by ${CLINIC.doctor}, our team comprises skilled professionals with specialized training to provide the best dental and aesthetic treatments.`,
    icon: Users,
  },
  {
    title: "Advanced Technology",
    description:
      "Our clinic is equipped with the latest dental and aesthetic technology to deliver precise, comfortable treatments.",
    icon: Cpu,
  },
  {
    title: "Emergency Services",
    description:
      "Get quick and efficient care for urgent dental and aesthetic issues when you need it.",
    icon: Siren,
  },
];

// Animation variants — explicitly typed as `Variants` so TS doesn't widen
// `ease: "easeOut"` to `string` (which breaks Framer Motion's expected type).
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
  },
};

const reasonsContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const reasonItem: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const WhyChooseUs: FC = () => {
  const ctaHover = useHover();

  return (
    <section
      style={{
        position: "relative",
        background: `linear-gradient(135deg, ${COLORS.blueMid} 0%, ${COLORS.blueDark} 60%, #081432 100%)`,
        overflow: "hidden",
        padding: "clamp(56px, 9vw, 96px) 0 0",
      }}
    >
      <style>{`
        .why-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 80% at 30% 20%, #000 40%, transparent 100%);
          pointer-events: none;
        }

        .why-layout {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1.05fr 1fr;
          align-items: end;
          gap: clamp(20px, 3vw, 32px);
        }

        .why-copy {
          padding-bottom: 72px;
        }
        .why-heading {
          font-family: ${FONT.display};
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: ${COLORS.white};
          line-height: 1.1;
          margin: 0 0 18px;
        }
        .why-desc {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255,255,255,0.68);
          max-width: 42ch;
          margin: 0 0 30px;
        }

        .why-photo-col {
          position: relative;
          display: flex;
          justify-content: center;
          align-self: stretch;
        }
        .why-photo-glow {
          position: absolute;
          top: 8%;
          left: 50%;
          width: 78%;
          aspect-ratio: 1 / 1;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(47,111,234,0.38), transparent 70%);
          filter: blur(4px);
        }
        .why-photo {
          position: relative;
          width: 100%;
          max-width: 380px;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .why-reasons {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3vw, 32px);
          padding-bottom: 72px;
        }
        .why-reason {
          display: flex;
          gap: 18px;
        }
        .why-reason-icon {
          flex: 0 0 auto;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: ${COLORS.blue};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 22px -10px rgba(47,111,234,0.7);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .why-reason:hover .why-reason-icon {
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 14px 26px -8px rgba(47,111,234,0.85);
        }
        .why-reason-title {
          font-family: ${FONT.body};
          font-size: 18.5px;
          font-weight: 700;
          color: ${COLORS.white};
          margin: 0 0 8px;
        }
        .why-reason-desc {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          margin: 0;
          max-width: 34ch;
        }

        @media (max-width: 980px) {
          .why-layout {
            grid-template-columns: 1fr;
            align-items: stretch;
          }
          .why-photo-col {
            order: -1;
            height: auto;
          }
          .why-photo-glow {
            width: 90%;
          }
          .why-photo {
            position: relative;
            width: 100%;
            height: auto;
            max-width: 300px;
            margin: 0 auto;
            border-radius: 24px;
            object-fit: contain;
            object-position: center;
          }
          .why-copy,
          .why-reasons {
            padding-bottom: 0;
          }
          .why-copy {
            padding-top: 8px;
            text-align: center;
          }
          .why-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .why-reasons {
            padding: 8px 0 56px;
          }
        }
        @media (max-width: 640px) {
          .why-reason { gap: 14px; }
          .why-reason-icon { width: 42px; height: 42px; border-radius: 10px; }
        }
        @media (max-width: 420px) {
          .why-heading { font-size: 26px; }
          .why-desc { max-width: none; font-size: 14px; }
          .why-reason-title { font-size: 17px; }
          .why-photo {
            max-width: 240px;
          }
        }
      `}</style>

      <div className="why-grid-lines" />

      <div style={{ ...container, position: "relative" }}>
        <div className="why-layout">
          {/* Left: copy */}
          <motion.div
            className="why-copy"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p style={eyebrowLight}>Our Clinic</p>
            <h2 className="why-heading">Why Choose Us</h2>
            <p className="why-desc">
              Choosing the right dentist can be a difficult decision, but {CLINIC.name} stands
              out for several reasons:
            </p>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} style={{ display: "inline-block" }}>
              <Link
                to="/about-us"
                style={ctaHover.hovered ? { ...btnPrimary, ...btnPrimaryHover } : btnPrimary}
                {...ctaHover.bind}
              >
                About Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Middle: photo, bleeds to the bottom of the section */}
          <motion.div
            className="why-photo-col"
            variants={photoReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="why-photo-glow" />
            <img src={DOCTOR_IMAGE} alt={CLINIC.doctor} className="why-photo" loading="lazy" />
          </motion.div>

          {/* Right: reasons list */}
          <motion.div
            className="why-reasons"
            variants={reasonsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div className="why-reason" key={reason.title} variants={reasonItem}>
                  <div className="why-reason-icon">
                    <Icon size={22} color={COLORS.white} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="why-reason-title">{reason.title}</h3>
                    <p className="why-reason-desc">{reason.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;