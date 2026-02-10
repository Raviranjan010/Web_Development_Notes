# 3.2 Variables and Data Types

## 1. What is it?
- **Variables**: Containers for storing data values. Think of them as labeled boxes.
- **Data Types**: The *kind* of data inside the box (Text, Number, Boolean, etc.).

## 2. Why it is used?
Without variables, we'd have to hardcode everything. Variables allow programs to process dynamic information (e.g., `userScore = userScore + 10`).

## 3. Syntax / Structure
Modern JS uses `let` and `const`. Old JS used `var`.

```javascript
let myName = "John";  // Can change
const pi = 3.14;      // Constant (Cannot change)
```

## 4. Detailed Explanation

### Declaring Variables
1.  **`let`**: Block-scoped. Can be reassigned. Use for loop counters or values that change.
2.  **`const`**: Block-scoped. Cannot be reassigned. **Use this by default**.
3.  **`var`**: Function-scoped. Can be redeclared. **Avoid using `var`** in modern code.

### Data Types (Primitives)
1.  **String**: Text. `"Hello"` or `'Hello'`.
2.  **Number**: Integers (`10`) or Decimals (`10.5`).
3.  **Boolean**: True/False logic. `true` or `false`.
4.  **Null**: Intentionally empty value.
5.  **Undefined**: A variable declared but not assigned a value.
6.  **Symbol**: Unique identifier (Advanced).
7.  **BigInt**: Really large integers (Advanced).

### Data Types (Reference)
1.  **Object**: Key-value pairs (Arrays, Functions are also Objects).

## 5. Examples

### Declaration
```javascript
const name = "Alice";
let age = 25;
age = 26; // Allowed

// name = "Bob"; // ERROR: Assignment to constant variable.
```

### Strings (Template Literals)
The modern way to combine strings. Use backticks `` ` ``.
```javascript
let score = 100;
// Old way
console.log("Your score is " + score);

// Modern way (Interpolation)
console.log(`Your score is ${score}`);
```

### Checking Types
```javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 42);      // "number"
console.log(typeof true);    // "boolean"
console.log(typeof null);    // "object" (This is a known JS bug, don't worry about it)
```

## 6. Key Points to Remember
- JS is **Dynamically Typed**. You don't need to specify `int` or `string`.
  `let x = 5; x = "Text";` is valid (though confusing).
- CamelCase naming convention: `myVariableName` is standard.

## 7. Common Mistakes
- **Mistake**: Using `var`.
  **Why**: It creates global variables easily, leading to bugs.
  **Fix**: Always use `const` first. If you need to change it, change it to `let`.

## 8. Pro Tips / Tricks
- **Const for Objects**: You CAN modify the properties of a `const` object, just not the object itself.
  ```javascript
  const car = { color: "red" };
  car.color = "blue"; // Allowed!
  // car = { color: "green" }; // Error!
  ```

## 9. Related Topics
- [03_Operators.md](./03_Operators.md) - Performing math on variables.
- [07_Objects.md](./07_Objects.md) - Complex data structures.
