import type { FC } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import { CLINIC, NAV_LINKS, HOURS, whatsappLink, telLink } from "../data/clinic";
import { COLORS, container } from "../theme";

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// Simple bespoke icons for the social row (kept as inline SVGs so we don't
// depend on lucide's brand-icon coverage, which varies by version).
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.53 17.52 2.04 12 2.04S2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
  </svg>
);

// TODO: replace with your real Facebook and YouTube page URLs.
const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/anupama_dental_clinic/", Icon: InstagramIcon },
  { name: "Facebook", href: "https://www.facebook.com/", Icon: FacebookIcon },
  { name: "YouTube", href: "https://www.youtube.com/", Icon: YouTubeIcon },
];

// Real Google Maps link for the clinic — used for the "Open in Maps" button.
// The embedded iframe below uses a plain address-search embed (no API key needed);
// swap it for an official embed code from Google Maps' "Share > Embed a map" if
// you'd rather pin the exact marker.
const MAPS_LINK = "https://maps.app.goo.gl/cQ9JGPrewKCoDdwA7?g_st=aw";
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  CLINIC.name + ", " + CLINIC.address
)}&output=embed`;

const Footer: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showScroll, setShowScroll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollHover, setScrollHover] = useState(false);
  const circumference = 2 * Math.PI * 16;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShowScroll(scrollTop > 300);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      style={{
        background: `linear-gradient(180deg, ${COLORS.blueDark} 0%, #0d1c33 45%, #081432 100%)`,
        color: "rgba(255,255,255,0.72)",
      }}
    >
      <style>{`
        .footer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          font-size: 14px;
          padding: 5px 0;
          transition: color 0.2s, padding-left 0.2s;
        }
        .footer-link:hover { color: ${COLORS.white}; padding-left: 4px; }
        .footer-link::before {
          content: '›';
          color: ${COLORS.blue};
          font-size: 16px;
          font-weight: bold;
          flex-shrink: 0;
        }
        .footer-col-title {
          font-size: 16px;
          font-weight: 700;
          color: ${COLORS.white};
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(255,255,255,0.78);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .footer-contact-item a { color: inherit; text-decoration: none; }
        .footer-contact-item a:hover { color: ${COLORS.white}; }
        .footer-map-container {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          position: relative;
        }
        .footer-map-open {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          background: ${COLORS.white};
          color: ${COLORS.blueDark};
          font-size: 12px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          transition: background 0.2s, color 0.2s;
        }
        .footer-map-open:hover {
          background: ${COLORS.blue};
          color: ${COLORS.white};
        }
        .footer-bottom {
          text-align: center;
          padding: 16px 5%;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 36px 32px;
          margin-bottom: 40px;
        }
        .footer-brand-name {
          font-size: 18px;
          font-weight: 700;
          color: ${COLORS.white};
          margin-bottom: 14px;
          cursor: pointer;
        }
        .footer-brand-sub {
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          margin-top: 4px;
        }
        .footer-tagline {
          font-size: 14px;
          line-height: 1.75;
          margin: 0 0 20px;
          color: rgba(255,255,255,0.72);
        }

        /* Social icon row */
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .footer-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          color: ${COLORS.blueDark};
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .footer-social-btn:hover {
          background: ${COLORS.blue};
          color: ${COLORS.white};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }

        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px 28px; }
        }
        @media (max-width: 720px) {
          .footer-inner { padding: 40px 6% 28px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px 24px; margin-bottom: 32px; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; margin-bottom: 28px; }
          .footer-inner { padding: 32px 6% 24px !important; }
          .footer-map-container iframe { height: 200px !important; }
          .footer-map-open { font-size: 11px; padding: 5px 9px; }
          .footer-socials { gap: 10px; }
          .footer-social-btn { width: 36px; height: 36px; }
        }
        @media (max-width: 380px) {
          .footer-brand-name { font-size: 16px; }
          .footer-col-title { font-size: 15px; }
          .footer-contact-item, .footer-link, .footer-tagline { font-size: 13.5px; }
          .footer-social-btn { width: 34px; height: 34px; }
        }

        /* Scroll to top */
        .scroll-top-btn {
          position: fixed; bottom: 90px; right: 20px; z-index: 1001;
          width: 44px; height: 44px; border-radius: 50%;
          cursor: pointer;
          background: rgba(8,20,50,0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 4px 20px rgba(0,0,0,0.35);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
        }
        .scroll-top-btn.hidden-btn { opacity: 0; pointer-events: none; transform: translateY(10px); }
        .scroll-top-btn.visible-btn { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .scroll-top-btn:hover { background: ${COLORS.blue}; border-color: ${COLORS.blue}; transform: translateY(-3px); }
        .scroll-top-svg { position: absolute; top: 0; left: 0; width: 44px; height: 44px; transform: rotate(-90deg); border-radius: 50%; }
        .scroll-top-track { fill: none; stroke: rgba(255,255,255,0.2); stroke-width: 2; }
        .scroll-top-progress { fill: none; stroke: ${COLORS.blue}; stroke-width: 2; stroke-linecap: round; transition: stroke-dashoffset 0.15s linear; }

        /* WhatsApp */
        @keyframes wa-ping {
          0% { transform: scale(1); opacity: 0.4; }
          80%, 100% { transform: scale(1.9); opacity: 0; }
        }
        .wa-wrapper {
          position: fixed; bottom: 22px; right: 20px; z-index: 1001;
          width: 52px; height: 52px;
          display: flex; align-items: center; justify-content: center;
        }
        .wa-ping {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(37,211,102,0.35);
          animation: wa-ping 2.4s ease-out infinite;
          pointer-events: none;
        }
        .wa-btn {
          position: relative; z-index: 1;
          width: 52px; height: 52px; border-radius: 50%;
          background: #25d366;
          display: flex; align-items: center; justify-content: center;
          color: white; text-decoration: none;
          box-shadow: 0 4px 16px rgba(37,211,102,0.4);
          transition: all 0.3s ease;
        }
        .wa-btn:hover { transform: translateY(-3px) scale(1.07); background: #20c45e; }

        @media (max-width: 480px) {
          .scroll-top-btn { bottom: 82px; right: 14px; width: 40px; height: 40px; }
          .scroll-top-svg { width: 40px; height: 40px; }
          .wa-wrapper { bottom: 18px; right: 14px; width: 46px; height: 46px; }
          .wa-btn { width: 46px; height: 46px; }
        }
      `}</style>

      <div className="footer-inner" style={{ ...container, padding: "48px 24px 36px" }}>
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div>
            <div
              className="footer-brand-name"
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                }
              }}
            >
              {CLINIC.doctor}
              <div className="footer-brand-sub">Anupama Dental Clinic</div>
            </div>
            <p className="footer-tagline">{CLINIC.tagline}</p>

            {/* Social icons — Instagram first */}
            <div className="footer-socials">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="footer-social-btn"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {NAV_LINKS.map((item) => (
                <Link key={item.to} to={item.to} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Hours */}
          <div>
            <div className="footer-col-title">Clinic Hours</div>
            {HOURS.map((h) => (
              <div key={h.day} className="footer-contact-item">
                <Clock size={15} color={COLORS.blue} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  {h.day}
                  <br />
                  {h.time}
                </span>
              </div>
            ))}
          </div>

          {/* Column 4: Contact */}
          <div>
            <div className="footer-col-title">Contact Us</div>
            {CLINIC.phones.map((phone) => (
              <div key={phone} className="footer-contact-item">
                <Phone size={15} color={COLORS.blue} style={{ flexShrink: 0, marginTop: 2 }} />
                <a href={telLink(phone)}>+91 {phone}</a>
              </div>
            ))}
            <div className="footer-contact-item">
              <Mail size={15} color={COLORS.blue} style={{ flexShrink: 0, marginTop: 2 }} />
              <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
            </div>
            <div className="footer-contact-item">
              <MapPin size={15} color={COLORS.blue} style={{ flexShrink: 0, marginTop: 3 }} />
              <span>{CLINIC.address}</span>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="footer-map-container">
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="footer-map-open">
            Open in Maps ↗
          </a>
          <iframe
            src={MAPS_EMBED_SRC}
            width="100%"
            height="260"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${CLINIC.name} location`}
          />
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} {CLINIC.name} — All appointments by phone or WhatsApp.
      </div>

      {/* Scroll To Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={() => setScrollHover(true)}
        onMouseLeave={() => setScrollHover(false)}
        className={`scroll-top-btn ${showScroll ? "visible-btn" : "hidden-btn"}`}
        aria-label="Scroll to top"
      >
        <svg className="scroll-top-svg" viewBox="0 0 44 44">
          <circle className="scroll-top-track" cx="22" cy="22" r="16" />
          <circle
            className="scroll-top-progress"
            cx="22"
            cy="22"
            r="16"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (scrollProgress / 100) * circumference}
          />
        </svg>
        <ArrowUp
          size={16}
          color={scrollHover ? COLORS.blueDark : COLORS.white}
          style={{ position: "relative", zIndex: 1 }}
        />
      </button>

      {/* WhatsApp Floating */}
      <div className="wa-wrapper">
        <span className="wa-ping" />
        <a
          href={whatsappLink("Hi, I'd like to book an appointment at Anupama Dental Clinic.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="wa-btn"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;