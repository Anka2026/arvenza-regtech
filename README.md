# ARVENZA RegTech

Official marketing website for Arvenza RegTech — the EU Sustainability Compliance Platform.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next-intl (EN / TR / NL)
- Framer Motion
- shadcn/ui components
- lucide-react icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — middleware redirects to `/en`.

## Routes

| Route | Description |
|-------|-------------|
| `/en`, `/tr`, `/nl` | Homepage (localized) |
| `/[locale]/platform` | Platform modules overview |
| `/[locale]/regulations` | Regulatory coverage |
| `/[locale]/resources` | Blog, updates, guides |
| `/[locale]/about` | About ARVENZA |
| `/[locale]/contact` | Contact form & offices |
| `/[locale]/demo` | Request demo form |

## Project Structure

```
app/
  [locale]/
    page.tsx              # Homepage
    platform/page.tsx
    regulations/page.tsx
    resources/page.tsx
    about/page.tsx
    contact/page.tsx
    demo/page.tsx
    layout.tsx
components/
  brand/                  # Logo, brand wave visual
  forms/                  # Contact & demo forms
  layout/                 # Header, footer
  sections/               # Homepage sections
  ui/                     # shadcn-style primitives
messages/
  en.json
  tr.json
  nl.json
i18n/
  routing.ts
  request.ts
lib/
  utils.ts
```

## Brand

- **Product:** ARVENZA RegTech
- **Operator:** Anka Sustainability B.V., Netherlands
- **Domain:** www.arvenza.net
- **Contact:** info@ankasustainability.com
