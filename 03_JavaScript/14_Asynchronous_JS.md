# 3.14 Asynchronous JavaScript

## 1. What is it?
**Asynchronous** means things happen **independently** of the main program flow. The code doesn't wait for one task to finish before starting the next.

## 2. Why it is used?
Fetching data from a server takes time (e.g., 2 seconds). If JS were purely synchronous (blocking), the entire website would **freeze** for 2 seconds. Async allows the site to remain responsive while waiting for data.

## 3. Syntax / Structure
3 Eras of Async JS:
1.  **Callbacks** (The Old Way - "Callback Hell")
2.  **Promises** (The Better Way - `.then()`)
3.  **Async / Await** (The Modern Way - looks synchronous!)

## 4. Detailed Explanation

### Promises
A "Promise" is an object representing specific event completion (or failure).
- **Pending**: Waiting.
- **Resolved**: Success (Data received).
- **Rejected**: Failed (Network error).

### Async / Await
Syntactic sugar built on top of Promises. It makes async code look like standard top-down code.

## 5. Examples

### The Fetch API (Using Promises)
```javascript
fetch("https://api.example.com/data")
    .then(response => response.json()) // Parse JSON
    .then(data => console.log(data))   // Use Data
    .catch(error => console.error("Error:", error)); // Handle Error
```

### The Fetch API (Using Async/Await)
**Must be inside an `async` function.**
```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Failed to fetch:", error);
    }
}

getData();
```

### Delay Function (Sleep)
A common interview trick.
```javascript
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    console.log("Start");
    await wait(2000); // Pauses execution for 2 seconds
    console.log("End");
}
```

## 6. Key Points to Remember
- JS is **Single-Threaded**. It can only do one thing at a time. Async works by offloading tasks (like specific network requests) to the browser API, which puts them back in a "Queue" when done.
- `await` **pauses** the function execution until the promise resolves.

## 7. Common Mistakes
- **Mistake**: Forgetting `await` on `response.json()`.
  **Why**: `.json()` returns a Promise too! If you don't await/return it, you get `Promise { <pending> }` instead of data.

## 8. Pro Tips / Tricks
- **Parallel Requests**: `Promise.all()` runs multiple requests at the same time.
  ```javascript
  const [user, posts] = await Promise.all([
      fetch("/user"),
      fetch("/posts")
  ]);
  ```

## 9. Related Topics
- [15_Error_Handling.md](./15_Error_Handling.md) - Using try/catch.
- [01_Introduction_to_JS.md](./01_Introduction_to_JS.md) - JS execution model.
