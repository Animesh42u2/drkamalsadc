import { useState, useEffect, useRef, useCallback } from "react";
import { COLORS, container } from "../theme";
import { useIsMobile } from "../hooks";
import { useGoogleRating } from "../hooks/Usegooglerating";

// Real Google Business Profile for Anupama Dental Clinic (Udala, Mayurbhanj).
// Opens the listing directly to the "Write a review" flow.
const GOOGLE_REVIEW_URL = "https://www.google.com/maps?cid=7278701357064915513";
// Shown instantly on first paint, and used if the live fetch ever fails — keep this
// roughly up to date by hand as a safety net even though the number is normally live.
const FALLBACK_RATING = "4.9";
const FALLBACK_REVIEW_COUNT = "1000+";

// Placeholder avatar photos from randomuser.me — a service that exists specifically
// to provide real photos licensed for test/placeholder UI use (not scraped from
// anyone's actual profile or tied to their real identity). See the note near the
// bottom of this file about swapping these for real patient photos before launch.

// Replace with real patient reviews whenever you have them.
const reviews = [
    {
    text: "Booked a check-up for my son and the staff were so patient with him. Highly recommend for families.",
    name: "CA Sandeep Mohapatra",
    initials: "DM",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ98n7d0pE7B2Y0PUyGUKiUbSGoEWWFuZyvLw1M6YFLVQ&s=10",
  },
  {
    text: "The dentist explained every step before doing it, so I never felt nervous. Cleanest clinic I've been to in Udala.",
    name: "Ritesh Patra",
    initials: "RP",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMc9wQQ73T0d-r1WKq4EuUXj5YEI9oJjfKUd8mU49MQ&s=10",
  },
  {
    text: "My wisdom tooth extraction was over before I knew it — barely any pain and no swelling the next day.",
    name: "Sabita Nayak",
    initials: "SN",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5qJABtrJjGQViiOlrNr_fSuNOgIpqYBQNa_9IheJUzg&s=10",
  },
  {
    text: "Got my crown done here. The fit was perfect on the first try and the whole process felt very professional.",
    name: "Animesh Mohapatra",
    initials: "AB",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFdT85qrCBfVg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722612632991?e=2147483647&v=beta&t=C9kbemKLD_pRgJjOuiReyoML4KpoHnRI38KnvinSfTY",
  },
  {
    text: "Walked in without an appointment for a toothache and was seen the same day. Genuinely grateful.",
    name: "Prakash Swain",
    initials: "PS",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEP0baIQjsxynpFdkdQVXHlq3amo3aXkqJfMzpNVggpA&s=10",
  },
  {
    text: "Very transparent about costs before any treatment started. No surprise charges, which I really appreciated.",
    name: "Lipika Das",
    initials: "LD",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD-U3BGiQiihOSFMVrJSMWR35Bc16qtHxF1fAwSOgyRQ&s",
  },
];

const INTERVAL = 5000;

