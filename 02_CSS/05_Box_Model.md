# 2.5 CSS Box Model

## 1. What is the Box Model?
Every element in CSS is a rectangular box. The Box Model describes how the size of that box is calculated.

### Components (Inside Out)
1.  **Content**: The actual text or image.
2.  **Padding**: Transparent space between content and border.
3.  **Border**: A line wrapping the padding and content.
4.  **Margin**: Transparent space outside the border (separates elements).

---

## 2. Box Sizing (`box-sizing`)
This is crucial for layout control.

### 1. `content-box` (Default)
Width is applied *only* to the content. Padding and Border are *added* to the width.
- **Problem**: If width is 100px and padding is 20px, total width becomes 140px.

### 2. `border-box` (Recommended)
Width includes Content + Padding + Border.
- **Benefit**: If width is 100px, it stays 100px no matter how much padding you add.

```css
/* Best Practice: Apply to everything */
* {
    box-sizing: border-box;
}
```

---

## 3. CSS Margins
Margins create space *outside* elements.

### Syntax
- `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- **Shorthand**: `margin: 10px 20px 10px 20px;` (Top, Right, Bottom, Left - Clockwise).

### Common Values
1.  **Pixels (`px`)**: Fixed space.
2.  **Percentage (`%`)**: Relative to parent width.
3.  **Auto (`auto`)**: Centers the element horizontally (used with `width`).
    ```css
    div {
        width: 50%;
        margin: auto; /* Centered */
    }
    ```
4.  **Inherit**: Takes the margin from the parent.

### Negative Margins
You can use negative values (e.g., `margin-top: -20px`) to pull elements closer or overlap them.
