# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web-based cocktail menu board for MJS Bar. It's a single-page application built with vanilla HTML, CSS, and JavaScript, featuring a modern dark theme with gold accents and responsive design.

## Architecture

- **Static Site**: No build process or framework dependencies
- **Frontend-only**: Pure HTML/CSS/JavaScript implementation
- **Single Page App**: Dynamic content switching via JavaScript
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px

## File Structure

```
menu_board/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and responsive design
├── script.js           # Interactive functionality and animations
├── images/             # Image assets
│   └── mjs_bar.jpg     # Hero section image
└── README.md           # Project documentation
```

## Development Commands

This is a static website with no build process. To run locally:

```bash
# Using Python (recommended)
python -m http.server 8000

# Using Node.js live-server
npx live-server

# Then open http://localhost:8000
```

## Key Components

### Menu System (script.js:4-29)
- Category navigation with active state management via `data-category` attributes
- Dynamic content switching between cocktails, spirits, wine, and beer sections
- Event-driven architecture using `querySelectorAll` and `addEventListener`

### Scroll Effects (script.js:32-39)
- Dynamic navigation background opacity based on scroll position
- Threshold at 100px scroll for background transparency changes

### Interactive Enhancements (script.js:42-51)
- Menu item hover effects with CSS transform manipulation
- Enhanced visual feedback through scale and translateY transforms

## Design System

### Colors
- Primary background: `#1a1a1a` to `#2d2d2d` (gradient)
- Accent gold: `#d4af37` and `#ffd700`
- Text: `#ffffff` (primary), `#cccccc` (secondary)

### Typography
- Headers: 'Playfair Display' (serif)
- Body: 'Poppins' (sans-serif)
- External fonts loaded from Google Fonts

### Layout Patterns
- Sticky navigation with backdrop blur
- CSS Grid for menu items (auto-fit, minmax 300px)
- Flexbox for navigation and footer layouts

## Adding Menu Items

Menu items follow this structure in index.html:

```html
<div class="menu-item">
    <div class="item-image">
        <i class="fas fa-[icon-name]"></i>
    </div>
    <div class="item-content">
        <h3 class="item-name">Item Name</h3>
        <p class="item-description">Description</p>
        <span class="item-price">₩Price</span>
    </div>
</div>
```

## Contact Information

The site displays MJS Bar contact details:
- Address: 서울 금천구 두산로3길 36-11, 드림캐슬3차아파트 501호
- Phone: 010-4488-3560
- Hours: 주인장 마음대로 (Owner's discretion)

## Content Structure

The menu is organized into four main categories with Korean navigation:
- 칵테일 (Cocktails): Signature cocktails section
- 스피리츠 (Spirits): Premium spirits selection  
- 와인 (Wine): Wine collection
- 맥주 (Beer): Beer offerings

Each menu item follows FontAwesome icon + content structure with Korean pricing (₩)

## Performance Features

- Debounced scroll handlers for smooth performance
- Intersection Observer for efficient animation triggers
- CSS transforms for hardware-accelerated animations
- Backdrop filters with fallbacks