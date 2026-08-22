import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS, FONT, container } from "../theme";
import { useHover } from "../hooks";

type Story = {
  id: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

// Swap these for your real before/after photo pairs.
const STORIES: Story[] = [
  {
    id: "story-1",
    before: "/before.jpeg",
    after: "/after.jpeg",
    beforeAlt: "Patient smile before treatment",
    afterAlt: "Patient smile after treatment",
  },
  {
    id: "story-2",
    before: "/be.jpeg",
    after: "/af.jpeg",
    beforeAlt: "Patient smile before treatment",
    afterAlt: "Patient smile after treatment",
  },
];

type SliderProps = {
  story: Story;
};

const BeforeAfterSlider: FC<SliderProps> = ({ story }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [frameWidth, setFrameWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setFrameWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };
  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="slider-frame"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <img src={story.after} alt={story.afterAlt} className="slider-img" draggable={false} />
      <div className="slider-clip" style={{ width: `${position}%` }}>
        <img
          src={story.before}
          alt={story.beforeAlt}
          className="slider-img"
          style={frameWidth ? { width: frameWidth, maxWidth: frameWidth } : undefined}
          draggable={false}
        />
      </div>

      <div className="slider-divider" style={{ left: `${position}%` }}>
        <div className="slider-handle">
          <ChevronLeft size={14} color={COLORS.white} strokeWidth={2.5} />
          <ChevronRight size={14} color={COLORS.white} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

const SuccessStories: FC = () => {
  const ctaHover = useHover();

  return (
    <section
      style={{
        position: "relative",
        background: "#f6f5fb",
        padding: "clamp(48px, 8vw, 88px) 0",
      }}
    >
      <style>{`
        .success-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
        }
        .success-eyebrow {
          font-family: ${FONT.body};
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${COLORS.blue};
          margin: 0 0 12px;
        }
        .success-heading {
          font-family: ${FONT.display};
          font-size: clamp(26px, 3.4vw, 38px);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: ${COLORS.blueDark};
          margin: 0;
          line-height: 1.15;
        }
        .success-contact-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: ${COLORS.blue};
          color: ${COLORS.white};
          font-family: ${FONT.body};
          font-size: 14.5px;
          font-weight: 700;
          text-decoration: none;
          padding: 13px 24px;
          border-radius: 999px;
          box-shadow: 0 10px 22px -10px rgba(47,111,234,0.55);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .success-contact-btn:hover {
          background: ${COLORS.blueDark};
          transform: translateY(-2px);
        }

        .success-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .slider-frame {
          position: relative;
          width: 100%;
          /* Wider/shorter ratio so full lips fit instead of getting cropped
             top and bottom by object-fit: cover on a square frame. */
          aspect-ratio: 4 / 3;
          border-radius: 20px;
          overflow: hidden;
          cursor: ew-resize;
          user-select: none;
          touch-action: pan-y;
          background: #ddd;
        }
        .slider-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 45%;
          pointer-events: none;
        }
        .slider-clip {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          overflow: hidden;
        }
        .slider-divider {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.85);
          transform: translateX(-1px);
          pointer-events: none;
        }
        .slider-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(20,30,50,0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          pointer-events: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .slider-frame:hover .slider-handle {
          background: ${COLORS.blue};
          transform: translate(-50%, -50%) scale(1.08);
        }

        @media (max-width: 780px) {
          .success-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .success-grid {
            grid-template-columns: 1fr;
          }
          .slider-frame {
            aspect-ratio: 16 / 11;
          }
        }
        @media (max-width: 420px) {
          .success-heading { font-size: 24px; }
          .slider-handle { width: 34px; height: 34px; }
          .slider-frame {
            aspect-ratio: 4 / 3;
          }
        }
      `}</style>

      <div style={{ ...container, position: "relative" }}>
        <div className="success-header">
          <div>
            <p className="success-eyebrow">Our Success Stories</p>
            <h2 className="success-heading">The proof is in our patients' smiles.</h2>
          </div>
          <Link
            to="/contact"
            className="success-contact-btn"
            style={ctaHover.hovered ? { transform: "translateY(-2px)", background: COLORS.blueDark } : undefined}
            {...ctaHover.bind}
          >
            Contact +
          </Link>
        </div>

        <div className="success-grid">
          <BeforeAfterSlider story={STORIES[0]} />
          <BeforeAfterSlider story={STORIES[1]} />
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;