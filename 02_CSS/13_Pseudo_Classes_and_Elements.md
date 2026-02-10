# 2.13 Pseudo-classes and Pseudo-elements

## 1. What is it?
- **Pseudo-classes (`:`)**: Define a special *state* of an element (e.g., when a user hovers over it).
- **Pseudo-elements (`::`)**: Style specific *parts* of an element (e.g., the first letter, or creating a fake element before the content).

## 2. Why it is used?
They allow you to style things based on user interaction or position, and create cosmetic content without cluttering your HTML.

## 3. Syntax / Structure
```css
/* Pseudo-class (Single Colon) */
selector:state { property: value; }

/* Pseudo-element (Double Colon) */
selector::part { property: value; }
```

## 4. Detailed Explanation

### Common Pseudo-classes
1.  **`:hover`**: When mouse is over element.
2.  **`:active`**: When clicked/pressed.
3.  **`:focus`**: When selected via keyboard (tab) or click (input).
4.  **`:nth-child(n)`**: Selects the *n-th* child of a parent.
5.  **`:not(selector)`**: Selects everything *except* the selector.

### Common Pseudo-elements
1.  **`::before`**: Inserts content *before* the element's content.
2.  **`::after`**: Inserts content *after* the element's content.
3.  **`::first-letter`**: Styles the first letter.
4.  **`::placeholder`**: Styles input placeholder text.

## 5. Examples

### Interaction States for Links/Buttons
```css
/* Order matters: LVHA (Link, Visited, Hover, Active) */
a:link    { color: blue; }
a:visited { color: purple; }
a:hover   { color: red; text-decoration: underline; }
a:active  { color: darkred; }
```

### Zebra Striping a Table
```css
/* Selects every Even row (2, 4, 6...) */
tr:nth-child(even) {
    background-color: #f2f2f2;
}
```

### The `::before` and `::after` Hack
You can create visual shapes without adding `div`s to HTML.
**Important**: You MUST define the `content` property, even if empty.

```css
.quote::before {
    content: '"'; /* Adds a quote mark */
    font-size: 50px;
    color: gray;
}

.clearfix::after {
    content: ""; /* Empty content */
    display: block;
    clear: both; /* Old school float clearing */
}
```

### Excluding Elements
```css
/* Add margin to all buttons EXCEPT the last one */
.btn:not(:last-child) {
    margin-right: 10px;
}
```

## 6. Key Points to Remember
- **Single vs Double Colon**:
    - CSS2 used single colon for everything (`:after`).
    - CSS3 introduced double colon (`::after`) to distinguish elements from classes.
    - Browsers support both for legacy reasons, but **use `::` for elements** (modern standard).
- `:focus` is critical for accessibility. Never remove the focus outline `outline: none;` without replacing it with a custom style.

## 7. Common Mistakes
- **Mistake**: Forgetting `content: ""` on pseudo-elements.
  **Result**: The element won't appear at all.
- **Mistake**: `nth-child(1)` vs `first-child`.
  They act similarly, but `nth-child` is more powerful (`odd`, `even`, formulas like `3n+1`).

## 8. Pro Tips / Tricks
- **Custom Bullet Points**: Hide the default list style and use `::before` to create custom shapes or emojis.
  ```css
  li { list-style: none; }
  li::before { content: "✅ "; }
  ```
- **Tooltip**: You can recreate tooltips using `data-*` attributes and `::after`.
  ```css
  .tooltip:hover::after {
      content: attr(data-text); /* Grabs text from HTML attribute! */
      /* positioning styles... */
  }
  ```

## 9. Related Topics
- [03_Selectors.md](./03_Selectors.md) - Basic selection.
- [../01_HTML/11_HTML_Attributes.md](../01_HTML/11_HTML_Attributes.md) - Using attributes with pseudo-elements.
