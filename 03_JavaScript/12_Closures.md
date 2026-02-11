# 3.5e Closures in JavaScript

A **Closure** is a function that remembers and accesses variables from its outer scope even after the outer function has finished executing.

## 1. How Closures Work

When a function returns another function, the returned function maintains a reference to its lexical environment (variables declared outside it).

```javascript
function outer() {
    let outerVar = "I'm in the outer scope!";
    
    function inner() {
        console.log(outerVar); // Accesses outerVar
    }
    return inner;  
}

const closureFunc = outer(); // outer() finishes execution here
closureFunc(); // "I'm in the outer scope!" -> Still remembers outerVar
```

## 2. Use Cases

### 1. Data Encapsulation (Private Variables)
You can hide variables so they cannot be accessed directly from outside.

```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: function() {
            count++;
            console.log(count);
        },
        reset: function() {
            count = 0;
            console.log("Reset!");
        }
    };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
// console.log(counter.count); // undefined (Cannot access directly)
```

### 2. IIFE (Immediately Invoked Function Expressions)
IIFEs use closures to create a private scope immediately, preventing global namespace pollution.

```javascript
const app = (function() {
    let privateData = "Secret";
    return {
        getData: () => privateData
    };
})();
console.log(app.getData()); // Secret
```

### 3. Asynchronous Code (Timers)
Closures are essential for `setTimeout` to remember values.

```javascript
function createTimers() {
    for (let i = 1; i <= 3; i++) {
        setTimeout(function() {
            console.log(`Timer ${i}`);
        }, i * 1000);
    }
}
createTimers();
// Output: Timer 1, Timer 2, Timer 3
```

> **Note**: If you used `var` instead of `let` in the loop, all timers would print `Timer 4` because `var` has function scope and the closure would reference the *final* value of `i`. `let` has block scope, creating a new `i` for each iteration.

```

### 4. Function Currying (Closure Example)
Currying transforms a function with multiple arguments into a sequence of functions. It relies on closures to remember previous arguments.

```javascript
function add(a) {
    return function(b) {
        return a + b;
    };
}

const addTwo = add(2);  // Closure remembers 'a = 2'
console.log(addTwo(3)); // 5
console.log(add(2)(4)); // 6
```

## 4. Common Pitfalls

### Memory Leaks
Closures hold references to variables. If you keep large objects in a closure that is never cleaned up, it causes memory leaks.

### Closures and `this`
Inside a closure, `this` might not refer to what you expect (it refers to the window or undefined in strict mode), unless you use **Arrow Functions** (which inherit `this`) or `.bind()`.

```javascript
function Person(name) {
    this.name = name;
    
    // Regular function: 'this' gets lost in setTimeout
    setTimeout(function() {
        // console.log(this.name); // Error or undefined
    }, 100);

    // Fix with Bind
    setTimeout(function() {
        console.log(this.name); 
    }.bind(this), 100);
}
```

## 4. Related Topics
- [13_Currying.md](./13_Currying.md) - Currying relies heavily on closures.
