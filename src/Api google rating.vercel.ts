// Deploy target: Vercel — put this file at /api/google-rating.ts in your project root
// (outside src/, at the same level as package.json). Vercel auto-detects anything in
// /api as a serverless function, so no extra config is needed.
//
// Required environment variables (set in Vercel dashboard → Project → Settings → Environment Variables):
//   GOOGLE_PLACES_API_KEY  — a Places API key, restricted to server-side/IP use, NOT your public maps key
//   GOOGLE_PLACE_ID        — Anupama Dental Clinic's Place ID (get it from
//                             https://developers.google.com/maps/documentation/places/web-service/place-id
//                             by searching the clinic's exact name + address)
//
// This keeps the API key off the client entirely — the browser only ever talks to
// this endpoint, never to Google directly.

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({ error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID" });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const googleRes = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount",
      },
    });

    if (!googleRes.ok) {
      const text = await googleRes.text();
      throw new Error(`Google Places API error ${googleRes.status}: ${text}`);
    }

    const data = await googleRes.json();

    // Cache at the edge for an hour — the number rarely changes minute to minute,
    // and this keeps you well under Places API's free-tier request quota.
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({
      rating: data.rating ?? null,
      reviewCount: data.userRatingCount ?? null,
    });
  } catch (err) {
    console.error("[api/google-rating]", err);
    return res.status(502).json({ error: "Failed to fetch rating from Google" });
  }
}