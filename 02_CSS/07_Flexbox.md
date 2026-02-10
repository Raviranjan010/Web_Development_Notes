# 2.7 CSS Flexbox

## 1. What is it?
**Flexbox** (Flexible Box Layout) is a one-dimensional layout module. It is designed to lay out items in rows OR columns.

## 2. Why it is used?
Before Flexbox, centering content or distributing space evenly between items was a nightmare (using `float`, `inline-block`, or tables). Flexbox makes alignment and spacing trivial.

## 3. Syntax / Structure
You activate Flexbox on a **container** (parent), and it automatically affects its **items** (direct children).
```css
.container {
    display: flex; /* Magic happens here */
}
```

## 4. Detailed Explanation

### Parent Properties (The Container)
1.  **`flex-direction`**: Row (default) or Column?
    - `row` | `column` | `row-reverse` | `column-reverse`
2.  **`justify-content`**: Alignment along the **Main Axis** (Horizontal for row).
    - `flex-start` (Left) | `center` | `flex-end` (Right) | `space-between` | `space-around`
3.  **`align-items`**: Alignment along the **Cross Axis** (Vertical for row).
    - `stretch` (Default) | `flex-start` (Top) | `center` | `flex-end` (Bottom) | `baseline`
4.  **`flex-wrap`**: Should items wrap to the next line if they run out of space?
    - `nowrap` (Default) | `wrap`

### Child Properties (The Items)
1.  **`flex-grow`**: Should this item grow to fill extra space? (Default 0).
2.  **`flex-shrink`**: Should this item shrink if space is tight? (Default 1).
3.  **`flex-basis`**: What is the ideal starting size? (like width).

## 5. Examples

### The Holy Grail: Perfect Centering
```css
.container {
    display: flex;
    justify-content: center; /* Horizontally center */
    align-items: center;     /* Vertically center */
    height: 100vh;           /* Full screen height */
}
```

### Navigation Bar
Items spread out, with Logo on left and Links on right? Easy.
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}
```

### Responsive Column Layout
```css
.card-container {
    display: flex;
    flex-wrap: wrap; /* Allows items to drop to next line */
    gap: 20px;       /* Space between items */
}

.card {
    flex: 1 1 300px; /* Grow: 1, Shrink: 1, Basis: 300px */
}
```
*This says: "I want cards to be at least 300px wide, but grow if there's room."*

## 6. Key Points to Remember
- Flexbox is **1D** (One-Dimensional). It handles rows OR columns, but not complex 2D grids (use CSS Grid for that).
- `justify-content` aligns along the direction you set. If `flex-direction: column`, standard justification works vertically!
- `gap` property (modern CSS) works in Flexbox to create space between items without using margins.

## 7. Common Mistakes
- **Mistake**: Forgetting `display: flex` on the parent.
- **Mistake**: Trying to use `vertical-align` inside a flex container. It has no effect; use `align-items` instead.

## 8. Pro Tips / Tricks
- **`margin: auto` magic**: Inside a flex container, setting `margin-left: auto` on an item pushes it all the way to the right. This is great for navbars (e.g., pushing the "Login" button to the far right).

## 9. Related Topics
- [08_Grid.md](./08_Grid.md) - For 2D layouts.
- [../01_HTML/09_Semantic_HTML.md](../01_HTML/09_Semantic_HTML.md) - Structure your flex containers semantically.
