import type { FC } from "react";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand, ImageOff } from "lucide-react";
import Reveal from "../components/Reveal";
import { COLORS, FONT, container } from "../theme";

/* -----------------------------------------------------------
   YOUR IMAGES
   Replace each src with your own photo (import it or point to
   a path in /public). Order here is the order they render in,
   left to right, top to bottom.

   NOTE: if a tile shows a placeholder icon instead of a photo,
   it means that file hasn't been uploaded to /public yet with
   this exact filename — the code path is correct, the file is
   just missing.
------------------------------------------------------------*/
const GALLERY_IMAGES: { src: string; alt: string }[] = [
  { src: "/award.jpeg", alt: "Award ceremony" },
  { src: "/MLA.jpeg", alt: "With MLA (Udala) Bhaskar sir" },
  { src: "/inaguration.png", alt: "Clinic inauguration, with Pramila Panda Madam, Chairperson of Udala N.A.C." },
  { src: "/child.jpeg", alt: "Dental awareness camp for children" },
  { src: "/schoolcamp.jpeg", alt: "School dental checkup camp" },
  { src: "/extraction.jpeg", alt: "Tooth extraction procedure" },
  { src: "/pediatric.jpeg", alt: "Pediatric dental checkup" },
  { src: "/fullmouth.jpeg", alt: "Full mouth rehabilitation, before and after" },
  { src: "/veneers.jpeg", alt: "Dental crown fitting procedure" },
  { src: "/cystremoval.jpeg", alt: "Oral cyst removal, before and after" },
  { src: "/dentures.jpeg", alt: "Full denture fitting, before and after" },
  { src: "/rootcanal.jpeg", alt: "Root canal treatment X-ray" },
];

