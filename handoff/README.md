# Handoff — HookOS Launchpad v4

## Overview

**HookOS** is an original, fully-built design prototype for a next-generation EVM launchpad platform powered by programmable AMM "hooks" (Uniswap v4 / PancakeSwap v4 architecture). It is not a normal token launchpad — it positions itself as:

- A programmable market engine
- A hook marketplace (an "app store" for market behavior)
- A TikTok-style token discovery feed
- A PvP battle arena
- An AI-powered hook builder
- A Bloomberg-style analytics terminal
- A creator economy where hook builders earn revenue

The brand voice: **"Markets are now software."**

## About the Design Files

The files in this bundle are **design references created in HTML / React-via-Babel** — prototypes showing the intended look, layout, animation, and behavior. They are **not production code to copy directly**.

Your task is to **recreate these designs in the target codebase's environment** using its established patterns:

- The original spec calls for **Next.js 15 + React + TypeScript + Tailwind + Framer Motion + shadcn/ui + Wagmi + RainbowKit + Recharts + GSAP + React Query + TanStack Table + Zustand + Viem + Lucide icons**
- The HTML prototype uses inline React + raw CSS, but you should reimplement using the proper stack above
- All Web3 calls (wallet connect, chain switching, balance display, transactions) are mocked — implement with Wagmi / Viem / RainbowKit
- All charts are hand-built SVG — replace with **Recharts** (or **lightweight-charts** for candles) where suitable

## Fidelity

**High-fidelity.** All colors, type, spacing, animations, and interactions are final. Recreate pixel-perfectly using the codebase's existing libraries and patterns. Where shadcn/ui has a primitive that matches (Button, Card, Tabs, Select, Dialog, Sheet, etc.), use it instead of hand-rolling.

---

## File Index

The bundle includes:

```
HookOS.html          — entry point that loads all React components
styles.css           — design tokens + global styles + utility classes
src/
  app.jsx            — root component, view router
  lib.jsx            — shared utilities, icons, mock data, TokenBubble, HexIcon, Spark
  charts.jsx         — shared chart library (AnimatedCounter, AreaChart, RadialGauge, Donut, DepthChart, NetworkFlow, HexHeatmap, etc.)
  nav.jsx            — left sidebar nav + mobile bottom nav
  landing.jsx        — home page
  feed.jsx           — full-bleed TikTok-style token feed
  token.jsx          — token detail page (candlestick chart, trade widget, holders, hooks)
  marketplace.jsx    — hook marketplace with grid, filters, detail drawer
  events.jsx         — seasonal events hub
  arena.jsx          — PvP battle arena
  analytics.jsx      — analytics terminal
  launch.jsx         — 6-step token launch wizard
  builder.jsx        — AI hook builder
  profile.jsx        — creator profile with XP, holdings, achievements
  brand.jsx          — brand kit page (logo, palette, type, social, stickers)
```

To preview locally: open `HookOS.html` in a browser.

---

## Design Tokens

### Colors (defined in `styles.css` `:root`)

**Surfaces (warm graphite, dark-mode-first):**
| Token         | Hex       | OKLCH                          | Role                  |
| ------------- | --------- | ------------------------------ | --------------------- |
| `--bg`        | `#060709` | `oklch(0.10 0 0)`              | Primary surface       |
| `--bg-1`      | `#0a0b0e` | `oklch(0.14 0 0)`              | Elevated panel        |
| `--bg-2`      | `#101115` | `oklch(0.17 0 0)`              | Input / nested        |
| `--surface`   | `#14151a` | `oklch(0.20 0 0)`              | Card                  |
| `--surface-2` | `#1c1d23` | `oklch(0.24 0 0)`              | Card hover            |

**Ink:**
| Token     | Hex       | Role             |
| --------- | --------- | ---------------- |
| `--ink`   | `#f0f1f5` | Primary text     |
| `--ink-2` | `#b3b4bd` | Body text        |
| `--ink-3` | `#74757f` | Dim / kicker     |
| `--ink-4` | `#3d3e46` | Faint / disabled |

