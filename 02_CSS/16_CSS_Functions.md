# 2.16 Important CSS Functions

CSS functions allow you to dynamically adjust values like colors, sizes, and positions.

## Essential Functions

### 1. `url()`
Links external resources (images, fonts).
```css
background: url("image.jpg");
```

### 2. `calc()`
Performs calculations. Great for mixing units (`%` and `px`).
```css
width: calc(100% - 60px);
```

### 3. `var()`
Inserts the value of a CSS variable.
```css
color: var(--primary-color);
```

### 4. `rgb()` / `rgba()`
Defines colors using Red, Green, Blue (and Alpha/Transparency).
```css
background-color: rgba(0, 0, 0, 0.5); /* 50% transparent black */
```

### 5. `hsl()`
Defines colors using Hue, Saturation, Lightness.
```css
color: hsl(120, 100%, 50%); /* Green */
```

### 6. `blur()` / `brightness()` / `opacity()`
Used with the `filter` property to adjust visuals.
```css
img {
    filter: blur(5px) brightness(150%) opacity(0.8);
}
```

### 7. `:not()`
A **pseudo-class** function that selects everything *except* the matching element.
```css
/* Select all paragraphs except those with class .special */
p:not(.special) {
    color: grey;
}
```

### 8. `:nth-child()`
Selects elements based on their index.
```css
li:nth-child(2) { color: red; } /* 2nd item */
li:nth-child(odd) { color: blue; } /* 1, 3, 5... */
```
