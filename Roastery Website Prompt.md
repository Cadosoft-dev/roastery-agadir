# ROASTERY AGADIR — Master AI Agent Prompt
## Cinematic Restaurant Website · Prototype v1.0
### Stack: Next.js 14 · Framer Motion · Tailwind CSS · Vercel · GitHub

---

> **CONTEXT FOR THE AI AGENT**
> This is a **prototype** (no backend, no live database). All form submissions, 
> reservations, and reviews use **static/mock data and local state only**. 
> The architecture must be designed so a real database (PostgreSQL via Supabase or 
> Prisma) can be plugged in later with minimal refactoring. The project will be 
> pushed to a **GitHub repository** and deployed on **Vercel** for client review.

---

## 01 · PROJECT IDENTITY

| Field | Value |
|---|---|
| Restaurant name | ROASTERY AGADIR |
| Concept | Lounge · Restaurant · Café · Gastronomique |
| Cuisines | Française · Marocaine · Méditerranéenne |
| Location | N° 10 Immeuble 03 Bloc 03, Khalij Ennakhil, City Founty, Agadir 80000, Maroc |
| Phone | 05282-15499 |
| WhatsApp | +212 528 215499 |
| Instagram | @roasteryagadir |
| Google Maps | Coordinates: 30.3997637, -9.5874968 |
| Hours | Breakfast 07:00–10:30 · Lunch 12:00–14:30 · Dinner 19:00–00:00 · Brunch Sat–Sun 11:00–15:00 |
| TripAdvisor Rating | 4.6 / 5 |

---

## 02 · EXACT BRAND COLORS (extracted from official logo)

```css
:root {
  /* === PRIMARY PALETTE === */
  --color-charcoal:    #3D4345;   /* Logo background — dark slate, the dominant dark */
  --color-gold:        #C9A96E;   /* Logo mark color — warm antique gold, THE brand accent */
  --color-ivory:       #F5F0E8;   /* Primary light surface — warm cream linen */
  --color-espresso:    #1E1A17;   /* Deepest dark for hero sections and overlays */
  --color-terracotta:  #B5623A;   /* Secondary accent — Moroccan ceramic warmth */
  --color-olive:       #5C6345;   /* Tertiary — hover states, subtle tones */
  --color-smoke:       #2A2E2F;   /* Mid-dark — cards on dark backgrounds */

  /* === TEXT COLORS === */
  --text-on-dark:      #F0EBE0;   /* Warm ivory for text on dark sections */
  --text-on-light:     #1E1A17;   /* Deep espresso for text on light sections */
  --text-muted:        #8A8070;   /* Captions, secondary labels */
  --text-gold:         #C9A96E;   /* Gold text for CTAs and highlights */

  /* === FUNCTIONAL === */
  --color-border:      rgba(201, 169, 110, 0.25);  /* Hairline gold borders */
  --color-overlay:     rgba(30, 26, 23, 0.65);      /* Photo overlays */
  --color-glass:       rgba(61, 67, 69, 0.75);      /* Frosted glass nav/cards */
  --color-grain:       url('/textures/grain.png');  /* Film grain overlay */

  /* === CHEF'S TABLE MODE (dark toggle) === */
  --chef-bg:           #0F0D0B;   /* Near-black espresso */
  --chef-gold:         #E8C87A;   /* Brighter gold for candlelight feel */
  --chef-surface:      #1A1614;   /* Card surfaces in dark mode */
  --chef-text:         #EDE5D4;   /* Warmer ivory in dark mode */
}
```

> **NEVER USE:** pure `#000000`, pure `#FFFFFF`, any generic red, 
> purple SaaS gradients, or CSS named colors. Every color must come 
> from the palette above or be a carefully considered derivative.

---

## 03 · LOGO USAGE RULES

The logo consists of: **★ | R®** — a five-pointed star, a vertical gold bar, 
and the letter "R" with a registered trademark mark.

- **Logo file:** `/public/logo/roastery-logo.jpeg` (provided — embed as-is)
- **Nav version:** Show the full `★ | R` mark at ~40px height on light 
  backgrounds; use the gold-only version on dark backgrounds
- **Favicon:** Extract just the `R` lettermark as SVG, gold on charcoal
- **Footer:** Full logo at 60px with the wordmark "ROASTERY" in small caps 
  below it, letter-spacing: 0.3em, in gold
- **Never** stretch, recolor, add drop shadows, or place the logo on 
  a clashing background
- **Clear space:** minimum 1× the height of the star on all sides

---

## 04 · TYPOGRAPHY SYSTEM

```
Display / Hero:       "Cormorant Garamond" — weight 300–600, high contrast, 
                      editorial serif. Use for H1, H2, and the menu flipbook titles.
                      Google Fonts: https://fonts.google.com/specimen/Cormorant+Garamond

Body / UI:            "DM Sans" — weight 300–500, clean humanist grotesk.
                      Google Fonts: https://fonts.google.com/specimen/DM+Sans

Italic / Quotes:      "Cormorant Garamond" italic — for menu descriptions, 
                      pull quotes, and poetic sub-lines.

Arabic:               "Noto Naskh Arabic" — weight 400–700, elegant, matches 
                      the serif mood for Arabic content.
                      Google Fonts: https://fonts.google.com/specimen/Noto+Naskh+Arabic

Section Labels:       DM Sans, uppercase, letter-spacing: 0.25em, font-size: 11px,
                      color: var(--color-gold). Always preceded by a tiny gold dot "·"

Scale (desktop):
  Hero H1:            clamp(4rem, 8vw, 9rem) — Cormorant, weight 300
  Section H2:         clamp(2.5rem, 4vw, 4.5rem) — Cormorant, weight 400
  Sub-heading H3:     clamp(1.4rem, 2vw, 2rem) — Cormorant italic
  Body:               1.0625rem / 1.8 line-height — DM Sans 300
  Caption:            0.8125rem — DM Sans 400, color: var(--text-muted)
  CTA text:           0.875rem — DM Sans 500, letter-spacing: 0.08em
```

---

## 05 · PROJECT FILE STRUCTURE (GitHub-ready)

