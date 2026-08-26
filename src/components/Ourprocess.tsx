import type { FC } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONT, container, btnPrimary, btnPrimaryHover } from "../theme";
import { useHover } from "../hooks";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "1",
    title: "Initial Consultation",
    description:
      "We assess your needs and discuss treatment options for giving optimal results.",
  },
  {
    number: "2",
    title: "Treatment By Experts",
    description:
      "Our skilled professionals deliver customized care by using advanced techniques.",
  },
  {
    number: "3",
    title: "Follow-Up Care",
    description:
      "We ensure lasting results through regular check-ups and personalized aftercare support.",
  },
  {
    number: "4",
    title: "Supportive Aftercare",
    description:
      "Ongoing support if you need further guidance — we want you to enjoy long-lasting results and a positive experience, so we're with you every step of the way.",
  },
];

const OurProcess: FC = () => {
  const ctaHover = useHover();

  return (
    <section
      style={{
        position: "relative",
        background: COLORS.white,
        padding: "clamp(56px, 9vw, 100px) 0",
      }}
    >
      <style>{`
        .process-layout {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: start;
        }

        .process-eyebrow {
          font-family: ${FONT.body};
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${COLORS.blue};
          margin: 0 0 14px;
        }
        .process-heading {
          font-family: ${FONT.display};
          font-size: clamp(28px, 3.6vw, 40px);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: ${COLORS.blueDark};
          line-height: 1.18;
          margin: 0 0 20px;
        }
        .process-heading .highlight {
          color: ${COLORS.blue};
        }
        .process-rule {
          width: 44px;
          height: 3px;
          background: ${COLORS.blue};
          border: none;
          margin: 0 0 24px;
        }
        .process-desc {
          font-size: 15px;
          line-height: 1.75;
          color: #56607a;
          max-width: 46ch;
          margin: 0 0 32px;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
        }
        .process-step {
          position: relative;
          display: flex;
          gap: 20px;
          padding: 18px 0;
        }
        .process-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 26px;
          top: 66px;
          width: 2px;
          height: calc(100% - 40px);
          background: rgba(47,111,234,0.18);
        }
        .process-step-num {
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: ${COLORS.blue};
          color: ${COLORS.white};
          font-family: ${FONT.display};
          font-size: 19px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 22px -10px rgba(47,111,234,0.55);
          transition: background 0.25s ease;
        }
        .process-step:hover .process-step-num {
          background: ${COLORS.blueDark};
        }
        .process-step-title {
          font-family: ${FONT.body};
          font-size: 20px;
          font-weight: 700;
          color: ${COLORS.blueDark};
          margin: 4px 0 8px;
        }
        .process-step-desc {
          font-size: 14.5px;
          line-height: 1.7;
          color: #5c6780;
          margin: 0;
          max-width: 46ch;
        }

        @media (max-width: 900px) {
          .process-layout {
            grid-template-columns: 1fr;
          }
          .process-desc { max-width: none; }
        }
        @media (max-width: 560px) {
          .process-step { gap: 14px; padding: 14px 0; }
          .process-step-num { width: 42px; height: 42px; font-size: 16px; }
          .process-step-title { font-size: 18px; }
          .process-step:not(:last-child)::after { left: 21px; top: 56px; }
        }
        @media (max-width: 420px) {
          .process-heading { font-size: 25px; }
          .process-desc { font-size: 14px; }
          .process-step-desc { font-size: 13.5px; }
        }
      `}</style>

      <div style={{ ...container, position: "relative" }}>
        <div className="process-layout">
          {/* Left: copy */}
          <div>
            <p className="process-eyebrow">Our Process</p>
            <h2 className="process-heading">
              Your Journey to a <span className="highlight">Confident Smile</span> Starts Here!
            </h2>
            <hr className="process-rule" />
            <p className="process-desc">
              The goal of our clinic is to provide caring and friendly dentistry services of the
              highest level. We provide specialist, general and cosmetic dental treatments.
            </p>
            <Link
              to="/Treatments"
              style={ctaHover.hovered ? { ...btnPrimary, ...btnPrimaryHover } : btnPrimary}
              {...ctaHover.bind}
            >
              Treatment
            </Link>
          </div>

          {/* Right: steps */}
          <div className="process-steps">
            {STEPS.map((step) => (
              <div className="process-step" key={step.number}>
                <div className="process-step-num">{step.number}</div>
                <div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;