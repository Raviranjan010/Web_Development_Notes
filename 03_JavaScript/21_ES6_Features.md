# 3.13 ES6+ Features (Modern JavaScript)

ES6 (ECMAScript 2015) was a major update to JavaScript that introduced significant syntax improvements and new features to write cleaner, more maintainable code.

## 1. Let and Const

ES6 introduced `let` and `const` for variable declaration, which provide block scoping unlike `var` which is function-scoped.

-   **`let`**: Block-scoped, reassignable.
    ```javascript
    let n = 10;
    {
        let n = 2; // Block-scoped variable
        console.log(n); // 2
    }
    console.log(n); // 10
    ```
-   **`const`**: Block-scoped, NOT reassignable (immutable binding).
    ```javascript
    const PI = 3.14159;
    // PI = 3; // Error: Assignment to constant variable
    ```
    *Note: Objects and arrays declared with `const` can still be mutated (properties changed).*

## 2. Arrow Functions

Arrow functions provide a concise syntax for writing function expressions and do not have their own `this`; they inherit `this` from the parent scope.

```javascript
// Traditional function
function add(a, b) { return a + b; }

// Arrow function (Implicit return for single expression)
const add = (a, b) => a + b;

// Multi-line arrow function
const greet = name => {
    return `Hello, ${name}!`;
};
```

## 3. Template Literals

Template literals are string literals allowing embedded expressions. They use backticks (\`) instead of single or double quotes.

### Features:
1.  **String Interpolation**: Embed variables/expressions directly.
    ```javascript
    let name = "John";
    console.log(`Hello, ${name}!`);
    ```
2.  **Multi-line Strings**: No need for `\n`.
    ```javascript
    const text = `This is a multi-line
    string that spans across
    several lines.`;
    ```
3.  **Tagged Templates**: Parse template literals with a function.
    ```javascript
    function tag(strings, ...values) {
        // strings: array of string parts
        // values: array of interpolated values
        return strings[0] + values[0].toUpperCase();
    }
    const name = "world";
    console.log(tag`Hello, ${name}`); // "Hello, WORLD"
    ```

## 4. Destructuring Assignment

Destructuring allows unpacking values from arrays or properties from objects into distinct variables.

### Array Destructuring
```javascript
const fruits = ['apple', 'banana', 'cherry'];
const [first, second] = fruits;
console.log(first, second); // apple banana

// Skipping items
const [a, , c] = [1, 2, 3]; // a=1, c=3
```

### Object Destructuring
```javascript
const user = { name: "Raj", age: 25 };
const { name, age } = user;
console.log(name, age); // Raj 25

// Renaming variables
const { name: userName } = user;
console.log(userName); // Raj
```

### Nested Destructuring
```javascript
const user = { 
    id: 1, 
    details: { city: "Delhi", zip: "110001" } 
};
const { details: { city } } = user;
console.log(city); // Delhi
```

### Function Parameters
```javascript
function greet({ name, age }) {
    console.log(`Hello ${name}, age ${age}`);
}
greet({ name: "Alice", age: 30 });
```

## 5. Default Parameters

Allows functions to have default values for parameters if no value or `undefined` is passed.

```javascript
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
console.log(greet()); // Hello, Guest!
```

## 6. Rest Parameter (`...args`)

The Rest Parameter collects multiple **remaining** arguments into a single array. It must be the last parameter.

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6

// With other parameters
function race(winner, ...runners) {
    console.log(winner, runners);
}
race("Usain", "Justin", "Asafa"); // Usain ["Justin", "Asafa"]
```

## 7. Spread Operator (`...`)

The Spread Operator **expands** an iterable (array, string, etc.) into individual elements.

### Use Cases:
1.  **Merging Arrays**:
    ```javascript
    const a = [1, 2];
    const b = [3, 4];
    const merged = [...a, ...b]; // [1, 2, 3, 4]
    ```
2.  **Cloning Arrays (Shallow Copy)**:
    ```javascript
    const original = [1, 2];
    const copy = [...original];
    ```
3.  **Spreading into Objects**:
    ```javascript
    const obj1 = { x: 1, y: 2 };
    const obj2 = { z: 3 };
    const mergedObj = { ...obj1, ...obj2 }; // { x: 1, y: 2, z: 3 }
    ```

### Rest vs Spread

| Feature | Rest Parameter `(...args)` | Spread Operator `[...arr]` |
| :--- | :--- | :--- |
| **Action** | **Collects** multiple elements into an array. | **Expands** an element into multiple elements. |
| **Context** | Function definitions (parameters), Destructuring (LHS). | Function calls (arguments), Array/Object literals (RHS). |

## 8. For...of Loop

Iterates over iterable objects (Arrays, Strings, Maps, Sets, etc.).

```javascript
const fruits = ["apple", "banana"];
for (const fruit of fruits) {
    console.log(fruit);
}
```

## 9. Maps and Sets

-   **Map**: A collection of keyed data items, similar to an Object. Keys can be of **any type**.
    ```javascript
    const map = new Map();
    map.set("name", "John");
    map.set(1, "number one");
    console.log(map.get(1)); // "number one"
    ```
-   **Set**: A collection of **unique** values.
    ```javascript
    const set = new Set([1, 2, 2, 3]);
    console.log(set); // Set { 1, 2, 3 }
    ```

## 10. Classes

ES6 Classes are syntactical sugar over JavaScript's existing prototype-based inheritance.

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
}
const dog = new Animal("Dog");
dog.speak();
```

*(See [28_OOP_in_JavaScript.md](./28_OOP_in_JavaScript.md) for a detailed deep dive into OOP)*

## 11. Promises

Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value.

```javascript
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Success!"), 1000);
});

myPromise.then(value => console.log(value));
```
*(See [25_Asynchronous_JS.md](./25_Asynchronous_JS.md) for full details)*

## 12. Related Topics
- [08_Objects.md](./08_Objects.md)
- [06_Functions.md](./06_Functions.md)
- [28_OOP_in_JavaScript.md](./28_OOP_in_JavaScript.md)
