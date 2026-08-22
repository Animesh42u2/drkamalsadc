import type { FC } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { SERVICES } from "../data/clinic";
import { COLORS, container, sectionTint, eyebrow, heading, btnPrimary } from "../theme";

// One image per service, matched by array position to SERVICES in data/clinic.ts.
const SERVICE_IMAGES: string[] = [
  "/extraction.jpg",            // Tooth Extraction
  "/dental-checkup.jpg",        // Dental Check-up
  "/root-canal.jpg",            // Root Canal Treatment (RCT)
  "/dental-xray.jpg",           // Dental X-Ray
  "/orthodontic.jpg",           // Orthodontic Treatment
  "/scaling-bleaching.jpg",     // Scaling & Bleaching
  "/crown-bridge-implant.jpg",  // Crown, Bridge & Implant
  "/tooth-filling.jpg",         // Tooth Filling (Normal, Cosmetic)
];

// framer-motion can animate a react-router Link directly
const MotionLink = motion.create(Link);

// --- Motion variants -------------------------------------------------------
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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const WhatWeOffer: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section style={sectionTint}>
      <style>{`
        .offer-card {
          background: ${COLORS.blueTint};
          border-radius: 18px;
          text-decoration: none;
          display: flex;
          align-items: stretch;
          min-height: 210px;
          transition: background 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
        }
        .offer-card:hover {
          background: ${COLORS.blue};
          box-shadow: 0 16px 32px -18px rgba(47,111,234,0.55);
        }

        .offer-card-content {
          flex: 1 1 auto;
          min-width: 0;
          padding: 24px 12px 24px 22px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .offer-card-title {
          font-size: 17px;
          line-height: 1.3;
          font-weight: 600;
          color: ${COLORS.blueDark};
          margin: 0 0 10px;
          transition: color 0.25s ease;
        }
        .offer-card:hover .offer-card-title {
          color: #fff;
        }
        .offer-card-link {
          font-size: 13px;
          font-weight: 600;
          color: ${COLORS.blue};
          white-space: nowrap;
          transition: color 0.25s ease;
        }
        .offer-card:hover .offer-card-link {
          color: #fff;
        }

        /* Fixed-size image frame: every photo is cropped to the same box,
           so cards line up no matter what aspect ratio the source photo is. */
        .offer-card-image-frame {
          flex: 0 0 55%;
          position: relative;
          overflow: hidden;
        }
        .offer-card-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.35s ease;
        }
        .offer-card:hover .offer-card-image {
          transform: scale(1.06);
        }
        /* soft fade where the photo meets the text so it never looks like a hard cut */
        .offer-card-image-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            ${COLORS.blueTint} 0%,
            rgba(0,0,0,0) 22%
          );
          z-index: 1;
          transition: background 0.25s ease;
        }
        .offer-card:hover .offer-card-image-frame::before {
          background: linear-gradient(
            90deg,
            ${COLORS.blue} 0%,
            rgba(0,0,0,0) 22%
          );
        }

        .offer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .offer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 44px;
          flex-wrap: wrap;
        }

        /* Tablet: 4 columns is too tight once the container narrows */
        @media (max-width: 1100px) {
          .offer-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .offer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .offer-grid { grid-template-columns: 1fr; }
          .offer-header { flex-direction: column; align-items: flex-start; }
          .offer-header a { align-self: flex-start; }
        }
        @media (max-width: 560px) {
          .offer-card { min-height: 170px; }
          .offer-card-content { padding: 20px 10px 20px 18px; }
          .offer-card-title { font-size: 16px; }
          .offer-card-image-frame { flex-basis: 48%; }
        }
        @media (max-width: 380px) {
          .offer-card { min-height: 190px; flex-direction: column; }
          .offer-card-image-frame { flex-basis: auto; height: 130px; order: 1; }
          .offer-card-content { padding: 16px 18px; order: 2; }
          .offer-card-image-frame::before { display: none; }
        }
      `}</style>

      <div style={container}>
        <motion.div
          className="offer-header"
          variants={headerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={fadeUp} style={{ maxWidth: 620 }}>
            <p style={eyebrow}>What We Offer</p>
            <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 38px)", marginBottom: 14 }}>
              Comprehensive <span style={{ color: COLORS.blue }}>Dental Services</span> For the Whole
              Family
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textSoft, margin: 0 }}>
              We provide a full range of dental care designed to meet the needs of every family
              member — from a child's first visit to adult restorative and cosmetic treatments,
              explained clearly in Odia or English.
            </p>
          </motion.div>

          <MotionLink
            to="/Treatments"
            style={{ ...btnPrimary, flexShrink: 0 }}
            variants={fadeUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Treatments
            <Plus size={16} style={{ marginLeft: 8 }} />
          </MotionLink>
        </motion.div>

        <motion.div
          className="offer-grid"
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((service, i) => {
            const image = SERVICE_IMAGES[i];
            return (
              <MotionLink
                key={service.slug}
                to={`/Treatments/${service.slug}`}
                className="offer-card"
                variants={cardItem}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -6 }
                }
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="offer-card-content">
                  <h3 className="offer-card-title">{service.en}</h3>
                  <span className="offer-card-link">Click here →</span>
                </div>
                <div className="offer-card-image-frame">
                  <img
                    src={image}
                    alt={service.en}
                    className="offer-card-image"
                    loading="lazy"
                  />
                </div>
              </MotionLink>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;