# 2.11 CSS Animations and Transitions

## 1. What is it?
- **Transitions**: Smoothly change a property from one state to another (e.g., hover effect).
- **Animations**: Complex sequences of changes controlled by "keyframes".

## 2. Why it is used?
- **Feedback**: Letting users know an improved action happened (button click, form submit).
- **Engagement**: Making the site feel alive and premium.
- **Attention**: Guiding the user's eye to important elements.

## 3. Syntax / Structure

### Transition
```css
.button {
    background-color: blue;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: red;
}
```

### Animation
```css
@keyframes slideIn {
    from { margin-left: 100%; }
    to { margin-left: 0%; }
}

.element {
    animation: slideIn 1s;
}
```

## 4. Detailed Explanation

### Transition Properties
1.  **`transition-property`**: The property to animate (e.g., `opacity`, `transform`, `all`).
2.  **`transition-duration`**: How long it takes (e.g., `0.5s`, `300ms`).
3.  **`transition-timing-function`**: The speed curve.
    - `linear`: Same speed start to end.
    - `ease`: Slow start, fast middle, slow end (Natural feel).
    - `ease-in-out`: Slow start and end.
4.  **`transition-delay`**: Wait before starting.

### Animation Properties
1.  **`animation-name`**: Matches the `@keyframes` name.
2.  **`animation-duration`**: Time for one cycle.
3.  **`animation-iteration-count`**: How many times? (`1`, `infinite`).
4.  **`animation-direction`**: `normal`, `reverse`, `alternate` (goes back and forth).
5.  **`animation-fill-mode`**: What happens after it ends?
    - `forwards`: Stay in the final state.
    - `none`: Jump back to start.

## 5. Examples

### Hover Scale Effect (Transition)
```css
.card {
    transition: transform 0.2s ease;
}

.card:hover {
    transform: scale(1.05); /* Grows by 5% */
}
```

### Loading Spinner (Animation)
```css
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}
```

## 6. Key Points to Remember
- Use **Transitions** for simple user interactions (hover, focus).
- Use **Animations** for auto-playing effects (loading screens, entry animations).
- **Performance**: Animate `transform` and `opacity`. Avoid animating `width`, `height`, or `top/left` as they cause the browser to recalculate layout (slow/laggy).

## 7. Common Mistakes
- **Mistake**: Transitioning `display: none` to `display: block`.
  **Why**: You cannot animate "existence". It snaps instantly.
  **Fix**: Use `opacity: 0` -> `opacity: 1` and `visibility`.

## 8. Pro Tips / Tricks
- **Chaining Transitions**:
  `transition: color 0.3s, transform 0.5s;` (Different speeds for distinct properties).
- **Prefers-Reduced-Motion**: Respect users who get motion sickness.
  ```css
  @media (prefers-reduced-motion: reduce) {
      * {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
      }
  }
  ```

## 9. Related Topics
- [13_Pseudo_Classes_and_Elements.md](./13_Pseudo_Classes_and_Elements.md) - Triggering transitions with `:hover`.
- [../03_JavaScript/01_Introduction_to_JS.md](../03_JavaScript/01_Introduction_to_JS.md) - Controlling animations with JS classes.
