# 3.3 Operators

## 1. What is it?
Operators are symbols that check, change, or combine values.

## 2. Why it is used?
To perform math (`+`), compare values (`>`), or make logical decisions (`&&`).

## 3. Syntax / Structure
```javascript
let sum = 10 + 5;
let isAdult = age >= 18;
```

## 4. Detailed Explanation

### Arithmetic Operators
`+` (Add), `-` (Subtract), `*` (Multiply), `/` (Divide), `%` (Modulus/Remainder), `**` (Exponent).

### Assignment Operators
`=` (Assign), `+=` (Add & Assign), `-=` (Subtract & Assign).
`x += 5` is short for `x = x + 5`.

### Comparison Operators
- `==`: Loose equality (Checks value). `5 == "5"` is `true`.
- `===`: Strict equality (**Value AND Type**). `5 === "5"` is `false`. **ALWAYS USE THIS.**
- `!=` vs `!==`: Loose vs Strict inequality.
- `>`, `<`, `>=`, `<=`.

### Logical Operators
- `&&` (AND): Both must be true.
- `||` (OR): At least one must be true.
- `!` (NOT): Flips the boolean (True -> False).

## 5. Examples

### Arithmetic
```javascript
let apples = 5;
let remainder = 10 % 3; // Result is 1
let power = 2 ** 3;     // Result is 8 (2*2*2)
```

### String Concatenation
The `+` operator works on strings too.
```javascript
let firstName = "John ";
let lastName = "Doe";
console.log(firstName + lastName); // "John Doe"
```

### Comparison Weirdness (Coercion)
```javascript
console.log(1 == "1");  // true (Matches value)
console.log(1 === "1"); // false (Number !== String)

console.log(0 == false);  // true
console.log(0 === false); // false
```

### Logical
```javascript
let hasID = true;
let hasTicket = false;

// Can enter?
if (hasID && hasTicket) {
    console.log("Enter");
} else {
    console.log("Stop"); // This runs
}
```

## 6. Key Points to Remember
- **Equality**: Always use `===` and `!==`. It saves you from invisible bugs where JS tries to convert types automatically.
- **Increment**: `i++` adds 1 to `i`. Very common in loops.

## 7. Common Mistakes
- **Mistake**: Confusing `=` (Assignment) with `==` (Comparison).
  ```javascript
  if (x = 5) { ... } // This assigns 5 to x, and returns 5 (true). It ALWAYS runs!
  ```
  **Fix**: `if (x === 5)`

## 8. Pro Tips / Tricks
- **Short-circuit Evaluation**:
  ```javascript
  // Uses 'name' if it exists, otherwise uses 'Guest'
  let displayName = userName || "Guest";
  ```
- **Ternary Operator**: A one-line if-statement.
  `condition ? trueVal : falseVal`
  ```javascript
  let type = age >= 18 ? "Adult" : "Minor";
  ```

## 9. Related Topics
- [04_Control_Flow.md](./04_Control_Flow.md) - Using operators in If statements.
