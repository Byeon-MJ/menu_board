# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web-based cocktail menu board for MJS Bar. It's a single-page application built with vanilla HTML, CSS, and JavaScript, featuring a modern dark theme with gold accents and responsive design.

## Architecture

- **Static Site**: No build process or framework dependencies
- **Frontend-only**: Pure HTML/CSS/JavaScript implementation
- **Multi-Page SPA**: Main page loads separate HTML files for categories dynamically
- **Modal System**: Detailed cocktail pages displayed via modal overlays
- **Theme System**: Dark/light theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px

## File Structure

```
menu_board/
├── index.html          # Main HTML structure with modal system
├── styles.css          # All CSS styling and responsive design
├── script.js           # Interactive functionality and animations
├── pages/              # Category HTML files loaded dynamically
│   ├── cocktails.html  # Signature cocktails section
│   ├── spirits.html    # Premium spirits section
│   ├── beer.html       # Craft beer section
│   └── details/        # Individual cocktail detail pages
│       ├── mjs-martini.html
│       ├── old-fashioned.html
│       ├── negroni.html
│       └── manhattan.html
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

### Theme Management (script.js:3-42)
- Dark/light theme toggle with system preference detection
- LocalStorage persistence for theme settings
- Dynamic navigation background updates based on theme and scroll
- Icon updates between sun/moon based on current theme

### Menu System (script.js:44-167)
- Category navigation with `data-category` attributes for cocktails, spirits, beer
- Dynamic HTML loading via `fetch()` from `/pages/` directory
- Content caching system to prevent repeated requests (`loadedCategories` object)
- Active state management and smooth transitions between categories

### Modal System (script.js:169-259)
- Detailed cocktail information displayed in overlay modals
- Dynamic loading of content from `/pages/details/` directory
- Caching system for loaded detail pages (`loadedDetails` object)
- ESC key and backdrop click to close modal functionality

### Interactive Enhancements (script.js:103-142)
- Menu item hover effects with CSS transform manipulation
- Click handling for `clickable` menu items to open detail modals
- Staggered entrance animations for menu items (0.1s delay per item)
- Enhanced visual feedback through scale and translateY transforms

### Accessibility Features (script.js:334-374)
- Keyboard navigation with arrow keys between menu categories
- Touch/swipe gesture support for mobile category switching
- Focus management and screen reader considerations

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

### Regular Menu Items
Basic menu items (non-clickable) in category pages follow this structure:

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

### Clickable Menu Items with Details
For items that should open detail modals, add `clickable` class and `data-detail` attribute:

```html
<div class="menu-item clickable" data-detail="detail-page-name">
    <div class="item-image">
        <i class="fas fa-[icon-name]"></i>
    </div>
    <div class="item-content">
        <h3 class="item-name">Item Name</h3>
        <p class="item-description">Description</p>
        <span class="item-price">₩Price</span>
    </div>
    <div class="click-indicator">
        <i class="fas fa-info-circle"></i>
        <span>자세히 보기</span>
    </div>
</div>
```

Then create corresponding detail page at `/pages/details/detail-page-name.html`

## Contact Information

The site displays MJS Bar contact details:
- Address: 서울 금천구 두산로3길 36-11, 드림캐슬3차아파트 501호
- Phone: 010-4488-3560
- Hours: 주인장 마음대로 (Owner's discretion)

## Content Structure

The menu is organized into three main categories:
- **Cocktails** (`pages/cocktails.html`): Signature cocktails with detailed modal pages
- **Spirits** (`pages/spirits.html`): Premium spirits selection
- **Beer** (`pages/beer.html`): Craft beer offerings

### Category Pages
Each category page contains a section with class `menu-section` and uses CSS Grid layout for menu items.

### Detail Modal Pages
Individual cocktail details are stored in `/pages/details/` and include:
- Ingredient lists and preparation methods
- Alcohol content visualizations
- Flavor profiles and tasting notes
- Professional bartender tips

Each menu item follows FontAwesome icon + content structure with Korean pricing (₩)

## Performance Features

- **Debounced scroll handlers** (script.js:376-394): Optimized scroll events with 10ms debounce
- **Content caching**: Loaded category and detail pages cached in memory to avoid refetching
- **Lazy loading**: Menu categories and detail pages loaded on-demand via fetch API
- **CSS transforms**: Hardware-accelerated animations using transform properties
- **Staggered animations**: Menu items animate in sequence with 0.1s delays to avoid blocking
- **Backdrop filters**: Smooth navigation background blur with fallbacks for older browsers

## Error Handling

- Network request failures display user-friendly error messages
- Loading states with spinner animations during content fetches  
- Console logging for debugging category and detail page loading
- Graceful degradation when detail pages are not found (404 handling)