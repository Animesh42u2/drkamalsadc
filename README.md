# Anupama Dental Clinic — Website

A route-based React + TypeScript + Vite site for Anupama Dental Clinic
(Udala, Mayurbhanj). White-and-blue theme taken from the clinic's poster.
**No `.css` files anywhere** — every style is inline (`style={{ ... }}`)
directly inside its own `.tsx` file.

## Run it in VS Code

1. Open this folder in VS Code (`File > Open Folder…`).
2. Open a terminal (`` Ctrl+` ``) and install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the URL it prints (usually `http://localhost:5173`).
   Use the nav bar to move between pages: `/`, `/services`,
   `/wisdom-teeth`, `/about`, `/contact`.

## Editing content

Open `src/data/clinic.ts`. Every editable fact — clinic name, doctor name,
phone numbers, WhatsApp number, email, address, the service list (with
Odia translations), clinic hours, and nav labels — lives in that one file.

## How styling works (no CSS files)

- **`src/theme.ts`** — not CSS, just a plain TypeScript file exporting the
  colour palette and a handful of reusable `style` objects (`btnPrimary`,
  `heading`, `container`, etc). Pages import these and spread them into
  their own inline styles, e.g.:

  ```tsx
  <a style={{ ...btnPrimary, marginTop: 12 }}>Book now</a>
  ```

- **Every page and component styles itself** with the `style={{ ... }}`
  prop, written directly in that file — nothing is imported from a
  stylesheet.
- **Hover states** use a tiny `useHover()` hook (`src/hooks.ts`) that
  flips a style object on mouse enter/leave, since inline styles can't
  use `:hover`.
- **Responsive layout** uses a `useIsMobile()` hook that watches
  `window.innerWidth`, since inline styles can't use `@media` queries.
  Grids switch from multi-column to single-column below 860px this way.
- **One unavoidable exception**: a webfont `<link>` in `index.html` and a
  four-line global reset (`box-sizing`, margin, body font) injected via a
  single `<style>` tag inside `App.tsx` — inline `style` props genuinely
  cannot load a Google Font or reset default browser margins on every
  element. This is the only styling code not living in a `style={{}}` prop,
  and it stays inside `App.tsx` rather than a separate `.css` file.

## Colour palette (from the poster)

Defined in `src/theme.ts`:

```ts
blue:      "#2F6FEA"  // primary bright blue — headlines, checkmarks, links
blueMid:   "#1E4FD6"  // hover state
blueDark:  "#0F2A66"  // deep navy — banners, footer, dark sections
blueLight: "#8FB4FF"  // light accent on dark backgrounds
blueTint:  "#E7EFFF"  // light card backgrounds
```

## Project structure

```
src/
├── main.tsx                  # entry point, wraps App in BrowserRouter
├── App.tsx                   # routes + the one small global style reset
├── theme.ts                  # colour palette + shared inline-style objects (TS, not CSS)
├── hooks.ts                  # useHover, useIsMobile — replace :hover / @media
├── data/
│   └── clinic.ts             # ALL editable content lives here
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Ticker.tsx
│   ├── ToothMark.tsx
│   ├── RootCurveDivider.tsx
│   ├── Reveal.tsx
│   └── ScrollToTop.tsx
└── pages/
    ├── Home.tsx         → "/"
    ├── Services.tsx     → "/services"
    ├── WisdomTeeth.tsx  → "/wisdom-teeth"
    ├── About.tsx        → "/about"
    └── Contact.tsx      → "/contact"
```

## Building for deployment

```bash
npm run build
```

Outputs a static site to `dist/`, ready to upload to Netlify, Vercel,
GitHub Pages, or any static host.