**Lines (translucent over surface):**
| Token            | Value                  | Role           |
| ---------------- | ---------------------- | -------------- |
| `--line`         | `rgba(255,255,255,0.055)` | Default border |
| `--line-2`       | `rgba(255,255,255,0.11)`  | Hover border   |
| `--line-strong`  | `rgba(255,255,255,0.22)`  | Strong divider |

**Accents (sparingly used, role-specific):**
| Token       | OKLCH                          | Hex (approx) | Role                                |
| ----------- | ------------------------------ | ------------ | ----------------------------------- |
| `--acid`    | `oklch(0.88 0.21 142)`         | `#5af787`    | **Primary accent · CTAs · gains** |
| `--crimson` | `oklch(0.70 0.23 25)`          | `#f25555`    | Loss · danger · sell                |
| `--gold`    | `oklch(0.85 0.16 85)`          | `#f0c14b`    | Premium · featured · achievements   |
| `--plasma`  | `oklch(0.70 0.22 305)`         | `#c66be0`    | AI · synth moments                  |
| `--ice`     | `oklch(0.82 0.13 220)`         | `#6db8e8`    | Info · chains                       |

The hero accent is **always `--acid`**. Use the others only when their role applies — don't decorate with them.

### Typography (Google Fonts)

| Family            | Variable    | Use                                  | Weights          |
| ----------------- | ----------- | ------------------------------------ | ---------------- |
| **Newsreader**    | `--display` | All display headlines + big numerals | 300, 400, 500    |
| Inter             | `--font`    | Body, UI, buttons                    | 300, 400, 500, 600, 700 |
| JetBrains Mono    | `--mono`    | Addresses, prices, kickers, code     | 400, 500, 600    |

Headline classes (defined in `styles.css`):
```css
.h-mega    { font-size: clamp(72px, 11vw, 188px); line-height: 0.86; letter-spacing: -0.045em; font-weight: 300; }
.h-display { font-size: clamp(56px, 7vw, 112px);  line-height: 0.90; letter-spacing: -0.035em; font-weight: 300; }
.h1        { font-size: clamp(40px, 5.5vw, 80px); line-height: 0.95; letter-spacing: -0.030em; font-weight: 300; }
.h2        { font-size: clamp(32px, 4vw, 56px);   line-height: 1.00; letter-spacing: -0.025em; font-weight: 300; }
.h3        { font-size: 26px;                     line-height: 1.10; letter-spacing: -0.015em; font-weight: 400; }
.kicker    { font: 10px var(--mono); color: var(--ink-3); letter-spacing: 0.18em; text-transform: uppercase; }
```

**Editorial trick:** wrap connecting words (the, are, now, with) in `<span className="italic" style={{ color: "var(--ink-3)" }}>` for the magazine-style look.

### Spacing & Radii

| Token         | Value | Use             |
| ------------- | ----- | --------------- |
| `--radius`    | 12px  | Cards, buttons  |
| `--radius-sm` | 6px   | Chips, badges   |
| `--radius-lg` | 22px  | Major surfaces  |

Padding scale: 14 / 18 / 22 / 28 / 32 / 56 px. Card content typically `padding: 22px;`. Section gaps use `gap: 14-18px` for tight clusters, `gap: 32-60px` for major sections.

### Shadows

```css
--shadow-card: 0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -40px rgba(0,0,0,0.95);
```

Acid glow (for primary buttons / live elements): `0 0 30px -8px oklch(0.88 0.21 142 / 0.5)`.

### Iconography

- **Lucide icons** (the spec uses `lucide-react`). The prototype hand-rolls a small set in `src/lib.jsx` — replace with `lucide-react` direct.
- **Signature shape: hexagon.** Every category/feature icon sits inside an outlined hex container (`<HexIcon>`). Stroke 1.2-1.5px, icon centered. Implement as a wrapper component.

---

## Logo & Brand

### Glyph (SVG)

```svg
<svg viewBox="0 0 26 26" fill="none">
  <path d="M13 1.5 L23 7 L23 19 L13 24.5 L3 19 L3 7 Z" stroke="var(--acid)" stroke-width="1.5" fill="oklch(0.88 0.21 142 / 0.08)"/>
  <path d="M9 11 Q9 16 13 16 Q17 16 17 11 Q17 8 14 8" stroke="var(--acid)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
</svg>
```

