# 2.19 Bootstrap Grid System — Complete Notes

---

## 1. How the Grid System Works

Bootstrap's grid system uses **containers**, **rows**, and **columns** to lay out and align content. It is built on **CSS Flexbox** and is fully responsive.

### The Golden Rule
> A row is divided into **12 columns**. The column numbers inside one row must add up to **12** (or less).

### Basic Structure (3-Level Hierarchy)

```html
<div class="container">      <!-- Level 1: Container -->
  <div class="row">          <!-- Level 2: Row -->
    <div class="col-6">A</div>  <!-- Level 3: Column (6 + 6 = 12) -->
    <div class="col-6">B</div>
  </div>
</div>
```

> **Note:** Never put columns directly inside a container — always wrap them in a `.row` first. And never put a `.row` directly on the page body — always wrap it in a `.container`.

---

## 2. Container Types

| Class | Behavior | When to Use |
| :--- | :--- | :--- |
| `.container` | Fixed max-width, responsive at each breakpoint | Most content (default choice) |
| `.container-fluid` | Always 100% width of the viewport | Full-width sections like navbars, hero banners |
| `.container-{breakpoint}` | 100% wide until breakpoint, then fixed | e.g. `.container-md` — fluid on mobile, fixed on desktop |

```html
<div class="container">Centered, max-width</div>
<div class="container-fluid">Always full width</div>
<div class="container-md">Full width below md, fixed above</div>
```

---

## 3. Breakpoints Reference

Bootstrap is **mobile-first** — styles apply from the given size **and upward**.

| Breakpoint | Class Infix | Min Width | Container Max Width |
| :--- | :--- | :--- | :--- |
| Extra small | *(none)* | < 576px | 100% |
| Small | `sm` | ≥ 576px | 540px |
| Medium | `md` | ≥ 768px | 720px |
| Large | `lg` | ≥ 992px | 960px |
| Extra large | `xl` | ≥ 1200px | 1140px |
| Extra extra large | `xxl` | ≥ 1400px | 1320px |

---

## 4. Column Class Syntax

The format is: `col-{breakpoint}-{number}`

| Class | Meaning |
| :--- | :--- |
| `col` | Equal width column (all screen sizes) |
| `col-6` | 50% width on **all** screen sizes |
| `col-4` | 33.33% width on **all** screen sizes |
| `col-md-6` | 50% on medium (≥768px) and larger |
| `col-lg-4` | 33.33% on large (≥992px) and larger |
| `col-sm-12` | 100% on small and larger |

> **Rule:** If no breakpoint is specified (e.g. `col-6`), the style applies to **all screen sizes** including mobile.

---

## 5. Column Examples

### Equal Width Columns (Auto)
When no number is given, Bootstrap divides the space equally:

```html
<div class="row">
  <div class="col">One</div>   <!-- Each = 33.33% -->
  <div class="col">Two</div>
  <div class="col">Three</div>
</div>
```

### Set Specific Widths

```html
<div class="row">
  <div class="col-8">Width 8 (66.66%)</div>
  <div class="col-4">Width 4 (33.33%)</div>
</div>

<div class="row">
  <div class="col-4">33%</div>
  <div class="col-4">33%</div>
  <div class="col-4">33%</div>
</div>
```

### Mix Auto and Fixed

```html
<div class="row">
  <div class="col">Auto</div>
  <div class="col-6">Fixed 6</div>   <!-- Takes 50%, rest split equally -->
  <div class="col">Auto</div>
</div>
```

---

## 6. Responsive Grid — The Real Power

Stack columns on mobile, place side-by-side on desktop:

```html
<div class="row">
  <!-- Full width on mobile, half width on md+ -->
  <div class="col-12 col-md-6">Left Panel</div>
  <div class="col-12 col-md-6">Right Panel</div>
</div>
```

> **How to read it:** `col-12 col-md-6` means:
> - On screens **smaller than 768px**: full width (12/12)
> - On screens **768px and above**: half width (6/12)

### Common Responsive Patterns

```html
<!-- 1 column mobile → 2 columns tablet → 4 columns desktop -->
<div class="row">
  <div class="col-12 col-sm-6 col-lg-3">Card 1</div>
  <div class="col-12 col-sm-6 col-lg-3">Card 2</div>
  <div class="col-12 col-sm-6 col-lg-3">Card 3</div>
  <div class="col-12 col-sm-6 col-lg-3">Card 4</div>
</div>

<!-- Sidebar layout: full width mobile, sidebar+content on desktop -->
<div class="row">
  <div class="col-12 col-md-4">Sidebar</div>
  <div class="col-12 col-md-8">Main Content</div>
</div>

<!-- 3-column equal layout on medium+ -->
<div class="row">
  <div class="col-md-4">Column 1</div>
  <div class="col-md-4">Column 2</div>
  <div class="col-md-4">Column 3</div>
</div>
```

---

## 7. Offset Columns

Offsets push a column to the right by adding empty space before it.

Format: `offset-{breakpoint}-{number}`

