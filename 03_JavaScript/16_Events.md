# 3.11 JavaScript Events

## 1. What are Events?
**Events** are actions or occurrences that happen in the browser. They can be triggered by:
- User interactions (clicking, typing, hovering).
- The browser itself (page loading, resizing, scrolling).

JavaScript "listens" for these events and executes code in response.

## 2. Common Event Types
JavaScript supports a wide variety of event types.

| Category | Event Name | Description |
| :--- | :--- | :--- |
| **Mouse** | `click` | Element is clicked. |
| | `dblclick` | Element is double-clicked. |
| | `mousemove` | Mouse pointer moves over an element. |
| | `mouseover` | Mouse pointer enters an element. |
| | `mouseout` | Mouse pointer leaves an element. |
| **Keyboard** | `keydown` | Key is pressed down. |
| | `keyup` | Key is released. |
| | `keypress` | Key is pressed (Deprecated, use keydown). |
| **Form** | `submit` | Form is submitted. |
| | `change` | Value of an input changes (e.g., dropdown, checkbox). |
| | `focus` | Element gets focus. |
| | `blur` | Element loses focus. |
| **Window** | `load` | Page has finished loading. |
| | `resize` | Browser window is resized. |
| | `scroll` | User scrolls the page. |

## 3. Event Handling Methods
There are 3 ways to handle events in JavaScript:

### 1. Inline HTML Handlers (Not Recommended)
Mixing JS directly in HTML.
```html
<button onclick="alert('Button clicked!')">Click Me</button>
```

### 2. DOM Property Handlers
Adding a function to the element object.
```javascript
let btn = document.getElementById("myButton");
btn.onclick = () => {
    alert("Button clicked!");
};
```
> **Limitation**: You can only attach **one** listener per event type this way (it overwrites previous ones).

### 3. `addEventListener()` (Preferred)
The standard modern way. Supports multiple listeners and additional options.
```javascript
btn.addEventListener("click", () => {
    alert("Button clicked using addEventListener!");
});
```

## 4. Event Propagation (Bubbling & Capturing)
When an event happens on an element (like a button inside a div), it doesn't just happen there. It travels through the DOM.

### Phases
1.  **Capturing Phase**: The event travels down from the `window` -> `root` -> `target`.
2.  **Target Phase**: The event reaches the target element.
3.  **Bubbling Phase**: The event travels up from the `target` -> `root` -> `window`.

### Event Bubbling (Default)
Events bubble **up** like bubbles in water.
- If you click a Child, the Parent's click listener also fires.

```javascript
/* HTML:
<div id="parent">
    <button id="child">Click Me</button>
</div>
*/

document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent Clicked");
});

document.getElementById("child").addEventListener("click", () => {
    console.log("Child Clicked");
});

// Output when clicking Child:
// 1. "Child Clicked"
// 2. "Parent Clicked"
```

### Stopping Propagation
Use `e.stopPropagation()` to stop the event from bubbling up.
```javascript
child.addEventListener("click", (e) => {
    e.stopPropagation(); // Parent will NOT be notified
    console.log("Child Only");
});
```

## 5. Event Delegation
A powerful pattern where you attach **one** listener to a parent instead of many listeners to children. It uses **Event Bubbling**.

### Why use it?
- Reduces memory usage (1 listener vs 100).
- Handles **dynamic elements** (items added later automatically work).

### Example: List Items
```javascript
// HTML: <ul id="list"> <li>Item 1</li> <li>Item 2</li> </ul>

document.querySelector("#list").addEventListener("click", (e) => {
    // Check if the actual clicked element is an LI
    if (e.target.tagName === "LI") {
        console.log(`Clicked on: \${e.target.textContent}`);
        e.target.style.color = "red"; // Change color
    }
});
```

## 6. `e.preventDefault()`
Some elements have default behaviors (e.g., Links navigate, Forms submit/reload). This method stops that default action.

### Example: Form Validation
```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", (e) => {
    const input = document.querySelector("#username");
    
    if (input.value === "") {
        e.preventDefault(); // STOP form submission
        alert("Username cannot be empty!");
    }
});
```

## 7. Practical Examples

### Dynamic Content
Adding elements dynamically with JS.
```javascript
const btn = document.querySelector("#addBtn");
btn.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.textContent = "I am new here!";
    document.body.appendChild(newDiv);
});
```

### Mouse Tracking
```javascript
document.addEventListener("mousemove", (e) => {
    console.log(`Mouse at: X=\${e.clientX}, Y=\${e.clientY}`);
});
```