```
roastery-agadir/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Auto-deploy to Vercel on push to main
├── public/
│   ├── logo/
│   │   └── roastery-logo.jpeg
│   ├── images/
│   │   ├── hero-poster.jpg      # Hero video fallback image
│   │   ├── interior-1.jpg
│   │   ├── interior-2.jpg
│   │   ├── dishes/
│   │   │   ├── salade-caprese.jpg
│   │   │   ├── fondant-chocolat.jpg
│   │   │   ├── filet-poisson.jpg
│   │   │   ├── mezze-marocain.jpg
│   │   │   ├── supreme-volaille.jpg
│   │   │   └── pizza-roastery.jpg
│   │   └── gallery/
│   │       └── [8-10 interior photos — use high quality Unsplash placeholders 
│   │             for prototype with Moroccan/bistro aesthetic]
│   ├── videos/
│   │   └── hero-loop.mp4        # Placeholder: use royalty-free café video 
│   │                              from Pexels (coffee pour, steam, candlelight)
│   ├── textures/
│   │   └── grain.png            # Subtle film grain overlay at 6% opacity
│   ├── sounds/
│   │   ├── page-turn.mp3        # Soft paper rustle for flipbook
│   │   └── ambient-cafe.mp3     # Optional ambient loop (default: muted)
│   ├── fonts/                   # Self-host critical fonts for performance
│   └── favicon.ico
├── src/
│   ├── app/                     # Next.js 14 App Router
│   │   ├── layout.tsx           # Root layout: fonts, metadata, providers
│   │   ├── page.tsx             # Home page — imports all sections
│   │   ├── globals.css          # CSS variables, reset, base styles
│   │   └── sitemap.ts           # Auto-generated sitemap
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Sticky nav with glass effect + language toggle
│   │   │   └── Footer.tsx       # Three-column footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Cinematic video hero
│   │   │   ├── Introduction.tsx # Two-column manifesto
│   │   │   ├── MenuFlipbook.tsx # ⭐ Interactive flipbook (centerpiece)
│   │   │   ├── SignatureDishes.tsx # Horizontal scroll gallery
│   │   │   ├── CoffeeProgram.tsx   # Split video/text section
│   │   │   ├── Gallery.tsx      # Masonry grid with lightbox
│   │   │   ├── Reservations.tsx # Booking form (static/mock)
│   │   │   ├── Reviews.tsx      # Pull-quote carousel
│   │   │   ├── PrivateEvents.tsx
│   │   │   ├── Location.tsx     # Map + contact info
│   │   │   └── SpecialOffers.tsx # Promo banners / seasonal offers
│   │   ├── ui/
│   │   │   ├── Button.tsx       # Gold filled + ghost variants
│   │   │   ├── GoldDivider.tsx  # 0.5px hairline gold line component
│   │   │   ├── SectionLabel.tsx # "· SECTION NAME" in small caps
│   │   │   ├── Lightbox.tsx     # Full-screen image viewer
│   │   │   ├── LanguageToggle.tsx # FR | EN | AR switcher
│   │   │   ├── ChefsModeToggle.tsx # Dark mode toggle
│   │   │   ├── WhatsAppButton.tsx  # Floating WhatsApp CTA
│   │   │   ├── SoundToggle.tsx     # Ambient sound mute/unmute
│   │   │   └── CustomCursor.tsx    # Gold dot cursor (desktop only)
│   │   └── providers/
│   │       ├── LanguageProvider.tsx # i18n context
│   │       └── ThemeProvider.tsx    # Chef's Table mode context
│   ├── data/
│   │   ├── menu.ts              # Full menu data (static, typed)
│   │   ├── reviews.ts           # Mock TripAdvisor + Google reviews
│   │   ├── gallery.ts           # Photo metadata array
│   │   ├── specialOffers.ts     # Mock seasonal promotions
│   │   └── mockReservations.ts  # Fake submitted reservations (prototype)
│   ├── i18n/
│   │   ├── fr.ts                # French translations (default)
│   │   ├── en.ts                # English translations
│   │   └── ar.ts                # Arabic translations (RTL)
│   ├── hooks/
│   │   ├── useLanguage.ts       # Language state + localStorage persistence
│   │   ├── useChefMode.ts       # Chef's Table mode toggle
│   │   ├── useScrollProgress.ts # Scroll position for parallax
│   │   └── useSound.ts          # Sound playback hook
│   ├── lib/
│   │   ├── utils.ts             # cn(), formatPrice(), etc.
│   │   └── constants.ts         # Site config, social links, hours
│   └── types/
│       ├── menu.ts              # TypeScript types for menu items
│       └── reservation.ts       # Reservation form types
├── .env.local                   # NEXT_PUBLIC_MAPS_API_KEY (placeholder)
├── .env.example                 # Template for environment variables
├── .gitignore
├── next.config.ts
├── tailwind.config.ts           # Extended with brand colors and fonts
├── tsconfig.json
├── package.json
├── vercel.json                  # Vercel deployment config
└── README.md                    # Setup instructions + deployment guide
```

---

## 06 · COMPLETE MENU DATA (static, type-safe)

Build this as `/src/data/menu.ts` with full TypeScript types:

```typescript
export type MenuItem = {
  id: string;
  nameFR: string; nameEN: string; nameAR: string;
  descriptionFR: string; descriptionEN: string; descriptionAR: string;
  price: number; currency: 'MAD';
  category: MenuCategory;
  photo?: string;  // path to /public/images/dishes/
  isSignature?: boolean;
  tags?: ('vegetarian' | 'seafood' | 'meat' | 'dessert' | 'popular')[];
};

export type MenuCategory =
  | 'petit-dejeuner'
  | 'brunch'
  | 'entrees'
  | 'plats'
  | 'desserts'
  | 'cafe-the'
  | 'cocktails';
```

### PETIT-DÉJEUNER (07:00 – 10:30)
Buffet gourmand comprenant :
- Viennoiseries artisanales (croissants, pains au chocolat, brioches)
- Œufs à la demande (brouillés, cocotte, omelettes)
- Avocado toast
- Pancakes moelleux
- Fruits frais de saison
- Yaourts maison
- Jus pressés à la minute
- Café torréfié maison

### BRUNCH (Samedi–Dimanche, 11:00 – 15:00)
Formule à volonté :
- Saumon fumé d'Écosse
- Avocats écrasés
- Eggs benedict
- Waffles belges, sirop d'érable
- Salade César + salade méditerranéenne
- Quiches maison
- Sélection de fromages affinés
- Pâtisseries du chef
- Boissons chaudes illimitées

