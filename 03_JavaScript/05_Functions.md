# 3.5 Functions

## 1. What is it?
A Function is a block of code designed to perform a specific task. You define it once, and can "call" (execute) it multiple times.

## 2. Why it is used?
- **Reusability**: Don't repeat identical code. Write it once, use it everywhere (DRY Principle - Don't Repeat Yourself).
- **Organization**: Breaks a large program into small, manageable chunks.

## 3. Syntax / Structure
There are three main ways to write functions in modern JS.

1.  **Function Declaration**
2.  **Function Expression**
3.  **Arrow Function (ES6)**

```javascript
function name(parameter) {
    // code
    return value;
}
```

## 4. Detailed Explanation

### Parameters vs Arguments
- **Parameters**: The placeholders defined in the function parentheses (e.g., `x`, `y`).
- **Arguments**: The actual values passed when running the function (e.g., `5`, `10`).

### The `return` keyword
Functions can send a result back to where they were called. If you don't return anything, the function returns `undefined`.

## 5. Examples

### 1. Function Declaration (Hoisted)
Declarations are loaded before code execution, so you can call them *before* they are defined.
```javascript
console.log(add(2, 3)); // Works!

function add(a, b) {
    return a + b;
}
```

### 2. Function Expression (Not Hoisted)
Stored in a variable. Best for passing functions around.
```javascript
const subtract = function(a, b) {
    return a - b;
};
```

### 3. Arrow Function (Modern & Concise)
The standard for modern React/Node.js development.
```javascript
// Basic
const multiply = (a, b) => {
    return a * b;
};

// Implicit Return (If one line, you can skip {} and return)
const divide = (a, b) => a / b;

console.log(divide(10, 2)); // 5
```

### Default Parameters
You can set default values if the user forgets to pass an argument.
```javascript
function greet(name = "Guest") {
    console.log(`Hello, ${name}`);
}

greet();        // "Hello, Guest"
greet("John");  // "Hello, John"
```

## 6. Key Points to Remember
- Within a function, variables defined with `let` or `const` are **local**. They cannot be accessed outside the function (Scope).
- Arrow functions syntax: `() => {}`.

## 7. Common Mistakes
- **Mistake**: Forgetting `return`.
  ```javascript
  function add(a, b) { a + b; }
  let sum = add(2, 2); // sum is undefined!
  ```
- **Mistake**: Confusing `console.log` with `return`.
  - `console.log` prints to the screen (for humans).
  - `return` gives the value back to the program (for the computer).

## 8. Pro Tips / Tricks
- **Callback Functions**: You can pass a function *into* another function as an argument.
  ```javascript
  function process(callback) {
      console.log("Doing work...");
      callback();
  }
  process(() => console.log("Done!"));
  ```

## 9. Related Topics
- [02_Variables_and_Data_Types.md](./02_Variables_and_Data_Types.md) - Scoping.
- [13_ES6_Features.md](./13_ES6_Features.md) - More on Arrow Functions.
