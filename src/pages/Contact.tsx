import { useState } from "react";
import type { FC } from "react";
import {
  Mail, Phone, MapPin, Send, User, MessageSquare,
  FileText, ChevronDown, Clock, Sparkles, PenLine,
} from "lucide-react";
import { CLINIC, HOURS, SERVICES, telLink, whatsappLink } from "../data/clinic";
import { COLORS, FONT, container } from "../theme";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  CLINIC.name + ", " + CLINIC.address
)}&output=embed`;

const contactInfo = [
  { icon: Phone, label: "Phone", value: CLINIC.phones.join(", "), href: telLink(CLINIC.phones[0]) },
  { icon: Mail, label: "Email", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
  { icon: MapPin, label: "Address", value: CLINIC.address, href: "#map" },
];

const subjects = ["Select Service", ...SERVICES.map((s) => s.en), "Something else"];

const CUSTOM_SUBJECT_VALUE = "Something else";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  customSubject: string;
  message: string;
};

const ContactUs: FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", subject: "Select Service", customSubject: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isCustomSubject = form.subject === CUSTOM_SUBJECT_VALUE;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    if (form.subject === "Select Service") e.subject = "Please select a service";
    if (isCustomSubject && !form.customSubject.trim()) e.customSubject = "Please describe your concern";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const serviceLine = isCustomSubject ? `Other: ${form.customSubject}` : form.subject;

    const summary = [
      `New enquiry from the website:`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Service: ${serviceLine}`,
      `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(summary), "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "Select Service", customSubject: "", message: "" });
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const field = (key: keyof FormState, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleSubjectChange = (val: string) => {
    field("subject", val);
    // Clear any leftover custom text (and its error) if the patient switches
    // away from "Something else" back to a listed service.
    if (val !== CUSTOM_SUBJECT_VALUE) {
      setForm((f) => ({ ...f, customSubject: "" }));
      setErrors((e) => ({ ...e, customSubject: "" }));
    }
  };

  const inputStyle = (hasErr: boolean): React.CSSProperties => ({
    width: "100%",
    boxSizing: "border-box",
    padding: "0.75rem 1rem",
    borderRadius: 10,
    border: `1.5px solid ${hasErr ? "#d94040" : "rgba(47,111,234,0.28)"}`,
    background: hasErr ? "#fff5f5" : "#fff",
    fontSize: "0.9rem",
    color: COLORS.blueDark,
    outline: "none",
    fontFamily: FONT.body,
    transition: "border-color 0.2s",
  });

  return (
    <div style={{ background: "#f6f8fd", minHeight: "100vh", fontFamily: FONT.body, overflowX: "hidden", width: "100%" }}>
      <style>{`
        @keyframes cu-fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .cu-fade { animation: cu-fadeUp 0.55s ease forwards; }
        .cu-info-row:hover .cu-info-val { color: ${COLORS.blue} !important; }
        .cu-submit:hover:not(:disabled) {
          background: ${COLORS.blueDark} !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(8,20,50,0.35) !important;
        }
        .cu-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        input:focus, textarea:focus, select:focus {
          border-color: ${COLORS.blue} !important;
          box-shadow: 0 0 0 3px rgba(47,111,234,0.15);
        }

        .cu-hero {
          position: relative;
          overflow: hidden;
          padding: clamp(4rem, 10vw, 7rem) clamp(1rem, 5vw, 3rem) clamp(5rem, 11vw, 8rem);
          text-align: center;
          min-height: min(80vh, 620px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${COLORS.blueDark};
        }
        .cu-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 45%;
          z-index: 0;
        }
        .cu-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8,20,50,0.72) 0%, rgba(24,58,140,0.55) 55%, rgba(8,20,50,0.75) 100%);
          z-index: 1;
        }
        .cu-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 20%, #000 40%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        .cu-hero-content { position: relative; z-index: 2; max-width: 100%; }
        .cu-hero-title {
          font-family: ${FONT.display};
          font-size: clamp(1.7rem, 5vw, 3rem);
          font-weight: 600;
          line-height: 1.18;
          color: ${COLORS.white};
          margin: 0 0 0.85rem;
          text-shadow: 0 2px 14px rgba(0,0,0,0.4);
        }
        .cu-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.32);
          border-radius: 20px;
          padding: 5px 16px;
          font-size: 12px;
          color: ${COLORS.white};
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          max-width: 100%;
          white-space: nowrap;
        }
        .cu-hero-sub {
          color: rgba(255,255,255,0.85);
          font-size: clamp(0.85rem, 2vw, 1rem);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.75;
          text-shadow: 0 1px 8px rgba(0,0,0,0.35);
        }
        .cu-hero-curve {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 56px;
          background: #f6f8fd;
          clip-path: ellipse(55% 100% at 50% 100%);
          z-index: 3;
        }

        /* minmax(0, ...) on every track is the key fix: without it, a grid
           track's implicit minimum width is "auto" (based on content), so a
           form field that's even slightly too wide silently forces the whole
           grid — and the page — wider than the viewport, shoving the right
           sidebar off-screen. minmax(0, 1fr) lets tracks shrink below their
           content size instead of overflowing. */
        .cu-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 380px);
          gap: 1.75rem;
          align-items: start;
          width: 100%;
        }
        .cu-phone-subject {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 1rem;
          margin-bottom: 1.1rem;
        }

        @media (max-width: 1080px) {
          .cu-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 320px); gap: 1.25rem; }
        }
        @media (max-width: 900px) {
          .cu-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .cu-hero-badge { font-size: 11px; padding: 4px 12px; white-space: normal; }
        }
        @media (max-width: 540px) {
          .cu-phone-subject { grid-template-columns: minmax(0, 1fr) !important; }
          .cu-hero {
            min-height: min(78vh, 560px);
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .cu-hero-video { object-position: center 35%; }
          .cu-map-iframe { height: 240px !important; }
          /* iOS Safari auto-zooms the page on focus if an input's font-size
             is below 16px — bumping it to 16px here (instead of the 0.9rem
             ≈ 14.4px used on desktop) stops that jump without changing the
             look on larger screens. */
          input, select, textarea { font-size: 16px !important; }
        }
        @media (max-width: 420px) {
          .cu-info-row { gap: 0.6rem !important; }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="cu-hero">
        <video
          className="cu-hero-video"
          src="https://res.cloudinary.com/dcse27hnb/video/upload/v1786905459/time_oq7aht.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="cu-hero-overlay" />
        <div className="cu-grid-lines" />
        <div className="cu-hero-content cu-fade">
          <span className="cu-hero-badge">
            <MessageSquare size={13} /> Get In Touch
          </span>
          <h1 className="cu-hero-title">Contact {CLINIC.doctor}</h1>
          <p className="cu-hero-sub">
            Have a question or want to book an appointment? Reach out and our team will get back
            to you as soon as possible.
          </p>
        </div>
        <div className="cu-hero-curve" />
      </section>

      {/* ═══════════ MAIN GRID ═══════════ */}
      <section style={{ ...container, padding: "3rem clamp(1rem,4vw,2rem)", maxWidth: "100%", boxSizing: "border-box" }}>
        <div className="cu-grid">
          {/* LEFT — FORM */}
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: "clamp(1.25rem,4vw,2.25rem)",
              border: "1px solid rgba(47,111,234,0.14)",
              boxShadow: "0 4px 24px rgba(20,40,90,0.08)",
              minWidth: 0,
            }}
          >
            <h2
              style={{
                fontFamily: FONT.display,
                fontSize: "clamp(1.1rem,2.5vw,1.45rem)",
                fontWeight: 600,
                color: COLORS.blueDark,
                margin: "0 0 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Send size={18} color={COLORS.blue} /> Send a Message
            </h2>

            {submitted && (
              <div
                style={{
                  background: "rgba(47,111,234,0.08)",
                  border: `1px solid rgba(47,111,234,0.35)`,
                  borderRadius: 10,
                  padding: "0.85rem 1.1rem",
                  marginBottom: "1.25rem",
                  color: COLORS.blueDark,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Sparkles size={16} /> Opening WhatsApp with your message — send it to reach us
                directly.
              </div>
            )}

            {/* Name */}
            <div style={{ marginBottom: "1.1rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#4a5978", marginBottom: "0.4rem" }}>
                Name <span style={{ color: "#d94040" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <User size={15} color={COLORS.blue} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  value={form.name}
                  onChange={(e) => field("name", e.target.value)}
                  placeholder="Your full name"
                  style={{ ...inputStyle(!!errors.name), paddingLeft: "2.2rem" }}
                />
              </div>
              {errors.name && <p style={{ color: "#d94040", fontSize: "0.78rem", margin: "0.3rem 0 0" }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.1rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#4a5978", marginBottom: "0.4rem" }}>
                Email <span style={{ color: "#d94040" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} color={COLORS.blue} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => field("email", e.target.value)}
                  placeholder="your.email@example.com"
                  style={{ ...inputStyle(!!errors.email), paddingLeft: "2.2rem" }}
                />
              </div>
              {errors.email && <p style={{ color: "#d94040", fontSize: "0.78rem", margin: "0.3rem 0 0" }}>{errors.email}</p>}
            </div>

            {/* Phone + Service */}
            <div className="cu-phone-subject">
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#4a5978", marginBottom: "0.4rem" }}>
                  Phone
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={15} color={COLORS.blue} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  <input
                    value={form.phone}
                    onChange={(e) => field("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    style={{ ...inputStyle(false), paddingLeft: "2.2rem" }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#4a5978", marginBottom: "0.4rem" }}>
                  Service <span style={{ color: "#d94040" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <FileText size={15} color={COLORS.blue} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }} />
                  <ChevronDown size={15} color={COLORS.blue} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  <select
                    value={form.subject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    style={{ ...inputStyle(!!errors.subject), paddingLeft: "2.2rem", appearance: "none", cursor: "pointer" }}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                {errors.subject && <p style={{ color: "#d94040", fontSize: "0.78rem", margin: "0.3rem 0 0" }}>{errors.subject}</p>}
              </div>
            </div>

            {/* Custom subject — only shown when "Something else" is picked,
                so the patient can describe their own problem in their own
                words instead of being limited to the fixed service list. */}
            {isCustomSubject && (
              <div style={{ marginBottom: "1.1rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#4a5978", marginBottom: "0.4rem" }}>
                  Please specify your concern <span style={{ color: "#d94040" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <PenLine size={15} color={COLORS.blue} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  <input
                    value={form.customSubject}
                    onChange={(e) => field("customSubject", e.target.value)}
                    placeholder="e.g. Persistent jaw pain, chipped tooth..."
                    style={{ ...inputStyle(!!errors.customSubject), paddingLeft: "2.2rem" }}
                  />
                </div>
                {errors.customSubject && <p style={{ color: "#d94040", fontSize: "0.78rem", margin: "0.3rem 0 0" }}>{errors.customSubject}</p>}
              </div>
            )}

            {/* Message */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#4a5978", marginBottom: "0.4rem" }}>
                Message <span style={{ color: "#d94040" }}>*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => field("message", e.target.value)}
                placeholder="Tell us what you'd like help with..."
                rows={5}
                style={{ ...inputStyle(!!errors.message), resize: "vertical", minHeight: 110, fontFamily: FONT.body }}
              />
              {errors.message && <p style={{ color: "#d94040", fontSize: "0.78rem", margin: "0.3rem 0 0" }}>{errors.message}</p>}
            </div>

            <button
              className="cu-submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.9rem",
                borderRadius: 10,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                background: `linear-gradient(135deg, ${COLORS.blueDark}, ${COLORS.blue})`,
                color: COLORS.white,
                fontWeight: 700,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 16px rgba(47,111,234,0.35)",
                transition: "all 0.25s ease",
                fontFamily: FONT.body,
                opacity: isSubmitting ? 0.75 : 1,
              }}
            >
              <Send size={16} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>

          {/* RIGHT — INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", minWidth: 0 }}>
            {/* Contact info card */}
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "clamp(1.25rem,3vw,1.75rem)",
                border: "1px solid rgba(47,111,234,0.14)",
                boxShadow: "0 4px 24px rgba(20,40,90,0.08)",
              }}
            >
              <h3
                style={{
                  fontFamily: FONT.display,
                  fontSize: "clamp(1rem,2.5vw,1.2rem)",
                  fontWeight: 600,
                  color: COLORS.blueDark,
                  margin: "0 0 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Phone size={17} color={COLORS.blue} /> Contact Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="cu-info-row"
                    style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", textDecoration: "none", transition: "all 0.2s" }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        flexShrink: 0,
                        background: `linear-gradient(135deg, ${COLORS.blueDark}, ${COLORS.blue})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 1,
                      }}
                    >
                      <Icon size={16} color={COLORS.white} strokeWidth={1.8} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "0.7rem", color: "#7385a8", margin: "0 0 1px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {label}
                      </p>
                      <p className="cu-info-val" style={{ fontSize: "0.875rem", color: COLORS.blueDark, margin: 0, fontWeight: 500, lineHeight: 1.5, transition: "color 0.2s", wordBreak: "break-word" }}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "clamp(1.25rem,3vw,1.5rem)",
                border: "1px solid rgba(47,111,234,0.14)",
                boxShadow: "0 4px 20px rgba(20,40,90,0.06)",
              }}
            >
              <h3
                style={{
                  fontFamily: FONT.display,
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: COLORS.blueDark,
                  margin: "0 0 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Clock size={16} color={COLORS.blue} /> Clinic Hours
              </h3>
              {HOURS.map(({ day, time }) => (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(47,111,234,0.1)",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.83rem", color: "#4a5978", fontWeight: 600 }}>{day}</span>
                  <span style={{ fontSize: "0.83rem", color: COLORS.blue, fontWeight: 700, textAlign: "right" }}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MAP ═══════════ */}
      <section id="map" style={{ ...container, padding: "0 clamp(1rem,4vw,2rem) 5rem", maxWidth: "100%", boxSizing: "border-box" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(47,111,234,0.14)",
            boxShadow: "0 4px 24px rgba(20,40,90,0.08)",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.blueDark}, ${COLORS.blue})`,
              padding: "0.85rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MapPin size={17} color={COLORS.white} />
            <span style={{ color: COLORS.white, fontWeight: 700, fontSize: "0.95rem" }}>Location</span>
          </div>
          <iframe
            title={`${CLINIC.name} location`}
            className="cu-map-iframe"
            src={MAPS_EMBED_SRC}
            width="100%"
            height="360"
            style={{ display: "block", border: "none" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;