### MIDI — ENTRÉES
| Nom | Description | Prix |
|-----|-------------|------|
| Salade Caprese | Mesclun, tomates, mozzarella, basilic, crème pesto | 45 MAD |
| Salade César Poulet | Poulet croustillant, tomates cerise, parmesan, croûtons | 55 MAD |
| Salade Roastery ⭐ | Tomates cerise, mangue, avocats, calamars, crevettes, fromage | 85 MAD |

### MIDI — PLATS
| Nom | Description | Prix |
|-----|-------------|------|
| Suprême de Volaille | Blanc de poulet rôti, garniture au choix | 95 MAD |
| Émincé de Bœuf | Fines tranches de steak grillé, garniture au choix | 120 MAD |
| Pollo alla Parmigiana | Poulet panné gratiné, garniture au choix | 85 MAD |
| Filet de Poisson ⭐ | Grillé ou au feu de bois, garniture au choix | 140 MAD |

### MIDI — DESSERTS
| Nom | Description | Prix |
|-----|-------------|------|
| Fondant Chocolat Caramel | Fondant, insert caramel beurre salé, glace vanille | 45 MAD |
| Assiette de Fruits | Fruits de saison découpés à la minute | 45 MAD |
| Tiramisu Chocolat Noir | Tiramisu au chocolat noir intense | 45 MAD |
| Tiramisu Nutella | Tiramisu gourmand au Nutella | 45 MAD |

### SOIR — ENTRÉES
| Nom | Description | Prix |
|-----|-------------|------|
| Mezze Marocain ⭐ | Zaalouk, taktouka, haricots blancs, potiron | 75 MAD |
| Croquettes di Pollo | Croquettes de poulet panées à l'huile d'olive | 65 MAD |

### SOIR — PLATS
| Nom | Description | Prix |
|-----|-------------|------|
| Filet de Poisson ⭐ | Grillé ou au feu de bois, garniture au choix | 140 MAD |
| Suprême de Volaille Exotique | Émincé de poulet au curry, lait de coco, champignons, poivrons | 95 MAD |
| Filet de Bœuf Angus | Grillé, sauce au choix, garniture | 180 MAD |
| Homard Thermidor | Homard grillé, sauce thermidor classique | 320 MAD |
| Tagine Signature ⭐ | Tajine revisité façon gastronomique, épices du chef | 150 MAD |
| Risotto Truffes Noires | Risotto crémeux, copeaux de truffes noires | 160 MAD |

### SOIR — DESSERTS
(Same as midi, plus:)
| Crème Brûlée Vanille | Vanille Bourbon, caramel craquant | 45 MAD |
| Moelleux au Café | Gâteau fondant café, glace caramel | 50 MAD |

---

## 07 · COMPLETE SECTION SPECS

### 7.1 NAVIGATION (Sticky)

```
Behavior:
- Transparent + no background on load (hero is visible beneath)
- After 80px scroll: backdrop-filter: blur(16px), 
  background: var(--color-glass), border-bottom: 0.5px solid var(--color-border)
- Height shrinks from 80px → 56px with a smooth transition
- On mobile: collapses to hamburger; drawer slides from right with full-screen overlay

Left:
  → Logo mark (★ | R) at 36px height, links to #top

Center (desktop only):
  → Menu · L'Expérience · Réserver · Galerie · Contact
  → Hover: gold underline draws in from left (CSS animation)
  → Active section: persistent gold underline
  → Font: DM Sans 400, 13px, letter-spacing: 0.06em, uppercase

Right:
  → Language toggle: [FR] · [EN] · [AR] — active language in gold
  → "Réserver" pill: border 1px gold, gold text, hover: fills gold, text turns charcoal
  → Chef's Table icon (candle flame SVG) — tooltip on hover: "Chef's Table Mode"
  → Sound toggle (wave icon) — mutes/unmutes ambient audio

Mobile nav drawer:
  → Full viewport, background: var(--color-espresso)
  → Logo centered at top
  → Nav items stacked, 2rem gap, Cormorant 300 at 2.5rem
  → Language + sound toggles at bottom
```

### 7.2 HERO SECTION

```
Height: 100svh (safe area on mobile)
Background: <video> autoplay muted loop playsinline
  → Source: /public/videos/hero-loop.mp4
  → Fallback poster: /public/images/hero-poster.jpg
  → For prototype: use a royalty-free video from Pexels 
    Search: "coffee pour", "restaurant ambiance", "candle dinner" 
    — pick warm-toned, slow-motion footage
  → CSS filter: brightness(0.75) sepia(0.15) — warm grade applied

Overlays (layered, in order):
  1. Vignette: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)
  2. Bottom fade: linear-gradient(to bottom, transparent 60%, var(--color-espresso) 100%)
  3. Film grain: /public/textures/grain.png at 6% opacity, repeat, animated with 
     a subtle position shift for a living-grain effect
  4. Optional: very faint paper texture at 3% opacity

Content (centered, z-index above video):
  → Section label: "· AGADIR, MAROC" — DM Sans, 11px, letter-spacing: 0.3em, gold, 
    uppercase — fades in first (delay 0.3s)
  → H1: "Où Agadir ralentit." — Cormorant Garamond 300, ~8vw, ivory
    Animation: each word fades in and rises slightly, 150ms stagger between words
  → Sub-line (italic): "Cuisine française · marocaine · méditerranéenne"
    Cormorant Garamond italic 300, ~1.5vw, warm ivory 80% opacity
    Fades in after H1 completes (delay ~1.2s)
  → CTAs (row, gap: 1.5rem, delay 1.8s):
    Primary: "Réserver une table" — gold background, charcoal text, 
             14px DM Sans 500, padding: 14px 28px, border-radius: 2px
             Hover: gold lightens 10%, subtle scale(1.02)
    Secondary: "Voir le menu" — border: 1px solid gold, gold text, same sizing
             Hover: gold fills in with 300ms transition
  → Scroll cue (bottom center): animated chevron or "↓ DÉCOUVRIR" in 10px 
    small caps, bounces gently, fades out after first scroll

Parallax: hero video moves at 0.4× scroll speed via transform: translateY()
```

### 7.3 INTRODUCTION — "Un lieu, trois cuisines."

