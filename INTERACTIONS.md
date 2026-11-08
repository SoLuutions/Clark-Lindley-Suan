# Interactions — Concept Studies Documentation

This document covers the seven standalone interactive concept pieces showcased in the **Interactions** section (`#interactions`) of `index.html`. Each piece lives in `/interactions/<slug>.html`, uses self-hosted assets in `/interactions/assets/<slug>/`, and has a `1440×900` (16:10) WebP poster in `/interactions/posters/<slug>.webp`.

---

## Overview of the Seven Pieces

| # | Title on Site | Page | Assets Folder | Poster |
|---|---|---|---|---|
| 1 | **Things I Love** | `/interactions/things-i-love.html` | `/interactions/assets/things-i-love/` | `/interactions/posters/things-i-love.webp` |
| 2 | **Quiet Cup: Japandi Collage** | `/interactions/quiet-cup.html` | `/interactions/assets/quiet-cup/` | `/interactions/posters/quiet-cup.webp` |
| 3 | **Maison Lorvert: Timeline Crawl** | `/interactions/maison-lorvert.html` | `/interactions/assets/maison-lorvert/` | `/interactions/posters/maison-lorvert.webp` |
| 4 | **Corner Table Coffee: Infinite Gallery** | `/interactions/corner-table.html` | `/interactions/assets/corner-table/` | `/interactions/posters/corner-table.webp` |
| 5 | **Atelier Rouge: Editorial Carousel** | `/interactions/atelier-rouge.html` | `/interactions/assets/atelier-rouge/` | `/interactions/posters/atelier-rouge.webp` |
| 6 | **Verger: Peach Bag** | `/interactions/verger.html` | `/interactions/assets/verger/` | `/interactions/posters/verger.webp` |
| 7 | **桃里 (Momosato): Peach Shop** | `/interactions/momosato.html` | *(procedural canvas)* | `/interactions/posters/momosato.webp` |

---

## 1. Things I Love (`/interactions/things-i-love.html`)

### What it is
A single-page interactive 3D portfolio piece on a Klein-blue (`#004FFF`) stage using Three.js `0.169.0` and `cannon-es` `0.20.0`. Five low-poly 3D models (laptop, airplane, climbing rock, bubble tea, and ramen bowl) are embedded as base64 data URIs (with raw `.glb` backups saved in `/interactions/assets/things-i-love/`) and drop into a 3-copy pile (15 bodies total). Moving the cursor pushes nearby objects aside; clicking an object features it in the center while opening a staggered pixel-font detail panel on the left; clicking empty space triggers an outward radial shockwave; pressing `Esc` closes the panel and `R` resets and re-drops the pile.

### How to edit copy and tuning values
- **Copy (`INFO` object)**: Open `/interactions/things-i-love.html` and locate `const INFO = { ... }`. Each key (`laptop`, `plane`, `rock`, `boba`, `ramen`) defines:
  - `index`: two-digit display string (`"01"`–`"05"`)
  - `label`: nav bar title (`"WORK"`, `"TRAVELLING"`, `"ROCK CLIMBING"`, `"BUBBLE TEA"`, `"RAMEN"`)
  - `intro`: lead paragraph in the white dropdown panel
  - `sections`: array of `{ heading, items }` rendered as pixel-font subheadings and bullet lists
- **Model scales & feature poses (`MODEL_SPECS`)**: Locate `const MODEL_SPECS = [ ... ]` to adjust per-model `nudge` scale multipliers and `pose` Euler angles `[rx, ry, rz]`.
- **Physics tuning**:
  - Gravity is configured on `world.gravity.set(0, -14, 0)`.
  - Laptop hinge spring constants (`k = 60, c = 9` open; `k = 320, c = 18` shut) and impact threshold (`impact > 6`) are in the `animate()` loop and `collide` listener.

---

## 2. Quiet Cup: Japandi Collage (`/interactions/quiet-cup.html`)

