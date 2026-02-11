# 3.11b Mini Projects: Counter & Todo List

## Project 1: Simple Counter
A basic application to practice **State Management** and **Logic**.

- **App Location**: [Open Project](./Projects/Counter/index.html)
- **Files**: `index.html`, `style.css`, `script.js`

### Key Features
1.  **State Variables**: Tracks total count (`c`), increment clicks (`ci`), and decrement clicks (`cd`).
2.  **Reset Logic**: Clicks reset to 0 after reaching 10 using the ternary operator:
    ```javascript
    ci = (ci >= 10) ? 0 : ci + 1;
    ```
3.  **Boundary Check**: Prevents negative numbers:
    ```javascript
    c = c > 0 ? c - 1 : 0;
    ```

---

## Project 2: Todo List App
An intermediate application covering **DOM Manipulation**, **Arrays**, and **Storage**.

- **App Location**: [Open Project](./Projects/TodoList/index.html)
- **Files**: `index.html`, `style.css`, `script.js`

### Key Features
1.  **CRUD Operations**: Create (Push to array), Read (Loop & Render), Update (Edit text), Delete (Filter array).
2.  **LocalStorage**: Data persists after refreshing the page.
    ```javascript
    // Saving
    localStorage.setItem("task array", JSON.stringify(task));
    
    // Loading
    let data = JSON.parse(localStorage.getItem("task array"));
    ```
3.  **Content Editable**: Allows inline editing of text without using `prompt()` or input fields.
    ```html
    <span contenteditable="true">Task Name</span>
    ```
4.  **Event Delegation**: Listeners are attached to buttons dynamically created inside the render loop.

## How to Run
Simply go to the `Projects` folder and double-click the `index.html` file for the respective project.
