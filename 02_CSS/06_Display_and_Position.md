# 2.6 Display and Position

## 1. What is it?
- **Display**: Determines how an element behaves in the document flow (e.g., does it sit next to others or take a full line?).
- **Position**: Determines exactly where an element is placed on the screen (e.g., sticking it to the top right corner).

## 2. Why it is used?
These properties give you granular control over layout, allowing for overlays, sticky navbars, and hiding elements properly.

## 3. Syntax / Structure
```css
element {
    display: block; /* or inline, inline-block, none */
    position: relative; /* or absolute, fixed, sticky */
    top: 10px;
    left: 20px;
}
```

## 4. Detailed Explanation

### The `Display` Property
- **`block`**: Takes full width. Starts on new line. (e.g., `div`, `p`, `h1`).
- **`inline`**: Takes only necessary width. No width/height or top/bottom margin adjustments allowed. (e.g., `span`, `a`).
- **`inline-block`**: Sits inline like text, BUT allows width/height/margin adjustments. Best of both worlds.
- **`none`**: Removes element from the document entirely. It takes up no space.

### The `Position` Property
- **`static`** (Default): Normal flow. `top`, `left`, `z-index` have no effect.
- **`relative`**: Normal flow, but can be nudged. `top: 10px` moves it down 10px from strictly *where it would have been*.
- **`absolute`**: Removed from flow. Positioned relative to the **nearest positioned ancestor** (non-static parent).
- **`fixed`**: Removed from flow. Positioned relative to the **viewport** (browser window). Does not move when scrolling.
- **`sticky`**: Acts like `relative` until you scroll past it, then becomes `fixed`. Great for headers.

## 5. Examples

### Display Modes
```css
/* Turning specific links into buttons */
a.btn {
    display: inline-block;
    padding: 10px 20px; /* Works because it's inline-block */
    width: 200px;
}
```

### Absolute Positioning (The Parent Trap)
To position a child inside a parent, the parent needs `relative` and the child `absolute`.
```css
.parent {
    position: relative;
    height: 300px;
    border: 1px solid black;
}

.child {
    position: absolute;
    bottom: 0;
    right: 0;
    /* This sits at the bottom-right of .parent */
}
```

### Fixed Navbar
```css
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000; /* Stays on top of everything */
}
```

## 6. Key Points to Remember
- `display: none` removes the element completely. `visibility: hidden` hides it but leaves an empty space.
- Absolute elements need a "reference point". If no parent has `position: relative`, they position themselves relative to the `<body>`.
- Using `float` is outdated for layout. Use Display properties (Flexbox/Grid) instead.

## 7. Common Mistakes
- **Mistake**: Using `absolute` positioning for everything.
  **Result**: The layout collapses because absolute elements don't take up space in the flow. Use Flexbox or Grid for structure; use Absolute for small tweaks (like a notification badge).

## 8. Pro Tips / Tricks
- **Centering with Absolute**:
  ```css
  .center-me {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  ```
  *(Note: Flexbox is usually easier, but this is a classic interview question).*

## 9. Related Topics
- [07_Flexbox.md](./07_Flexbox.md) - The modern replacement for `inline-block` layouts.
- [08_Grid.md](./08_Grid.md) - 2D layouts.
