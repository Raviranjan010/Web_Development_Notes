# 2.2 CSS Syntax and Types

## 1. What is it?
This topic covers **where** you can write CSS and **how** the browser decides which styles to apply.

## 2. Why it is used?
Understanding the three implementation methods helps you organize your project correctly.

## 3. Syntax / Structure
There are three ways to insert CSS:
1.  **Inline CSS**
2.  **Internal CSS**
3.  **External CSS**

## 4. Detailed Explanation

### 1. Inline CSS
Styles are applied directly to the HTML element using the `style` attribute.
- **Pros**: Quick for testing.
- **Cons**: Nightmare to maintain. **Avoid using this.**

### 2. Internal CSS
Styles are written inside specific `<style>` tags within the HTML `<head>`.
- **Pros**: Good for single-page websites.
- **Cons**: Cannot reuse styles across multiple pages.

### 3. External CSS
Styles are written in a separate `.css` file and linked in the HTML `<head>`.
- **Pros**: The Gold Standard. One file controls the look of the entire website. Caches well in browsers.
- **Cons**: Requires an extra HTTP request (negligible today).

## 5. Examples

### Inline CSS (Avoid)
```html
<h1 style="color: blue; text-align: center;">Hello</h1>
```

### Internal CSS
```html
<head>
    <style>
        body {
            background-color: linen;
        }
        h1 {
            color: maroon;
        }
    </style>
</head>
```

### External CSS (Recommended)
**index.html**:
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
**styles.css**:
```css
body {
    background-color: linen;
}
h1 {
    color: maroon;
}
```

### The Cascade (Brief Intro)
If you have the same rule in all three places, which one wins?
**Priority Order (Highest to Lowest):**
1.  **Inline Styles**
2.  **External and Internal Styles** (whichever is last in the `<head>`)
3.  **Browser Defaults**

## 6. Key Points to Remember
- Always use **External CSS** for real projects.
- `<link>` goes inside `<head>`.
- Inline styles have the highest "Specificty" (power) unless `!important` is used.

## 7. Common Mistakes
- **Mistake**: Writing CSS in the `<body>` tag using `<style>`. It works, but it's invalid HTML. Keep it in the `<head>`.
- **Mistake**: Forgetting to link the CSS file.

## 8. Pro Tips / Tricks
- **Linking Order**: If you link two CSS files, the second one can override the first one. This is how libraries like Bootstrap work—you link Bootstrap first, then your custom CSS to override it.

## 9. Related Topics
- [03_Selectors.md](./03_Selectors.md) - How to target elements.
- [../01_HTML/02_HTML_Document_Structure.md](../01_HTML/02_HTML_Document_Structure.md) - Where the `<link>` tag lives.
