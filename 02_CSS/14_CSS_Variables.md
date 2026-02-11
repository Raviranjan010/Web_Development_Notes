# 2.14 CSS Variables (Custom Properties)

## 1. What are CSS Variables?
Reusable values defined with two dashes (`--`).
- **Benefit**: Store colors, sizes, and fonts in one place for easy updates (Theming).

## 2. Syntax
1.  **Define**: `--name: value;`
2.  **Use**: `var(--name)`

```css
:root {
    /* Global Variables */
    --main-bg: lightblue;
    --main-text: darkblue;
    --spacing-md: 20px;
}

body {
    background-color: var(--main-bg);
    color: var(--main-text);
    padding: var(--spacing-md);
}
```

---

## 3. Scope
- **Global**: Defined in `:root` (Accessible everywhere).
- **Local**: Defined in a specific selector (Accessible only inside it).

---

## 4. Best Practices
1.  **Naming**: Use descriptive names (`--primary-color` vs `--color1`).
2.  **Fallbacks**: `var(--main-color, black)` (Uses black if variable fails).
3.  **Theming**: Great for Dark Mode.
    ```css
    body.dark {
        --main-bg: #333;
        --main-text: white;
    }
    ```
