# MEE FARMS — Design System & Architecture Documentation

> **Healthy Eating, Healthy Living** — Nigeria's Integrated Agribusiness Platform

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Color Palette](#3-color-palette)
4. [Typography](#4-typography)
5. [Component Architecture](#5-component-architecture)
6. [Page Structure](#6-page-structure)
7. [Animations & Motion](#7-animations--motion)
8. [Backend API Design](#8-backend-api-design)
9. [Special Features](#9-special-features)
10. [Adapting for Your Farm](#10-adapting-for-your-farm)

---

## 1. Project Overview

MEE FARMS is a full-stack agribusiness web application built to serve as a digital storefront, product showcase, community hub, and farmer outreach platform. The app is designed with an earthy, modern agricultural aesthetic — drawing from international agribusiness references while staying grounded in the Nigerian farming context.

**Core Pages:**
- **Home** — Hero, marquee ticker, product categories, video feature, CTA, newsletter
- **About** — Story, timeline, mission/vision, core values, open-source download
- **Products** — Browse crop, livestock, and agro-chemical categories
- **Videos** — YouTube-embedded farming tutorials and farm tour videos
- **Shop** — E-commerce with cart, filters, and order placement
- **Admin** — Product & order management (authenticated)

---

## 2. Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite 5 | Dev server & bundler |
| Tailwind CSS 3 | Utility-first styling |
| shadcn/ui | Base UI component library |
| React Router DOM v6 | Client-side routing |
| Lucide React | Icon set |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Multer | Image/file uploads |
| Resend | Transactional email (newsletter) |
| ts-node-dev | Dev server with hot reload |

### Infrastructure
| Item | Value |
|---|---|
| Frontend Port | 5000 |
| Backend Port | 3001 |
| API Proxy | Vite forwards `/api` and `/uploads` → localhost:3001 |
| Environment | Replit (or any Node.js host) |

---

## 3. Color Palette

The palette is inspired by Nigerian farmland — rich earthy greens, warm gold harvest tones, and deep dark soil.

### CSS Custom Properties (`main/src/index.css`)

```css
/* Light mode */
--background:     40 30% 97%    /* warm cream white */
--foreground:     85 25% 12%    /* deep forest text */
--primary:        85 38% 35%    /* olive green */
--primary-foreground: 46 88% 95%
--secondary:      46 88% 57%    /* harvest gold / amber */
--secondary-foreground: 85 38% 15%
--muted:          40 20% 90%
--muted-foreground: 85 15% 45%
--border:         85 15% 80%
--farm-dark:      40 25% 10%    /* deep dark soil (used for dark hero sections) */
--farm-earth:     30 40% 25%    /* warm earth brown */
--farm-cream:     46 60% 94%    /* light harvest cream */
```

### Tailwind Tokens (`main/tailwind.config.ts`)

```ts
colors: {
  'farm-dark':  'hsl(var(--farm-dark))',
  'farm-earth': 'hsl(var(--farm-earth))',
  'farm-cream': 'hsl(var(--farm-cream))',
}
```

### Usage Guide

| Token | Use |
|---|---|
| `bg-primary` / `text-primary` | Main green — buttons, labels, icons |
| `text-secondary` | Gold accents — hero highlights, stats |
| `bg-farm-dark` | Dark hero sections, footer |
| `bg-farm-earth` | Warm overlay tones |
| `bg-farm-cream` | Light section backgrounds |

---

## 4. Typography

Two Google Fonts are loaded in `main/index.html`:

| Role | Font | Weights |
|---|---|---|
| **Headings** (`font-heading`) | Montserrat | 700, 900 (Black) |
| **Body** (`font-body`) | Open Sans | 400, 600 |

### Usage Convention
- All display headings: `font-heading font-black` (900 weight)
- Subheadings / card titles: `font-heading font-bold` (700 weight)
- Body copy / descriptions: `font-body` (400 weight)
- Labels / tags / badges: `font-body font-semibold uppercase tracking-widest text-xs`

---

## 5. Component Architecture

### Core Custom Components

```
main/src/
├── components/
│   ├── Navigation.tsx       — Sticky nav with transparency on hero, dark mode toggle
│   ├── Footer.tsx           — Full-width dark footer with contact, links, brand watermark
│   ├── Hero.tsx             — Split-panel hero with stats bar and "20 Years" badge
│   ├── Marquee.tsx          — Auto-scrolling product/category ticker (CSS animation)
│   ├── AboutSummary.tsx     — 2-column image + text section for home page
│   ├── FeaturedProducts.tsx — Category cards grid with reveal animation
│   ├── VideoFeature.tsx     — Dark section with embedded YouTube iframe
│   ├── CTABanner.tsx        — Full-width call-to-action with farm background
│   ├── NewsletterSection.tsx— Email subscribe form → POST /api/newsletter/subscribe
│   └── StickyLeadCapture.tsx— Fixed WhatsApp + Outgrower buttons (Shop & Products pages)
├── hooks/
│   └── useReveal.ts         — IntersectionObserver scroll-reveal hook
└── pages/
    ├── Index.tsx            — Home page (composes all components above)
    ├── About.tsx            — About page with story, timeline, values, open-source section
    ├── Products.tsx         — Product category browse page
    ├── Shop.tsx             — E-commerce store with cart and filters
    └── Videos.tsx           — Video gallery page
```

### Scroll Reveal Hook (`useReveal.ts`)

```ts
import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("revealed"); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}
```

Apply with: `<section ref={useReveal()} className="reveal">` — the `.reveal` + `.revealed` classes handle the fade-up entrance.

---

## 6. Page Structure

### Standard Page Layout Pattern

```tsx
<div className="min-h-screen pt-16">          {/* pt-16 clears fixed nav */}

  {/* 1. Dark hero with background image */}
  <section className="relative py-28">
    <div className="absolute inset-0 z-0">
      <img src={heroImage} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-farm-dark/82" />     {/* dark overlay */}
    </div>
    <div className="relative z-10 container mx-auto ...">
      {/* hero content */}
    </div>
  </section>

  {/* 2. Content sections with alternating bg */}
  <section className="py-24 bg-background">...</section>
  <section className="py-24 bg-muted/40">...</section>
  <section className="py-24 bg-farm-dark">...</section>    {/* dark accent section */}
  <section className="py-24 bg-background">...</section>

</div>
```

### Navigation Structure

The `Navigation.tsx` component:
- Fixed at top (`fixed top-0 z-50`)
- Transparent on hero scroll position, solid `bg-farm-dark/95` after scrolling 80px
- Active page highlighted with `text-secondary` (gold)
- Dark mode toggle via `ThemeProvider`
- Cart icon with item count badge
- "Get Started" CTA button → `/shop`

---

## 7. Animations & Motion

### CSS Animations (`main/src/index.css`)

```css
/* Marquee ticker */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee-scroll 30s linear infinite; }

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Float (hero badge) */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
```

### Tailwind Keyframes (`tailwind.config.ts`)

```ts
keyframes: {
  'marquee-scroll': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
  'fade-up': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
},
animation: {
  'marquee': 'marquee-scroll 30s linear infinite',
  'fade-up': 'fade-up 0.8s ease forwards',
  'float': 'float 3s ease-in-out infinite',
},
```

---

## 8. Backend API Design

### Base URL: `http://localhost:3001`

All frontend calls go through Vite's proxy at `/api` → `localhost:3001`.

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | No | List all products (supports `?category=`, `?search=`) |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| POST | `/api/auth/login` | No | Admin login → returns JWT |
| GET | `/api/orders` | Admin | List all orders |
| POST | `/api/orders` | No | Place a new order |
| POST | `/api/upload` | Admin | Upload product image (Multer) |
| POST | `/api/newsletter/subscribe` | No | Subscribe email → sends Resend welcome email |

### Newsletter Flow

```
User submits email
  → POST /api/newsletter/subscribe { email }
  → Validate email format
  → Resend SDK sends branded welcome email (from: onboarding@resend.dev)
  → 200 OK { message: "Subscribed successfully" }
```

### MongoDB Schema (Products)

```ts
{
  name:        String (required),
  description: String,
  price:       Number (required),
  category:    String (enum: ['crops', 'livestock', 'agro-chemicals']),
  image:       String (URL or /uploads/... path),
  inStock:     Boolean (default: true),
  createdAt:   Date,
}
```

---

## 9. Special Features

### Sticky Lead Capture (`StickyLeadCapture.tsx`)

Shown on **Shop** and **Products** pages — fixed bottom-right buttons:

1. **WhatsApp Button** — Opens `https://wa.me/2348149196557` directly
2. **Outgrower Program Button** — Opens WhatsApp with pre-filled message:
   > "Hi MEE FARMS! I'm interested in your Outgrower Program. Please share more details."

### Dark Mode

Implemented via `ThemeProvider` (shadcn/ui). Toggle button in the navigation bar. All colors use CSS custom properties that swap on `[data-theme="dark"]` — no hard-coded color values in components.

### Marquee Ticker

`Marquee.tsx` renders a seamless infinite scroll of farm product labels using CSS animation. Items are duplicated to prevent visual gaps during the loop.

---

## 10. Adapting for Your Farm

This codebase is open-source and free to use. Here's what to change to make it yours:

### Brand Identity
- **Name**: Search & replace `MEE FARMS` across all files
- **Tagline**: `"Healthy Eating, Healthy Living"` in `Footer.tsx` and `Navigation.tsx`
- **Logo**: Replace `main/public/logo.png`
- **Colors**: Update CSS vars in `main/src/index.css` (primary, secondary tokens)
- **Fonts**: Change Google Fonts import in `main/index.html`

### Content
- **Hero text**: `main/src/components/Hero.tsx`
- **About story & timeline**: `main/src/pages/About.tsx`
- **Product categories**: `main/src/pages/Products.tsx` and `FeaturedProducts.tsx`
- **Contact details & social links**: `main/src/components/Footer.tsx`
- **WhatsApp number**: `main/src/components/StickyLeadCapture.tsx` and `Footer.tsx`

### Backend
- **MongoDB URI**: Set `MONGODB_URI` environment variable
- **JWT Secret**: Set `JWT_SECRET` environment variable
- **Resend API key**: Set `RESEND_API_KEY` environment variable (get free key at resend.com)
- **Email sender**: Update `from:` field in `server/src/routes/newsletterRoutes.ts`

### Deployment
The app can be deployed on:
- **Replit** (recommended — zero config)
- **Railway** — connect GitHub repo, set env vars, done
- **Render** — free tier available for hobby projects
- **VPS (Ubuntu)** — use PM2 for process management, nginx as reverse proxy

---

*Built with ❤️ by MEE FARMS — Taraba State, Nigeria.*
*Open-sourced to empower agribusinesses across Africa.*