### What it is
A single-viewport editorial hero for fictional specialty café **Quiet Cup** (`quiet cup.`), surrounded by seven asymmetrical photo and video frames on warm oatmeal paper (`#eee9df`) with a 19% opacity film grain overlay (`assets/quiet-cup/grain.svg`). Includes a staggered entrance reveal, reversible hover shrink/blur (`scale(0.85)` + `blur(10px)`) with caption fade, and a bottom-right `Pause videos` / `Play videos` control.

### How to edit copy and tuning values
- **Headline & wordmark**: Edit `.wordmark` (`quiet cup<span>.</span>`), `.nav-label` items, and `#hero-title` inside `<section class="collage">` in `/interactions/quiet-cup.html`.
- **Frame positions & stagger delays**: Each `<figure class="moment ...">` has its position (`left`, `right`, `top`, `bottom`, `width`), aspect ratio, and `--delay` CSS custom property defined in the `<style>` block (with responsive overrides at `max-width: 1000px` and `max-width: 600px`).
- **Entrance timing**: The `Promise.race` readiness timeout (`1800ms`) is at the bottom of the `<script>` tag.

---

## 3. Maison Lorvert: Timeline Crawl (`/interactions/maison-lorvert.html`)

### What it is
A full-viewport split-screen timeline for fictional French fashion house **Maison Lorvert** (`1962 — 2026`). The left column renders two identical copies of the timeline on a plane rotated `rotateY(35deg)` in `900px` perspective, drifting downward via `requestAnimationFrame`. The right column cross-fades and scales in (`scale(0.55)` → `1`) the corresponding portrait (`assets/maison-lorvert/01.jpg`–`07.jpg`) whenever an entry's bottom edge crosses the vertical midpoint of the viewport.

### How to edit copy and tuning values
- **Timeline entries (`TIMELINE` array)**: Edit `const TIMELINE = [ ... ]` in `/interactions/maison-lorvert.html`. Each object has `year`, `title`, `text`, and `image`.
- **Drift speed (`--speed`)**: Adjust `--speed: 70s` in `:root` (automatically slowed `3×` when `prefers-reduced-motion: reduce` is active).
- **Wheel & drag physics**:
  - Wheel boost multiplier (`dy * 6`), clamp (`±6000`), and decay (`Math.pow(0.04, dt)`) are in the `wheel` listener and `motionTick()` loop.
  - Perspective angle (`rotateY(35deg)`) is on `.plane`.

---

## 4. Corner Table Coffee: Infinite Gallery (`/interactions/corner-table.html`)

### What it is
An endlessly pannable 2D diagonal gallery for fictional café **Corner Table Coffee** (`corner / table. / coffee`) on a deep emerald (`#073e32`) stage with dusty pink (`#efc7ce`) typography and custom cursor. Objects are arranged on a grid rotated `-19°`, with spatial viewport culling and DOM cell pooling/recycling so panning in any direction never hits an edge. Hovering or keyboard-focusing an item outside the central logo's elliptical suppression zone lifts the item and reveals a viewport-clamped monospace description card.

### How to edit copy and tuning values
- **Items & descriptions**: Edit `/interactions/assets/corner-table/assets.json` (and the matching fallback `ITEMS` array in `/interactions/corner-table.html`).
- **Grid spacing & angle**:
  - `ANGLE_RAD = -19 * (Math.PI / 180)` controls the diagonal grid tilt.
  - `updateMetrics()` sets `colSpacing` (`440px` desktop / `250px` mobile), `rowSpacing` (`390px` desktop / `225px` mobile), and `cellSize` (`280px` desktop / `172px` mobile).
- **Logo hover suppression zone**: Adjust `rx = rect.width * 0.58` and `ry = rect.height * 0.64` in `isInsideLogoSuppressionEllipse()`.

