# 3.5d Function Currying

Currying is a transformation of a function with multiple arguments into a sequence of functions, each taking a single argument.

It transforms `f(a, b, c)` into `f(a)(b)(c)`.

## 1. Example: Normal vs Curried

### Normal Function
```javascript
function add(a, b) {
    return a + b;
}
console.log(add(2, 3)); // 5
```

### Curried Function
```javascript
function add(a) {
    return function(b) {
        return a + b;
    };
}
const addFive = add(5); // Returns a function with 'a' fixed as 5
console.log(addFive(4)); // 9 (5 + 4)

// Or called directly:
console.log(add(5)(4)); // 9
```

## 2. Why Use Currying?
1.  **Partial Application**: Pre-configuring functions parameters.
2.  **Functional Programming**: Useful in function composition (`a(b(c(x)))`).
3.  **Higher Order Functions**: Useful for `map`, `filter`, `reduce`.

## 3. Currying with Arrow Functions (ES6)

The syntax becomes extremely concise with Arrow Functions.
```javascript
const add = a => b => a + b;

console.log(add(5)(4)); // 9
```

## 4. Real World Use Case (Infinite Currying)

Sometimes you see interview questions like `sum(1)(2)(3)...()`.

```javascript
function sum(a) {
  return function(b) {
    if (b) {
      return sum(a + b); // Recursive call
    }
    return a; // Base case (when no arg passed)
  };
}
console.log(sum(1)(2)(3)(4)()); // 10
```
