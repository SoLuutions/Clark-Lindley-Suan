# Clark Lindley Suan — Portfolio Website

## Overview
Personal site for Clark Lindley Suan, AI Automation & Growth Systems Manager / full-stack developer. Redesigned September 2026 as a single long-scroll sales page (retro palette: navy, teal, cream, orange, rust; Fraunces + Work Sans + DM Mono). Hosted on Vercel with clean URLs.

## Structure
- `index.html`, `style.css`, `script.js` — the live homepage
- `resume.html` + `Clark_Lindley_Suan_Resume.pdf` — résumé page (`/resume`) and its PDF export (generated from the HTML with headless Chromium `--print-to-pdf`)
- `assets/shots/` — real screenshots of project pages (WebP, 1200×750)
- `assets/logos/` — client logos normalised to single-colour PNGs (`navy/` set is what the site uses)
- `projects/`, `blog-*.html`, `dannelson.html`, `dr.zrinka.html` — project and article pages (unchanged in the redesign)
- `design/` — redesign mockups (`mockup-v1.html` dark editorial, `mockup-v2.html` retro, plus screenshots). Not linked from the site; blocked in `robots.txt`.
- `archive/vcard-site/` — the previous dark "vCard" template site, kept for rollback. See `archive/README.md`.

## Homepage sections
Nav → hero → skills ticker → client logo marquee → outcome stats → 4 featured case studies (Snac Fresh, Dead Threads, Garden Quote voice AI, job-fit classifier) → filterable project grid → services → process → testimonials → about + résumé links → writing → contact (Calendly inline) → footer. Mobile gets a hamburger menu and a sticky "Book a call" bar.

## Behaviour (`script.js`)
Scroll-reveal with stagger, count-up numbers, sticky nav state, mobile menu, soft parallax on case-study screenshots, project filters. Add `?static` to the URL to disable all motion (used for screenshot checks); `prefers-reduced-motion` is respected.

## Regenerating the résumé PDF
```
chromium --headless=new --no-sandbox --no-pdf-header-footer --print-to-pdf=Clark_Lindley_Suan_Resume.pdf "file://$PWD/resume.html"
```
