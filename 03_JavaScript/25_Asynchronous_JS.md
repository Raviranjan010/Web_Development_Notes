# 3.14 Asynchronous JavaScript (Callbacks, Promises, Async/Await)

JavaScript is single-threaded, but it handles asynchronous operations (like fetching data, timers) efficiently using the Event Loop.

## 1. Callbacks

A **callback function** is a function passed as an argument to another function and executed later.

### Sychronous Callback
Executed immediately.
```javascript
function greet(name, callback) {
    console.log("Hello, " + name);
    callback();
}
function sayBye() { console.log("Goodbye!"); }
greet("Ajay", sayBye);
```

### Asynchronous Callback
Executed after a task finishes (e.g., `setTimeout`).
```javascript
console.log("Start");
setTimeout(function () {
    console.log("Inside setTimeout");
}, 2000);
console.log("End");
```

### Callback Hell (The Problem)
When callbacks are nested deeply, code becomes hard to read.
```javascript
step1(() => {
    step2(() => {
        step3(() => {
            console.log("All steps completed");
        });
    });
});
```

## 2. Promises

A **Promise** represents a value that may be available now, later, or never. It solves "Callback Hell".

### States
1.  **Pending**: Initial state.
2.  **Fulfilled**: Success (value available).
3.  **Rejected**: Failure (error reason).

### Creating a Promise
```javascript
let checkEven = new Promise((resolve, reject) => {
    let number = 4;
    if (number % 2 === 0) resolve("The number is even!");
    else reject("The number is odd!");
});

checkEven
    .then(msg => console.log(msg))
    .catch(err => console.error(err));
```

### Promise Methods (Advanced)

#### 1. Promise.all()
Waits for **all** to fulfill. If **any** reject, it fails immediately.
```javascript
Promise.all([
    Promise.resolve("Task 1"),
    Promise.resolve("Task 2")
]).then(results => console.log(results)); // ["Task 1", "Task 2"]
```

#### 2. Promise.allSettled()
Waits for **all** to finish (success or fail). Returns an array of objects `{ status, value/reason }`.
```javascript
Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Fail")
]).then(results => console.log(results));
```

#### 3. Promise.race()
Resolves/Rejects as soon as the **first** promise settles.
```javascript
Promise.race([
    new Promise(r => setTimeout(() => r("Fast"), 100)),
    new Promise(r => setTimeout(() => r("Slow"), 500))
]).then(result => console.log(result)); // "Fast"
```

#### 4. Promise.any()
Resolves with the **first fulfilled** promise. Ignores rejections unless ALL fail.

## 3. Async / Await

Introduced in ES8, `async/await` is syntactic sugar over Promises specifically designed to make asynchronous code look synchronous.

-   **`async`**: Makes a function return a Promise.
-   **`await`**: Pauses execution until the Promise resolves.

```javascript
async function fetchData() {
    try {
        // Pauses here until promise resolves
        let response = await fetch('https://api.example.com/data');
        let data = await response.json(); 
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
fetchData();
```

## 4. The Fetch API

The `fetch()` API allows you to make HTTP requests (GET, POST, PUT, DELETE). It returns a Promise.

### Basic GET Request
```javascript
fetch('https://fakestoreapi.com/products/1')
    .then(res => {
        if (!res.ok) throw new Error("HTTP error!");
        return res.json();
    })
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

### POST Request (Sending Data)
```javascript
fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Raj', age: 25 })
})
.then(res => res.json())
.then(data => console.log(data));
```

### PUT Request (Update)
```javascript
fetch('https://fakestoreapi.com/products/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 1, price: 300 })
})
.then(res => res.json())
.then(console.log);
```

### DELETE Request
```javascript
fetch('https://fakestoreapi.com/products/1', { method: 'DELETE' })
    .then(res => res.json())
    .then(console.log);
```

## 5. Event Loop Overview

The mechanism that allows JS to perform non-blocking I/O operations.
1.  **Call Stack**: Executes synchronous code.
2.  **Web APIs**: Handles `setTimeout`, `fetch`, etc.
3.  **Callback Queue**: Stores callbacks ready to run.
4.  **Microtask Queue**: Stores Promise callbacks (Higher priority than Callback Queue).

*(See [01_b_Code_Execution.md](./01_b_Code_Execution.md) for deeper Event Loop details)*

## 6. Related Topics
- [27_Error_Handling.md](./27_Error_Handling.md)