Outlined hexagon (6 sides — references hook lifecycle + 6 supported chains) with a stylized hook curve inside.

### Wordmark

`Hook` in `--ink`, `OS` in `--acid`. Newsreader, weight 300, letter-spacing -0.025em.

### Lockups

- Horizontal: glyph + wordmark, gap 12px
- Stacked: glyph above wordmark, gap 16px
- Glyph only / wordmark only / monochrome / on-light variants supported

### Clear space rule

Equal to "X" = height of the glyph's central cap. Don't crop, recolor outside palette, or rotate.

---

## Screens

All views render inside `<App>` from `src/app.jsx`. The left sidebar (`<Sidebar>` in `src/nav.jsx`) drives view switching. The active view ID is also synced to `window.location.hash`.

### Sidebar nav structure

```
Discover
  · Home          → landing.jsx
  · Feed          → feed.jsx       (live indicator)
  · Tokens        → token.jsx
  · Hooks         → marketplace.jsx (badge: 12)
  · Events        → events.jsx     (badge: 4)
Trade
  · Arena         → arena.jsx      (live indicator)
  · Terminal      → analytics.jsx
Build
  · Launch        → launch.jsx
  · AI Studio     → builder.jsx
You
  · Profile       → profile.jsx
  · Brand kit     → brand.jsx
```

The sidebar is **224px wide, fixed left**, with: brand mark at top, search box with ⌘K hint, grouped nav items with section labels in mono uppercase, chain selector + wallet button at bottom. On `< 980px` the sidebar hides and a mobile bottom tab bar appears.

### Landing (`landing.jsx`)

- **Hero (full-bleed, 100vh)** — animated SVG liquidity visualization in the right background (concentric tick rings rotating at different speeds, 8 orbiting token bubbles around a hex core, two sine waves at bottom, drifting particles). Foreground: status pill `v4 HOOKS · LIVE ON 6 CHAINS`, mega headline (188px Newsreader 300, "Markets are now software." with italic + acid color), 540px subhead, two CTAs (primary acid + ghost).
- **Marquee** — horizontal scrolling ticker of all tokens with sym/price/change.
- **Stats** — 4-column card with huge tabular numerals (TVL $2.18B, Hooks 8,421, Tokens 142,800, Creator earnings $48.2M).
- **What it is** — sticky-left editorial intro + 6 hex-icon feature tiles (Protect / Reward / Compete / Automate / Concentrate / Socialize).
- **Hook marketplace preview** — 3×2 grid of featured hook cards.
- **Pulse + trending** — live activity feed (left) + ranked trending tokens table (right) with sparklines.
- **AI Studio teaser** — scanline card with Solidity code preview on the right.
- **Creator economy** — 2-col with leaderboard.
- **Roadmap** — 4-column grid, Q1-Q4 with status chips (Shipped / Live / Next).
- **CTA + Footer** — final pitch, 5-column footer with social buttons.

### Feed (`feed.jsx`)

**Full-bleed, NOT in a phone frame.** Each card fills the viewport.

- Background: radial token-color glows + faint grid.
- Top progress bar (Stories-style segments).
- Center-left: token bubble + name + Follow button + giant 96px price + ▲▼ change + chart + 4 stat tiles + hook badge + Buy/Sell/Raid action row.
- Right rail: heart / message / share / star action buttons (52px circular, glass effect) + live trades card.
- Right edge: vertical pagination dots (one per card).
- Top-left: discover tabs (For you / Trending / New / Following).
- Bottom hint: `↑↓ NAVIGATE · SCROLL · J/K`.
- **Navigation:** mouse wheel, arrow keys, J/K vim keys. 480ms cubic-bezier(0.22,1,0.36,1) transform transition between cards.

### Token Detail (`token.jsx`)

- Breadcrumb (tokens › $VAULT).
- Hero card: 88px bubble, chips (Verified / Base / 3 hooks / holder count), $SYM · Token name in 64px display, contract address, big tabular price + change on the right.
- 6-column stat strip: MCap / FDV / Vol 24h / TVL / Holders / Hook fees · 24h — each with a sparkline.
- Main row: TradingView-style candle chart (80 candles + volume bars below + current-price tag) + buy/sell trade widget on the right (ETH ↔ token swap UI with slippage, gas, hook fee breakdown).
- Mid row: live trades feed / top holders with distribution bars / active hooks list.
- Bottom: distribution donut (retail / small / medium / large / whale buckets) + About card with metadata + similar tokens grid.

