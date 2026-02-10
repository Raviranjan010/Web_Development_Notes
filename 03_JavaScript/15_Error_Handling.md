# 3.15 Error Handling

## 1. What is it?
Handling unexpected scenarios (bugs, network failures, bad user input) gracefully so the application doesn't crash.

## 2. Why it is used?
- To provide a good user experience ("Something went wrong" vs a white screen of death).
- To debug issues effectively.

## 3. Syntax / Structure
The `try...catch` block.

```javascript
try {
    // Code that might fail
} catch (error) {
    // Code to run IF it fails
} finally {
    // Code that ALWAYS runs (cleanup)
}
```

## 4. Detailed Explanation

### The `throw` statement
You can manually trigger an error.
`throw new Error("Something broke!");`

### The Error Object
In the catch block, the `error` object usually has:
- `name`: Error type (ReferenceError, TypeError).
- `message`: Specific description.
- `stack`: Where in the code it happened.

## 5. Examples

### Basic Try-Catch
```javascript
try {
    let user = JSON.parse("Bad JSON String"); // This will crash
} catch (err) {
    console.log("Parsing failed:", err.message);
    // Fallback logic
    let user = { name: "Guest" };
}
```

### Input Validation
```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (e) {
    console.error(e.message); // "Cannot divide by zero"
}
```

### Asynchronous Error Handling
Using try/catch inside async functions.
```javascript
async function getUser() {
    try {
        let res = await fetch("/api/user");
        if (!res.ok) throw new Error("404 Not Found");
        let data = await res.json();
    } catch (err) {
        console.log("Network Error:", err);
    }
}
```

## 6. Key Points to Remember
- `try...catch` only works on **runtime** errors. It won't catch syntax errors (like missing bracket) because the code won't even parse.
- It works synchronously. If you have a setTimeout inside a try block, the catch won't catch it unless you wrap the code inside the timeout function.

## 7. Common Mistakes
- **Mistake**: Empty catch block.
  ```javascript
  catch (e) { } // Silent failure
  ```
  **Why**: You will never know something broke. At least `console.error(e)`.

## 8. Pro Tips / Tricks
- **Custom Errors**: You can extend the Error class for specific app errors.
  ```javascript
  class AuthError extends Error {
      constructor(msg) {
          super(msg);
          this.name = "AuthError";
      }
  }
  ```

## 9. Related Topics
- [14_Asynchronous_JS.md](./14_Asynchronous_JS.md) - Handling Promise rejections.