```
Layout: full-width, background: var(--color-ivory), padding: 120px 0

Grid: 2 columns (55% / 45%) on desktop, stacked on mobile

Left column:
  → Section label: "· L'HISTOIRE"
  → H2: "Un lieu,\ntrois cuisines." — Cormorant 300
  → Body text (FR default — translate to EN/AR):
    "Au cœur de Founty, face à la baie d'Agadir, ROASTERY est né d'une 
     conviction simple : que la table est le plus beau des rendez-vous. 
     Ici, la cuisine française se marie à la générosité marocaine et 
     à la légèreté méditerranéenne. Chaque assiette est une intention. 
     Chaque visite, un souvenir."
    — DM Sans 300, 1.0625rem, 1.9 line-height, var(--text-on-light)
  → Below: a thin gold hairline (0.5px, 80px wide) followed by 3 stats in a row:
    "4.6 / 5  ·  TripAdvisor" | "07:00 – 00:00  ·  7j/7" | "Founty, Agadir"
    DM Sans 400, 0.8rem, letter-spacing: 0.1em, color: var(--text-muted)

Right column:
  → Single tall photograph (aspect ratio 3:4) — interior dining room or chef
  → Image has: border-radius: 2px, overflow: hidden
  → On scroll-enter: slow Ken Burns zoom (scale 1.0 → 1.05 over 8s, CSS animation)
  → Caption below (italic DM Sans, 12px, muted): 
    "La salle principale, Founty — Agadir"

Scroll animation: left column slides in from left, right column fades up, 
both triggered when section enters viewport (Framer Motion or IntersectionObserver)
```

### 7.4 MENU FLIPBOOK ⭐ CENTERPIECE

```
Background: var(--color-charcoal)
Padding: 100px 0
Section label: "· LA CARTE"
H2: "Le menu" — Cormorant, ivory

THE BOOK COMPONENT:
  Dimensions (desktop): 900px wide × 580px tall — centered on page
  Drop shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.1)
  Border-radius: 2px on outer corners

  STRUCTURE:
    - Left page: always a dish photograph (object-fit: cover, full page)
      with a subtle warm filter (sepia 10%, brightness 0.95)
    - Right page: cream background (var(--color-ivory)), 
      dish name in Cormorant 400 at 2rem,
      description in Cormorant italic 300 at 1rem (text-muted),
      price in DM Sans 500, gold, 1.1rem,
      a thin gold hairline separator,
      tags (vegetarian / seafood / popular) as tiny pill badges,
      "+ Favoris" heart button (saves to localStorage)
    
  PAGE FLIP ANIMATION:
    - Implement using CSS 3D transforms (rotateY) for the page-turn effect
    - Add perspective: 2000px to parent container
    - The flipping page casts a gradient shadow on the revealed page
    - On flip: play /public/sounds/page-turn.mp3 at 30% volume (if sound enabled)
    - Bezier curve: cubic-bezier(0.645, 0.045, 0.355, 1.0) for natural feel
    - Use react-pageflip library OR build custom with CSS 3D

  CATEGORY TABS (left spine of book):
    Vertical tabs stacked on the left edge of the book:
    · Petit-déjeuner
    · Brunch  
    · Entrées
    · Plats
    · Desserts
    · Café & Thé
    Active tab: gold text, small gold indicator dot
    Click jumps to first page of that category with a multi-page flip animation

  NAVIGATION:
    - Left/right arrow buttons (minimal, ghost style) — outside book edges
    - Keyboard: ← → arrow keys
    - Touch/swipe on mobile

  MOBILE VERSION:
    - Book becomes a swipeable card stack (no 3D flip — use a smooth 
      horizontal swipe with spring physics)
    - Each card: full-width, image top 50% / details bottom 50%
    - Swipe left = next dish, swipe right = previous
    - Same category tabs appear as a horizontal scrollable pill row above cards
    - "Page X of Y" indicator below

  PDF LINK:
    Below the book: "Télécharger la carte en PDF →" 
    DM Sans 400, 12px, muted, underline on hover
    Links to /public/menu/roastery-menu.pdf (placeholder for now)

  FAVORITES:
    A "Mes favoris (3)" pill in the top-right of the section
    Click opens a slide-over drawer listing saved dishes
    Saved in localStorage key: "roastery_favorites"
```

### 7.5 SIGNATURE DISHES — Horizontal Scroll

```
Background: var(--color-espresso)
This section "captures" the vertical scroll when the user reaches it and 
converts it to horizontal movement. When all cards have been scrolled past, 
vertical scroll is released. (Implement with ScrollTrigger from GSAP, or 
with a Framer Motion scroll-linked animation)

Cards (5–6 total):
  Width: 380px, Height: 520px, flex-shrink: 0
  Image: top 65%, object-fit: cover, warm filter
  Content area (bottom 35%): padding: 24px
    → Dish name: Cormorant 400, 1.6rem, ivory
    → Description (poetic, one line, no price): Cormorant italic, 1rem, muted
  
  Hover state: 
    → card lifts: translateY(-8px), box-shadow increases
    → image subtly zooms (scale 1.03)
    → transition: 400ms ease

Section label: "· NOS SIGNATURES" — appears pinned on left while cards scroll past

DISHES TO FEATURE (use matching Unsplash placeholder images for prototype):
  1. Salade Roastery — "La mer rencontre les tropiques"
  2. Homard Thermidor — "Générosité et noblesse"
  3. Tagine Signature — "L'âme du Maroc réinventée"  
  4. Filet de Bœuf Angus — "La perfection dans la braise"
  5. Fondant Chocolat Caramel — "La fin heureuse"
  6. Risotto Truffes Noires — "Le luxe, simplement"
```

### 7.6 THE COFFEE PROGRAM

```
Background: var(--color-charcoal)
Layout: 50/50 split (video left, text right) on desktop, stacked on mobile

Left: looping video of coffee being brewed
  → Placeholder: Pexels "espresso pour", "latte art", "V60 coffee"
  → Video: autoplay muted loop, object-fit: cover, full left-panel height
  → Warm CSS filter overlay: sepia(0.2) brightness(0.9)

Right: padding: 80px 60px
  → Section label: "· LE CAFÉ"
  → H2: "Le café,\nnotre obsession." — Cormorant 300, ivory, ~3.5rem
  → Body: 
    "Nous torréfions nos grains avec soin, sourcés chez des producteurs 
     partenaires au Maroc et en Éthiopie. Chaque tasse est une promesse : 
     celle d'un moment suspendu, d'un café qui mérite qu'on lui accorde 
     du temps."
  → Below: 3 small stats with gold dividers:
    "3 origines · Maroc, Éthiopie, Colombie"
    "Torréfaction · In-house"  
    "7h00 · Premier café du jour"
  → CTA: "Voir la carte café →" (ghost button)
```