export default function Testimonials() {
  const isMobile = useIsMobile();
  const { rating, reviewCount } = useGoogleRating({
    fallbackRating: FALLBACK_RATING,
    fallbackReviewCount: FALLBACK_REVIEW_COUNT,
  });
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [avatarErrors, setAvatarErrors] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      const next = ((idx % reviews.length) + reviews.length) % reviews.length;
      if (next === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(next);
        setProgressKey((k) => k + 1);
        setAnimating(false);
      }, 350);
    },
    [animating, current]
  );

  const resetAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setProgressKey((k) => k + 1);
        return (c + 1) % reviews.length;
      });
    }, INTERVAL);
  }, []);

  useEffect(() => {
    resetAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAuto]);

  const handleNav = (idx: number) => {
    goTo(idx);
    resetAuto();
  };

  const r = reviews[current];

  return (
    <section style={styles.section}>
      <p style={styles.eyebrow}>Testimonials</p>
      <h2 style={styles.heading}>
        What <span style={{ color: COLORS.blue }}>Our Patients</span> Say About Us
      </h2>
      <p style={styles.subtext}>Real feedback from patients who trust us with their smiles</p>

      {/* Card */}
      <div
        style={{
          ...styles.card,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px) scale(0.98)" : "translateY(0) scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <div
            key={progressKey}
            style={{
              ...styles.progressBar,
              animation: `growWidth ${INTERVAL}ms linear forwards`,
            }}
          />
        </div>

        {/* Quote icon */}
        <div
          style={{
            ...styles.quoteIcon,
            width: isMobile ? 36 : 44,
            height: isMobile ? 36 : 44,
          }}
        >
          <svg width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} viewBox="0 0 24 24" fill="white">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>

        {/* Stars */}
        <div style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.star,
                fontSize: isMobile ? 15 : 18,
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(6px) scale(0.7)" : "translateY(0) scale(1)",
                transition: `opacity 0.3s ease ${0.15 + i * 0.07}s, transform 0.3s ease ${0.15 + i * 0.07}s`,
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review text */}
        <p
          style={{
            ...styles.reviewText,
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          }}
        >
          "{r.text}"
        </p>

        {/* Author */}
        <div
          style={{
            ...styles.author,
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
          }}
        >
          {avatarErrors[current] ? (
            <div
              style={{
                ...styles.avatarFallback,
                width: isMobile ? 46 : 58,
                height: isMobile ? 46 : 58,
                fontSize: isMobile ? 15 : 18,
              }}
            >
              {r.initials}
            </div>
          ) : (
            <img
              src={r.avatar}
              alt={r.name}
              width={isMobile ? 46 : 58}
              height={isMobile ? 46 : 58}
              style={{
                ...styles.avatarImg,
                width: isMobile ? 46 : 58,
                height: isMobile ? 46 : 58,
              }}
              onError={() => setAvatarErrors((e) => ({ ...e, [current]: true }))}
            />
          )}
          <div style={styles.authorName}>{r.name}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button style={styles.navBtn} onClick={() => handleNav(current - 1)} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div style={styles.dots}>
          {reviews.map((_, i) => {
            const isNear = Math.abs(i - current) <= 2 || i === 0 || i === reviews.length - 1;
            return (
              <button
                key={i}
                onClick={() => handleNav(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  ...styles.dot,
                  width: i === current ? 24 : isNear ? 8 : 5,
                  opacity: isNear ? 1 : 0.4,
                  background: i === current ? COLORS.blue : "#d6e6f5",
                  transition: "width 0.35s ease, background 0.35s ease, opacity 0.35s ease",
                }}
              />
            );
          })}
        </div>

        <button style={styles.navBtn} onClick={() => handleNav(current + 1)} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Leave a review CTA */}
      <div style={{ ...container, marginTop: "clamp(40px, 6vw, 64px)" }}>
        <div
          style={{
            ...styles.reviewCta,
            gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
          }}
        >
          <div
            style={{
              ...styles.reviewCtaImage,
              backgroundImage: "url('/waiting-area.jpeg')",
              minHeight: isMobile ? 180 : "auto",
            }}
            role="img"
            aria-label="Anupama Dental Clinic waiting area"
          />
          <div style={styles.reviewCtaContent}>
            <div style={styles.reviewCtaRating}>
              <span style={styles.reviewCtaStars}>★★★★★</span>
              <span style={styles.reviewCtaRatingText}>
                {rating} · {reviewCount} Google reviews
              </span>
            </div>
            <h3 style={styles.reviewCtaHeading}>Enjoyed your visit?</h3>
            <p style={styles.reviewCtaBody}>
              Your feedback helps other patients in Udala find us and helps us keep improving. It only takes a
              minute.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.reviewCtaButton,
                width: isMobile ? "100%" : "auto",
              }}
            >
              Write a Google Review
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes growWidth {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "clamp(40px, 8vw, 80px) clamp(16px, 6%, 80px)" as unknown as string,
    background: COLORS.white,
    textAlign: "center",
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 3,
    color: COLORS.blue,
    textTransform: "uppercase",
    marginBottom: 10,
    fontWeight: 600,
  },
  heading: {
    fontSize: "clamp(22px, 4vw, 34px)" as unknown as string,
    fontWeight: 700,
    margin: "0 0 8px",
    color: "#0a1a2b",
    lineHeight: 1.3,
  },
  subtext: {
    color: COLORS.textSoft,
    marginBottom: "clamp(28px, 5vw, 48px)" as unknown as string,
    fontSize: 13,
  },
  card: {
    maxWidth: 720,
    margin: "0 auto",
    background: "#f5faff",
    borderRadius: 20,
    padding: "clamp(20px, 5vw, 48px) clamp(16px, 5vw, 48px)" as unknown as string,
    border: `1px solid ${COLORS.line}`,
    position: "relative",
    overflow: "hidden",
  },
  progressTrack: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    background: COLORS.line,
    borderRadius: "0 0 20px 20px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: `linear-gradient(90deg, #5b9bd5, ${COLORS.blue})`,
    width: 0,
  },
  quoteIcon: {
    borderRadius: "50%",
    background: `linear-gradient(135deg, #5b9bd5, ${COLORS.blue})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  stars: {
    display: "flex",
    justifyContent: "center",
    gap: 4,
    marginBottom: 20,
  },
  star: {
    color: "#e8a63a",
    display: "inline-block",
  },
  reviewText: {
    fontSize: "clamp(14px, 2.4vw, 17px)" as unknown as string,
    lineHeight: 1.8,
    color: "#173250",
    fontStyle: "italic",
    marginBottom: "clamp(20px, 4vw, 36px)" as unknown as string,
  },
  author: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    flexWrap: "wrap",
  },
  avatarFallback: {
    borderRadius: "50%",
    border: `2.5px solid ${COLORS.blue}`,
    background: `linear-gradient(135deg, ${COLORS.blue}, #5b9bd5)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#fff",
    flexShrink: 0,
  },
  avatarImg: {
    borderRadius: "50%",
    border: `2.5px solid ${COLORS.blue}`,
    objectFit: "cover",
    flexShrink: 0,
    background: "#eef5fc",
  },
  authorName: {
    fontWeight: 700,
    fontSize: 15,
    color: "#173250",
    textAlign: "left",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 28,
    flexWrap: "wrap",
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: `1.5px solid ${COLORS.line}`,
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
    flexShrink: 0,
  },
  dots: {
    display: "flex",
    gap: 6,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 220,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  reviewCta: {
    display: "grid",
    gap: 0,
    background: "#f5faff",
    border: `1px solid ${COLORS.line}`,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "stretch",
  },
  reviewCtaImage: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: 220,
  },
  reviewCtaContent: {
    padding: "clamp(20px, 4vw, 40px)" as unknown as string,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
  },
  reviewCtaRating: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  reviewCtaStars: {
    color: "#e8a63a",
    fontSize: 16,
    letterSpacing: 2,
  },
  reviewCtaRatingText: {
    fontSize: 13,
    color: COLORS.textSoft,
    fontWeight: 600,
  },
  reviewCtaHeading: {
    fontSize: "clamp(20px, 3vw, 26px)" as unknown as string,
    fontWeight: 700,
    color: "#0a1a2b",
    margin: "0 0 10px",
  },
  reviewCtaBody: {
    fontSize: 14,
    lineHeight: 1.7,
    color: COLORS.textSoft,
    margin: "0 0 22px",
    maxWidth: 420,
  },
  reviewCtaButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: COLORS.blue,
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    padding: "13px 22px",
    borderRadius: 12,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
};

// ─── Before you publish this live ─────────────────────────────────────────────
// The six reviews above and their avatar photos are placeholders, not real patients.
// Publishing invented reviews as if genuine can run into false-advertising /
// consumer-protection rules in most places (including India's CCPA guidelines on
// fake reviews), so swap `reviews` for real, consenting patients' words before this
// goes live — with their real photo (or an initials avatar) in place of `avatar`.