# 2.6 CSS Display and Position

## 1. CSS Positioning (`position`)
The `position` property defines how an element is positioned in the document.

### Types of Positioning
1.  **`static`** (Default)
    - Follows the normal flow of the page.
    - `top`, `bottom`, `left`, `right` have no effect.
    ```css
    div { position: static; }
    ```

2.  **`relative`**
    - Positioned relative to its *normal* position.
    - Moving it does *not* affect other elements (it leaves a gap where it was).
    ```css
    .box {
        position: relative;
        left: 30px; /* Moves 30px right from its original spot */
    }
    ```

3.  **`absolute`**
    - Removed from the normal document flow (no gap left).
    - Positioned relative to the **nearest positioned ancestor** (anything not `static`).
    - If no ancestor is positioned, it positions relative to the `<body>`.
    ```css
    .container { position: relative; } /* Parent */
    .child {
        position: absolute;
        top: 0;
        right: 0; /* Top-right of container */
    }
    ```

4.  **`fixed`**
    - Removed from flow.
    - Positioned relative to the **viewport** (browser window).
    - Stays in place when scrolling (e.g., Fixed Header).
    ```css
    .header {
        position: fixed;
        width: 100%;
        top: 0;
    }
    ```

5.  **`sticky`**
    - Toggles between `relative` and `fixed` depending on scroll position.
    - "Sticks" when it hits a threshold.
    ```css
    .nav {
        position: sticky;
        top: 0; /* Sticks to top when reached */
    }
    ```

---

## 2. CSS Stacking Order (`z-index`)
When elements overlap, `z-index` determines which one is on top.

### Rules
1.  **Default Order**:
    - HTML Root.
    - Non-positioned elements (Static).
    - Positioned elements.
2.  **Using `z-index`**:
    - Works *only* on positioned elements (`relative`, `absolute`, `fixed`, `sticky`).
    - Higher number = Top.
    - Negative number = Behind.

### Example
```css
.red {
    background: red;
    position: absolute;
    z-index: 100; /* On Top */
}

.blue {
    background: blue;
    position: absolute;
    z-index: 1; /* Behind Red */
}
```

### Stacking Context
A child cannot appear behind its parent's background if the parent has a stacking context.