### 7.7 AMBIANCE GALLERY

```
Background: var(--color-ivory)
Layout: CSS Grid masonry (columns: 3 on desktop, 2 on tablet, 1 on mobile)
  → 8–10 photos in an organic, asymmetric layout
  → Alternate portrait and landscape orientations for visual rhythm

Each photo:
  → Object-fit: cover, overflow: hidden
  → On hover: overlay fades in (var(--color-overlay)), 
    caption appears in italic white DM Sans 13px, centered
  → Cursor: crosshair on hover → full-screen lightbox opens on click

LIGHTBOX:
  → Full viewport, background: rgba(0,0,0,0.95)
  → Image centered with max-height: 85vh
  → Left/right arrows (← →) + keyboard support
  → Swipe support on mobile
  → Caption below in italic ivory
  → ESC or × to close (smooth fade out)
  → Prevents body scroll while open

Ken Burns: each image zooms 1.0 → 1.04 over 10s loop, staggered starts
```

### 7.8 RESERVATIONS (Static Prototype)

```
Background: full-width warm photo (dining room) with var(--color-overlay) at 70%

Center: frosted glass card
  → Background: rgba(30, 26, 23, 0.8), backdrop-filter: blur(20px)
  → Border: 0.5px solid var(--color-border)
  → Border-radius: 4px, padding: 56px 48px
  → max-width: 580px

Section label: "· RÉSERVATIONS"
H2: "Réservez votre table" — Cormorant 300, ivory

FORM FIELDS (all styled with gold bottom-border-only, no box borders):
  → Date picker (calendar icon in gold, opens a styled date picker)
  → Time selector (dropdown: 07:00, 07:30 ... 23:30 in 30min intervals)
  → Number of guests (stepper: – 1 +, min 1 max 20)
  → Full name (text input)
  → Phone number (with +212 prefix pre-filled)
  → Email address
  → Special requests (textarea, 3 rows, resizable: none)

Submit button: full-width, gold background, charcoal text
  "Confirmer ma réservation" — DM Sans 500, letter-spacing: 0.05em

PROTOTYPE BEHAVIOR (no backend):
  → On submit: validate all required fields client-side
  → If valid: hide form, show confirmation card:
    - Gold checkmark (SVG, stroke animation draws in over 600ms)
    - H3: "Réservation confirmée" — Cormorant, gold
    - Body: "Merci [Name], nous vous attendons le [Date] à [Time]. 
      Vous recevrez une confirmation par email."
    - Note: "Pour tout changement, appelez-nous au 05282-15499"
  → Log reservation object to console (for prototype visibility)
  → Store in localStorage as roastery_reservations[] array

WhatsApp fallback:
  Below the form card: "Ou réservez directement par WhatsApp →"
  → Links to: https://wa.me/212528215499?text=Bonjour%2C%20je%20souhaite%20réserver%20une%20table%20chez%20ROASTERY
  → Opens in new tab
  → WhatsApp green icon + DM Sans 400, 13px

FIELD VALIDATION (French error messages by default):
  → "Veuillez sélectionner une date" 
  → "Veuillez indiquer votre nom"
  → "Numéro de téléphone invalide"
  → "Adresse email invalide"
```

### 7.9 CUSTOMER REVIEWS

```
Background: var(--color-charcoal)
Section label: "· ILS NOUS FONT CONFIANCE"
H2: "Ce qu'ils en disent" — Cormorant italic 300, ivory

Layout: Full-width pull-quote carousel (one quote visible at a time)

Each quote slide:
  → Opening " " — Cormorant 300, 6rem, gold, opacity: 0.3 (decorative)
  → Quote text: Cormorant italic 300, clamp(1.4rem, 2.5vw, 2rem), ivory, 
    max-width: 700px, centered, line-height: 1.7
  → Attribution below: DM Sans 400, 12px, letter-spacing: 0.2em, 
    gold, uppercase: "SARAH M. · TRIPADVISOR · 5 ÉTOILES"
  → No star graphic — the "5 ÉTOILES" text is sufficient (per brief)

AUTO-ADVANCES: every 5s with a smooth crossfade (opacity transition)
MANUAL: small dot indicators below (gold dot = active, muted = inactive)
PAUSE: on hover, resume on mouse leave

MOCK REVIEWS (to populate reviews.ts):
  1. "Un dîner d'exception. Les plats étaient d'une finesse remarquable, 
     le service attentionné, et l'ambiance... inoubliable. Agadir a 
     enfin sa grande table." — Karim B. · TripAdvisor · 5 Étoiles

  2. "The breakfast buffet was extraordinary — freshly made pastries, 
     eggs cooked to order, and the most beautiful sea-view terrace. 
     Roastery is in a class of its own in Agadir." — Emma L. · Google · 5 Stars

  3. "Roastery est devenu notre rituel du week-end. Le brunch du samedi 
     est une institution. Personnel chaleureux, cuisine créative, 
     qualité constante. On y revient encore et encore." — Nadia R. · Google · 5 Étoiles

  4. "من أجمل المطاعم التي زرتها في أغادير. الطعام رائع، والخدمة 
     استثنائية، والجو يجعلك تنسى العالم من حولك. تجربة لا تُنسى."
     — محمد الإدريسي · TripAdvisor · 5 نجوم

  5. "The tagine revisited was a revelation — respecting tradition while 
     elevating it to something extraordinary. Roastery understands that 
     great food is about emotion, not just technique." — James H. · TripAdvisor · 5 Stars
```

### 7.10 SPECIAL OFFERS

