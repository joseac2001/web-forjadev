# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static one-page marketing/landing site for ForjaDev (forjadev.cl), a Chilean custom-software agency. No framework, no build step, no package manager — plain HTML/CSS/JS served as-is.

- `index.html` — entire page markup, single file, all sections (navbar, hero, problema, servicios, proceso, mockup-cta, precios, cotizar, footer)
- `styles.css` — all styling, organized into clearly delimited `/* ==== SECTION ==== */` blocks matching the HTML sections, in the same order
- `script.js` — vanilla JS: navbar scroll effect, mobile menu toggle, scroll-triggered fade-up animations via `IntersectionObserver`, and the quote form submit handler
- `logo_forjadev.jpg` — logo, reused as favicon, nav logo, hero image, and footer logo

## Running locally

No build/install step. Open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python -m http.server` or the VS Code Live Server extension) to test `fetch`-based form submission correctly (some browsers restrict `fetch` from `file://`).

## Architecture notes

- **Design tokens live in `:root` in `styles.css`** (lines ~9-36): colors (`--bg`, `--accent`, etc.), fonts (Space Grotesk for body, JetBrains Mono for `.mono` code-styled text), spacing/radius, and transition easing. Change the palette or type scale here rather than hunting for hardcoded values.
- **Section-by-section correspondence**: each `<section id="...">` in `index.html` has a matching CSS block in `styles.css` under a matching comment header. When editing a section's look, find its block by searching for the section name in the CSS comments rather than by scanning the whole file.
- **Scroll-in animations**: any element with the `fade-up` class is animated in `script.js` via a shared `IntersectionObserver` (fires once, then unobserves). Optional `delay-100`/`delay-200`/etc. classes stagger the animation — check `styles.css` for the delay values before adding a new one.
- **Quote form (`#cotizar`)** posts to Formspree (`form#quote-form action="https://formspree.io/f/xlgywrzy"`) via `fetch` in `script.js`, with inline loading/success/error states (`#submit-btn`, `#form-success`, `#form-error`). If the Formspree endpoint ever needs to change, update the `action` attribute in `index.html` — `script.js` reads it dynamically and warns via `alert()` if it still contains the placeholder `YOUR_FORM_ID`.
- **Mobile nav**: `#nav-toggle` is a hamburger button whose three `<span>` children are manually animated into an X via inline styles in `script.js` (no CSS class toggle for the icon itself); `#nav-links` gets an `open` class for the panel.

## Automatización de cotizaciones

Existe una automatización de Gmail/Gemini para responder cotizaciones que vive en su propio repositorio privado, fuera de este repo (no se documenta acá a propósito).

## Content conventions

- All user-facing copy is in Spanish (Chile/LatAm neutral), including code comments inside the syntax-highlighted `.code-block` demo in the "problema" section — that block is hand-written fake syntax-highlighted markup (`<span class="c-comment">`, `c-keyword`, `c-string`, `c-op`), not real executed/highlighted code.
- Prices are intentionally not stated as fixed numbers in the pricing section (`#precios`) — it lists what's included per payment type ("pago único" vs "mensualidad") rather than amounts; keep this pattern if editing pricing copy.
