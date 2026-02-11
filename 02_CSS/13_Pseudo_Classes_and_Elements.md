# 2.13 CSS Pseudo-classes and Elements

## 1. What is a Pseudo-class?
A keyword added to a selector to define a **specific state** of an element.
- **Syntax**: `selector:pseudo-class { ... }`

---

## 2. Interactive States
Triggered by user actions.

1.  **`:hover`**: When mouse is over the element.
    ```css
    button:hover { background-color: blue; }
    ```
2.  **`:active`**: When element is being clicked (held down).
3.  **`:focus`**: When element is selected (input, button).
4.  **`:visited`**: Links (`<a>`) that have been visited.
5.  **`:link`**: Links that have *not* been visited.
6.  **`:focus-visible`**: Accessibility best practice. Shows focus ring only when navigating by keyboard (Tab).

---

## 3. Structural States
Target elements based on their position in the HTML.

1.  **`:first-child`**: First element inside a parent.
2.  **`:last-child`**: Last element.
3.  **`:nth-child(n)`**: Selects the _nth_ element.
    - `tr:nth-child(2)` (2nd row)
    - `tr:nth-child(odd)` / `tr:nth-child(even)` (Striped tables).
4.  **`:first-of-type`**: First of a specific tag type (e.g., first `<p>`).
5.  **`:not(selector)`**: Selects everything *except* the selector.
    ```css
    div:not(.highlight) { opacity: 0.5; }
    ```

---

## 4. Form States
Target inputs based on their value/status.

1.  **`:checked`**: Checkbox/Radio is selected.
2.  **`:disabled`**: Input cannot be used.
3.  **`:required`**: Input has `required` attribute.
4.  **`:valid` / `:invalid`**: Email/Number format is correct/incorrect.
5.  **`:focus-within`**: If the element *or* any of its children have focus.

---

## 5. Pseudo-elements
Style specific **parts** of an element.
- **Syntax**: `selector::pseudo-element` (Double colon).

1.  **`::before`**: Inserts content *before* the element.
2.  **`::after`**: Inserts content *after* the element.
    ```css
    h1::after { content: " ★"; color: gold; }
    ```
3.  **`::first-letter`**: Styles the first letter.
4.  **`::first-line`**: Styles the first line.
