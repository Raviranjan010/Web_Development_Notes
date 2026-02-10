# 2.1 Introduction to CSS

## 1. What is it?
**CSS** stands for **Cascading Style Sheets**. While HTML provides the *structure* (the skeleton), CSS provides the *style* (the skin, clothes, and makeup).

## 2. Why it is used?
- **Presentation**: Controls colors, fonts, layouts, and animations.
- **Responsiveness**: Makes websites look good on phones, tablets, and desktops.
- **Maintainability**: Separates content (HTML) from design (CSS), making it easier to change the look of an entire site by editing just one file.

## 3. Syntax / Structure
CSS is a rule-based language. You define rules specifying groups of styles that should be applied to particular elements or groups of elements.

```css
selector {
    property: value;
    property: value;
}
```

## 4. Detailed Explanation
- **Selector**: Finds the HTML element(s) you want to style (e.g., `h1`).
- **Declaration Block**: Contains one or more declarations separated by semicolons `;`.
- **Property**: The style attribute you want to change (e.g., `color`).
- **Value**: The setting for that property (e.g., `blue`).

## 5. Examples

### Basic Example
Making all paragraphs red and large.
```css
/* This is a CSS comment */
p {
    color: red;
    font-size: 20px;
}
```

### Multiple Declarations
```css
h1 {
    color: #333;
    text-align: center;
    text-transform: uppercase;
}
```

## 6. Key Points to Remember
- CSS rules "cascade". If two rules conflict, the browser decides which one wins based on specific rules (Source Order, Specificity, Importance).
- CSS is forgiving. If you make a typo in a property name (e.g., `colour: red`), the browser just ignores it and moves on.

## 7. Common Mistakes
- **Mistake**: Forgetting the semicolon `;` at the end of a line.
  **Effect**: The *next* line of code will usually break.
- **Mistake**: Using HTML syntax in CSS (e.g., `font-color="red"`).
  **Fix**: Use standard CSS syntax `color: red;`.

## 8. Pro Tips / Tricks
- **DevTools**: Use "Inspect Element" to see exactly which CSS rules are applying to an element and debug why something isn't looking right.
- **Normalize/Reset**: Different browsers have different default styles. Many developers use a "Reset CSS" or "Normalize.css" file to make everything look consistent to start with.

## 9. Related Topics
- [02_CSS_Syntax_and_Types.md](./02_CSS_Syntax_and_Types.md) - Where to write your CSS.
- [../01_HTML/01_Introduction_to_HTML.md](../01_HTML/01_Introduction_to_HTML.md) - The structure you are styling.