```html
<!-- Center a 4-wide column using offsets -->
<div class="row">
  <div class="col-md-4 offset-md-4">Centered Block</div>
  <!-- 4 empty + 4 content + 4 empty (implied) = 12 total -->
</div>

<!-- Push a column 2 spaces to the right -->
<div class="row">
  <div class="col-md-3">Left</div>
  <div class="col-md-3 offset-md-6">Far Right</div>
</div>

<!-- Offset only on certain breakpoints -->
<div class="row">
  <div class="col-sm-5 col-md-6">First</div>
  <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">Second</div>
</div>
```

> **Note:** `offset-md-0` resets a previously set offset at the md breakpoint.

---

## 8. Nested Grids

You can place a new `.row` inside any column to create nested layouts. The nested row also has 12 columns, relative to its parent column's width.

```html
<div class="row">
  <div class="col-sm-9">
    Outer: 9 columns wide
    <div class="row">    <!-- Nested row — 12 cols within the 9-wide parent -->
      <div class="col-8 col-sm-6">Nested A</div>
      <div class="col-4 col-sm-6">Nested B</div>
    </div>
  </div>
  <div class="col-sm-3">Sidebar</div>
</div>
```

> **Important:** The inner row's 12 columns are relative to the **parent column's width**, not the full page width.

---

## 9. Column Alignment (Flexbox in the Grid)

Since rows use Flexbox, you can align columns with built-in utility classes.

### Vertical Alignment (align-items)

```html
<div class="row align-items-start">...</div>    <!-- Top -->
<div class="row align-items-center">...</div>   <!-- Middle -->
<div class="row align-items-end">...</div>      <!-- Bottom -->

<!-- Align individual column -->
<div class="row" style="height: 200px;">
  <div class="col align-self-start">Top</div>
  <div class="col align-self-center">Middle</div>
  <div class="col align-self-end">Bottom</div>
</div>
```

### Horizontal Alignment (justify-content)

```html
<div class="row justify-content-start">...</div>
<div class="row justify-content-center">...</div>
<div class="row justify-content-end">...</div>
<div class="row justify-content-between">...</div>
<div class="row justify-content-around">...</div>
<div class="row justify-content-evenly">...</div>
```

---

## 10. No Gutters (Removing Column Gaps)

By default, columns have horizontal padding (gutters). Remove them with `.g-0` or control gutter size:

```html
<div class="row g-0">    <!-- No gutters at all -->
  <div class="col-6">A</div>
  <div class="col-6">B</div>
</div>

<!-- Gutter sizes: g-0 to g-5 -->
<div class="row g-2">...</div>   <!-- Small gutter -->
<div class="row g-4">...</div>   <!-- Large gutter -->

<!-- Separate horizontal and vertical gutters -->
<div class="row gx-5 gy-2">...</div>   <!-- gx = horizontal, gy = vertical -->
```

---

## 11. Column Ordering

Change the visual order of columns without changing the HTML order:

```html
<div class="row">
  <div class="col order-3">First in HTML, shown third</div>
  <div class="col order-1">Second in HTML, shown first</div>
  <div class="col order-2">Third in HTML, shown second</div>
</div>

<!-- Responsive ordering -->
<div class="row">
  <div class="col-md-4 order-md-last">Shown last on desktop</div>
  <div class="col-md-8 order-md-first">Shown first on desktop</div>
</div>
```

---

## 12. Full Page Layout Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <title>Grid Layout</title>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">MySite</a>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="container mt-4">

    <!-- Hero Row -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="p-5 bg-light rounded">
          <h1>Welcome!</h1>
        </div>
      </div>
    </div>

    <!-- Cards Row: 1 col mobile, 2 col tablet, 4 col desktop -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body">Card 1</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body">Card 2</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body">Card 3</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body">Card 4</div>
        </div>
      </div>
    </div>

    <!-- Sidebar Layout -->
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="card p-3">Sidebar</div>
      </div>
      <div class="col-12 col-md-8">
        <div class="card p-3">Main Content Area</div>
      </div>
    </div>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 13. Quick Reference Cheat Sheet

| Need | Class(es) to Use |
| :--- | :--- |
| 2 equal columns | `col col` |
| 3 equal columns | `col col col` |
| 4 equal columns | `col col col col` |
| Left 30%, Right 70% | `col-4` + `col-8` |
| Stack on mobile, 50/50 on tablet | `col-12 col-md-6` |
| Stack on mobile, 3-wide on desktop | `col-12 col-lg-4` |
| Center a block | `col-md-6 offset-md-3` |
| Remove gaps | `row g-0` |
| Sidebar + content | `col-md-3` + `col-md-9` |
| Vertically center columns | `row align-items-center` |

---

> **Common Mistakes to Avoid:**
> 1. Columns not adding up to 12 (causes unwanted wrapping)
> 2. Putting columns directly in `.container` without a `.row`
> 3. Forgetting the `viewport` meta tag (breaks mobile layout)
> 4. Using `col-6` when you wanted `col-md-6` (affects mobile too)