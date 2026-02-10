# 2.4 Colors and Units

## 1. What is it?
This topic covers how we define **colors** (red, blue, hex codes) and **measurements** (pixels, percentages, rems) in CSS.

## 2. Why it is used?
- **Colors**: Create the visual brand and mood of the site.
- **Units**: Determine the size of text, widths of containers, and spacing between elements. Choosing the right unit is key to Responsive Design.

## 3. Syntax / Structure
```css
div {
    color: #ff0000;      /* Hex Color */
    font-size: 16px;     /* Absolute Unit */
    width: 50%;          /* Relative Unit */
}
```

## 4. Detailed Explanation

### Colors
There are several ways to define a color:
1.  **Keywords**: Predefined names (e.g., `red`, `blue`, `transparent`). Limited palette.
2.  **Hexadecimal (Hex)**: The most common format. Shortcuts for RGB. (e.g., `#FF5733`).
3.  **RGB / RGBA**: Red, Green, Blue values (0-255). 'A' stands for Alpha (opacity/transparency). (e.g., `rgba(255, 0, 0, 0.5)`).
4.  **HSL / HSLA**: Hue, Saturation, Lightness. Easier for humans to tweak (e.g., "Make this red darker").

### Units
Units are split into two categories: **Absolute** and **Relative**.

#### Absolute Units
- **`px` (Pixels)**: Fixed size. One pixel on screen (mostly). Reliable but doesn't scale if user changes browser text settings.

#### Relative Units (RECOMMENDED)
- **`%` (Percentage)**: Relative to the **parent** element's size.
- **`em`**: Relative to the **font-size of the element itself** (or parent, depending on property).
- **`rem` (Root EM)**: Relative to the **font-size of the root** ( `<html>` tag). Default is usually 16px.
- **`vw` / `vh`**: Viewport Width / Viewport Height. `100vh` = 100% of the screen height.

## 5. Examples

### Color Formats
```css
h1 { color: tomato; }             /* Keyword */
h2 { color: #ff6347; }            /* Hex */
p  { color: rgba(0, 0, 0, 0.8); } /* Black with 80% opacity */
```

### HSL implies intuitive changes
```css
/* Base color */
.button { background-color: hsl(200, 100%, 50%); }

/* Darker on hover (just lower lightness) */
.button:hover { background-color: hsl(200, 100%, 40%); }
```

### Units in Action
```css
html { font-size: 16px; }

.container {
    width: 80%;           /* 80% of parent width */
    max-width: 1200px;    /* Never gets wider than 1200px */
}

h1 {
    font-size: 2rem;      /* 2 * 16px = 32px */
}

.hero {
    height: 100vh;        /* Full screen height */
}
```

## 6. Key Points to Remember
- **Use `rem` for font sizes**. This keeps text accessible. If a user sets their browser font size to "Large", `rem` respects that. `px` does not.
- **Use `em` for padding/margins** if you want spacing to grow with the text size.
- **Use `px` for borders** or tiny details where exact alignment is needed.

## 7. Common Mistakes
- **Mistake**: Using `height: 100%` on a generic div and expecting it to fill the screen.
  **Why**: It only works if the **parent** has a height. The body usually collapses to content.
  **Fix**: Use `min-height: 100vh`.

## 8. Pro Tips / Tricks
- **Opacity vs RGBA**:
  - `opacity: 0.5` makes the *entire element* (including text) transparent.
  - `background-color: rgba(0,0,0,0.5)` makes *only the background* transparent. The text remains sharp.
- **Unitless Line Height**: Always use numbers for line-height (e.g., `1.5`), not units (`1.5em` or `24px`). This prevents inheritance issues.

## 9. Related Topics
- [14_CSS_Variables.md](./14_CSS_Variables.md) - Storing colors in variables.
- [12_Responsive_Design.md](./12_Responsive_Design.md) - Using units for mobile layouts.