```
Background: var(--color-ivory)
Section label: "· OFFRES SPÉCIALES"
H2: "Moments privilégiés" — Cormorant 400

Grid: 3 cards on desktop, 1 on mobile (horizontal scroll)

Each offer card:
  → Image top (aspect 16:9), warm filter
  → Tag: "LIMITÉ" or "WEEK-END" — DM Sans 10px, uppercase, gold pill
  → Title: Cormorant 400, 1.4rem
  → Description: DM Sans 300, 0.9rem, muted
  → Price/condition: DM Sans 500, gold
  → CTA: "En savoir plus" — gold underline link

MOCK OFFERS (populate specialOffers.ts):
  1. "Brunch du Week-end" — Formule à volonté Sam–Dim 11h–15h · 
     "Laissez-vous porter par nos saveurs du matin jusqu'au milieu de journée" 
     · À partir de 150 MAD / personne

  2. "Table Romantique" — Dîner pour deux, menu dégustation 4 services + 
     bouteille de vin · "Pour les soirs qui méritent d'être mémorables" 
     · 650 MAD / couple · Sur réservation

  3. "Petit-Déjeuner Affaires" — Du lundi au vendredi 07h–10h30 · 
     "Commencez votre journée avec le goût du succès" 
     · 95 MAD / personne · Inclus wifi privatif
```

### 7.11 PRIVATE EVENTS

```
Background: var(--color-espresso)
Layout: 60/40 split — text left, atmospheric photo right

Left: padding 100px 80px
  → Section label: "· ÉVÉNEMENTS PRIVÉS"
  → H2: "Un cadre unique\npour vos moments\nprivilégiés."
  → Body: 
    "Anniversaires, dîners d'entreprise, demandes en mariage, 
     soirées privées... ROASTERY met son cadre, sa cuisine et son 
     service à votre disposition. Pour des événements jusqu'à 
     [X] personnes, nous créons une expérience sur mesure."
  → Feature list (no bullet points — use thin gold bars as separators):
    "Espace privatisé · Menus personnalisés · Service dédié · Décoration sur mesure"
  → CTA: "Nous écrire pour votre événement" — ghost button, gold border

Right: 
  → Tall photo (interior, candlelit ambiance)
  → Subtle warm overlay
```

### 7.12 LOCATION & CONTACT

```
Background: var(--color-charcoal)
Section label: "· NOUS TROUVER"
H2: "Venez nous rendre visite" — Cormorant 300

Layout: 2 columns (60% map / 40% info) on desktop, stacked on mobile

LEFT — MAP:
  Google Maps embed:
  https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.7!2d-9.5874968!3d30.3997637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b74f8f7862e7%3A0x6261190d6208d680!2sROASTERY%20Agadir!5e0!3m2!1sfr!2sma!4v1234567890

  Style: Custom dark map OR Google Maps with dark mode (use ?style= params)
  Border-radius: 2px
  Height: 460px on desktop, 300px on mobile
  Gold pin / marker overlay (CSS positioned above iframe) if Maps styling is limited

RIGHT — INFO BLOCK: padding: 60px 48px, display: flex, flex-direction: column, gap: 32px
  Each info item:
    → Icon (SVG, 20px, gold): Map · Clock · Phone · WhatsApp · Instagram
    → Label (DM Sans 10px, uppercase, letter-spacing: 0.2em, muted): "ADRESSE"
    → Value (DM Sans 400, 0.9375rem, ivory):

  Items:
  📍 ADRESSE: N° 10 Immeuble 03 Bloc 03, Khalij Ennakhil, City Founty, Agadir 80000
  🕐 HORAIRES: 
    Petit-déjeuner: Lun–Dim 07:00–10:30
    Déjeuner: Lun–Dim 12:00–14:30
    Dîner: Lun–Dim 19:00–00:00
    Brunch: Sam–Dim 11:00–15:00
  📞 TÉLÉPHONE: 05282-15499 (clickable: tel:)
  💬 WHATSAPP: +212 528 215499 (clickable: opens WhatsApp)
  📸 INSTAGRAM: @roasteryagadir (link to instagram.com/roasteryagadir)

CONTACT FORM (below the map/info grid):
  Background card: var(--color-smoke), border: 0.5px solid var(--color-border)
  Three columns on desktop: Name · Email · Message (full width) · Send button
  Section label: "· NOUS ÉCRIRE"
  PROTOTYPE: console.log on submit + success toast notification
```

### 7.13 FOOTER

```
Background: var(--color-espresso)
Border-top: 0.5px solid var(--color-border)
Padding: 80px 0 40px

Three columns:
  LEFT:
    → Logo mark (★ | R) at 48px
    → "ROASTERY" wordmark below in DM Sans uppercase, letter-spacing: 0.3em, gold, 14px
    → Tagline: "Founty · Agadir · Maroc" in muted italic Cormorant, 1rem
    → Social icons: Instagram · Facebook · TripAdvisor (SVG, 18px, ivory, gold on hover)

  CENTER:
    → Label: "NAVIGATION" (section label style)
    → Links stacked: Accueil · La Carte · L'Expérience · Réservations · 
      Offres Spéciales · Événements Privés · Contact
    → DM Sans 300, 0.875rem, muted, gold on hover

  RIGHT:
    → Label: "RESTEZ EN CONTACT"
    → Newsletter input:
      Single line, no border box — just a bottom border (0.5px ivory)
      Placeholder: "Votre adresse email"
      A → arrow button to the right (gold)
      Below input: "Aucun spam. Juste l'essentiel." in 11px muted italic
    → Contact info mini-block (phone + address) below

Bottom bar:
  Border-top: 0.5px solid rgba(255,255,255,0.08)
  Padding-top: 24px
  Left: "© 2024 ROASTERY Agadir. Tous droits réservés." — 11px, muted
  Right: "Designed with care" — 11px, muted italic
```

---

## 08 · CHEF'S TABLE MODE

```
TOGGLE: Candle flame icon in the top navigation
When ACTIVATED:
  → All CSS custom properties update (swap to --chef-* palette)
  → localStorage.setItem('roastery_chef_mode', 'true')
  → Body gains class .chefs-table-mode

VISUAL CHANGES in Chef's Mode:
  → Background deepens to var(--chef-bg) #0F0D0B
  → Gold becomes brighter: var(--chef-gold) #E8C87A
  → All images gain: filter: sepia(0.25) brightness(0.85) — old photograph feel
  → Menu flipbook gains a sepia tint overlay (rgba(180, 120, 40, 0.12))
  → Typography scales up 5%: html { font-size: 105% }
  → Candle-glow cursor trail: as mouse moves, small gold circles 
    fade in and dissipate (CSS animation, max 5 circles alive at once)
    Implementation: addEventListener('mousemove') → create div, position absolute, 
    animate opacity 1→0 + scale 1→2 over 600ms, then remove from DOM
  → Transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1) on body

NAV INDICATOR:
  → Tooltip on hover: "Mode Chef's Table" / "Revenir au mode standard"
  → When active: icon glows (drop-shadow: 0 0 8px var(--chef-gold))
```

