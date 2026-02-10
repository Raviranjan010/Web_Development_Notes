# 4.3 JavaScript Projects

## Goal
Make it interactive! Focus on **DOM Manipulation**, **Events**, and **Logic**.

---

## Project 1: Background Color Changer
**Objective**: A button that changes the page background color to a random color when clicked.

### Logic
1.  Create an array of colors (Hex or names).
2.  Listen for a click event.
3.  Pick a random index `Math.floor(Math.random() * colors.length)`.
4.  Apply to `document.body.style.backgroundColor`.

### Key Concepts Used
- Arrays
- Math.random()
- DOM Style Manipulation
- Click Event

---

## Project 2: Digital Clock
**Objective**: Display the current time (HH:MM:SS) that updates every second.

### Logic
1.  Get current time using `new Date()`.
2.  Extract Hours, Minutes, Seconds.
3.  Format them (add leading zero if < 10).
4.  Update the innerText of a div.
5.  Use `setInterval(updateTime, 1000)` to run it every second.

### Key Concepts Used
- Date Object
- `setInterval`
- String Manipulation

---

## Project 3: To-Do List
**Objective**: Classic app. Add tasks, check them off, delete them.

### Logic
1.  **Add**: Input text -> Button Click -> Create `<li>` -> Append to `<ul>`.
2.  **Check**: Click item -> Toggle class `.completed` (CSS strikethrough).
3.  **Delete**: Click "Trash" icon -> Remove `<li>` from DOM.

### Key Concepts Used
- `createElement`, `appendChild`
- Event Delegation (Listening on the `<ul>` instead of each `<li>`)
- ClassList toggling

---

## Project 4: Simple Calculator
**Objective**: A grid of buttons (0-9, +, -, *, /) and a display screen.

### Logic
1.  Listen for button clicks.
2.  Append numbers to a string.
3.  When `=` is clicked, evaluate the string (be careful with `eval()`, prefer writing a custom parser or using `Function` constructor if beginner).

### Key Concepts Used
- Grid Layout (CSS)
- String concatenation
- Logic branching (`switch` statements)
