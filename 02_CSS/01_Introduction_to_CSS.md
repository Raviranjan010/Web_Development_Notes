# 2.1 Introduction to CSS

## 1. What is CSS?
**CSS (Cascading Style Sheets)** is a language designed to simplify the process of making web pages presentable.
- It allows you to apply styles to HTML documents by prescribing colors, fonts, spacing, and positioning.
- It separates content (HTML) from styling (CSS).
- CSS styles are applied to HTML elements using **selectors**.

## 2. Why is CSS used? (Advantages)
1.  **Simplifies Design**: Makes web design and maintenance easier.
2.  **Better Performance**: CSS files are cached by browsers, speeding up page loads.
3.  **Responsive Design**: Enables websites to adapt to phones, tablets, and desktops.
4.  **Saves Time**: Write CSS once and reuse it across multiple HTML pages.
5.  **Easy Maintenance**: Change the style globally (e.g., brand color) with a single modification.
6.  **Superior Styles**: Offers far more control than old HTML presentation attributes.
7.  **Search Engine Friendly**: Clean coding technique that improves readability for search engines.
8.  **Offline Browsing**: CSS can store web applications locally using an offline cache.

## 3. How CSS Works (The Deep Dive)
Have you ever wondered what happens when you load a page?

1.  **Load HTML**: The browser fetches the HTML file from the server.
2.  **Parse HTML**: The browser reads the HTML and breaks it into tokens.
3.  **Build DOM (Document Object Model)**: It creates a tree structure representing all HTML elements.
    - Represents all page elements and hierarchy.
4.  **Load CSS**: The browser finds `<link>` or `<style>` tags and fetches the CSS.
    - *Note*: External CSS is **render-blocking** (the page waits until it is loaded).
5.  **Parse CSS**: It builds the **CSS Object Model (CSSOM)**.
    - Browser understands all CSS rules and selectors.
6.  **Compute Styles (Match + Cascade)**: The browser matches CSS rules to DOM nodes.
    - It calculates final computed styles based on Cascading rules.
7.  **Build Render Tree**: It combines DOM + CSSOM to decide what is *actually* visible.
    - Skips invisible elements (e.g., `display: none`).
8.  **Layout (Reflow)**: It calculates the exact position and size of each element.
9.  **Paint**: It draws colors, borders, text, and images via pixels on the screen.
10. **Display (Compositing)**: The painted layers are merged and shown to you.

---

## 4. Syntax / Structure
CSS is a rule-based language.

```css
selector {
    property: value;
    property: value;
}
```

### Example
```css
/* Selector */
h1 {
    /* Declaration */
    color: blue;        /* Property: Value */
    font-size: 24px;
}
```

## 5. Key Concepts
- **Cascading**: Resolves conflicts. If you have two rules for `h1`, the "winner" is decided by Importance, Specificity, and Source Order.
- **Selector**: The pattern used to select the element (e.g., `p`, `.class`, `#id`).
- **Declaration Block**: The `{ ... }` block containing properties.

## 6. Pro Tips
- **Inspect Element**: The #1 tool for learning CSS. Right-click any site -> Inspect to see their CSS.
- **Normalize.css**: Use a standard "reset" file to ensure your site looks the same on Chrome, Firefox, and Safari.
