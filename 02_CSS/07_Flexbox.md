# 2.7 CSS Flexbox

## 1. What is Flexbox?
The **Flexible Box Layout (Flexbox)** is a one-dimensional layout system. It handles space distribution and item alignment in a Row or Column.

### Components
1.  **Flex Container**: The parent wrapper (`display: flex`).
2.  **Flex Items**: The direct children inside the container.

### Axes
- **Main Axis**: The primary direction (Row by default).
- **Cross Axis**: Perpendicular to the main axis (Column by default).

---

## 2. Flex Attributes

### 1. `flex-direction`
Controls the Main Axis.
- `row`: Default. Left to Right.
- `row-reverse`: Right to Left.
- `column`: Top to Bottom.
- `column-reverse`: Bottom to Top.

### 2. `justify-content`
Aligns items along the **Main Axis**.
- `flex-start`: Start of axis.
- `center`: Center.
- `space-between`: Space between items.
- `space-around`: Space around items.

### 3. `align-items`
Aligns items along the **Cross Axis**.
- `stretch`: Default. Stretches to fill height.
- `center`: Center vertically.
- `flex-start` / `flex-end`.

### 4. `flex-wrap`
- `nowrap`: Default. All items in one line.
- `wrap`: Items wrap to next line if needed.

---

## 3. Examples

### 1. Simple Navigation Bar
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 10px;
}
.navbar a {
    color: white;
    text-decoration: none;
}
```

### 2. Responsive Flex Layout
Automatically switches from Row to Column on small screens.

```css
.container {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping */
}

.item {
    flex: 1 1 200px; /* Grow, Shrink, Basis */
    margin: 10px;
}

@media (max-width: 600px) {
    .container {
        flex-direction: column; /* Stack vertically on mobile */
    }
}
```