### Hook Marketplace (`marketplace.jsx`)

- Editorial hero: title in 92px display.
- Featured banner: hex icon + tagline + chip + CTA, with scanline texture and category-tinted gradient.
- Controls: pill-tab category filter (All + 8 categories), search input, sort select, Audited-only toggle.
- Grid: 3-column hook cards with hex icon, chips (Audited / Pro), category kicker, title, description, install sparkline, 30d revenue, footer with installs / rating / author + arrow.
- Detail drawer: slides in from the right (sheet), 720px wide. Big hex icon, title, full description, Install / Simulate / View source buttons, 4-stat strip (installs / rating / 30d rev / gas), 30d performance chart, lifecycle methods (beforeSwap / afterSwap / beforeAddLiquidity), reviews list with 5-star ratings.

### Events (`events.jsx`)

- 92px editorial title.
- Featured event hero: scanline card with big hex icon, eyebrow, title, description, live D:H:M:S countdown (animated, seconds glow acid), prize pool + player count + CTAs.
- 4-column stats strip with sparklines.
- Filters (All / Live / Upcoming / PvP / Trading).
- 3-column event card grid: hex icon, status chip, kicker, title, prize/players, mini area chart, CTA.
- Season history table: S1-S4 with winners and rewards.

### Arena (`arena.jsx`)

- 92px editorial title.
- **Battle hero** — live battle card with:
  - Round number + countdown
  - Two-sided "VS" with Team Green (acid) vs Team Red (crimson), each with token bubble, fighter count, animated 80px win% number that ticks live
  - Tug-of-war progress bar (acid bar from left, crimson bar from right, shadow glow)
  - Place bet bar with wager input + two glow buttons
- Right column: live battle feed (auto-scrolling wager updates) + season leaderboard.
- Left/main column: 2×2 events grid (Meme Wars / Liquidity Deathmatch / Sniper Survival / Burn Weekend) + 4 clans + 6-tile achievements.

### Terminal (`analytics.jsx`)

- 72px editorial title.
- Terminal header bar with session ID, live clock, CONNECTED indicator.
- 6-KPI strip (TVL / 24h Vol / Protocol Rev / Active Hooks / Tokens 24h / Avg fee).
- Main candle chart panel + order book (acid bids / crimson asks with depth bars).
- Liquidity heatmap (6×4 grid of colored cells, intensity by 24h Δ) + hook firings panel.
- Wallet flows (inflow/outflow bars) + AI insights (3 colored bullet rows) + protocol revenue.

### Launch Wizard (`launch.jsx`)

6-step stepper with completed/active/upcoming visual states:
1. **Identity** — logo upload, name, ticker (max 5), description (240ch), socials
2. **Supply** — total supply, distribution breakdown (4 segments with %), bonding curve picker (linear / exponential / sigmoid — with mini SVG previews)
3. **Liquidity** — initial liquidity (USD), pair (ETH/USDC/WBTC), buy tax slider 0-10%, sell tax slider 0-20%, fee routing tiles (burn/LP/treasury)
4. **Hooks** — 2-column tile grid, click to install up to 4, each shows hex icon + name + description + check mark when active
5. **Protection** — anti-bot toggle (custom 44×24 switch), whale cooldown slider, creator rev share slider
6. **Review** — 4 summary sections + deployment cost card with gradient
- **Live sim panel** (sticky right): token bubble preview + projected 7d price chart (changes based on selected hooks) + projected FDV / initial price / liquidity / fees + active hooks list + AI insight strip.

### AI Studio (`builder.jsx`)

3-pane layout:
- **Chat (left)** — Synth-1 branding, welcome message with example prompt chips, user message bubble (acid bg), AI streaming response with token-by-token typing animation, follow-up suggestion chips, prompt textarea with up-arrow send button
- **Code preview (middle)** — macOS-style window chrome (3 colored dots), filename, Compiled chip, generated Solidity in mono font with syntax-aware coloring (commented stub), footer with line count + Export button
- **Simulation (right)** — Simulation chart (30d backtest pass), fee response curve (SVG curve with threshold dashed line), market prediction (+24% floor / 91% profitable sims with dual stat layout), AI insight callout, deploy button with gas estimate