---

## 09 · MULTILINGUAL SYSTEM

```
Hook: useLanguage() → { lang, setLang, t, isRTL }
Storage: localStorage.setItem('roastery_lang', lang)
On page load: read from localStorage, fallback to 'fr'

RTL SUPPORT for Arabic:
  → When lang === 'ar':
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
    Apply font-family: 'Noto Naskh Arabic', serif to all text
  → All flex/grid layouts must use logical properties:
    margin-inline-start instead of margin-left
    padding-inline-end instead of padding-right
    etc.

TRANSLATION KEYS to implement in /src/i18n/fr.ts, en.ts, ar.ts:

nav:
  menu, experience, reserve, gallery, contact

hero:
  tagline: "Où Agadir ralentit." / "Where Agadir slows down." / "حيث يتأنى أكادير."
  subline: "Cuisine française · marocaine · méditerranéenne"
  cta_reserve: "Réserver une table" / "Reserve a Table" / "احجز طاولة"
  cta_menu: "Voir le menu" / "View Menu" / "عرض القائمة"

sections:
  intro_title, menu_title, dishes_title, coffee_title, gallery_title,
  reservations_title, reviews_title, offers_title, events_title,
  location_title, footer_tagline, newsletter_placeholder

menu:
  All dish names, descriptions, category labels translated in all 3 languages

form:
  All labels, placeholders, error messages, success messages translated

Implement: i18n WITHOUT a heavy library — a simple React context + 
object lookup is sufficient for this prototype.
```

---

## 10 · FLOATING UI ELEMENTS

```
WHATSAPP BUTTON (always visible, bottom-right):
  → Circle, 56px diameter, WhatsApp green (#25D366), white icon
  → Position: fixed, bottom: 24px, right: 24px, z-index: 9998
  → Pulse animation: ::after pseudo-element creates a ripple ring
  → Hover: scale(1.08), tooltip: "Réservez par WhatsApp"
  → Link: https://wa.me/212528215499
  → On mobile: moves to bottom-center to avoid overlapping scroll

SOUND TOGGLE (top navigation or fixed corner):
  → Wave SVG icon, 20px, ivory
  → Active: animated bars, muted: flat bars
  → Default: MUTED (important — autoplay audio policies)
  → Controls: hero ambient sound + page-turn sound effects

SCROLL-TO-TOP (appears after 50vh of scroll):
  → Small square button, bottom-left, 40px
  → Gold up-arrow icon
  → Smooth scroll to top on click
  → Fades in/out based on scroll position

COOKIE NOTICE (first visit only):
  → Slim bar at bottom: "Nous utilisons des cookies pour améliorer votre expérience."
  → Button: "Accepter" (gold) · "En savoir plus" (link)
  → Sets: localStorage.setItem('roastery_cookies', 'accepted')
  → Dismiss on click, never show again
```

---

## 11 · PERFORMANCE & SEO

```
NEXT.JS OPTIMIZATIONS:
  → All images: use next/image with priority on hero, lazy on rest
  → Videos: loading="lazy" with IntersectionObserver trigger
  → Fonts: next/font/google with preload: true, display: 'swap'
  → Dynamic imports for heavy components:
    const MenuFlipbook = dynamic(() => import('./MenuFlipbook'), { ssr: false })
    const Gallery = dynamic(() => import('./Gallery'), { ssr: false })

META TAGS (/src/app/layout.tsx):
  → title: "ROASTERY Agadir — Restaurant Gastronomique à Founty"
  → description: "Découvrez ROASTERY, restaurant gastronomique à Agadir. 
    Cuisine française, marocaine et méditerranéenne. Réservez votre table."
  → og:image: /images/og-image.jpg (1200×630px, create a designed one)
  → og:type: restaurant
  → canonical: https://roastery-agadir.vercel.app/

SCHEMA.ORG (JSON-LD in layout.tsx):
  → @type: Restaurant
  → name, address, telephone, openingHours, servesCuisine, priceRange
  → geo: latitude/longitude
  → aggregateRating: ratingValue 4.6, reviewCount 200+

SITEMAP: auto-generated via app/sitemap.ts
ROBOTS.TXT: allow all, sitemap reference
```

---

## 12 · ANIMATION PRINCIPLES

```
LIBRARY: Framer Motion (primary) + CSS transitions (micro-interactions)
DO NOT use GSAP unless strictly necessary for the horizontal scroll section.

MOTION VALUES:
  Entry animations: 
    → Default: opacity 0→1, y 24→0, duration 0.6s, ease [0.25, 0.46, 0.45, 0.94]
    → Stagger children: 0.1s between siblings
    → Trigger: when element enters viewport (useInView, threshold: 0.15)
  
  Section titles:
    → Slide from x: -40 → 0, opacity 0→1
    → Gold underline: scaleX 0→1, transform-origin: left, duration 0.8s

  Gold hairline dividers:
    → scaleX: 0→1, left to right, duration 1.2s, ease: linear
    → Triggers when divider enters viewport

  Hover:
    → All transitions: 300–400ms ease
    → Never: bounce, elastic (keep it refined)
    → Cards: translateY(-6px) + box-shadow increase
    → Links: color change + underline growth

PARALLAX:
  → Hero video: 0.4× scroll speed (subtle)
  → Section background images: 0.2× scroll speed
  → NEVER: parallax that shifts content more than 60px (causes motion sickness)

REDUCED MOTION:
  → @media (prefers-reduced-motion: reduce):
    → Disable all parallax
    → Disable Ken Burns
    → Disable page-flip animation (instant switch)
    → Disable cursor trail
    → Keep opacity fades (these are safe)
```

---

## 13 · TAILWIND CONFIGURATION

