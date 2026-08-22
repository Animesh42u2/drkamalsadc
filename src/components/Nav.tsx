import { useEffect, useRef, useState, type FC } from "react";
import { NavLink, Link } from "react-router-dom";
import { CLINIC, NAV_LINKS, SERVICES, whatsappLink } from "../data/clinic";
import { COLORS, FONT, container } from "../theme";
import { useIsMobile } from "../hooks";

const Nav: FC = () => {
  const [open, setOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobile, open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setTreatmentsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setTreatmentsOpen(true);
  };
  const closeDropdownDelayed = () => {
    closeTimer.current = setTimeout(() => setTreatmentsOpen(false), 150);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${COLORS.line}`,
      }}
    >
      <div
        ref={navRef}
        style={{
          ...container,
          paddingTop: 8,
          paddingBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: "clamp(12px, 4vw, 24px)",
          position: "relative",
        }}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: FONT.display,
            fontWeight: 600,
            marginRight: "auto",
            color: COLORS.blueDark,
            minWidth: 0,
          }}
        >
          <img
            src="/logo.jpeg"
            alt={`${CLINIC.name} logo`}
            style={{
              height: "clamp(34px, 6vw, 48px)",
              width: "auto",
              borderRadius: 6,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.2,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: "clamp(10px, 2.4vw, 12px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Dr. Kamal's
            </span>
            <span
              style={{
                fontSize: "clamp(12px, 3vw, 15px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Anupama Dental Clinic
            </span>
          </span>
        </NavLink>

        {!isMobile && (
          <nav style={{ display: "flex", gap: 26, fontSize: 14, fontWeight: 500 }}>
            {NAV_LINKS.map((link) => {
              const isTreatments = link.to === "/Treatments";

              if (!isTreatments) {
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      color: isActive ? COLORS.blue : COLORS.textSoft,
                      borderBottom: isActive ? `2px solid ${COLORS.blue}` : "2px solid transparent",
                      paddingBottom: 2,
                      whiteSpace: "nowrap",
                    })}
                  >
                    {link.label}
                  </NavLink>
                );
              }

              return (
                <div
                  key={link.to}
                  style={{ position: "relative" }}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdownDelayed}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: isActive || treatmentsOpen ? COLORS.blue : COLORS.textSoft,
                      borderBottom: isActive ? `2px solid ${COLORS.blue}` : "2px solid transparent",
                      paddingBottom: 2,
                      whiteSpace: "nowrap",
                    })}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      style={{
                        transform: treatmentsOpen ? "rotate(180deg)" : "none",
                        transition: "transform .2s ease",
                        flexShrink: 0,
                      }}
                    >
                      <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </NavLink>

                  {/* ── Single-column services dropdown ── */}
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 14px)",
                      left: 0,
                      width: 260,
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 24px 48px -16px rgba(10,37,89,.35)",
                      opacity: treatmentsOpen ? 1 : 0,
                      transform: treatmentsOpen ? "translateY(0)" : "translateY(-8px)",
                      pointerEvents: treatmentsOpen ? "auto" : "none",
                      transition: "opacity .2s ease, transform .2s ease",
                      zIndex: 50,
                    }}
                  >
                    {SERVICES.map((s, i) => (
                      <Link
                        key={s.slug}
                        to={`/Treatments/${s.slug}`}
                        onClick={() => setTreatmentsOpen(false)}
                        className="nav-service-row"
                        style={{
                          display: "block",
                          background: COLORS.blueDark,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          padding: "14px 18px",
                          borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)",
                          transition: "background .18s ease, padding-left .18s ease",
                        }}
                      >
                        {s.en}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        )}

        {!isMobile && (
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            style={{
              background: COLORS.blue,
              color: COLORS.white,
              padding: "9px 16px",
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Book on WhatsApp
          </a>
        )}

        {isMobile && (
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              background: "none",
              border: 0,
              padding: 6,
              cursor: "pointer",
              flexShrink: 0,
              zIndex: 41,
            }}
          >
            <span
              style={{
                width: 20,
                height: 2,
                background: COLORS.blueDark,
                display: "block",
                transition: "transform .2s ease, opacity .2s ease",
                transform: open ? "translateY(3.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                width: 20,
                height: 2,
                background: COLORS.blueDark,
                display: "block",
                transition: "transform .2s ease, opacity .2s ease",
                transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        )}

        {isMobile && open && (
          <nav
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "calc(100vh - 60px)",
              overflowY: "auto",
              background: COLORS.white,
              display: "flex",
              flexDirection: "column",
              padding: "16px 24px 20px",
              borderBottom: `1px solid ${COLORS.line}`,
              gap: 14,
              boxShadow: "0 12px 24px rgba(0,0,0,.08)",
            }}
          >
            {NAV_LINKS.map((link) => {
              const isTreatments = link.to === "/Treatments";

              if (!isTreatments) {
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      color: isActive ? COLORS.blue : COLORS.textSoft,
                      fontSize: 15,
                      fontWeight: 500,
                      paddingBottom: 2,
                      borderBottom: isActive ? `2px solid ${COLORS.blue}` : "2px solid transparent",
                    })}
                  >
                    {link.label}
                  </NavLink>
                );
              }

              return (
                <div key={link.to}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      style={({ isActive }) => ({
                        color: isActive ? COLORS.blue : COLORS.textSoft,
                        fontSize: 15,
                        fontWeight: 500,
                        paddingBottom: 2,
                        borderBottom: isActive ? `2px solid ${COLORS.blue}` : "2px solid transparent",
                      })}
                    >
                      {link.label}
                    </NavLink>
                    <button
                      aria-label="Toggle services list"
                      aria-expanded={mobileTreatmentsOpen}
                      onClick={() => setMobileTreatmentsOpen((v) => !v)}
                      style={{
                        background: "none",
                        border: 0,
                        padding: 6,
                        cursor: "pointer",
                        display: "flex",
                        color: COLORS.textSoft,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 10 10"
                        style={{
                          transform: mobileTreatmentsOpen ? "rotate(180deg)" : "none",
                          transition: "transform .2s ease",
                        }}
                      >
                        <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {mobileTreatmentsOpen && (
                    <div
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        marginTop: 12,
                      }}
                    >
                      {SERVICES.map((s, i) => (
                        <Link
                          key={s.slug}
                          to={`/Treatments/${s.slug}`}
                          onClick={() => setOpen(false)}
                          style={{
                            display: "block",
                            background: COLORS.blueDark,
                            color: "#fff",
                            fontSize: 12.5,
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            padding: "12px 16px",
                            borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)",
                          }}
                        >
                          {s.en}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              style={{
                background: COLORS.blue,
                color: COLORS.white,
                padding: "12px 18px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                marginTop: 6,
              }}
            >
              Book on WhatsApp
            </a>
          </nav>
        )}
      </div>

      {!isMobile && (
        <style>{`
          .nav-service-row:hover {
            background: ${COLORS.blue} !important;
            padding-left: 24px !important;
          }
        `}</style>
      )}
    </header>
  );
};

export default Nav;