### Profile (`profile.jsx`)

- Header: 120px conic-gradient avatar with level badge, username (ghost.eth with italic .eth), verified chip, action buttons.
- Top row: portfolio (with animated counter + range pills + area chart) + XP ring (140px SVG ring with tick marks + level 24 in middle) + reputation gauges (dual radial Builder/Trader).
- Stats strip (5 KPIs each with sparkline).
- Holdings table + portfolio breakdown donut.
- Hooks I built + 3×3 achievements grid.
- Recent activity feed.

### Brand Kit (`brand.jsx`)

7 sections:
1. **Logo** — primary lockup card with grid bg, 4 variations grid, on-light + on-dark, construction diagram with X clear-space rule
2. **Colors** — clickable color chips (copy hex on click), grouped surfaces/ink and accents
3. **Typography** — 3 specimen cards (Newsreader, Inter, JetBrains Mono) with Aa, sample, weights
4. **Iconography** — hex motif gallery, 16 icons with mono labels
5. **Social kit** — full OG card (1200×630) preview + Twitter profile preview with banner & verified mark + 8-platform handles directory (X, Discord, Farcaster, Telegram, Mirror, GitHub, YouTube, Lens)
6. **Voice** — 7 official taglines with copy buttons
7. **Swag** — sticker pack with 4 rotated gradient sticker mockups
8. CTA: Download brand kit / Press kit

---

## Reusable Components / Library

Implement these once and use everywhere:

### From `src/lib.jsx`
- **TokenBubble** — circular gradient avatar with 2-letter symbol. Color derived deterministically from symbol via hash. Use `lucide-react` icons inside if needed.
- **HexIcon** — hexagon-clipped icon container. Props: `size`, `color`, `filled`.
- **Spark** — small SVG sparkline (path + optional area fill).

### From `src/charts.jsx`
- **AnimatedCounter** — cubic-eased number rollup. Use Framer Motion's `useMotionValue` + `useTransform` instead.
- **AreaChart** — SVG area chart with optional pulsing dot at last point. **Replace with Recharts `<AreaChart>`** for production.
- **BarChart** — small bar group. **Replace with Recharts `<BarChart>`**.
- **RadialGauge** — animated stroke-dashoffset arc. Recharts `<RadialBarChart>` works.
- **Donut** — multi-segment donut. Recharts `<PieChart>` with innerRadius.
- **DepthChart** — symmetric bid/ask depth visualization. Use **lightweight-charts** or hand-roll with Recharts ComposedChart.
- **NetworkFlow** — animated dashed-line node graph. Hand-roll SVG.
- **HexHeatmap** — staggered hex grid with intensity coloring. Hand-roll SVG.
- **VolumeProfile / LiveTicker / EventScroller** — small utilities.

### Patterns
- **Card**: `bg: linear-gradient(180deg, rgba(255,255,255,0.022), rgba(255,255,255,0.004))`, `border: 1px solid var(--line)`, `border-radius: 12px`, `box-shadow: var(--shadow-card)`.
- **Card-glow** hover effect: gradient border on hover via masked pseudo-element.
- **Chip**: 3px 7px padding, mono 10px, role-tinted backgrounds (`chip-acid`, `chip-gold`, etc.).
- **Pulse dot**: 7px acid circle with animated ring expanding outward on `pulse 1.6s ease-out infinite`.

### Mock data location

All mock data lives in `src/lib.jsx`:
- `TOKENS` (9 tokens)
- `HOOKS` (12 hooks across 8 categories)
- `ACTIVITIES` (7 activity items)
- `CHAINS` (6 chains)

In production, replace with:
- **Tokens / prices** — websocket subscription via your backend or directly from your indexer
- **Hooks** — Supabase/Postgres table queried via React Query
- **Activities** — websocket feed
- **Chains** — `wagmi.useChains()` filtered to supported set

---

## Interactions & Behavior

### View routing

