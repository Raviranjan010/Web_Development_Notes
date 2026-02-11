# 3.5c Advanced Functions: Call, Apply, Bind

In JavaScript, `call`, `apply`, and `bind` are methods used to control the value of `this` (the execution context) inside a function. They are critical for borrowing methods and function currying.

## 1. call() Method

The `call()` method explicitly sets `this` to the first argument passed to it, and additional arguments are passed individually.

-   **Invokes function immediately.**
-   **Syntax**: `func.call(thisArg, arg1, arg2, ...)`

```javascript
const person = {
    name: "Raj"
};

function greet(age, city) {
    console.log(`Hello, I am ${this.name}, ${age} years old, from ${city}.`);
}

greet.call(person, 25, "Delhi");
// Output: Hello, I am Raj, 25 years old, from Delhi.
```

## 2. apply() Method

The `apply()` method is similar to `call()`, but arguments are passed as an **array**.

-   **Invokes function immediately.**
-   **Syntax**: `func.apply(thisArg, [argsArray])`

```javascript
const person = {
    name: "Simran"
};

function greet(age, city) {
    console.log(`Hello, I am ${this.name}, ${age} years old, from ${city}.`);
}

greet.apply(person, [22, "Mumbai"]);
// Output: Hello, I am Simran, 22 years old, from Mumbai.
```

## 3. bind() Method

The `bind()` method **returns a new function** with `this` permanently bound to the specified object. It does **not** invoke the function immediately.

-   **Returns a function.**
-   **Syntax**: `const newFunc = func.bind(thisArg, arg1, arg2, ...)`

```javascript
const person = {
    name: "Amit"
};

function greet() {
    console.log(`Hello, I am ${this.name}`);
}

const greetAmit = greet.bind(person);
greetAmit(); 
// Output: Hello, I am Amit
```

## 4. Comparisons

| Method | Invoked Immediately? | Arguments Passed As | Returns |
| :--- | :--- | :--- | :--- |
| **call()** | Yes | Individual arguments | Function result |
| **apply()** | Yes | Array `[]` | Function result |
| **bind()** | No | Individual arguments | New function copy |

## 5. Polyfills (Interview Topic)

Sometimes you are asked to implement your own versions of these methods.

### 5.1 Call Polyfill

```javascript
Function.prototype.myCall = function(context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new Error(this + " is not callable");
    }
    
    // Step 1: Attach function to the context object
    context.myFunction = this;
    
    // Step 2: Execute the function with args
    const result = context.myFunction(...args);
    
    // Step 3: Remove the function from context to clean up
    delete context.myFunction;
    
    return result;
};

// Usage
function printName() { console.log(this.name); }
const user = { name: "Polyfill Call" };
printName.myCall(user); // Polyfill Call
```

### 5.2 Apply Polyfill

Similar to `myCall`, but handles arguments as an array.

```javascript
Function.prototype.myApply = function(context = {}, args = []) {
    if (typeof this !== 'function') {
        throw new Error(this + " is not callable");
    }
    
    if (!Array.isArray(args)) {
        throw new TypeError("CreateListFromArrayLike called on non-object");
    }

    context.myFunction = this;
    const result = context.myFunction(...args);
    delete context.myFunction;
    
    return result;
};

// Usage
function sum(a, b) { console.log(this.prefix + (a + b)); }
const obj = { prefix: "Sum: " };
sum.myApply(obj, [10, 20]); // Sum: 30
```

### 5.3 Bind Polyfill

```javascript
Function.prototype.myBind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new Error(this + " cannot be bound as it's not callable");
    }
    
    const self = this; // Store reference to original function
    
    return function(...newArgs) {
        // Combine initial args with new args
        return self.apply(context, [...args, ...newArgs]);
    };
};

// Usage
const user = { name: "Polyfill Bind" };
function show() { console.log(this.name); }
const boundShow = show.myBind(user);
boundShow(); // Polyfill Bind
```
