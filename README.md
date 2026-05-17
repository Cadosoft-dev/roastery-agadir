# ROASTERY Agadir — Cinematic Restaurant Website

A cinematic prototype for **ROASTERY AGADIR**, a lounge-restaurant-café in Founty, Agadir. Built with Next.js 14, Framer Motion, and Tailwind CSS.

## Getting Started

```bash
git clone [repo-url]
cd roastery-agadir
npm install
cp .env.example .env.local
# Add your Google Maps API key
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## Features

- **11 sections**: Hero, Introduction, Menu Flipbook, Signature Dishes, Coffee Program, Gallery, Reservations, Reviews, Special Offers, Private Events, Location
- **3 languages**: French (default), English, Arabic (RTL) — toggle in navbar
- **Chef's Table mode**: Dark mode toggle with candle-glow cursor trail
- **Menu Flipbook**: 3D page-flip component on desktop, swipe cards on mobile
- **Favorites**: Save dishes to localStorage from the flipbook
- **Reservation form**: Client-side validation with localStorage persistence
- **WhatsApp floating button**: Direct booking link
- **Film grain overlay**: Subtle animated texture across the page
- **Dynamic imports**: Heavy sections (flipbook, gallery) lazy-loaded
- **Schema.org JSON-LD**: Structured data for SEO
- **Auto-generated sitemap** + robots.txt

## Stack

- **Framework**: Next.js 14 (App Router)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Typography**: Cormorant Garamond + DM Sans + Noto Naskh Arabic (via next/font)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Prototype Notes

- No backend. Reservations, contact messages, cookies, language, and Chef's Table mode use local browser state only.
- Menu, reviews, offers, and gallery content are static typed data under `src/data/`.
- The standalone flipbook component lives in `src/components/ui/Flipbook/` and accepts typed `MenuItem[]` props.

## Deploy on Vercel

Push to main branch — auto-deploys via GitHub integration (requires `.github/workflows/deploy.yml`). The included `vercel.json` uses the Next.js framework with the Paris/CDG region.

### Manual deploy

```bash
npx vercel --prod
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps API key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp business number |
| `NEXT_PUBLIC_RESTAURANT_PHONE` | Restaurant phone number |

## Database (Future)

The following components are ready for database integration:

- `src/data/menu.ts` → Replace with API route + Prisma query
- `src/data/reviews.ts` → Replace with CMS or DB fetch
- Reservation form → Replace `console.log` with API POST to `/api/reservations`
- Newsletter → Replace with Mailchimp or ConvertKit API

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, pages, globals.css)
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # All 11 page sections
│   ├── ui/           # Button, Flipbook, LanguageToggle, etc.
│   └── providers/    # LanguageProvider, ThemeProvider
├── data/             # Static menu, reviews, offers, gallery
├── i18n/             # French, English, Arabic translations
├── lib/              # Utilities, constants
├── types/            # TypeScript type definitions
└── hooks/            # Custom React hooks
```

---

*ROASTERY AGADIR Website v1.0 — Prototype*
