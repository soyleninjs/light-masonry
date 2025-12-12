# Light Masonry ⚡

<div align="center">

[![npm version](https://img.shields.io/npm/v/light-masonry?color=blue&style=flat-square)](https://www.npmjs.com/package/light-masonry)
[![npm downloads](https://img.shields.io/npm/dm/light-masonry?style=flat-square)](https://www.npmjs.com/package/light-masonry)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/light-masonry?style=flat-square)](https://bundlephobia.com/package/light-masonry)
[![License](https://img.shields.io/npm/l/light-masonry?style=flat-square)](https://github.com/soyleninjs/light-masonry/blob/master/LICENSE)

**A lightweight, responsive masonry layout library with zero dependencies.**

Light Masonry automatically arranges elements in an optimal position based on available vertical space, creating beautiful Pinterest-style grid layouts.

[Demo](https://masonry.soylenin.com) • [Documentation](#api-reference) • [Examples](#usage-examples)

</div>

---

## ✨ Features

- ⚡ **Zero dependencies** - Pure vanilla JavaScript
- 🪶 **Lightweight** - Only ~2KB minified and gzipped
- 📱 **Fully responsive** - Custom breakpoints for any screen size
- 🎨 **CSS Grid-based** - Optimal performance with native browser technology
- 🎯 **Customizable spacing** - Control gaps with CSS variables
- 📡 **Event callbacks** - React to initialization and breakpoint changes
- 🔄 **Smart resize handling** - Debounced events for better performance
- 🚀 **Easy integration** - Works with any project, framework or vanilla JS
- 🌐 **Wide browser support** - Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Demo](#demo)
- [CSS Configuration](#css-configuration)
- [API Reference](#api-reference)
  - [Constructor](#constructor)
  - [Options](#options)
  - [Callbacks](#callbacks)
- [Usage Examples](#usage-examples)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## 📦 Installation

Install Light Masonry via npm or yarn:

```bash
npm install light-masonry
```

```bash
yarn add light-masonry
```

Or include it directly via CDN:

**unpkg:**
```html
<link rel="stylesheet" href="https://unpkg.com/light-masonry/light-masonry.min.css">
<script src="https://unpkg.com/light-masonry/light-masonry.min.js"></script>
```

**jsDelivr:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/light-masonry/light-masonry.min.css">
<script src="https://cdn.jsdelivr.net/npm/light-masonry/light-masonry.min.js"></script>
```

## 🚀 Quick Start

### 1. HTML Structure

Create a container with items:

```html
<div class="masonry-container">
  <div class="masonry-item">Item 1</div>
  <div class="masonry-item">Item 2</div>
  <div class="masonry-item">Item 3</div>
  <!-- Add more items -->
</div>
```

### 2. Include CSS

Import the CSS file:

```css
@import "light-masonry/light-masonry.min.css";
```

Or use a `<link>` tag:

```html
<link rel="stylesheet" href="path/to/light-masonry.min.css">
```

### 3. Initialize JavaScript

```javascript
// Select your container element
const container = document.querySelector('.masonry-container');

// Initialize Light Masonry
const masonry = new LightMasonry(container, {
  defaultColumns: 4,
  responsive: {
    1440: 4,
    1024: 3,
    768: 2,
    480: 1
  }
});
```

That's it! Your masonry layout is ready. 🎉

## 🎬 Demo

See Light Masonry in action:

- **[🌐 Live Demo Website](https://masonry.soylenin.com)** - Interactive documentation
- **[💻 CodePen Demo](https://codepen.io/soyleninjs/pen/GRMdQqp)** - Editable examples

## 🎨 CSS Configuration

Light Masonry uses CSS custom properties (variables) for easy customization:

```css
.masonry-container {
  /* General gap (applied to both columns and items) */
  --gap: 20px;

  /* Specific horizontal gap between columns */
  --gap-between-columns: var(--gap);

  /* Specific vertical gap between items */
  --gap-between-items: var(--gap);
}
```

### CSS Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `--gap` | General spacing for both columns and items | `5px` |
| `--gap-between-columns` | Horizontal spacing between columns | `var(--gap)` |
| `--gap-between-items` | Vertical spacing between items | `var(--gap)` |

### Complete CSS

```css
.light-masonry-grid {
  --gap: 5px;
  --gap-between-columns: var(--gap);
  --gap-between-items: var(--gap);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  width: 100%;
  grid-gap: var(--gap-between-columns);
}

.light-masonry-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.light-masonry-column .light-masonry-item {
  width: 100%;
}

.light-masonry-column .light-masonry-item:not(:last-child) {
  margin-bottom: var(--gap-between-items);
}
```

## 📚 API Reference

### Constructor

```javascript
new LightMasonry(element, options)
```

**Parameters:**

- `element` (HTMLElement, required): The container element for the masonry layout
- `options` (Object, optional): Configuration options

**Example:**

```javascript
const container = document.querySelector('.masonry-container');
const masonry = new LightMasonry(container, {
  defaultColumns: 3
});
```

### Options

#### `defaultColumns`

- **Type:** `Number`
- **Default:** `4`
- **Description:** Number of columns to display when no responsive breakpoints match or when viewport is larger than all defined breakpoints.

```javascript
new LightMasonry(container, {
  defaultColumns: 5
});
```

#### `resizeDelay`

- **Type:** `Number` (milliseconds)
- **Default:** `0`
- **Description:** Debounce delay for window resize events. Set to `0` to disable debouncing. Higher values improve performance but may feel less responsive.

```javascript
new LightMasonry(container, {
  resizeDelay: 250 // Wait 250ms after resize stops
});
```

**Recommended values:**
- `0`: No debounce (instant response, may impact performance)
- `150-250`: Balanced (good performance and responsiveness)
- `300-500`: Better performance (slight delay in layout updates)

#### `responsive`

- **Type:** `Object`
- **Default:** `{}`
- **Description:** Defines breakpoints and column counts. Uses a **desktop-first** approach where breakpoints trigger when viewport width is **less than or equal to** the specified value.

```javascript
new LightMasonry(container, {
  responsive: {
    1440: 4, // 4 columns when width <= 1440px
    1024: 3, // 3 columns when width <= 1024px
    768: 2,  // 2 columns when width <= 768px
    480: 1   // 1 column when width <= 480px
  }
});
```

**How it works:**
- Breakpoints are evaluated from largest to smallest
- When viewport width is ≤ breakpoint value, that column count is used
- If no breakpoints match, `defaultColumns` is used

### Callbacks

#### `init`

- **Type:** `Function`
- **Parameters:** `data` (Object)
- **Description:** Called once after the masonry layout is initialized.

```javascript
new LightMasonry(container, {
  init: (data) => {
    console.log('Masonry initialized!');
    console.log('Current columns:', data.columns);
    console.log('Current breakpoint:', data.breakpoint);
  }
});
```

#### `afterBreakpoint`

- **Type:** `Function`
- **Parameters:** `data` (Object)
- **Description:** Called after the layout changes due to a responsive breakpoint being triggered.

```javascript
new LightMasonry(container, {
  afterBreakpoint: (data) => {
    console.log('Breakpoint changed!');
    console.log('New columns:', data.columns);
    console.log('New breakpoint:', data.breakpoint);
  }
});
```

**Callback Data Object:**

Both callbacks receive a `data` object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `columns` | Number | Current number of columns being displayed |
| `breakpoint` | Number or String | Current breakpoint value or 'defaultColumns' |

## 💡 Usage Examples

### Basic Usage

```javascript
const masonry = new LightMasonry(
  document.querySelector('.masonry-container')
);
```

### With Custom Columns

```javascript
const masonry = new LightMasonry(
  document.querySelector('.masonry-container'),
  {
    defaultColumns: 5
  }
);
```

### Fully Responsive

```javascript
const masonry = new LightMasonry(
  document.querySelector('.masonry-container'),
  {
    defaultColumns: 4,
    responsive: {
      1440: 4,
      1024: 3,
      768: 2,
      480: 1
    },
    resizeDelay: 200
  }
);
```

### With Event Callbacks

```javascript
const masonry = new LightMasonry(
  document.querySelector('.masonry-container'),
  {
    defaultColumns: 4,
    responsive: {
      1024: 3,
      768: 2,
      480: 1
    },
    init: (data) => {
      console.log(`Initialized with ${data.columns} columns`);
    },
    afterBreakpoint: (data) => {
      console.log(`Layout updated to ${data.columns} columns`);

      // Update UI or trigger animations
      if (data.columns === 1) {
        console.log('Mobile view activated');
      }
    }
  }
);
```

### Dynamic Content Loading

```javascript
const container = document.querySelector('.masonry-container');
const masonry = new LightMasonry(container, {
  defaultColumns: 4,
  responsive: {
    1024: 3,
    768: 2
  }
});

// Load more items dynamically
function loadMoreItems() {
  fetch('/api/items')
    .then(response => response.json())
    .then(items => {
      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'masonry-item';
        div.innerHTML = item.content;
        container.appendChild(div);
      });

      // Reinitialize to include new items
      new LightMasonry(container, {
        defaultColumns: 4,
        responsive: {
          1024: 3,
          768: 2
        }
      });
    });
}
```

### Custom Styling Example

```html
<style>
  .masonry-container {
    --gap: 30px;
    --gap-between-columns: 40px;
    --gap-between-items: 20px;
    padding: 20px;
  }

  .masonry-item {
    background: #f0f0f0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .masonry-item:hover {
    transform: translateY(-5px);
  }
</style>

<div class="masonry-container">
  <div class="masonry-item">
    <img src="image1.jpg" alt="Image 1">
    <h3>Title 1</h3>
    <p>Description...</p>
  </div>
  <!-- More items -->
</div>
```

## 🌐 Browser Support

Light Masonry uses modern CSS Grid and ES6 features. It supports:

- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+
- Opera 44+

For older browsers, consider using polyfills or transpiling with Babel.

## 🏷️ Data Attributes

After initialization, the container element receives data attributes that can be used for styling or debugging:

```html
<div class="masonry-container"
     data-breakpoint="1024"
     data-columns="3">
  <!-- Items -->
</div>
```

- `data-breakpoint`: Current active breakpoint value or 'defaultColumns'
- `data-columns`: Current number of columns

You can use these in CSS:

```css
.masonry-container[data-columns="1"] .masonry-item {
  font-size: 18px;
}

.masonry-container[data-columns="4"] .masonry-item {
  font-size: 14px;
}
```

## ⚡ Performance Tips

1. **Use `resizeDelay`**: Set a reasonable debounce delay (150-250ms) to improve performance on resize
2. **CSS Variables**: Modify gaps using CSS variables instead of recalculating layouts
3. **Image Loading**: Use lazy loading for images in masonry items
4. **Batch Updates**: If adding multiple items, add them all at once before reinitializing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

- GitHub: [@soyleninjs](https://github.com/soyleninjs)
- Twitter: [@soyleninjs](https://twitter.com/soyleninjs)

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/light-masonry)
- 🐙 [GitHub Repository](https://github.com/soyleninjs/light-masonry)
- 🌐 [Live Demo](https://masonry.soylenin.com)
- 💻 [CodePen Examples](https://codepen.io/soyleninjs/pen/GRMdQqp)
- 🐛 [Report Issues](https://github.com/soyleninjs/light-masonry/issues)

## 💖 Support

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔀 Contributing to the code

---

<div align="center">

**Made with ❤️ for the web development community**

</div>
