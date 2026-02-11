# 2.8 CSS Grid

## 1. What is Grid?
**CSS Grid** is a powerul **two-dimensional** layout system. It handles both **Rows** and **Columns** simultaneously.
- Best for: Full page layouts, complex galleries.

---

## 2. Grid Container Properties
Apply these to the parent.

```css
.container {
    display: grid;
    /* Define Columns & Rows */
    grid-template-columns: auto auto auto; /* 3 Columns */
    grid-template-rows: 100px 200px;       /* 2 Rows */
    
    /* Gaps (Gutters) */
    gap: 10px; /* Space between rows and cols */
}
```

### Key Properties
| Property | Description |
| :--- | :--- |
| `grid-template-columns` | Defines width/number of columns. Use `px`, `%`, `fr`. |
| `grid-template-rows` | Defines height/number of rows. |
| `gap` / `row-gap` / `column-gap` | Spacing between cells. |
| `grid-template-areas` | Named grid areas for complex layouts. |

---

## 3. Grid Item Properties
Apply these to the children.

- `grid-column: start / end`: Span multiple columns.
- `grid-row: start / end`: Span multiple rows.

```css
.item1 {
    grid-column: 1 / 3; /* Spans from line 1 to 3 (2 columns) */
}
```

---

## 4. Examples

### 1. Three-Column Layout (Responsive)
Using `fr` (fraction) units and `repeat()`.

```css
.grid-container {
    display: grid;
    /* 3 Equal Columns */
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}
```

### 2. Unequal Columns
```css
.grid-container {
    display: grid;
    /* 1st col is 1 part, 2nd col is 2 parts */
    grid-template-columns: 1fr 2fr;
    gap: 10px;
}
```

### 3. Responsive Auto-Flow
Best modern layout pattern. No media queries needed!
```css
.grid-container {
    display: grid;
    /* Create as many columns as fit, min 250px */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
```

---

## 5. Flexbox vs Grid
- **Flexbox**: One dimension (Row OR Column). Best for alignments and distributing space in a single line.
- **Grid**: Two dimensions. Best for overall page layout structure.
