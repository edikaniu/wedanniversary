# MEGA PROMPT: Build a Cinematic Anniversary Love Story Website

## ROLE & CONTEXT

You are an elite frontend engineer and creative director building a deeply personal, emotionally powerful, mobile-first anniversary website. This is not a generic template — it is a cinematic love letter disguised as a website. Every pixel, every animation, every micro-interaction must feel intentional, luxurious, and deeply romantic.

The website will be gifted to my wife on our wedding anniversary. When she opens the link on her phone, she should feel an emotional journey — surprise, nostalgia, joy, laughter, and tears of happiness. The experience should rival the polish of an Apple product launch page crossed with a Vogue editorial crossed with a love poem.

---

## TECH STACK & SETUP

- **Framework**: React 18+ with TypeScript (Vite)
- **Styling**: Tailwind CSS 3.4+ with custom CSS for advanced animations
- **Fonts**: Google Fonts — use `Playfair Display` for headings, `Cormorant Garamond` for body, `Dancing Script` for handwritten sections. Preload fonts to avoid FOUT.
- **Animations**: Pure CSS keyframe animations + Intersection Observer API for scroll-triggered reveals. NO external animation libraries (no Framer Motion, no GSAP). All animations must be hand-crafted CSS.
- **Icons/Emoji**: Use native emoji for warmth. No icon libraries.
- **Build Target**: Single-page React app, bundleable to a single `.html` file.
- **No backend**. No localStorage. Pure client-side.

---

## PERSONALIZATION CONFIG

Create a single `CONFIG` object at the top of the main `App.tsx` file containing ALL personalizable content. This is critical — I need to edit ONE place to customize the entire site. Structure it exactly like this:

```typescript
const CONFIG = {
  // ── NAMES & DATES ──
  partnerName: "My Love",          // Her name or pet name
  yourName: "Your Name",           // Your name
  weddingDate: "2020-02-13",       // YYYY-MM-DD format
  
  // ── HERO SECTION ──
  heroTitle: "Our Love Story",
  heroSubtitle: "A journey written in heartbeats",
  
  // ── TIMELINE ── (minimum 6 milestones, each with date, title, description)
  timeline: [
    { date: "June 2018", title: "The Day We Met", description: "...", photo: "placeholder" },
    // ... more milestones
  ],
  
  // ── REASONS I LOVE YOU ── (minimum 20 reasons)
  reasons: ["...", "...", "..."],
  
  // ── LOVE LETTERS ── ("Open When..." envelopes, minimum 6)
  loveLetters: [
    { label: "Open when you need a smile", message: "..." },
    // ... more letters
  ],
  
  // ── HANDWRITTEN LETTER ── (the main love letter, multiline string)
  letterText: `My dearest...`,
  
  // ── QUIZ ── (minimum 4 questions about your relationship)
  quiz: [
    { question: "...", options: ["A", "B", "C", "D"], correct: 0 },
  ],
  
  // ── SPIN WHEEL PRIZES ── (8 love coupons/rewards)
  wheelPrizes: ["Breakfast in bed", "Movie night (your pick)", ...],
  
  // ── SOUNDTRACK ── (optional: songs that define your relationship)
  soundtrack: [
    { title: "All of Me", artist: "John Legend", note: "Our wedding song" },
  ],
  
  // ── FINAL SURPRISE ── (text for the gift reveal at the end)
  surpriseText: "Happy Anniversary! ...",
}
```

---

## DESIGN SYSTEM

### Color Palette (Romantic & Elegant with Dramatic Depth)

```
--bg-primary:       #FFF8F0     (warm cream — main background)
--bg-secondary:     #FBF3EB     (slightly warmer cream)
--bg-card:          rgba(255, 255, 255, 0.65)  (glassmorphic cards)
--text-primary:     #1A0F0A     (rich dark brown — almost black)
--text-secondary:   #6B4F3E     (warm brown)
--text-muted:       #A08B7A     (muted warm gray)
--accent-gold:      #C9A96E     (antique gold — section labels, dividers)
--accent-rose:      #B76E79     (dusty rose — CTAs, highlights, hearts)
--accent-blush:     #E8B4B8     (soft blush — secondary accents)
--accent-deep-rose: #8B3A4A     (deep burgundy — dramatic moments)
--border-subtle:    rgba(201, 169, 110, 0.12)
--shadow-warm:      rgba(44, 24, 16, 0.08)
--shadow-deep:      rgba(44, 24, 16, 0.18)
```

