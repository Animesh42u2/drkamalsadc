import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CLINIC, FAQS, telLink } from "../data/clinic";
import { COLORS, container, eyebrow, heading} from "../theme";
import { useIsMobile } from "../hooks";

const FAQSection: FC = () => {
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section style={{ background: COLORS.white, padding: "clamp(48px, 9vw, 88px) 0" }}>
      <div style={container}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "clamp(28px, 6vw, 64px)",
            alignItems: "flex-start",
          }}
        >
          {/* ── LEFT: heading + callout ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: isMobile ? "none" : "0.85 1 0%", width: "100%" }}
          >
            <p style={eyebrow}>FAQs</p>
            <h2
              style={{
                ...heading,
                fontSize: "clamp(26px, 4.2vw, 38px)",
                lineHeight: 1.18,
                marginBottom: 16,
              }}
            >
              Everything you need to know about your dental care
            </h2>
            <p
              style={{
                fontSize: "clamp(14px, 1.8vw, 15.5px)",
                color: COLORS.textSoft,
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: "42ch",
              }}
            >
              Here you'll find answers to common questions about visiting {CLINIC.name.split(" By ")[0]}
              and keeping your smile healthy.
            </p>

            <a
              href={telLink(CLINIC.phones[0])}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 16,
                padding: "clamp(14px, 2.5vw, 18px) clamp(16px, 3vw, 22px)",
                textDecoration: "none",
                maxWidth: 340,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "clamp(38px, 6vw, 44px)",
                  height: "clamp(38px, 6vw, 44px)",
                  borderRadius: "50%",
                  background: COLORS.blueTint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke={COLORS.blue}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: "clamp(14px, 2vw, 15.5px)", color: COLORS.text }}>
                  Call the clinic
                </div>
                <div style={{ fontSize: "clamp(11.5px, 1.6vw, 13px)", color: COLORS.textSoft, marginTop: 2 }}>
                  We're happy to answer any questions — {CLINIC.phones[0]}
                </div>
              </div>
            </a>
          </motion.div>

          {/* ── RIGHT: accordion ── */}
          <div style={{ flex: isMobile ? "none" : "1.15 1 0%", width: "100%" }}>
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  onClick={() => toggle(i)}
                  animate={{
                    backgroundColor: isOpen ? COLORS.blue : COLORS.white,
                    borderColor: isOpen ? COLORS.blue : COLORS.line,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                    backgroundColor: { duration: 0.25, ease: "easeOut" },
                    borderColor: { duration: 0.25, ease: "easeOut" },
                  }}
                  style={{
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 16,
                    padding: "clamp(14px, 2.5vw, 18px) clamp(16px, 3vw, 22px)",
                    marginBottom: 12,
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "clamp(14px, 2vw, 16px)",
                        color: isOpen ? COLORS.white : COLORS.text,
                        lineHeight: 1.4,
                        transition: "color .2s ease",
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        color: isOpen ? COLORS.white : COLORS.blue,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          style={{
                            opacity: isOpen ? 0 : 1,
                            transition: "opacity .15s ease",
                          }}
                        />
                        <path d="M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            marginTop: 14,
                            marginBottom: 0,
                            fontSize: "clamp(13.5px, 1.8vw, 14.5px)",
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,0.92)",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;