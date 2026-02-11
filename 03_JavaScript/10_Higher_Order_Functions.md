# 3.5.b Higher Order Functions

## 1. What is it?
A **Higher-Order Function (HOF)** is a function that performs one of the following:
1.  **Takes another function as an argument** (e.g., as a callback).
2.  **Returns another function** as its result.

HOFs are the heart of "Functional Programming" in JavaScript. They help make your code more reusable and modular.

## 2. Common Array HOFs
These methods take a callback function and apply it to an array.

### 1. `map()` (Transform)
The `map` function is used to transform an array by applying a callback function to each element. It returns a **new array**.
```javascript
const n = [1, 2, 3, 4, 5];
const square = n.map((num) => num * num);
console.log(square); // [1, 4, 9, 16, 25]
```

### 2. `filter()` (Select)
The `filter` function is used to create a **new array** containing elements that satisfy a given condition.
```javascript
const n = [1, 2, 3, 4, 5];
const even = n.filter((num) => num % 2 === 0);
console.log(even); // [2, 4]
```

### 3. `reduce()` (Accumulate)
The `reduce` function accumulates array elements into a **single value** based on a callback function.
```javascript
const n = [1, 2, 3, 4, 5];
const sum = n.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15
```
- **acc (Accumulator)**: Stores the result after each iteration.
- **curr (Current Value)**: The current element being processed.
- **0**: Initial value.

### 4. `forEach()` (Iterate)
The `forEach` function executes a provided function once for each array element. It does **not** return a new array.
```javascript
const n = [1, 2, 3];
n.forEach((num) => console.log(num * 2));
// Output: 2, 4, 6
```

### 5. `find()`
The `find` function returns the **first element** in the array that satisfies a given condition.
```javascript
const n = [1, 2, 3, 4, 5];
const fEven = n.find((num) => num % 2 === 0);
console.log(fEven); // 2
```

### 6. `some()`
The `some` function checks if **at least one** array element satisfies a condition. Returns `true` or `false`.
```javascript
const n = [1, 2, 3, 4, 5];
const hasNeg = n.some((num) => num < 0);
console.log(hasNeg); // false
```

### 7. `every()`
The `every` function checks if **all** array elements satisfy a condition.
```javascript
const n = [1, 2, 3, 4, 5];
const allPos = n.every((num) => num > 0);
console.log(allPos); // true
```

## 3. Use Cases of Higher Order Functions

### 1. Passing Functions as Arguments
```javascript
function greet(name, callback) {
    console.log("Hello, " + name);
    callback();
}
function sayGoodbye() {
    console.log("Goodbye!");
}
greet("Ajay", sayGoodbye);
```

### 2. Returning Functions from Functions (Closure)
```javascript
function mul(factor) {
    return function(num) {
        return num * factor;
    };
}
const mul2 = mul(2);
console.log(mul2(5)); // 10
const mul3 = mul(3);
console.log(mul3(5)); // 15
```

## 4. Advanced Techniques

### 1. Function Composition
Combining multiple functions to create a new function. `f(g(x))`
```javascript
function add(x) { return x + 2; }
function mul(x) { return x * 3; }

function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}
var res = compose(add, mul)(4);
console.log(res); // (4 * 3) + 2 = 14
```

### 2. Currying
Transforming a function that takes multiple arguments into a series of functions that each take one argument.
```javascript
function mul(x) {
    return function(y) {
        return x * y;
    };
}
var mulFn = mul(2);
console.log(mulFn(5)); // 10
```

### 3. Memoization (Caching)
Technique where function results are cached so repeated calls return faster.
```javascript
function memoize(func) {
    var cache = {};
    return function (arg) {
        if (cache[arg]) {
            return cache[arg];
        } else {
            var res = func(arg);
            cache[arg] = res;
            return res;
        }
    };
}
function slow(num) {
    console.log("Computing...");
    return num * 2;
}
var fast = memoize(slow);
console.log(fast(5)); // Computing... 10
console.log(fast(5)); // 10 (cached)
```

## 5. FactorialLogic in Depth
The factorial of `n` (`n!`) is `n × (n-1) × ... × 1`. Here are 5 ways to calculate it.

### 1. Using Iteration (For Loop)
Simple and easy to understand.
```javascript
function fact(n) {
    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}
console.log(fact(5)); // 120
```

### 2. Using Recursion
Elegant but can be less efficient for very large numbers.
```javascript
function fact(n) {
    if (n === 0 || n === 1) return 1;
    return n * fact(n - 1);
}
console.log(fact(5)); // 120
```

### 3. Using a While Loop
Similar to iteration but different structure.
```javascript
function fact(n) {
    let res = 1;
    while (n > 1) {
        res *= n;
        n--;
    }
    return res;
}
console.log(fact(5)); // 120
```

### 4. Using Memoization (Cached Recursion)
Efficient for repeated calls.
```javascript
const fact = (function () {
    const cache = {};
    return function facto(n) {
        if (n === 0 || n === 1) return 1;
        if (cache[n]) {
            console.log("value from cache");
            return cache[n];
        }
        cache[n] = n * facto(n - 1);
        return cache[n];
    };
})();
console.log(fact(5));
```

### 5. Using Functional Programming
Using `Array.from` and `reduce`. Concise and elegant.
```javascript
const fact = (n) =>
    n === 0 || n === 1
        ? 1
        : Array.from({ length: n }, (_, i) => i + 1).reduce(
            (acc, num) => acc * num,
            1
        );
console.log(fact(5));
```

## 6. Related Topics
- [07_Arrays.md](./07_Arrays.md) - Basic Array methods.
- [06_Functions.md](./06_Functions.md) - Function basics.
