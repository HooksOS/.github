# HookOS Brand Kit — Atlas Edition

The single source of truth for HookOS identity. **Atlas** is the light-terminal design language: paper surfaces, acid-green accents, mono numbers, hexagon hook mark, and the Launch Receipt motif.

## Color

| Token | Hex | Use |
|---|---|---|
| Paper | `#f4f5f1` | App background |
| Paper-2 | `#eaece5` | Wells, inset surfaces |
| Card | `#ffffff` | Cards, receipts |
| Ink | `#0d100c` | Primary text |
| Ink-2 | `#494c44` | Secondary text |
| Ink-3 | `#86887e` | Labels, metadata |
| Acid | `#38e07b` | Fills, nodes, bars (graphics only) |
| Acid bright | `#5af787` | Glow, gradient highlights |
| **Acid ink** | `#0c8a42` | **Green text, CTAs, logo stroke — use this on light** |
| Acid bg | `rgba(56,224,123,0.13)` | Tints, chips, selected states |
| Crimson | `#c0291f` | Losses, sells, danger |
| Gold | `#c79212` | Premium, rank #1 |

Rules: never use `#38e07b` for text on light (fails contrast) — use `#0c8a42`. One green moment per section; crimson only for loss/danger; gold only for premium/rank.

## Type
- **Inter** — UI. Headings 700 with tight tracking (−0.03em); body 400.
- **JetBrains Mono** — ALL numbers, prices, addresses, receipts. Tabular figures.
- Tiny prices use subscript-zero notation: `$0.0₅218`.

## Logo
Hexagon + hook curve. Files in `logo/`:
- Lockup: "Hook" in Ink + "OS" in Acid ink, glyph left.
- Glyph alone for avatars/favicons. Clear space = ½ glyph width. Never stretch, never recolor outside Ink/Acid-ink/White.

## Signature motifs
1. **Launch Receipt** — white card, perforated edges, mono rows with dashed dividers, barcode footer. Every token render uses it.
2. **Market Map node** — green circle, radius = mcap, pulse ring = volume, dashed threads = shared hooks.
3. **Hex container** — icons sit inside outlined hexagons.

## Voice
Confident, terminal-terse, a little playful. "Markets are now software." / "Print a token." / "Reply to deploy." Avoid hype-speak and emoji walls.

## Handles
hookos.fun · X **@hookosfun** · bot **@hookosbot** · TG **@hookos_alpha**

## Files
```
brand-sheet/Atlas-BrandKit.png      one-page brand poster (light)
logo/                               glyph + lockup (green/black/white) + app icon
social/x/Atlas-X-Avatar.png         400×400 profile (light)
social/x/Atlas-X-Banner.png         1500×500 header (light)
social/x/Atlas-Pinned-Tweet.png     1200×675 how-to-deploy graphic
social/x/HookOSBot-X-*.png          @hookosbot avatar + banner (dark, legacy)
social/telegram/Atlas-TG-Icon-Alpha.png  640×640 bot icon (light)
social/telegram/Welcome-HookOS.gif  welcome animation (legacy dark)
```
Legacy dark assets are kept for the bot account if you prefer contrast there; all new surfaces should use Atlas-light assets.

© 2026 HookOS Labs
