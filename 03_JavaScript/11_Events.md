# 3.11 Events

## 1. What is it?
Events are things that happen to HTML elements. JavaScript can "listen" for these events and run code when they occur.

## 2. Why it is used?
Events drive interactivity.
- User clicks a button -> Event: `click`
- User types in input -> Event: `input` / `keydown`
- Form is submitted -> Event: `submit`

## 3. Syntax / Structure
The modern standard is `addEventListener`.

```javascript
element.addEventListener("event-name", functionToBeRun);
```

## 4. Detailed Explanation

### Common Events
- **Mouse**: `click`, `dblclick`, `mouseenter` (hover), `mouseleave`.
- **Keyboard**: `keydown` (press), `keyup` (release).
- **Form**: `submit`, `change`, `focus`, `blur`.
- **Window**: `resize`, `scroll`, `load`.

### The Event Object (`e`)
When an event occurs, the browser creates an **Event Object** containing details (mouse coordinates, key pressed, element clicked). We pass this as the first argument to our function.

## 5. Examples

### Basic Click
```javascript
const btn = document.querySelector("#myBtn");

btn.addEventListener("click", () => {
    alert("Button Clicked!");
});
```

### Using the Event Object
```javascript
const input = document.querySelector("input");

input.addEventListener("keydown", (e) => {
    console.log(e.key); // Prints the letter typed (e.g., "a", "Enter")
    
    if (e.key === "Enter") {
        console.log("User pressed Enter!");
    }
});
```

### Event Bubbling & Delegation
Events "bubble" up from the target to the parents.
If you click a `span` inside a `div` -> The `span` triggers a click, then the `div` triggers a click.

**Delegation**: Instead of adding listeners to 100 buttons, add **one** listener to the parent container.
```javascript
const list = document.querySelector("ul");

list.addEventListener("click", (e) => {
    // Check if the actual clicked thing was a list item
    if (e.target.tagName === "LI") {
        e.target.remove(); // Delete the item
    }
});
```

## 6. Key Points to Remember
- **Do NOT** use inline HTML events (`onclick="..."`). It mixes HTML and JS (Bad separation of concerns).
- **Multiple Listeners**: `addEventListener` allows adding *multiple* different functions to the same event. `element.onclick` would overwrite the previous one.

## 7. Common Mistakes
- **Mistake**: Executing the function immediately.
  ```javascript
  // WRONG: Calls handleClick() immediately on page load!
  btn.addEventListener("click", handleClick()); 
  
  // RIGHT: Passes the function reference to be called later.
  btn.addEventListener("click", handleClick);
  ```

## 8. Pro Tips / Tricks
- **`e.preventDefault()`**: Stops the default browser behavior. Crucial for Forms (prevents page reload) and Links (prevents navigation).
- **`once: true`**: Run an event only once.
  ```javascript
  btn.addEventListener("click", doSomething, { once: true });
  ```

## 9. Related Topics
- [10_DOM_Manipulation.md](./10_DOM_Manipulation.md) - Selecting the elements to listen to.
- [12_Form_Validation.md](./12_Form_Validation.md) - Handling form submit events.
