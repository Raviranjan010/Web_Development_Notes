# 3.15 Error Handling & Debugging

Error handling is the process of catching and managing errors so the application doesn't crash, while debugging is the process of finding and fixing those errors.

## 1. Types of Errors

1.  **Syntax Errors**: Code violates language rules (e.g., missing quotes). Detected at parsing.
    ```javascript
    console.log("Hello); // SyntaxError
    ```
2.  **Runtime Errors**: Occur during execution (e.g., accessing undefined variable).
    ```javascript
    let a;
    console.log(a.length); // TypeError
    ```
3.  **Logical Errors**: Code runs but gives wrong output (NO error thrown).
    ```javascript
    function add(a, b) { return a - b; } // Logic error (should be +)
    ```

## 2. Handling Errors (try...catch)

The `try...catch` statement handles runtime errors gracefully.

```javascript
try {
    // Code that might fail
    let data = JSON.parse("{invalid}");
} catch (error) {
    // Runs if error occurs
    console.error("Parsing error:", error.message);
} finally {
    // Runs ALWAYS (Cleanup)
    console.log("Cleanup actions here");
}
```

### Throwing Custom Errors
Use the `throw` statement to create custom exceptions.
```javascript
function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
}
```

## 3. Debugging Techniques

Debugging is testing, finding, and reducing bugs.

### 3.1. Using `console.log()`
The simplest way to inspect values.
```javascript
let x = 10;
console.log("Value of x:", x);
```

### 3.2. Browser DevTools (Breakpoints)
1.  Open Developer Tools (F12).
2.  Go to **Sources**.
3.  Click line number to set **breakpoint**.
4.  Reload/Run to pause execution and inspect variables.

### 3.3. The `debugger` Keyword
Pauses execution automatically if DevTools is open.
```javascript
function test() {
    let n = 42;
    debugger; // Execution pauses here
    console.log(n);
}
test();
```

## 4. Handling Async Errors

### With Promises (.catch)
```javascript
fetch("invalid-url")
    .then(res => res.json())
    .catch(err => console.error("Request failed", err));
```

### With Async/Await (try...catch)
```javascript
async function getData() {
    try {
        await fetch("invalid-url");
    } catch (err) {
        console.error("Async Error:", err);
    }
}
```

## 5. Global Error Handling (Safety Net)

### Window Errors
Catches uncaught sync errors.
```javascript
window.onerror = function(message, source, lineno, colno, error) {
    console.log("Global Error Caught:", message);
};
```

### Unhandled Promise Rejections
Catches async errors where `.catch()` is missing.
```javascript
window.addEventListener("unhandledrejection", event => {
    console.log("Unhandled Rejection:", event.reason);
});
```

## 6. Common Debugging Issues
1.  **Undefined Variables**: Often due to scope or missing parameters.
2.  **Memory Leaks**: Detect using Chrome DevTools "Memory" tab (e.g., uncleared `setInterval`).
3.  **Event Listeners**: If click not working, check if ID matches and element exists.

## 7. Related Topics
- [25_Asynchronous_JS.md](./25_Asynchronous_JS.md)