const GalleryTile: FC<{
  src: string;
  alt: string;
  onOpen: () => void;
}> = ({ src, alt, onOpen }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="gallery-tile gallery-tile-missing" aria-label={`${alt} (image unavailable)`}>
        <ImageOff size={22} color={COLORS.textSoft} strokeWidth={1.6} />
        <span className="gallery-missing-text">{alt}</span>
      </div>
    );
  }

  return (
    <button type="button" className="gallery-tile" onClick={onOpen} aria-label={`View ${alt}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="gallery-img"
        onError={() => setFailed(true)}
      />
      <div className="gallery-overlay">
        <span className="gallery-overlay-icon">
          <Expand size={18} color={COLORS.white} strokeWidth={2.2} />
        </span>
        <span className="gallery-caption">{alt}</span>
      </div>
    </button>
  );
};

const Lightbox: FC<{
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}> = ({ images, index, onClose, onNav }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNav]);

  const current = images[index];

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close preview"
      >
        <X size={20} color={COLORS.white} strokeWidth={2.4} />
      </button>

      <button
        type="button"
        className="lightbox-nav lightbox-nav-prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={22} color={COLORS.white} strokeWidth={2.4} />
      </button>

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.alt} className="lightbox-img" />
        <figcaption className="lightbox-caption">{current.alt}</figcaption>
      </figure>

      <button
        type="button"
        className="lightbox-nav lightbox-nav-next"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        aria-label="Next image"
      >
        <ChevronRight size={22} color={COLORS.white} strokeWidth={2.4} />
      </button>
    </div>
  );
};

const Gallery: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleNav = (dir: 1 | -1) => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      const next = (prev + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
      return next;
    });
  };

  return (
    <section className="gallery-section">
      <style>{`
        .gallery-section {
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #f6f5fb 100%);
          padding: clamp(48px, 8vw, 88px) 0;
          overflow: hidden;
        }
        .gallery-section::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -120px;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(47,111,234,0.10) 0%, rgba(47,111,234,0) 70%);
          pointer-events: none;
        }
        .gallery-section::after {
          content: "";
          position: absolute;
          bottom: -140px;
          left: -140px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(47,111,234,0.08) 0%, rgba(47,111,234,0) 70%);
          pointer-events: none;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: clamp(28px, 5vw, 44px);
          position: relative;
        }
        .gallery-eyebrow {
          font-family: ${FONT.body};
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${COLORS.blue};
          margin: 0 0 12px;
        }
        .gallery-heading {
          font-family: ${FONT.display};
          font-size: clamp(26px, 3.6vw, 40px);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: ${COLORS.blueDark};
          margin: 0 0 12px;
          line-height: 1.15;
        }
        .gallery-subtext {
          font-family: ${FONT.body};
          font-size: clamp(14px, 1.6vw, 16px);
          color: ${COLORS.textSoft};
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .gallery-underline {
          width: 56px;
          height: 3px;
          border-radius: 999px;
          background: ${COLORS.blue};
          margin: 18px auto 0;
        }

        .gallery-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.4vw, 26px);
        }

        .gallery-tile {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid ${COLORS.line};
          background: #F4F6FA;
          padding: 0;
          cursor: pointer;
          display: block;
          width: 100%;
          box-shadow: 0 2px 8px rgba(11,27,51,0.08);
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
        }
        .gallery-tile:hover,
        .gallery-tile:focus-visible {
          box-shadow: 0 24px 44px -16px rgba(11,27,51,0.32), 0 0 0 1px rgba(47,111,234,0.15);
          transform: translateY(-6px) scale(1.015);
          border-color: rgba(47,111,234,0.35);
          outline: none;
        }
        .gallery-tile-missing {
          cursor: default;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          text-align: center;
        }
        .gallery-tile-missing:hover {
          transform: none;
          box-shadow: 0 1px 3px rgba(11,27,51,0.06);
        }
        .gallery-missing-text {
          font-family: ${FONT.body};
          font-size: 11.5px;
          color: ${COLORS.textSoft};
          line-height: 1.4;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gallery-tile:hover .gallery-img,
        .gallery-tile:focus-visible .gallery-img {
          transform: scale(1.1);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 10px;
          padding: 20px;
          background: linear-gradient(180deg, rgba(11,27,51,0) 40%, rgba(11,27,51,0.78) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gallery-tile:hover .gallery-overlay,
        .gallery-tile:focus-visible .gallery-overlay {
          opacity: 1;
        }
        .gallery-overlay-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(47,111,234,0.95);
          box-shadow: 0 4px 14px rgba(47,111,234,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(8px);
          transition: transform 0.3s ease;
        }
        .gallery-tile:hover .gallery-overlay-icon,
        .gallery-tile:focus-visible .gallery-overlay-icon {
          transform: translateY(0);
        }
        .gallery-caption {
          font-family: ${FONT.body};
          font-size: 14px;
          font-weight: 600;
          color: ${COLORS.white};
          line-height: 1.35;
        }

        /* ---------- Lightbox ---------- */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8,14,28,0.88);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .lightbox-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .lightbox-close:hover {
          background: rgba(255,255,255,0.22);
        }
        .lightbox-nav {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .lightbox-nav:hover {
          background: rgba(255,255,255,0.22);
        }
        .lightbox-figure {
          margin: 0 18px;
          max-width: min(860px, 78vw);
          max-height: 82vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .lightbox-img {
          max-width: 100%;
          max-height: 72vh;
          border-radius: 12px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.45);
          object-fit: contain;
        }
        .lightbox-caption {
          font-family: ${FONT.body};
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          text-align: center;
        }

        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .gallery-tile {
            aspect-ratio: 16 / 11;
            border-radius: 16px;
          }
          .gallery-caption { font-size: 13px; }
          .gallery-overlay-icon { width: 34px; height: 34px; }
          .lightbox-figure {
            max-width: 92vw;
            margin: 0 10px;
          }
          .lightbox-nav {
            width: 38px;
            height: 38px;
          }
        }
        @media (max-width: 380px) {
          .gallery-tile { border-radius: 12px; }
        }
      `}</style>

      <div style={{ ...container, position: "relative" }}>
        <div className="gallery-header">
          <p className="gallery-eyebrow">Moments Worth Sharing</p>
          <h2 className="gallery-heading">Our Gallery</h2>
          <p className="gallery-subtext">
            A look inside our clinic — awards, procedures, and the smiles we get to be part of every day.
          </p>
          <div className="gallery-underline" />
        </div>

        <div className="gallery-grid">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.src} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <GalleryTile src={img.src} alt={img.alt} onOpen={() => setActiveIndex(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNav={handleNav}
        />
      )}
    </section>
  );
};

export default Gallery;