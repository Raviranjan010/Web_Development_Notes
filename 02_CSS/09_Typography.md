# 2.9 CSS Typography

## 1. What is it?
CSS Typography controls the appearance of text: fonts, size, weight, line spacing, and alignment.

## 2. Why it is used?
Text makes up 90% of the web. Good typography ensures your content is readable, accessible, and aesthetically pleasing. "Web Design is 95% Typography."

## 3. Syntax / Structure
```css
p {
    font-family: 'Helvetica', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    text-align: left;
}
```

## 4. Detailed Explanation

### 1. `font-family`
Specifies the font typeface.
- Always provide a **stack** of fonts as fallbacks.
- Iterate from specific -> generic.
  `font-family: "Open Sans", Helvetica, Arial, sans-serif;`

### 2. `font-size`
- Use `rem` for accessibility (respects user settings).
- Avoid fixed `px` for main body text.

### 3. `line-height`
Controls the vertical space between lines of text.
- **Golden Rule**: Use unitless values (e.g., `1.5`, not `1.5em`). This is calculated relative to the element's font-size.
- Good body text usually has a line-height of `1.5` to `1.6`.

### 4. `font-weight`
Controls thickness.
- `400` = Normal
- `700` = Bold
- `300` = Light

### 5. `text-align`
- `left` (Standard)
- `center` (Headings)
- `right`
- `justify` (Avoid for web; creates uneven gaps rivers of white space).

## 5. Examples

### Bringing in Google Fonts
First, link it in HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

Then use it in CSS:
```css
body {
    font-family: 'Roboto', sans-serif;
}
```

### Text Decoration & Transformation
```css
a {
    text-decoration: none; /* Removes underline from links */
}

h1 {
    text-transform: uppercase; /* FORCES CAPS */
    letter-spacing: 2px;       /* Space between letters */
}
```

## 6. Key Points to Remember
- **Serif vs. Sans-Serif**:
  - **Serif** (Times New Roman, Georgia): Have little "feet". Traditional, book-like.
  - **Sans-Serif** (Arial, Roboto): No feet. Modern, clean, good for screens.
- **Contrast**: Ensure text color implies readability against the background. Grey text on white background is often hard to read.

## 7. Common Mistakes
- **Mistake**: Importing too many font weights (Light, Regular, Medium, Bold, Extra Bold, Black).
  **Impact**: Slows down website loading speed. Stick to 2 or 3 weights (e.g., 400 and 700).

## 8. Pro Tips / Tricks
- **Fluid Typography**: Using `clamp()` to make fonts scale smoothly between mobile and desktop without media queries.
  ```css
  /* Minimum 1rem, Preferred 5vw, Maximum 2rem */
  h1 { font-size: clamp(1rem, 5vw, 2rem); }
  ```
- **System Font Stack**: Use the user's native OS font for best performance.
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  ```

## 9. Related Topics
- [04_Colors_and_Units.md](./04_Colors_and_Units.md) - Understanding `rem` vs `px`.
- [12_Responsive_Design.md](./12_Responsive_Design.md) - Adjusting text for mobile.
