# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathCraft is a primary school times tables practice game built as an HTML5 Progressive Web App (PWA):
- Pure HTML5/CSS/JavaScript (no compilation step)
- p5.js for graphics and interactive visualizations
- PWA with service worker for offline usage

## Development Commands

Start development server with auto-reload:
```bash
./scripts/serve
```

This runs `live-server` on http://localhost:8080, auto-installs if not present.

Generate PWA icons from SVG:
```bash
make icons-to-png
```

Requires ImageMagick's `convert` command. Generates icons in sizes 72x72 through 512x512 from `public/icon.svg` to `public/icons/`.

## Project Architecture

### File Structure
```
public/                    # All source files live here (served directly)
├── index.html            # Main HTML entry point
├── app.css               # Global styles
├── sw.js                 # Service worker for offline caching
├── manifest.json         # PWA manifest with icons and metadata
├── icon.svg              # Source icon for PWA
└── js/
    └── main.js           # p5.js sketch (setup/draw functions)
```

### p5.js Architecture
- Uses global mode with p5.js loaded from CDN (v2.0.5)
- Canvas inserted into `#sketch-container` div
- `setup()`, `draw()`, and `mousePressed()` functions in main.js
- p5.js reference: https://p5js.org/reference/

### PWA Configuration
- Service worker (sw.js) implements cache-first strategy with network fallback
- Caches static assets and p5.js CDN for offline use
- Manifest configured for portrait-primary orientation, theme color #2196F3
- Icons defined for multiple sizes (72x72 through 512x512)

## Development Notes

- All files are static; edit and refresh browser to see changes
- No build step, no TypeScript compilation (currently plain JavaScript)
- When adding new JS files, reference them in index.html
- When changing cached assets, update CACHE_NAME in sw.js to invalidate old caches
- For times tables game logic, implement in main.js or create separate modules