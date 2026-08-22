import type { FC } from "react";
import { Link } from "react-router-dom";
import { CLINIC, STATS } from "../data/clinic";
import { COLORS, FONT, container, eyebrow, heading, btnPrimary, btnPrimaryHover } from "../theme";
import { useHover, useIsMobile } from "../hooks";

const AboutSection: FC = () => {
  const isMobile = useIsMobile();
  const ctaHover = useHover();

  const blobStyle = {
    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    width: "100%",
    height: "100%",
  };

  return (
    <section style={{ background: COLORS.white, padding: "clamp(48px, 9vw, 88px) 0" }}>
      <div style={container}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: "clamp(28px, 6vw, 64px)",
          }}
        >
          {/* ── PHOTO COLLAGE ── */}
          <div
            style={{
              flex: isMobile ? "none" : "0.95 1 0%",
              width: "100%",
              maxWidth: "clamp(300px, 42vw, 460px)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "clamp(10px, 2vw, 16px)",
                aspectRatio: "1 / 1",
              }}
            >
              {/* top-left: decorative blob */}
              <div style={{ ...blobStyle, background: COLORS.blue }} />

              {/* top-right: photo */}
              <div style={{ borderRadius: 20, overflow: "hidden" }}>
                <img
                  src="/treatment-room-1.jpeg"
                  alt="Dental treatment in progress"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* bottom-left: photo */}
              <div style={{ borderRadius: 20, overflow: "hidden" }}>
                <img
                  src="/waiting-area.jpeg"
                  alt="Clinic waiting area"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* bottom-right: decorative blob */}
              <div style={{ ...blobStyle, background: COLORS.blueTint }} />
            </div>
          </div>

          {/* ── CONTENT ── */}
          <div style={{ flex: isMobile ? "none" : "1.05 1 0%", width: "100%" }}>
            <p style={eyebrow}>About Us</p>

            <h2
              style={{
                ...heading,
                fontSize: "clamp(28px, 4.5vw, 40px)",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Commitment to your <span style={{ color: COLORS.blue }}>Smile's Health</span> and Beauty
            </h2>

            <p
              style={{
                fontSize: "clamp(14px, 1.8vw, 15.5px)",
                color: COLORS.textSoft,
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: "50ch",
              }}
            >
              Welcome to {CLINIC.name}, where we believe everyone deserves a healthy, confident
              smile. Whether it's a routine check-up, a cosmetic procedure, or specialised dental
              care, our goal is to protect your dental health and bring out your natural smile.
            </p>

            {/* ── STAT BOXES ── */}
            <div style={{ display: "flex", gap: "clamp(12px, 2.5vw, 16px)", marginBottom: 32, flexWrap: "wrap" }}>
              {STATS.slice(0, 2).map((s) => (
                <div
                  key={s.label}
                  style={{
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 14,
                    padding: "clamp(14px, 2.5vw, 18px) clamp(18px, 3.5vw, 24px)",
                    minWidth: "clamp(120px, 30vw, 140px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: "clamp(24px, 4vw, 30px)",
                      fontWeight: 600,
                      color: COLORS.blue,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textSoft, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* ── CTA + DOCTOR MINI-PROFILE ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 24px)", flexWrap: "wrap" }}>
              <Link
                to="/about-us"
                style={ctaHover.hovered ? { ...btnPrimary, ...btnPrimaryHover } : btnPrimary}
                {...ctaHover.bind}
              >
                More About →
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                  src="/doctor-desk.jpeg"
                  alt={CLINIC.doctor}
                  style={{
                    width: "clamp(40px, 6vw, 48px)",
                    height: "clamp(40px, 6vw, 48px)",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${COLORS.blueTint}`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5, color: COLORS.text }}>{CLINIC.doctor}</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textSoft }}>Founder & Chief Dentist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;