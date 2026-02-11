# 2.19 Bootstrap Grid System

## 1. How it Works
Bootstrap's grid system uses a series of containers, rows, and columns to layout and align content. It's built with **flexbox** and is fully responsive.

**The Golden Rule**: The grid is divided into **12 columns**. Your columns inside a row must add up to 12 (or less).

Structure:
```html
<div class="container">
  <div class="row">
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>
```

## 2. Grid Classes

The syntax is `col-{breakpoint}-{number}`.
-   `col-6`: Spans 6 columns (50% width) on all screens.
-   `col-md-4`: Spans 4 columns (33% width) on Medium screens and larger.
-   `col-lg-3`: Spans 3 columns (25% width) on Large screens and larger.

### Examples

#### Equal Width Columns
Bootstrap automatically handles the width if you don't specify numbers.
```html
<div class="row">
  <div class="col">1 of 2</div>
  <div class="col">2 of 2</div>
</div>
```

#### Setting Column Widths
```html
<div class="row">
  <div class="col-8">Width 8 (66%)</div>
  <div class="col-4">Width 4 (33%)</div>
</div>
```

#### Responsive Grid (The Power of Bootstrap)
You can stack columns on mobile and place them side-by-side on desktop.

```html
<div class="row">
  <!-- On mobile, these will stack (12 width). On md screens, they become 6 width each. -->
  <div class="col-12 col-md-6">Column A</div>
  <div class="col-12 col-md-6">Column B</div>
</div>
```

## 3. Nesting
To nest your content with the default grid, add a new `.row` and set of `.col-*` columns within an existing `.col-*` column.

```html
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <div class="col-8 col-sm-6">Level 2: .col-8 .col-sm-6</div>
      <div class="col-4 col-sm-6">Level 2: .col-4 .col-sm-6</div>
    </div>
  </div>
</div>
```

## 4. Offset Columns
Move columns to the right using `.offset-*` classes. These classes increase the left margin of a column by `*` columns.

```html
<!-- .col-md-4 moved over by 4 columns -->
<div class="row">
  <div class="col-md-4 offset-md-4">.col-md-4 .offset-md-4</div>
</div>
```