### Regenerating or Swapping Product Cutouts (Prompts for Clark)
`/interactions/assets/corner-table/` includes the eight photorealistic `560×560` transparent PNG cutouts (`01-espresso.png`–`08-espresso-tonic.png`) with their 4-o'clock cast shadows. To regenerate or replace any item:
1. Run the prompt below in an image generator that outputs transparent PNGs (or remove the background cleanly while preserving the full cast shadow), at `1024×1024` or `560×560` with generous transparent padding around both the object and its 4-o'clock shadow.
2. Drop the resulting file into `/interactions/assets/corner-table/` with the exact filename listed below:

- **`/interactions/assets/corner-table/01-espresso.png`**
  > Photorealistic studio product cutout of an espresso with rich tiger-striped crema in a dusty pink (`#efc7ce`) sculptural porcelain demitasse cup with vertical fluted sides, an angular architectural loop handle, sitting on an organic pebble-shaped matching dusty pink porcelain saucer. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock), complete soft cast shadow toward lower right (4 o'clock), generous transparent margin around object and shadow, PNG transparency, no text.
- **`/interactions/assets/corner-table/02-iced-latte.png`**
  > Photorealistic studio product cutout of an iced latte in a tall cylindrical clear borosilicate glass with visible swirling layers of cold white milk at the bottom, warm amber coffee in the middle, dark espresso on top, crystal-clear ice cubes, and realistic exterior glass condensation. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock) with glass refraction, complete soft cast shadow toward lower right (4 o'clock), generous transparent margin, PNG transparency, no text.
- **`/interactions/assets/corner-table/03-moka-pot.png`**
  > Photorealistic studio product cutout of a classic silver brushed-aluminium octagonal stovetop moka pot with crisp faceted sides and an architectural matte-black bakelite handle and lid finial. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock) with realistic metallic specular highlights, complete soft cast shadow toward lower right (4 o'clock), generous transparent margin, PNG transparency, no text.
- **`/interactions/assets/corner-table/04-cappuccino.png`**
  > Photorealistic studio product cutout of a cappuccino with intricate Rosetta fern latte art in glossy microfoam, served in a wide, low dusty-pink (`#efc7ce`) glazed porcelain cup with scalloped fluting, a circular ring handle, and a wavy-rimmed matching porcelain saucer. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock), complete soft cast shadow toward lower right (4 o'clock), generous transparent margin, PNG transparency, no text.
- **`/interactions/assets/corner-table/05-iced-matcha.png`**
  > Photorealistic studio product cutout of an iced matcha latte in a clear glass tumbler showing creamy white milk at the base, marbled jade-green ceremonial matcha layers above, clear ice cubes, and subtle condensation droplets. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock), complete soft cast shadow toward lower right (4 o'clock), generous transparent margin, PNG transparency, no text.
- **`/interactions/assets/corner-table/06-pour-over.png`**
  > Photorealistic studio product cutout of a clear fluted glass pour-over coffee dripper lined with a damp paper filter holding dark blooming coffee grounds, seated atop a clear glass coffee server carafe wrapped with a matte dusty-pink (`#efc7ce`) silicone collar, half-filled with glowing amber filter coffee. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock), complete soft cast shadow toward lower right (4 o'clock), generous transparent margin, PNG transparency, no text.
- **`/interactions/assets/corner-table/07-strawberry-matcha.png`**
  > Photorealistic studio product cutout of a layered strawberry matcha drink in a tall clear glass with three distinct strata: pastel pink crushed-strawberry milk at the bottom, creamy white milk in the middle with ice cubes, and vibrant green whisked matcha on top. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock), complete soft cast shadow toward lower right (4 o'clock), generous transparent margin, PNG transparency, no text.
- **`/interactions/assets/corner-table/08-espresso-tonic.png`**
  > Photorealistic studio product cutout of an espresso tonic in a low faceted Picardie-style clear glass tumbler, showing dark crema-topped espresso floating over effervescent pale golden tonic water with tiny bubbles, clear ice cubes, and a thin translucent orange slice tucked against the glass wall. Elevated 35-degree three-quarter orthographic/isometric angle, physically upright, directional sunlight from upper left (10 o'clock), complete soft cast shadow toward lower right (4 o'clock), generous transparent margin, PNG transparency, no text.

---

## 5. Atelier Rouge: Editorial Carousel (`/interactions/atelier-rouge.html`)

### What it is
An endlessly looping 3D perspective image carousel for fictional luxury house **Atelier Rouge** on a pure `#000` stage. Cards share a common bottom baseline (`B = H/2 + cardHeight/2`), hinge at their bottom inner corners (`bottom-left` on the right, `bottom-right` on the left), and use precomputed screen-space anchors `A[0..4]` so visible gaps remain equal after 3D perspective projection. Includes weighted drag, momentum projection, an underdamped settle spring, per-card follower ripple, speed-driven track press-back, neighbor click-to-center, keyboard arrow navigation, and debounced horizontal trackpad gestures.

### How to edit copy and tuning values
- **Items (`ITEMS` array & `assets.json`)**: Edit `/interactions/assets/atelier-rouge/assets.json` (and the fallback `ITEMS` array in `/interactions/atelier-rouge.html`). Any collection of 5 or more items is supported automatically.
- **Physics & geometry tuning (`TUNING` object)**: Locate `const TUNING = { ... }` in `/interactions/atelier-rouge.html`:
  - `perspective`: `900`
  - `springStiffness`: `0.026`
  - `springDamping`: `0.89`
  - `dragFollowRate`: `0.20`
  - `followerRates`: `[0.32, 0.20, 0.13, 0.10]` (center card through outer cards at 60Hz reference)
  - `wheelDebounceMs`: `350`

### Regenerating or Swapping Editorial Portraits (Prompts for Clark)
`/interactions/assets/atelier-rouge/` includes the eight `900×1200` (3:4 portrait) dark luxury editorial JPEGs (`01-after-hours.jpg`–`08-the-crimson-coat.jpg`). To regenerate or replace any item, run the prompt below at a `3:4` vertical aspect ratio (`900×1200` or `1200×1600`) and save it over the matching filename in `/interactions/assets/atelier-rouge/`:

- **`/interactions/assets/atelier-rouge/01-after-hours.jpg`** (`Ready-to-Wear / After Hours`)
  > High-fashion dark luxury editorial portrait (3:4 vertical) of a model seen in three-quarter profile wearing an asymmetric floor-length crimson silk evening dress, dramatic rim light in glowing orange-red cutting across obsidian black studio shadows, subtle motion blur on the hem, 35mm medium-format film grain, no text.
- **`/interactions/assets/atelier-rouge/02-noir-line.jpg`** (`Tailoring / Noir Line`)
  > High-fashion dark luxury editorial close-up (3:4 vertical) of sharp architectural black barathea wool tailoring—structured shoulder and peak lapel with a single scarlet silk lapel thread—illuminated by a narrow diagonal slash of warm crimson tungsten light against pure black shadow, tactile fabric weave, no text.
- **`/interactions/assets/atelier-rouge/03-lily-melt.jpg`** (`Eau de Parfum / Lily Melt`)
  > High-fashion dark luxury botanical still life (3:4 vertical) of a sculptural deep-red lily petal glistening with translucent amber condensation droplets, dramatically backlit with fiery orange-red light against a velvety black-crimson background, macro editorial photography, no text.
- **`/interactions/assets/atelier-rouge/04-halo.jpg`** (`Jewellery / Halo`)
  > High-fashion dark luxury jewellery still life (3:4 vertical) of a minimal sculptural polished rose-gold and cabochon garnet ring resting on black obsidian glass, casting a luminous halo-like caustic reflection in deep crimson and ember orange-red, macro studio photography, no text.
- **`/interactions/assets/atelier-rouge/05-n7-sang.jpg`** (`Parfum / N°7 Sang`)
  > High-fashion dark luxury perfume still life (3:4 vertical) of a heavy architectural cut-crystal flacon without labels, filled with deep ruby-red elixir, lit from behind so a glowing crimson and orange-red refraction projects across a matte black stone plinth, chiaroscuro lighting, no text.
- **`/interactions/assets/atelier-rouge/06-in-motion.jpg`** (`Collection / In Motion`)
  > High-fashion dark luxury editorial photograph (3:4 vertical) capturing a slow-shutter silhouette of a model turning in a pleated vermilion and oxblood organza gown, luminous trails of orange-red and deep crimson fabric suspended in pure black space, poetic motion blur, no text.
- **`/interactions/assets/atelier-rouge/07-cherry-silk.jpg`** (`Silk / Cherry Silk`)
  > High-fashion dark luxury textile study (3:4 vertical) of fluid heavyweight cherry-crimson silk charmeuse draped in sculptural folds, specular highlights in warm vermilion transitioning into cavernous oxblood and black shadows, tactile studio macro photography, no text.
- **`/interactions/assets/atelier-rouge/08-the-crimson-coat.jpg`** (`Outerwear / The Crimson Coat`)
  > High-fashion dark luxury editorial portrait (3:4 vertical) of a tall figure standing in shadow wearing an oversized floor-sweeping double-breasted crimson cashmere overcoat with upturned collar, dramatic low-key side lighting in ember red against a pitch-black void, 35mm editorial grain, no text.

---

## 6. Verger: Peach Bag (`/interactions/verger.html`)

### What it is
A `100svh` restaurant hero for fictional French restaurant **Verger** (`VERGER`, "From orchard / to table."). Five procedurally shaded, dithered fuzzy peaches drop one by one into a translucent milky plastic carrier bag whose 72-ray contour stretches around the fruit using 14-pass radius smoothing, 3 rounds of Chaikin corner-cutting, and closed Catmull-Rom Bézier splines at 240Hz physics substeps.

### How to edit copy and tuning values
- **Logo, headline, CTA & dish card**: Edit `.logo`, `.headline`, `.cta-btn`, and `.dish-card` in `/interactions/verger.html`.
- **Peach positions & palettes**: Edit `PEACH_SPECS`, `DROP_ORDER`, and `PALETTES` in the `<script>` block.
- **Spring constants**: Bag sway (`k = 18, c = 1.5`), drop (`k = 150, c = 8.5`), squash (`k = 240, c = 9`), and peach springs (`k = 130..300`) are inside `stepSubstep(dt)`.

---

## 7. 桃里 (Momosato): Peach Shop (`/interactions/momosato.html`)

### What it is
A `100svh` hero for fictional Japanese peach shop **桃里 (Momosato)** (`ピーチショップ`, `旬の白桃`, `白桃・黄桃`). Every peach is rendered pixel-by-pixel into an offscreen `ImageData` buffer using two overlapping smooth-min lobes, cleft shading, stippled grain, and a hand-written 3-pass separable box blur on premultiplied RGBA to simulate a shallow depth-of-field camera lens focused at `row = 2`. Peaches drop from above in perspective batches and bounce on hover, click, or keyboard selection (`Arrow` keys + `Space`/`Enter`).

### How to edit copy and tuning values
- **Vertical Japanese typography**: Edit the `.side-col--left` and `.side-col--right` elements in `/interactions/momosato.html`. If adding new kanji/kana glyphs, update the `&text=` parameter on the Google Fonts `Shippori Mincho B1` `<link>` in `<head>`.
- **Colour ramp & peach varieties**: Edit `RAMP`, `VARIETIES`, `FL` (front lobe), and `BL` (back lobe) in the `<script>` tag.
- **Camera & Depth-of-Field**: Adjust `R_CELL` (`0.53`), `D0` (`2.6`), `FOCUS_Z` (`2`), `computeCameraMetrics()`, and `entranceDelay(row, x, rows)`.

---

## Regenerating Poster Screenshots

To regenerate all seven `1440×900` (16:10) WebP posters in `/interactions/posters/*.webp`:

```bash
node scripts/capture-interactions.mjs
```

---

## Credits and Licences

### 1. Things I Love — 3D Models (via Poly Pizza)
- **Laptop**: by **Alex Safayan** — [https://poly.pizza/m/27hcX1w4643](https://poly.pizza/m/27hcX1w4643) — Licensed under **CC-BY 3.0** ([https://creativecommons.org/licenses/by/3.0/](https://creativecommons.org/licenses/by/3.0/)). Original file: `https://static.poly.pizza/87d3dfd2-de47-4b03-b9f1-4c84c2a605b0.glb`
- **Airplane**: by **Poly by Google** — [https://poly.pizza/m/8ciDd9k8wha](https://poly.pizza/m/8ciDd9k8wha) — Licensed under **CC-BY 3.0** ([https://creativecommons.org/licenses/by/3.0/](https://creativecommons.org/licenses/by/3.0/)). Original file: `https://static.poly.pizza/a3c0d8bc-884d-41b1-a0b3-1c2c01b65286.glb`
- **Rock**: by **Poly by Google** — [https://poly.pizza/m/d241h9a3G5B](https://poly.pizza/m/d241h9a3G5B) — **CC0 1.0 Public Domain**. Original file: `https://static.poly.pizza/7528df1c-c611-4e42-9210-eba9fcaf4269.glb`
- **Bubble Tea**: by **Jarlan Perez** — [https://poly.pizza/m/3step41418](https://poly.pizza/m/3step41418) — **CC0 1.0 Public Domain**. Original file: `https://static.poly.pizza/9be6aee1-5998-452d-ad1a-333b5c0ab03c.glb`
- **Ramen Bowl**: by **Hayden Lister** — [https://poly.pizza/m/a09H829X22](https://poly.pizza/m/a09H829X22) — **CC0 1.0 Public Domain**. Original file: `https://static.poly.pizza/4754ce4b-40ec-4089-8be4-98ce7230bfe4.glb`
- **Libraries**: `three@0.169.0` (MIT) and `cannon-es@0.20.0` (MIT) loaded via jsDelivr import map.

### 2. Quiet Cup: Japandi Collage — Video & Still Media
- **Coffee pouring (`assets/quiet-cup/coffee-pour.mp4`)**:
  - Creator: **Isabelli Pontes**
  - Source: [https://www.pexels.com/video/pouring-coffee-closeup-5714708/](https://www.pexels.com/video/pouring-coffee-closeup-5714708/)
  - Original download: `https://videos.pexels.com/video-files/5714708/5714708-hd_1080_1920_24fps.mp4`
  - Licence: [Pexels License](https://www.pexels.com/license/) (trimmed to 9s, resized for web playback, audio removed).
- **Espresso pouring (`assets/quiet-cup/espresso-pour.mp4`)**:
  - Creator: **K**
  - Source: [https://www.pexels.com/video/slow-motion-footage-of-freshly-brewed-coffee-dripping-into-a-cup-2853788/](https://www.pexels.com/video/slow-motion-footage-of-freshly-brewed-coffee-dripping-into-a-cup-2853788/)
  - Original download: `https://videos.pexels.com/video-files/2853788/2853788-uhd_3840_2160_24fps.mp4`
  - Licence: [Pexels License](https://www.pexels.com/license/) (trimmed to 9s, cropped to portrait and resized, audio removed).
- **Still photographs (`coffee.jpg`, `window.jpg`, `takeaway.jpg`, `pastry.jpg`, `beans.jpg`)**:
  - AI-generated concept visuals from the starter bundle (`ground-coffee-starter.zip`). Do not depict a verified café premises or menu.

### 3. Maison Lorvert & Verger — Hosted Reference Media
- **Maison Lorvert (`assets/maison-lorvert/01.jpg`–`07.jpg`)**: Self-hosted copies of the editorial concept portraits from `https://pub-711c6e209da84280a051d7c71b64359e.r2.dev/timeline-crawl/01.jpg`–`07.jpg`.
- **Verger (`assets/verger/peach-dish.jpg`)**: Self-hosted copy of the styled overhead dish photograph from `https://pub-711c6e209da84280a051d7c71b64359e.r2.dev/peach/peach-dish.jpg`.

