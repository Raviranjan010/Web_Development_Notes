# 2.9 CSS Typography (Fonts)

## 1. CSS Fonts
CSS fonts are used to style and enhance the appearance of text.

### Key Properties
1.  **`font-family`**: Defines the font type.
    - Always provide a fallback (e.g., `"Arial", sans-serif`).
2.  **`font-size`**: Controls text size.
    - **px**: Fixed size (e.g., `32px`).
    - **em**: Relative to parent (e.g., `1.2em`).
3.  **`font-weight`**: Thickness of the text.
    - `normal`, `bold`, or numeric (`400`, `700`).
4.  **`font-style`**: `normal` or `italic`.
5.  **`line-height`**: Spacing between lines (e.g., `1.5` is standard).
6.  **`letter-spacing`**: Space between characters.
7.  **`text-transform`**: `uppercase`, `lowercase`, or `capitalize`.

---

## 2. Web Safe vs Custom Fonts

### Web Safe Fonts
Pre-installed on most computers. Safe to use without linking external files.
- Arial, Verdana, Helvetica (Sans-serif)
- Times New Roman, Georgia (Serif)
- Courier New (Monospace)

### Custom Fonts
Loaded from an external server (like Google Fonts).
```html
<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</head>
<style>
    body { font-family: 'Roboto', sans-serif; }
</style>
```

---

## 3. Responsive Typography
To make text adapt to screen sizes:

### 1. Relative Units
Use `em`, `rem`, or `%` instead of `px`.

### 2. Viewport Units
`vw` scales based on the browser width.
```css
h1 {
    font-size: 5vw; /* 5% of viewport width */
}
```

### 3. Media Queries
Change size on smaller screens.
```css
@media (max-width: 600px) {
    body {
        font-size: 14px;
    }
}
```
