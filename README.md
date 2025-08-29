# tailwindcss-grid-template-areas

A powerful Tailwind CSS v4 plugin for CSS Grid template areas with intuitive semicolon syntax.

## Features

- 🎯 **Simple Syntax**: Only `grid-areas-[]` pattern with clear separators
- ⚡ **Intuitive Separators**: Semicolon (`;`) for rows, comma (`,`) for columns
- 🔧 **Underscore Freedom**: Use underscores and hyphens freely in area names
- 📍 **Grid Area Placement**: `grid-in-[]` utilities for arbitrary area assignment
- ⚡ **Tailwind CSS v4 Compatible**: Built for the latest Tailwind CSS v4
- 🚀 **Zero Configuration**: Works out of the box with simple installation

## Installation

```bash
npm install tailwindcss-grid-template-areas
```

## Usage

### Method 1: Production Build (Recommended)

Add the plugin to your main CSS file:

```css
@import 'tailwindcss';
@plugin 'tailwindcss-grid-template-areas/plugin.js';
```

### Method 2: Browser CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<script>
  tailwind.config = {
    plugins: [
      function({ matchUtilities }) {
        matchUtilities({
          'grid-areas': (value) => {
            // Semicolon for rows, comma for columns
            if (value.includes(';')) {
              const rows = value.split(';').map(row => {
                const columns = row.split(',')
                return `"${columns.join(' ')}"`;
              })
              return { 'grid-template-areas': rows.join(' ') }
            }
            // Single row handling
            if (value.includes(',')) {
              const columns = value.split(',')
              return { 'grid-template-areas': `"${columns.join(' ')}"` }
            }
            return { 'grid-template-areas': `"${value}"` }
          }
        })
        matchUtilities({
          'grid-in': (value) => ({ 'grid-area': value })
        })
      }
    ]
  }
</script>
```

## Syntax Guide

### Core Rules
- **Semicolon (`;`)**: Separates rows
- **Comma (`,`)**: Separates columns within a row
- **Underscore (`_`)**: Allowed in area names
- **Hyphen (`-`)**: Allowed in area names

### Patterns

#### Single Row Layout
```html
<div class="grid grid-areas-[main,sidebar]">
  <main class="grid-in-[main]">Main Content</main>
  <aside class="grid-in-[sidebar]">Sidebar</aside>
</div>
```
Generates: `grid-template-areas: "main sidebar"`

#### Multi-Row Layout  
```html
<div class="grid grid-areas-[nav,nav,nav;sidebar,main,ads;footer,footer,footer]">
  <nav class="grid-in-[nav]">Navigation</nav>
  <aside class="grid-in-[sidebar]">Sidebar</aside>
  <main class="grid-in-[main]">Main Content</main>
  <div class="grid-in-[ads]">Advertisements</div>
  <footer class="grid-in-[footer]">Footer</footer>
</div>
```
Generates:
```css
grid-template-areas:
  "nav nav nav"
  "sidebar main ads"
  "footer footer footer";
```

#### Hero Layout
```html
<div class="grid grid-areas-[hero-image,title;hero-image,content;hero-image,cta]">
  <div class="grid-in-[hero-image]">Hero Image</div>
  <h1 class="grid-in-[title]">Amazing Title</h1>
  <p class="grid-in-[content]">Great content here</p>
  <button class="grid-in-[cta]">Call to Action</button>
</div>
```

#### Complex Area Names
```html
<div class="grid grid-areas-[hero_image,call-to-action]">
  <div class="grid-in-[hero_image]">Hero with underscore</div>
  <button class="grid-in-[call-to-action]">Button with hyphen</button>
</div>
```

## Live Demo

🎨 **[View Live Demo](https://hansanghyeon.github.io/tailwindcss-grid-template-areas/)** - See all examples in action!

## Why This Plugin?

### Problem with Traditional Approach
```css
/* Traditional CSS - verbose and hard to maintain */
.layout {
  grid-template-areas: 
    "nav nav nav"
    "sidebar main ads"
    "footer footer footer";
}
```

### Solution with Our Plugin
```html
<!-- Simple, intuitive Tailwind utility -->
<div class="grid grid-areas-[nav,nav,nav;sidebar,main,ads;footer,footer,footer]">
```

### Key Benefits
- **Visual Structure**: Semicolons and commas mirror the actual grid layout
- **No Configuration**: Works immediately without theme setup
- **Flexible Naming**: Use underscores and hyphens naturally in area names
- **Dynamic Usage**: Perfect for JavaScript-driven layouts

## Advanced Examples

### Dynamic Grid with JavaScript
```javascript
// Dynamically change grid areas
const areas = ['header', 'main_content', 'sidebar-ads', 'footer_area'];
const gridClass = `grid-areas-[${areas.join(',')}]`;
element.className = `grid ${gridClass}`;

// Dynamic area assignment
areas.forEach((area, index) => {
  const child = element.children[index];
  child.className = `grid-in-[${area}]`;
});
```

### Responsive Layouts
```html
<!-- Different layouts for different screen sizes -->
<div class="
  grid 
  grid-areas-[main;sidebar] 
  md:grid-areas-[main,sidebar] 
  lg:grid-areas-[nav,nav,nav;main,sidebar,ads;footer,footer,footer]
">
  <!-- Grid items -->
</div>
```

## Browser Support

- **Modern Browsers**: Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+
- **CSS Grid Support**: Required for grid-template-areas functionality
- **Tailwind CSS v4**: Compatible with the latest Tailwind CSS v4

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [hansanghyeon](https://github.com/hansanghyeon)