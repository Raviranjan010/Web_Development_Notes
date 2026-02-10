# 2.14 CSS Variables (Custom Properties)

## 1. What is it?
CSS Variables allow you to store values (like colors, fonts, or sizes) in one place and reuse them throughout your stylesheet.

## 2. Why it is used?
- **Maintainability**: Change a color in **one** place, and it updates everywhere.
- **Theming**: Essential for creating Dark Mode / Light Mode switches.
- **Readability**: `color: var(--primary-color)` is easier to understand than `color: #3498db`.

## 3. Syntax / Structure
Variables are declared using double dashes `--`. They are accessed using the `var()` function.

```css
/* Declaration */
:root {
    --main-color: #3498db;
}

/* Usage */
.button {
    background-color: var(--main-color);
}
```

## 4. Detailed Explanation

### Scope
- **Global**: Declared in `:root` (matches `<html>`). Available everywhere.
- **Local**: Declared inside a specific selector (e.g., `.card`). Only available inside that element and its children.

### Fallbacks
You can provide a backup value if the variable isn't found.
`color: var(--missing-var, red);` (Uses red if variable doesn't exist).

## 5. Examples

### Basic Theme Setup
```css
:root {
    --primary: #007bff;
    --secondary: #6c757d;
    --font-stack: 'Helvetica Neue', sans-serif;
    --spacing-md: 16px;
}

body {
    font-family: var(--font-stack);
    padding: var(--spacing-md);
}

h1 {
    color: var(--primary);
}
```

### Implementing Dark Mode
This is how modern sites do it.
```css
:root {
    --bg-color: #ffffff;
    --text-color: #000000;
}

/* When the body has class="dark" */
body.dark {
    --bg-color: #121212;
    --text-color: #ffffff;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s; /* Smooth switch */
}
```
*You just need a tiny bit of JS to toggle the "dark" class on the body.*

### Responsive Variables
You can change variables inside media queries!
```css
:root {
    --font-size-base: 16px;
}

@media (min-width: 1024px) {
    :root {
        --font-size-base: 18px; /* Everything scales up automatically */
    }
}
```

## 6. Key Points to Remember
- Variable names are **case-sensitive**. `--Main-Color` and `--main-color` are different.
- You can store **any** value: colors, pixels, strings, shadows, even complete gradients.
- They cascade (children inherit variables from parents).

## 7. Common Mistakes
- **Mistake**: Forgetting the `var()` wrapper.
  `color: --primary;` ❌ -> `color: var(--primary);` ✅
- **Mistake**: Trying to use variables for property names.
  `var(--side): 10px;` ❌ (You can't replace `margin-left` with a variable).

## 8. Pro Tips / Tricks
- **Calculations**: Combine variables with `calc()`.
  ```css
  --base-size: 10px;
  padding: calc(var(--base-size) * 2); /* 20px */
  ```
- **JS Interaction**: JavaScript can read and write CSS variables easily.
  ```javascript
  // Set a variable
  document.documentElement.style.setProperty('--primary', 'purple');
  ```

## 9. Related Topics
- [04_Colors_and_Units.md](./04_Colors_and_Units.md) - Units to store.
- [../03_JavaScript/10_DOM_Manipulation.md](../03_JavaScript/10_DOM_Manipulation.md) - Modifying styles with JS.