```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal:    '#3D4345',
        gold:        '#C9A96E',
        ivory:       '#F5F0E8',
        espresso:    '#1E1A17',
        terracotta:  '#B5623A',
        olive:       '#5C6345',
        smoke:       '#2A2E2F',
      },
      fontFamily: {
        serif:      ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:       ['DM Sans', 'system-ui', 'sans-serif'],
        arabic:     ['Noto Naskh Arabic', 'serif'],
      },
      fontSize: {
        'hero':  ['clamp(4rem, 8vw, 9rem)', { lineHeight: '1.0' }],
        'h2':    ['clamp(2.5rem, 4vw, 4.5rem)', { lineHeight: '1.1' }],
        'h3':    ['clamp(1.4rem, 2vw, 2rem)', { lineHeight: '1.3' }],
        'body':  ['1.0625rem', { lineHeight: '1.85' }],
        'label': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.25em' }],
      },
      backdropBlur: { glass: '16px' },
      boxShadow: {
        'book': '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.1)',
        'card-hover': '0 20px 40px rgba(0,0,0,0.3)',
      },
      animation: {
        'ken-burns': 'kenBurns 10s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'grain': 'grainMove 0.5s steps(1) infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.05)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        grainMove: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 14 · VERCEL & GITHUB DEPLOYMENT

```
VERCEL CONFIGURATION (vercel.json):
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "next",
  "regions": ["cdg1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}

ENVIRONMENT VARIABLES (.env.example):
  NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
  NEXT_PUBLIC_WHATSAPP_NUMBER=212528215499
  NEXT_PUBLIC_RESTAURANT_PHONE=0528215499

README.md must include:
  ## Getting Started
  git clone [repo-url]
  cd roastery-agadir
  npm install
  cp .env.example .env.local
  # Add your Google Maps API key
  npm run dev

  ## Deploy on Vercel
  Push to main branch → auto-deploys via Vercel GitHub integration

  ## Database (Future)
  The following components are ready for database integration:
  - /src/data/menu.ts → replace with API route + Prisma query
  - /src/data/reviews.ts → replace with CMS or DB fetch
  - Reservations form → replace console.log with API POST to /api/reservations
  - Newsletter → replace with Mailchimp or ConvertKit API

PACKAGE.JSON SCRIPTS:
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
```

---

## 15 · PROTOTYPE RULES (No Backend)

```
ALL THESE ARE MOCK/STATIC FOR V1 PROTOTYPE:

✅ Reservation form → validates client-side → localStorage → success animation
✅ Contact form → validates → console.log + toast → clears form
✅ Newsletter → fake success toast after 800ms delay
✅ Reviews → hardcoded in /src/data/reviews.ts (5 reviews minimum)
✅ Special offers → hardcoded in /src/data/specialOffers.ts
✅ Menu → fully typed static data in /src/data/menu.ts
✅ Favorites → localStorage only
✅ Instagram feed → use 6 placeholder images (real API for v2)
✅ Chef's mode → localStorage persistence (no server)

DATABASE-READY PATTERN (prepare but don't implement):
  Each data file should export both:
  1. Static mock data (used now)
  2. A commented-out async function showing where the DB call goes:
  
  // PROTOTYPE: static data
  export const menuItems: MenuItem[] = [ ... ]
  
  // FUTURE: uncomment and connect to Prisma/Supabase
  // export async function getMenuItems(): Promise<MenuItem[]> {
  //   return await prisma.menuItem.findMany({ orderBy: { category: 'asc' } })
  // }
```

---

## 16 · WHAT TO DELIVER

```
1. Complete Next.js project (all files, correctly structured per §05)
2. All sections implemented per §07
3. Working language toggle (FR/EN/AR with RTL)
4. Working Chef's Table mode toggle
5. Fully functional menu flipbook (3D page-flip on desktop, swipe on mobile)
6. Working reservation form (client-side validation + confirmation animation)
7. Responsive at: 375px · 768px · 1024px · 1440px · 1920px
8. tailwind.config.ts with full brand system
9. README.md with setup + deploy instructions
10. vercel.json + .env.example
11. All placeholder images sourced from Unsplash (restaurant/café/Moroccan aesthetic)
    → Use next/image with Unsplash CDN URLs or download and place in /public/images/
12. Film grain texture (create as a small repeating PNG or generate via CSS canvas)
13. Google Fonts loaded via next/font (Cormorant Garamond + DM Sans + Noto Naskh Arabic)

STYLE GUIDE PAGE (/style-guide):
  → Color swatches with hex values
  → Typography scale examples
  → Button variants (filled, ghost, text)
  → Form field styling
  → Card variants
  → Section label + gold divider examples

FLIPBOOK AS STANDALONE COMPONENT:
  → /src/components/ui/Flipbook/
    ├── Flipbook.tsx     (main component, accepts MenuData[] prop)
    ├── FlipPage.tsx     (single page with 3D CSS transform)
    ├── BookSpine.tsx    (category tabs)
    └── MobileCards.tsx  (mobile swipeable version)
  → Export from index.ts with full TypeScript props
  → Can be used standalone in other projects
```

---

## 17 · FINAL CHECKLIST FOR THE AI AGENT

Before considering the task complete, verify every item:

- [ ] Logo appears in nav + footer, correctly sized and clear-space respected
- [ ] Brand colors match §02 exactly — no hardcoded hex values outside CSS variables
- [ ] All 3 languages work — test every piece of visible text translates
- [ ] Arabic switches layout to RTL and applies Noto Naskh Arabic font
- [ ] Hero video plays on load (muted, autoplay, loop) with fallback image
- [ ] Film grain overlay visible across all sections (subtle, ~6%)
- [ ] Menu flipbook opens, flips pages, plays page-turn sound (if sound enabled)
- [ ] Category tabs on flipbook jump to correct dish section
- [ ] Horizontal scroll section works and releases vertical scroll after last card
- [ ] Reservation form validates, shows confirmation, stores to localStorage
- [ ] Chef's Table mode activates/deactivates, persists on refresh
- [ ] Custom gold cursor dot visible on desktop (not mobile)
- [ ] WhatsApp button visible on all pages, pulses, opens correct URL
- [ ] Google Maps iframe renders (may need API key — provide placeholder + instructions)
- [ ] All images use next/image with proper alt text (accessibility)
- [ ] Site is fully navigable by keyboard (tab order, focus states visible in gold)
- [ ] No TypeScript errors (run: npm run type-check)
- [ ] No ESLint errors (run: npm run lint)
- [ ] Builds successfully for production (run: npm run build)
- [ ] README explains all setup steps clearly

---

*End of Master Prompt · ROASTERY AGADIR Website v1.0*
*Prototype · GitHub + Vercel · No database required*