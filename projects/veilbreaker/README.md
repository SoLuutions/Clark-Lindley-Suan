# VEILBREAKER — Ward 09

A midnight modern-occult 3D action-combat game built with Three.js (r164), stylized hand-painted PBR GLB assets, skeletal animations, HDR environment lighting, and selective post-processing bloom.

## Running Locally (HTTP Required)

Because `veilbreaker.html` loads `.glb`, `.hdr`, and `.webp` assets from `/assets/` via Fetch/WebGL loaders, **you must serve the folder over HTTP** rather than opening `veilbreaker.html` directly via `file://` (opening via `file://` triggers a clean fallback to procedural meshes with a console warning).

### Option 1 — `npx serve` (Recommended)
```bash
npx serve .
```
Then open `http://localhost:3000/veilbreaker.html` in your browser.

### Option 2 — Python Built-in HTTP Server
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080/veilbreaker.html`.

### Option 3 — Static Hosting (Vercel / Netlify)
- **Vercel:** Run `npx vercel` from this directory (or connect the repo with output directory `.`) and visit `/veilbreaker.html`.
- **Netlify:** Drag-and-drop this folder (containing `veilbreaker.html` and `assets/`) onto Netlify Drop, or run `npx netlify deploy --prod --dir=.`.

---

## Controls

| Action | Default Input |
| :--- | :--- |
| Move | `W` `A` `S` `D` (or left touch joystick) |
| 3-Hit Blade Combo & Execute (Riposte) | `Left Click` (`LMB`) |
| Silver Hex Pistol (Shoot mid-windup to Counter-Stagger!) | `Right Click` (`RMB`) |
| Phase Dodge (Veil Slip slow-mo + instant reload) | `Space` |
| Hex Wave (Arcane Slash Projectile) | `F` |
| Astral Sanctum (Ultimate) | `Q` |
| Spectral Glide | Hold `Shift` + Move |
| Crimson Elixir (Heal) | `E` |
| Relic Satchel | `B` |
| Performance Telemetry (`FPS`, draw calls, tris, textures) | `F3` |

All controls can be rebound in **⚙ Settings**.

---

## Graphics Presets & Style Options

Switch presets anytime in **⚙ Settings**:
- **Performance (`low`)**: Direct rendering (no composer/bloom), shadows off, DPR capped at `1.0`. Default on touch devices (which also automatically load `512px` PBR texture sets).
- **Balanced (`mid`)**: 4× MSAA HDR target, half-res selective `UnrealBloomPass`, vignette/color grade, `1024px` moon shadows, DPR capped at `1.5`.
- **Ultra (`high`)**: Full-res selective `UnrealBloomPass`, vignette/color grade, `SMAAPass` anti-aliasing, `2048px` moon shadows, DPR capped at `2.0`.

Optional stylized inverted-hull character outlines can be toggled live from the browser console via:
```js
window.STYLE.outline = true;  // or false
```

See [CREDITS.md](CREDITS.md) for full asset attributions/licenses (100% CC0) and [CHANGES.md](CHANGES.md) for the complete technical overhaul summary.