`window.location.hash` is the source of truth. Each sidebar nav click updates the hash; `hashchange` listener restores state. Replace with **Next.js App Router** (`/feed`, `/tokens/[symbol]`, `/hooks`, `/hooks/[id]`, `/arena`, `/launch`, `/builder`, `/terminal`, `/events`, `/profile/[address]`, `/brand`).

### Animations

- Page transitions: 360ms fade-in + 8px translate-Y (use Framer Motion `<AnimatePresence>`)
- Feed swipe: 480ms `cubic-bezier(0.22, 1, 0.36, 1)` transform on container
- Counter rollup: 1400ms cubic ease-out
- Streaming text: token-by-token with per-chunk delays (50-350ms variable). Implement with a typed/streamed response source.
- Pulse dot: 1.6s ease-out infinite, scale 1→2.6 + opacity 0.6→0
- Battle win-prob: 1400ms interval, drifts ±3% each tick, 600ms width transition
- Live chart dot: 1.8s animate cycling radius and opacity
- Hex grid rotations: 30-60s linear infinite

### Form / wizard validation

Launch wizard is currently click-anywhere navigable — in production, validate per-step and block "Continue" if required fields are missing. Each step's state is held in a single `form` object via `useState`; use **React Hook Form** + **Zod** instead.

### Web3 integration

The wallet pill at the bottom of the sidebar is currently static. Replace with `<ConnectButton/>` from **RainbowKit**. The chain selector should drive `wagmi.useSwitchChain()`. The Launch wizard's deploy button should call `useWriteContract` with the launch factory ABI.

### Trade widget

Token detail's buy/sell widget is mocked. In production:
1. User enters ETH amount
2. Quote via your aggregator / direct pool
3. Show price impact, slippage, hook fee, gas
4. On submit: `useWriteContract` → swap router → display tx hash → poll receipt

---

## State Management

Use **Zustand** stores split by concern:
- `useWalletStore` — selected chain, balances, pending txs
- `useFeedStore` — feed cursor, current index, watchlist
- `useLaunchStore` — wizard form state with persist middleware
- `useEventStore` — active events + countdowns
- React Query (`@tanstack/react-query`) for all server data — tokens, hooks, holders, leaderboards.

---

## Responsive Behavior

- The sidebar collapses below 980px → mobile bottom nav appears (5 tabs: Home / Feed / Hooks / Arena / Wallet)
- All grids should collapse to 2-col then 1-col on smaller breakpoints
- Feed is already mobile-shaped (full viewport)
- Tables in marketplace, holders, leaderboard need horizontal scroll containers on mobile

---

## Implementation Order (recommended)

1. **Set up the stack** — Next.js 15 + Tailwind + shadcn/ui + Wagmi/RainbowKit
2. **Port `styles.css` → `tailwind.config.ts`** as CSS variables + theme extension
3. **Build `<Sidebar>` + `<MobileNav>` + the brand glyph SVG**
4. **Implement primitives** — TokenBubble, HexIcon, chip variants, card patterns
5. **Wire RainbowKit** — wallet pill, chain selector
6. **Home page** — straightforward landing
7. **Hook Marketplace** — most-used page; build the detail Sheet too
8. **Launch wizard** — biggest interaction; use React Hook Form + Zod
9. **Token Detail** — needs lightweight-charts for candles
10. **Feed** — momentum-driven swiper (Framer Motion drag + snap)
11. **Arena** — needs websocket for battle state
12. **Terminal** — Recharts heavy
13. **AI Studio** — wire to your model API with streaming
14. **Profile + Events + Brand** — straightforward content pages

Each page can be implemented independently — none of them deeply depend on the others except via the shared primitives.

---

## Notes

- The **hex motif is the strongest identity element** — don't drop it. Every category icon, every hook card, every brand touch uses it.
- The **editorial italic** trick (greying connector words like "are", "now", "the") is what gives the design its magazine feel — preserve it.
- **Single accent rule:** only `--acid` is hero. Other colors only for their semantic role.
- The original feed page was inside a phone frame; user explicitly requested **full-bleed TikTok-style**. Don't put it back in a frame.
- Animations are not optional — the design relies on motion (pulsing dots, ticking counters, drifting battles, scrolling marquee, breathing chart dot).

Good luck.
