# Anniversary Love Story Website

## Project Overview
A cinematic, mobile-first anniversary website built as a single-page React app. It presents a scrollable love story journey through 13 animated sections — from an envelope opening sequence to a surprise reveal at the end.

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS 3.4 + custom CSS keyframes
- **Bundling**: `vite-plugin-singlefile` — produces a single `dist/index.html`
- **Fonts**: Google Fonts (Playfair Display, Cormorant Garamond, Dancing Script)
- **Animations**: Pure CSS keyframes + IntersectionObserver (NO Framer Motion, NO GSAP)

## Architecture

### Single-File Component Strategy
**Everything** lives in `src/App.tsx` (~1530 lines). This is intentional — the project is designed to be a self-contained, personalizable love letter. Do not split into separate component files.

### CONFIG Object (lines 21-230)
The `CONFIG` object at the top of `App.tsx` contains ALL personalizable content: names, dates, timeline milestones, photo book entries, letter text, love letters, reasons, quiz questions, wheel prizes, soundtrack, and surprise text. To personalize the site, **only edit CONFIG**.

### Custom Hooks
- `useScrollReveal` — IntersectionObserver-based scroll-triggered reveal (fires once)
- `useSwipe` — Touch event handler for mobile swipe gestures
- `useCountUp` — requestAnimationFrame counter with easeOutCubic

### CSS Architecture
- `src/index.css` — Tailwind directives, complex keyframe definitions, glassmorphism utilities
- `tailwind.config.js` — Custom color palette, font families, animation extensions
- Glassmorphism: `.glass` and `.glass-subtle` utility classes
- 3D flip: `.perspective-1000`, `.preserve-3d`, `.backface-hidden` utilities

## File Structure
```
Anniversaryweb/
├── index.html              # Entry point, Google Fonts <link> tags
├── package.json            # name: anniversary-love-story
├── vite.config.ts          # React + singlefile plugin, inline all assets
├── tailwind.config.js      # Colors, fonts, animations
├── postcss.config.js       # Tailwind + Autoprefixer
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   └── photos/             # Place real photos here (currently empty)
├── src/
│   ├── main.tsx            # ReactDOM.createRoot
│   ├── App.tsx             # ALL components, CONFIG, hooks (~1530 lines)
│   ├── index.css           # Tailwind + keyframes + utilities
│   └── vite-env.d.ts
└── dist/
    └── index.html          # Production build (~253KB, ~77KB gzipped)
```

## 13 Sections (in order)
0. **Preloader** — pulsing heart, fades on `document.fonts.ready`
1. **EnvelopeIntro** — full-screen envelope, tap to open (flap → seal → letter → sparkles)
2. **HeroSection** — day counter (animates from 0), concentric circles, scroll indicator
3. **TimelineSection** — 8 milestones, vertical gold line, staggered scroll-reveal
4. **PhotoBookSection** — 6 polaroid cards, 3D CSS flip on tap
5. **HandwrittenLetterSection** — typewriter effect at 22ms/char, blinking cursor
6. **LoveLettersSection** — 10 "Open When..." accordion envelopes
7. **ReasonsCarouselSection** — 25 reasons, arrow nav + swipe, crossfade transition
8. **QuizSection** — 5 questions, progress dots, confetti on completion
9. **LoveWheelSection** — SVG wheel, cubic-bezier deceleration spin
10. **SoundtrackSection** — 6 songs with personal notes
11. **FinalSurpriseSection** — gift box → confetti burst → reveal card
12. **FooterSection** — names, "made with love", pulsing heart

## Commands
- `npm run dev` — Start dev server at `localhost:5173`
- `npm run build` — Production build → `dist/index.html` (single file)
- `npm run preview` — Preview production build locally
- `npm run lint` — ESLint

## Design System

