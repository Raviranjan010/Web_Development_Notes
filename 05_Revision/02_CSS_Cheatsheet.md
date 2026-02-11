# 02 CSS Cheatsheet

Quick reference for CSS selectors, properties, layout systems (Flexbox/Grid), and best practices.

## 🎯 Section 1: Selectors

| Selector | Example | Target |
| :--- | :--- | :--- |
| **Element** | `p {}` | All `<p>` tags |
| **Class** | `.btn {}` | `class="btn"` |
| **ID** | `#header {}` | `id="header"` (Unique) |
| **Universal** | `* {}` | Everything |
| **Descendant** | `div p {}` | `<p>` inside `<div>` |
| **Direct Child** | `div > p {}` | `<p>` directly inside `<div>` |
| **Pseudo-class** | `a:hover {}` | Mouse over link |

---

## 📦 Section 2: Box Model

Every element is a box.
1.  **Content**: The actual text/image.
2.  **Padding**: Space **inside** the border (clears area around content).
3.  **Border**: A line around the padding.
4.  **Margin**: Space **outside** the border (pushes other elements away).

**Best Practice:**
Always use this reset to make sizing logical (width includes padding/border):
```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

---

## 🎨 Section 3: Flexbox (1D Layout)

For aligning items in a row OR column.

**Parent Container:**
```css
.container {
    display: flex;
    justify-content: center; /* Horizontal alignment: flex-start | center | flex-end | space-between */
    align-items: center;     /* Vertical alignment: flex-start | center | flex-end | stretch */
    flex-direction: row;     /* row (default) | column */
    flex-wrap: wrap;         /* nowrap (default) | wrap */
}
```

---

## ▦ Section 4: CSS Grid (2D Layout)

For aligning items in rows AND columns simultaneously.

**Parent Container:**
```css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 3 Equal columns */
    /* OR repeat(3, 1fr) */
    gap: 20px; /* Space between cells */
}
```

---

## 📍 Section 5: Positioning

| Value | Behavior |
| :--- | :--- |
| `static` | Default behavior. Top/Left/Right/Bottom have no effect. |
| `relative` | Normal position, but can be nudged. Acts as reference for absolute children. |
| `absolute` | Removed from flow. Positioned relative to nearest **positioned** ancestor. |
| `fixed` | Stuck to the browser window (stays on scroll). |
| `sticky` | Scrolls until it hits an offset, then sticks. |

---

## 📏 Section 6: Units

*   **px**: Pixels (Fixed, absolute). Good for borders (`1px`).
*   **%**: Percentage relative to parent.
*   **rem**: Relative to **Root** HTML font-size (usually 16px). **Best for font-sizes & spacing** (Accessibility).
*   **vh / vw**: Viewport Height/Width (100vh = full screen height).

---

## 🌈 Section 7: Colors

*   **Hex**: `#ff0000` (Red)
*   **RGB**: `rgb(255, 0, 0)`
*   **RGBA**: `rgba(255, 0, 0, 0.5)` (50% Transparent)
*   **HSL**: `hsl(0, 100%, 50%)` (Hue, Saturation, Lightness - easiest to adjust).
