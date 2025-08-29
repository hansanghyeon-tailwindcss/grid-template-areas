# Usage Guide

Complete guide for using the `tailwindcss-grid-template-areas` plugin with Tailwind CSS v4.

## Installation

```bash
npm install tailwindcss-grid-template-areas
```

## Setup

### Method 1: CSS Import (Recommended)

Import the plugin CSS directly into your main CSS file:

```css
@import 'tailwindcss';
@import 'tailwindcss-grid-template-areas/plugin.css';
```

### Method 2: JavaScript/TypeScript Import

You can also import and use the CSS content programmatically:

```typescript
import { pluginCSS } from 'tailwindcss-grid-template-areas'

// Write to a CSS file or include in your build process
console.log(pluginCSS)
```

## Available Utilities

### Basic Grid Template Areas

Static utilities for CSS keywords:

- `grid-areas-none` → `grid-template-areas: none`
- `grid-areas-inherit` → `grid-template-areas: inherit`
- `grid-areas-initial` → `grid-template-areas: initial`
- `grid-areas-revert` → `grid-template-areas: revert`
- `grid-areas-revert-layer` → `grid-template-areas: revert-layer`
- `grid-areas-unset` → `grid-template-areas: unset`

### Grid Area Placement

Static utilities for placing elements in grid areas:

- `grid-in-auto` → `grid-area: auto`
- `grid-in-inherit` → `grid-area: inherit`
- `grid-in-initial` → `grid-area: initial`
- `grid-in-revert` → `grid-area: revert`
- `grid-in-revert-layer` → `grid-area: revert-layer`
- `grid-in-unset` → `grid-area: unset`

### Arbitrary Values

The plugin supports arbitrary values for dynamic grid layouts:

#### Grid Template Areas with Arbitrary Values

- `grid-areas-[header_main]` → `grid-template-areas: "header main"`
- `grid-areas-[nav_nav,aside_main]` → `grid-template-areas: "nav nav" "aside main"`
- `grid-areas-[var(--my-grid)]` → `grid-template-areas: var(--my-grid)`

#### Grid Area Placement with Arbitrary Values

- `grid-in-[header]` → `grid-area: header`
- `grid-in-[my-custom-area]` → `grid-area: my-custom-area`
- `grid-in-[var(--area)]` → `grid-area: var(--area)`

### Named Grid Lines

Utilities for positioning with named grid lines:

- `row-start-[area]` → `grid-row-start: area-start`
- `row-end-[area]` → `grid-row-end: area-end` 
- `col-start-[area]` → `grid-column-start: area-start`
- `col-end-[area]` → `grid-column-end: area-end`

## Arbitrary Value Syntax

When using arbitrary values:

- Use underscores (`_`) for spaces: `header_main` becomes `"header main"`
- Separate rows with commas: `nav_nav,main_main` becomes `"nav nav" "main main"`
- CSS variables are preserved: `var(--grid)` remains `var(--grid)`

## Theme Integration

You can define grid template areas in your Tailwind theme for reusable layouts:

```css
@theme {
  --grid-template-areas-layout: "header header" "sidebar main" "footer footer";
  --grid-template-areas-mobile: "header" "main" "sidebar" "footer";
}
```

Then use them with custom utilities:

```css
@utility grid-areas-layout {
  grid-template-areas: var(--grid-template-areas-layout);
}

@utility grid-areas-mobile {
  grid-template-areas: var(--grid-template-areas-mobile);
}
```

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    @import 'tailwindcss';
    @import 'tailwindcss-grid-template-areas/plugin.css';
    
    @theme {
      --grid-template-areas-layout: "header header header"
                                   "sidebar main ads" 
                                   "sidebar footer footer";
    }
    
    @utility grid-areas-layout {
      grid-template-areas: var(--grid-template-areas-layout);
    }
  </style>
</head>
<body>
  <!-- Grid container -->
  <div class="grid grid-areas-layout gap-4 min-h-screen">
    <!-- Grid items -->
    <header class="grid-in-[header] bg-blue-500 text-white p-4">
      Header
    </header>
    
    <aside class="grid-in-[sidebar] bg-gray-200 p-4">
      Sidebar
    </aside>
    
    <main class="grid-in-[main] bg-white p-4">
      Main Content
    </main>
    
    <aside class="grid-in-[ads] bg-yellow-100 p-4">
      Advertisements
    </aside>
    
    <footer class="grid-in-[footer] bg-gray-800 text-white p-4">
      Footer
    </footer>
  </div>

  <!-- Using arbitrary grid template areas -->
  <div class="grid grid-areas-[nav_nav_nav,aside_main_ads] gap-4 mt-8">
    <nav class="grid-in-[nav] bg-indigo-500 text-white p-4">Navigation</nav>
    <aside class="grid-in-[aside] bg-gray-200 p-4">Aside</aside>
    <main class="grid-in-[main] bg-white p-4">Main</main>
    <div class="grid-in-[ads] bg-yellow-100 p-4">Ads</div>
  </div>
</body>
</html>
```

## Responsive Design

Combine with Tailwind's responsive utilities:

```html
<div class="
  grid gap-4
  grid-areas-[header,main,footer]
  md:grid-areas-[header_header,sidebar_main,footer_footer]
  lg:grid-areas-[nav_nav_nav,sidebar_main_ads,footer_footer_footer]
">
  <!-- Grid items -->
</div>
```

## Browser Support

This plugin requires modern browsers that support:
- CSS Grid (grid-template-areas)
- Tailwind CSS v4 features

Supported browsers:
- Safari 16.4+
- Chrome 111+
- Firefox 128+

## Troubleshooting

### Grid areas not working?

1. Ensure your container has `display: grid`
2. Make sure area names match between template and placement
3. Check that your grid has enough columns/rows for the template

### Invalid arbitrary value?

- Use underscores for spaces: `header_main` not `header main`  
- Use commas to separate rows: `nav_nav,main_main`
- Quote special characters if needed

### TypeScript support

The plugin includes full TypeScript definitions. Import utilities:

```typescript
import { 
  extractGridAreaNames, 
  formatGridTemplateAreas, 
  parseArbitraryGridAreas 
} from 'tailwindcss-grid-template-areas'

// Use utility functions for dynamic grid generation
const areas = extractGridAreaNames({
  layout: ['header header', 'sidebar main']
})
// areas = ['header', 'sidebar', 'main']
```