### Typography Scale

```
--font-display:    'Playfair Display', Georgia, serif
--font-body:       'Cormorant Garamond', Garamond, serif
--font-handwrite:  'Dancing Script', cursive

Hero title:       clamp(3rem, 10vw, 5.5rem), font-display, weight 700
Section titles:   clamp(2rem, 6vw, 3rem), font-display, weight 400
Body text:        1rem–1.15rem, font-body, weight 400, line-height 1.8
Labels:           0.65rem, font-body, weight 300, letter-spacing 0.4em, uppercase
Handwritten:      1.1rem–1.3rem, font-handwrite, weight 400, line-height 2
```

### Spacing & Layout

- Mobile-first: max-width 480px content area, centered
- Generous vertical padding: 5rem–8rem between sections
- Card padding: 1.5rem–2.5rem
- Border radius: 1rem for cards, 2rem for pills/buttons, 0.25rem for polaroids
- All content centered with comfortable side padding (1.5rem minimum)

### Visual Texture & Atmosphere

- **Background**: Warm cream (#FFF8F0) with a subtle radial dot pattern (opacity 0.02–0.03) using the gold accent color
- **Cards**: Glassmorphic — `background: rgba(255,255,255,0.65)`, `backdrop-filter: blur(12px)`, subtle gold border, warm shadow
- **Paper texture**: On the handwritten letter, use CSS `repeating-linear-gradient` to create faint notebook lines
- **Grain overlay**: Optional subtle noise texture over the entire page (CSS `filter` or `background-image` with tiny repeating pattern)
- **Decorative elements**: Gold (`✦`) star dividers between sections. Thin gold `<hr>` lines under section titles. Faint concentric circle rings behind the hero section.

---

## ANIMATION SYSTEM

### Core Principles
1. Every animation must feel organic and gentle — no harsh, robotic, or bouncy transitions
2. Use `ease-out` or custom cubic-bezier curves that feel like a slow exhale
3. Stagger child elements with `animation-delay` for cinematic reveals
4. Scroll-triggered animations fire ONCE (use Intersection Observer with `{ once: true }` pattern)
5. All durations between 600ms–1500ms. Nothing faster, nothing slower (except the handwriting, which should be ~20ms per character)

### Required Animations

```
SCROLL REVEAL (all sections):
- Elements start: opacity 0, translateY(40–60px)
- Elements end: opacity 1, translateY(0)
- Duration: 1000ms, ease-out
- Stagger children by 80–120ms

FLOATING HEARTS (background):
- 12–18 tiny hearts floating upward continuously
- Random sizes (10–24px), random horizontal positions
- Duration: 15–30s per heart, linear, infinite
- Opacity: 0.15–0.25 (extremely subtle)

ENVELOPE OPEN (intro):
- Envelope flap rotates open via `scaleY(-1)` on the triangular clip-path
- Wax seal shrinks to 0 and fades
- Letter inside slides upward
- Gold sparkle particles burst outward
- Entire screen fades to transparent after 2s

CONFETTI BURST (quiz completion, final reveal):
- 50–60 pieces falling from top
- Mixed shapes: circles and rectangles
- Colors from the palette (gold, rose, blush, cream)
- Random horizontal spread, random delays (0–0.5s)
- Duration: 2.5–3.5s with ease-in

TYPEWRITER / HANDWRITING (letter section):
- Characters appear one at a time (~22ms interval)
- Blinking cursor (thin rose-colored bar) follows the text
- Cursor uses `animation: pulse 1s infinite`

POLAROID FLIP (photo book):
- 3D card flip using `transform: rotateY(180deg)` + `transform-style: preserve-3d`
- Each card has slight random CSS rotation (-3° to +3°) for scattered look
- Duration: 700ms

HEARTBEAT PULSE (day counter, gift box):
- Gentle scale from 1 to 1.03 and back
- Duration: 3s, ease-in-out, infinite
- Very subtle — NOT aggressive

NUMBER COUNTER (hero days counter):
- Animate from 0 to the actual number
- Use requestAnimationFrame for smooth counting
- Duration: 2s with ease-out curve
- Format with locale commas (e.g., 2,187)

PROGRESS DOTS (quiz):
- Width transition from 16px to 32px as questions progress
- Color transition from muted to accent-rose
- Duration: 500ms

WHEEL SPIN:
- CSS transform: rotate with cubic-bezier(0.17, 0.67, 0.12, 0.99) for natural deceleration
- Total rotation: 1440° + random(0–720°)
- Duration: 3.5s
```

---

## SECTIONS (Build ALL of these, in this exact order)

### SECTION 0: Preloader (Optional but Elevated)
A brief (1–2s) loading screen while fonts load:
- Centered pulsing heart icon
- "Loading your love story..." in muted italic text
- Fade out when fonts are ready (use `document.fonts.ready`)

### SECTION 1: Envelope Intro (Full-screen overlay)
- Full viewport, cream background with subtle dot pattern
- Centered envelope (280×190px) with:
  - Triangular flap (CSS `clip-path: polygon(0 0, 50% 100%, 100% 0)`)
  - Circular wax seal with heart "♥" in center
  - Letter peeking out from inside
- "Tap to open" pulsing text below
- On tap:
  1. Flap rotates open (scaleY transform)
  2. Seal shrinks and vanishes
  3. Letter slides upward
  4. Gold sparkle particles (✦) burst from center
  5. Entire overlay fades away after 2s revealing the site
- Seal should have a subtle `box-shadow` glow

### SECTION 2: Hero Section
- Full viewport height (100vh), centered content
- Faint decorative concentric circles behind (2 rings, gold, very low opacity)
- Content (all scroll-revealed):
  1. "HAPPY ANNIVERSARY" — tiny gold uppercase label with wide letter-spacing
  2. Main title in Playfair Display, 2–3 lines max
  3. Thin gold horizontal rule (64px wide)
  4. Subtitle in italic Cormorant Garamond
  5. **Animated Day Counter** in a glassmorphic card:
     - "DAYS OF LOVE" label
     - Large number that counts up from 0 to actual days (2s animation)
     - "...and counting" in muted italic
  6. Full-width placeholder photo area below (rounded, with shadow) — hero image of the couple
- Scroll indicator at bottom: "SCROLL" text + thin gradient line + gentle bounce animation

### SECTION 3: Love Story Timeline
- Section header: "CHAPTER BY CHAPTER" label + "Our Timeline" title + gold underline
- Vertical timeline with:
  - Thin gold vertical line on the left
  - Circular dots (16px) at each milestone that fill in with rose color on scroll reveal
  - Each milestone card contains:
    - Date label (gold, uppercase, small)
    - Title (Playfair Display, 1.5rem)
    - Description (italic Cormorant, 0.9rem)
    - Photo placeholder (rounded, aspect-ratio 4:3, max-width 360px, with shadow)
  - Each card animates in on scroll with staggered delay
- Minimum 7 timeline entries

### SECTION 4: Interactive Photo Book (Polaroid Gallery)
- Section header: "TAP TO REVEAL" label + "Our Moments" title
- Instruction: "Tap each photo to flip it" in muted text
- 2-column grid of 6 polaroid cards:
  - White border with extra bottom padding (polaroid style)
  - Slight random rotation (-3° to +3°) for organic feel
  - Handwritten-style caption at bottom of each
  - **On tap**: Card flips 180° in 3D to reveal:
    - A love reason or sweet message on the back
    - Heart emoji + text in rose color
  - Each card scroll-reveals with staggered timing
- Cards should have realistic `box-shadow` for depth

### SECTION 5: Handwritten Love Letter
- Section header: "WRITTEN FROM THE HEART" label + "My Letter to You" title
- Glassmorphic card with faint notebook lines (CSS background)
- Letter text in Dancing Script font
- **Typewriter animation**: Characters appear one by one (~22ms) when section scrolls into view
- Blinking cursor follows the text
- Letter should be multiline, personal, emotional — pulled from CONFIG
- Sign-off with your name and a heart

### SECTION 6: Love Letters ("Open When..." Envelopes)
- Section header: "JUST FOR YOU" label + "Love Letters" title
- 6 expandable cards, stacked vertically with 1rem gap
- Each card shows:
  - Envelope emoji (✉️ closed, 💌 when open)
  - Label text (e.g., "Open when you need a smile")
  - "Tap to read" / "Tap to close" micro-label
  - Down arrow that rotates 180° when open
- **On tap**: Card expands smoothly (max-height transition) to reveal:
  - A gold separator line
  - The personal message in italic serif
  - Sign-off: "With all my love, [Name] ♥"
- Only one card open at a time (accordion behavior)
- Cards scroll-reveal with stagger

### SECTION 7: Reasons I Love You (Carousel)
- Section header: "AN INFINITE LIST" label + "Reasons I Love You" title
- Glassmorphic card with:
  - Large faded number watermark (e.g., "#7") in top-right corner, opacity 0.08
  - Current reason displayed as a centered italic quote with quotation marks
  - Left/right navigation buttons (circle with arrow)
  - Counter: "7 of 20"
- **Swipe support** on mobile (touch events for left/right swipe)
- Smooth crossfade transition between reasons (opacity + slight translateY)
- Footer text: "...and a million more I haven't written yet"
- Minimum 20 reasons in CONFIG

### SECTION 8: Our Love Quiz
- Section header: "LET'S PLAY" label + "Our Love Quiz" title
- Progress bar: animated dots that grow and fill as questions progress
- Glassmorphic question card:
  - Question text centered
  - 4 option buttons styled as rounded cards
  - On selection:
    - Correct answer highlights green with ✓
    - Wrong answer highlights red
    - Other options fade to 50% opacity
    - 1.2s delay before advancing
- **On completion**:
  - Confetti burst animation
  - Score display with large Playfair number
  - Contextual message (perfect score = special message)
  - "Play Again" rose button
- Minimum 4 questions

### SECTION 9: Love Wheel (Spin to Win)
- Section header: "FEELING LUCKY?" label + "Love Wheel" title
- SVG-based wheel (280px diameter):
  - 8 equal segments with alternating cream/blush colors
  - Thin gold borders between segments
  - Text labels inside each segment
  - Center circle in rose with white heart
  - Pointer triangle (▼) fixed above the wheel
- **Spin button**: Rose pill button with shadow
- On spin:
  - Wheel rotates 1440°+ with natural deceleration (cubic-bezier)
  - Button changes to "Spinning..." (disabled state)
  - After 3.5s, result card appears with "You won!" + prize text
- 8 prizes (love coupons) from CONFIG

### SECTION 10: Our Soundtrack (Optional but Recommended)
- Section header: "THE MUSIC OF US" label + "Our Soundtrack" title
- Vertical list of songs:
  - Each entry has: 🎵 emoji, song title (bold), artist, and a personal note in italic
  - Cards reveal on scroll
  - Optional: Spotify embed link or just display-only
- Minimum 4–6 songs

### SECTION 11: Final Surprise Reveal
- Section header: "ONE MORE THING..." label + "A Surprise for You" title
- Centered gift box (120×120px):
  - Gradient background (rose to gold)
  - Large 🎁 emoji
  - Gentle heartbeat pulse animation
  - "Tap to unwrap" pulsing text below
- **On tap**:
  - Confetti burst
  - Gift box transforms/fades into reveal card:
    - 💛 emoji
    - "Happy Anniversary!" in large Playfair
    - Personal message from CONFIG
    - Divider line
    - Forward-looking message
    - Placeholder for real surprise (dinner reservation, trip, etc.)

### SECTION 12: Footer
- Thin gold divider
- "[Your Name] & [Partner Name]" in gold uppercase
- "Made with love, for the love of my life" in muted italic
- Pulsing heart emoji

---

## CRITICAL QUALITY REQUIREMENTS

### Mobile-First Excellence
- Design for 375px width FIRST, then scale up
- All touch targets minimum 44×44px
- No horizontal scroll ever
- Font sizes readable without zooming
- Generous spacing for thumb navigation
- Test all interactions work with tap (not just click)

### Performance
- No external images (use CSS gradient placeholders until real photos are added)
- Preload Google Fonts in `<head>`
- Use `will-change` sparingly on animated elements
- Intersection Observer for lazy scroll animations (don't animate off-screen elements)
- Keep total bundle under 300KB

### Emotional Design Details
- Every transition should feel like a slow breath — smooth, gentle, organic
- Color palette must feel warm and luxurious, never cold or corporate
- Typography hierarchy must guide the eye naturally
- White space is not empty — it's breathing room
- The site should feel like flipping through a beautiful physical book

### Code Quality
- Single `App.tsx` file with all components (for easy bundling)
- All personalizable content in the `CONFIG` object at the top
- Custom hooks for scroll reveal (`useScrollReveal`) and swipe detection (`useSwipe`)
- Clean component structure: one component per section
- Inline styles for dynamic values, Tailwind for utilities, `<style>` block for keyframe animations
- All keyframe animations defined in a single `<style>` tag at the root
- Placeholder images should be beautiful CSS gradient + emoji compositions that look intentional, not broken

### What NOT to Do
- ❌ No purple gradients
- ❌ No Inter, Roboto, Arial, or system fonts
- ❌ No harsh shadows or neon glows
- ❌ No excessive bounce animations
- ❌ No cookie-cutter card layouts
- ❌ No generic "AI slop" aesthetics
- ❌ No localStorage or sessionStorage
- ❌ No external animation libraries
- ❌ No horizontal carousels that feel like a product listing
- ❌ No aggressive auto-playing anything
- ❌ No blue or cold colors anywhere

---

## PLACEHOLDER IMAGE SYSTEM

Since real photos will be swapped in later, create beautiful placeholder components:

```
Each placeholder should be:
- A gradient background using the color palette (rose, blush, cream, gold combinations)
- A centered thematic emoji (💑, 💕, 💒, 💍, 🏡, ✨, 💛, 📸, 🌅, 💐)
- Small italic text: "Your photo here"
- Consistent aspect ratios (4:3 for timeline, 1:1 for polaroids, 16:9 for hero)
- Rounded corners + shadow matching their container
```

Include a comment block at the top of the file explaining how to replace placeholders with real `<img>` tags.

---

## SECTION DIVIDERS

Between every major section, include a decorative divider:
```
[thin gradient line left] ✦ [thin gradient line right]
```
- Gold colored, very low opacity
- Lines are `background: linear-gradient(to right/left, transparent, rgba(gold, 0.2))`
- ✦ symbol in center at 30% opacity
- Total width respects content max-width

---

## FINAL CHECKLIST

Before considering the build complete, verify:

- [ ] Envelope intro opens and transitions smoothly to the site
- [ ] Day counter animates from 0 to correct number
- [ ] All 7+ timeline entries scroll-reveal with stagger
- [ ] All 6 polaroids flip on tap with 3D rotation
- [ ] Handwritten letter types out character by character
- [ ] All 6 love letters expand/collapse (accordion)
- [ ] Reasons carousel navigates with arrows AND swipe
- [ ] Quiz tracks score and shows confetti on completion
- [ ] Wheel spins with natural deceleration and shows result
- [ ] Final gift box reveals with confetti
- [ ] Floating hearts visible in background throughout
- [ ] All fonts loaded (Playfair Display, Cormorant Garamond, Dancing Script)
- [ ] No horizontal overflow on any screen size
- [ ] All touch targets are 44px+ minimum
- [ ] CONFIG object is the single source of truth for all content
- [ ] Total bundle < 300KB
- [ ] Site works offline after initial load (no external runtime dependencies)

---

## START BUILDING

Create the complete React application in a single `App.tsx` file. Include the full CONFIG with placeholder content, all components, all animations, and all interactions. The code should be production-ready, beautiful, and emotionally powerful.

Build it section by section from top to bottom. Make it extraordinary.
