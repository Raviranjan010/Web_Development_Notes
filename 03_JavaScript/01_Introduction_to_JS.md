# 3.1 Introduction to JavaScript

## 1. What is it?
**JavaScript (JS)** is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. It is the **brain** of a webpage, making it interactive and dynamic.
- **HTML**: Structure (Skeleton)
- **CSS**: Style (Skin/Clothes)
- **JS**: Logic/Action (Muscles/Brain)

## 2. Why it is used?
- **Interactivity**: Clicking buttons, opening menus, validating forms.
- **Dynamic Content**: Updating the page without reloading (AJAX).
- **Standards**: It is the **only** programming language that runs natively in every web browser.
- **Versatility**: Builds client-side (frontend) and server-side (Node.js) applications.

## 3. Syntax / Structure
You can write JS in the console, or inside `<script>` tags.

```javascript
/* Standard Console Log */
console.log("Hello, World!");
```

## 4. Key Features
- **Client-Side Scripting**: Runs on the user's browser, enabling fast responses without server round-trips.
- **Event-Driven**: Responds to user actions (clicks, keystrokes) in real-time.
- **Asynchronous**: Handles tasks like fetching data without freezing the UI.
- **Rich Ecosystem**: Massive libraries (React, Vue, Angular) and tools.

## 5. Client-Side vs Server-Side
JavaScript's flexibility allows it to run in both environments:

| Environment | Description | Examples |
| :--- | :--- | :--- |
| **Client-Side** | Controls the browser and DOM. Handles user events and UI updates. | React, Angular, Vue, Native JS |
| **Server-Side** | Interacts with databases, files systems, and generates responses on the server. | Node.js, Express.js, Deno |

## 6. Programming Paradigms
JavaScript is multi-paradigm:
1.  **Imperative**: Focuses on *how* to perform tasks (step-by-step control flow).
2.  **Declarative**: Focuses on *what* result is desired (e.g., `.map()`, `.filter()`).
3.  **Object-Oriented**: Uses objects and prototypes.
4.  **Functional**: Treating functions as first-class citizens.

## 7. Limitations
- **Security Risks**: Susceptible to Cross-Site Scripting (XSS) if not handled correctly.
- **Performance**: Generally slower than compiled languages (C++, Rust) for heavy computations, though engines are getting faster.
- **Complexity**: Asynchronous concepts (Promises, Async/Await) can be tricky for beginners.
- **Weak Error Handling**: `typeof null` is "object", and loose typing can lead to runtime errors.

## 8. JavaScript Versions (ECMAScript)

| Version | Year | Key Features |
| :--- | :--- | :--- |
| **ES5** | 2009 | Strict mode, JSON support, Getters/Setters |
| **ES6 (ES2015)** | 2015 | `let`/`const`, Classes, Arrow Functions, Promises |
| **ES7-ES13** | 2016-22 | `async`/`await`, `BigInt`, Optional Chaining `?.` |
| **ES14+** | 2023+ | `toSorted`, `findLast`, Static blocks |

> **Note**: Modern development heavily relies on ES6+ features.

## 9. Code Examples

### Inline Script (Avoid)
```html
<button onclick="alert('Hello!')">Click Me</button>
```

### Internal Script
```html
<body>
  <h1>My Page</h1>
  <script>
    console.log("Page loaded!");
  </script>
</body>
```

### External Script (Best Practice)
**index.html**:
```html
<body>
  <h1>My Page</h1>
  <script src="app.js"></script>
</body>
```

**app.js**:
```javascript
console.log("Hello from external file!");
```

## 10. Pro Tips
- **Browser Console**: Press `F12` -> `Console` to test code instantly.
- **Comments**:
  - `// Single line`
  - `/* Multi-line */`

## 11. Related Topics
- [01_b_Code_Execution.md](./01_b_Code_Execution.md) - How JS runs under the hood.
- [02_Variables_and_Data_Types.md](./02_Variables_and_Data_Types.md) - Storing data properly.
- [../01_HTML/02_HTML_Document_Structure.md](../01_HTML/02_HTML_Document_Structure.md) - Where scripts live.