### Color Palette (warm romantic — NO purple, blue, or cold colors)
| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#FFF8F0` | Page background |
| `cream-dark` | `#FBF3EB` | Secondary backgrounds |
| `rose` | `#B76E79` | Accent (buttons, highlights) |
| `rose-blush` | `#E8B4B8` | Soft accent, polaroid gradients |
| `rose-deep` | `#8B3A4A` | Hover states, wax seal |
| `gold` | `#C9A96E` | Labels, dividers, borders |
| `gold-light` | `#E8C99B` | Lighter accent |
| `warm-brown-dark` | `#1A0F0A` | Primary text |
| `warm-brown` | `#6B4F3E` | Body text |
| `warm-brown-muted` | `#A08B7A` | Muted/secondary text |

### Typography
- **Playfair Display** — Headings (`font-playfair`)
- **Cormorant Garamond** — Body text (`font-cormorant`)
- **Dancing Script** — Handwritten sections (`font-dancing`)
- Labels: `text-[0.65rem] tracking-[0.4em] uppercase`

### Animation Principles
- All transitions use `ease-out` or custom cubic-bezier
- Durations: 600ms–1500ms
- Scroll reveals fire once only (IntersectionObserver `unobserve` after trigger)
- Stagger children by 80–120ms via `transitionDelay` or `animation-delay`
- Confetti: 55 CSS-only pieces with randomized trajectories

## Adding Real Photos

Photos go in `public/photos/`. There are 3 places to replace `PlaceholderImage`:

### 1. Hero photo (in `HeroSection`)
Replace `<PlaceholderImage emoji="💑" .../>` with:
```tsx
<img src="/photos/hero.jpg" alt="Us" className="w-full max-w-sm mx-auto rounded-xl shadow-lg object-cover" style={{ aspectRatio: '16/9' }} />
```

### 2. Timeline photos (in `TimelineItem`)
Replace `<PlaceholderImage emoji={item.emoji} .../>` with:
```tsx
<img src={`/photos/timeline-${index + 1}.jpg`} alt={item.title} className="max-w-[320px] rounded-lg shadow-md object-cover" style={{ aspectRatio: '4/3' }} />
```

### 3. Polaroid photos (in `PolaroidCard`)
Replace the front-side `<PlaceholderImage .../>` with:
```tsx
<img src={`/photos/polaroid-${index + 1}.jpg`} alt={photo.caption} className="w-full rounded-sm object-cover" style={{ aspectRatio: '1/1' }} />
```

**Photo sizing tips**: Hero = 16:9 landscape, Timeline = 4:3 landscape, Polaroids = 1:1 square. Keep each under 200KB for fast loading.

**Important**: When photos are added to `public/`, they will NOT be inlined by `vite-plugin-singlefile`. The single-file bundle only works for code/CSS. If you need a truly standalone file with embedded photos, convert photos to base64 data URIs in the `src` attributes.

## Deployment (Vercel)

This project deploys to Vercel as a standard Vite app:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Note: The `vite-plugin-singlefile` produces a single `index.html` but Vercel handles this fine. Google Fonts load from CDN so they work on any host.

## Gotchas & Learnings
1. **`npm create vite@latest .`** fails if directory has any files (even `.claude/`). Scaffold in a temp directory and copy files over.
2. **Tailwind must be v3** (not v4) — v4 uses a completely different config system incompatible with this project's `tailwind.config.js` approach.
3. **Unused variables cause build failure** — `tsc -b` runs in strict mode. Use `[, setter]` destructuring pattern for unused state values.
4. **Markdown formatting in CONFIG** — If pasting text from ChatGPT/AI into CONFIG, strip all markdown fences and formatting. Only plain JavaScript strings are valid.
5. **Single-file limitation** — `vite-plugin-singlefile` inlines JS and CSS but NOT images from `public/`. For a truly standalone HTML file, use base64 data URIs or CSS gradients.
6. **StrictMode double-render** — React StrictMode in development causes effects to fire twice. This can make the typewriter animation look jumpy in dev. Production build is unaffected.
7. **Glassmorphism on low-end mobile** — `backdrop-filter: blur()` is GPU-intensive. The `.glass` utility uses a modest 12px blur. If targeting very low-end devices, reduce to 8px or remove.
