import { useEffect, useState } from "react";

interface Options {
  fallbackRating: string;
  fallbackReviewCount: string;
  /** How often to re-check, in ms. Google's own numbers don't move fast, so default is 6h. */
  pollMs?: number;
}

interface RatingResult {
  rating: string;
  reviewCount: string;
  loading: boolean;
  /** true if we're showing the hardcoded fallback because the live fetch failed */
  isFallback: boolean;
}

const ENDPOINT = "/api/google-rating";
const CACHE_KEY = "google-rating-cache-v1";
const SIX_HOURS = 1000 * 60 * 60 * 6;

/**
 * Fetches the clinic's live rating + review count from Google via our own backend
 * (see /api/google-rating — a browser can't call Google's Places API directly
 * without exposing the API key). Falls back to the hardcoded values if the
 * endpoint isn't set up yet, or if the request fails for any reason.
 */
export function useGoogleRating({ fallbackRating, fallbackReviewCount, pollMs = SIX_HOURS }: Options): RatingResult {
  const [state, setState] = useState<RatingResult>(() => {
    // Show a cached value instantly (if we have one) instead of the fallback,
    // so returning visitors don't see a flash of stale numbers.
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return { rating: parsed.rating, reviewCount: parsed.reviewCount, loading: true, isFallback: false };
      }
    } catch {
      /* sessionStorage unavailable or bad JSON — ignore and fall through */
    }
    return { rating: fallbackRating, reviewCount: fallbackReviewCount, loading: true, isFallback: true };
  });

  useEffect(() => {
    let cancelled = false;

    const fetchRating = async () => {
      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(`Rating endpoint returned ${res.status}`);
        const data = await res.json();
        if (typeof data.rating !== "number" || typeof data.reviewCount !== "number") {
          throw new Error("Unexpected response shape from /api/google-rating");
        }
        if (cancelled) return;

        const next = {
          rating: data.rating.toFixed(1),
          reviewCount: String(data.reviewCount),
        };
        setState({ ...next, loading: false, isFallback: false });
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(next));
        } catch {
          /* storage full or blocked — non-fatal */
        }
      } catch (err) {
        if (cancelled) return;
        console.warn("[useGoogleRating] falling back to static values:", err);
        setState((prev) => ({ ...prev, loading: false, isFallback: true }));
      }
    };

    fetchRating();
    const id = setInterval(fetchRating, pollMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollMs]);

  return state;
}