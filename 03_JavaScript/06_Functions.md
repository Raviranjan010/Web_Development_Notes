# 3.5 Functions

## 1. What is it?
Functions in JavaScript are reusable blocks of code designed to perform specific tasks. They allow you to organize, reuse, and modularize code. It can take inputs, perform actions, and return outputs.

## 2. Why it is used?
- **Reusability**: Don't repeat identical code. Write it once, use it everywhere (DRY Principle).
- **Modularity**: Breaks a large program into small, manageable chunks.
- **Abstraction**: Hides complex logic behind a simple name.

## 3. Detailed Explanation

### Parameters vs Arguments
In functions, **parameters** are placeholders defined in the function, while **arguments** are the actual values you pass when calling the function.

```javascript
function greet(name) { // 'name' is a parameter
    console.log("Hello " + name);
}
greet("Alice"); // "Alice" is the argument
```

### Default Parameters
Default parameters are used when no argument is provided during the function call. If no value is passed, the function automatically uses the default value.

```javascript
function greet(name = "Guest") {
    console.log("Hello, " + name);
}
greet(); // Hello, Guest
greet("Aman"); // Hello, Aman
```

### Return Statement
The `return` statement is used to send a result back from a function.
- When `return` executes, the function stops running at that point.
- The returned value can be stored in a variable or used directly.

```javascript
function add(a, b) {
    return a + b; // returns the sum
}
let result = add(5, 10);
console.log(result); // 15
```

## 4. Types of Functions
Here are all the main types of functions in JavaScript:

### 1. Named Function
A function that has its own name when declared. It’s easy to reuse and debug because the name shows up in error messages or stack traces.
```javascript
function greet() {
    return "Hello!";
}
console.log(greet());
```

### 2. Anonymous Function
A function that does not have a name. It is usually assigned to a variable or used as a callback. Since it has no name, it cannot be called directly.
```javascript
const greet = function() {
    return "Hi there!";
};
console.log(greet());
```

### 3. Function Expression
When you assign a function (can be named or anonymous) to a variable. The function can then be used by calling that variable.
```javascript
const add = function(a, b) {
    return a + b;
};
console.log(add(2, 3));
```

### 4. Arrow Function (ES6)
A new way to write functions using the `=>` syntax. They are shorter and do not have their own `this` binding.
```javascript
const square = n => n * n;
console.log(square(4));
```

### 5. Immediately Invoked Function Expression (IIFE)
IIFE functions are executed **immediately** after their definition. They are often used to create isolated scopes.
```javascript
(function () {
    console.log("This runs immediately!");
})();
```

### 6. Callback Functions
A callback function is passed as an argument to another function and is executed after the completion of that function.
```javascript
function num(n, callback) {
    return callback(n);
}
const double = (n) => n * 2;
console.log(num(5, double));
```

### 7. Constructor Function
A special type of function used to create multiple objects with the same structure. It’s called with the `new` keyword.
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}
const user = new Person("Neha", 22);
console.log(user.name);
```

### 8. Async Function
Functions that handle asynchronous tasks. Declared with `async`, they return a Promise, and you can use `await` inside them to pause until another Promise resolves.
```javascript
async function fetchData() {
    return "Data fetched!";
}
fetchData().then(console.log);
```

### 9. Generator Function
Declared with an asterisk `*`, these functions can pause execution using `yield` and resume later. Useful for lazy loading values or handling iterators.
```javascript
function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}
const gen = numbers();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

### 10. Recursive Function
A function that calls itself until a condition is met. Very useful for problems like factorial, Fibonacci, or tree traversals.
```javascript
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5));
```

### 11. Higher-Order Function
A function that either takes another function as a parameter or returns another function. These are common in JavaScript (e.g., `map`, `filter`, `reduce`).
```javascript
function multiplyBy(factor) {
    return function(num) {
        return num * factor;
    };
}
const double = multiplyBy(2);
console.log(double(5)); // 10
```

### 12. Nested Functions
Functions defined within other functions. They have access to the variables of their parent function (Closure).
```javascript
function outerFun(a) {
    function innerFun(b) {
        return a + b;
    }
    return innerFun;
}
const addTen = outerFun(10);
console.log(addTen(5)); // 15
```

### 13. Pure Functions
Pure functions return the same output for the same inputs and do not produce **side effects** (like modifying global variables).
```javascript
function pureAdd(a, b) {
    return a + b;
}
console.log(pureAdd(2, 3));
```

### 14. Default Parameter Function
A function where parameters have default values if no argument is passed. Helps avoid `undefined` issues.
```javascript
function greet(name = "Guest") {
    return "Hello, " + name;
}
console.log(greet());
```

### 15. Rest Parameter Function
Uses `...` to collect all remaining arguments into an array. Very useful when you don’t know how many arguments will be passed.
```javascript
function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4));
```

## 5. Key Points to Remember
- **Local Scope**: Variables declared inside a function are not visible outside.
- **Hoisting**: Named functions are hoisted (can be called before definition). Expressions/Arrow functions are NOT.
- **Arrow Functions**: Do not have their own `this`.

## 6. Related Topics
- [10_Higher_Order_Functions.md](./10_Higher_Order_Functions.md) - Deep dive into HOFs.
- [02_Variables_and_Data_Types.md](./02_Variables_and_Data_Types.md) - Scope details.
