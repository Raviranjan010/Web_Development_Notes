# 2.11 CSS Animations and Transitions

## 1. CSS Transitions
Smoothly change a property from one state to another (e.g., on hover).

### Properties
1.  **`transition-property`**: What to animate (e.g., `background-color`, `all`).
2.  **`transition-duration`**: How long (e.g., `0.5s`).
3.  **`transition-timing-function`**: Speed curve (`ease`, `linear`, `ease-in-out`).
4.  **`transition-delay`**: Wait before starting.

### Shorthand
```css
/* property duration timing delay */
.box {
    transition: background-color 0.5s ease-in;
}
.box:hover {
    background-color: green;
}
```

---

## 2. CSS Animations
Complex, multi-step animations using **Keyframes**.

### `@keyframes` Rule
Defines the steps (from 0% to 100%).

```css
@keyframes slide {
    from { transform: translateX(0); }
    to { transform: translateX(200px); }
}
```

### Animation Properties
1.  **`animation-name`**: Matches `@keyframes`.
2.  **`animation-duration`**: Time per cycle.
3.  **`animation-timing-function`**: Speed curve.
4.  **`animation-iteration-count`**: Number of loops (`3`, `infinite`).
5.  **`animation-direction`**: `normal`, `reverse`, `alternate` (back and forth).
6.  **`animation-fill-mode`**: `forwards` (stays at end state).

### Shorthand
```css
/* name duration timing delay iteration direction */
.box {
    animation: slide 2s infinite alternate;
}
```
