# 3.3 Operators

## 1. What is it?
Operators are symbols that check, change, or combine values. They are the building blocks of expressions.

## 2. Why it is used?
To perform math (`+`), compare values (`>`), make logical decisions (`&&`), or manipulate bits.

## 3. Syntax / Structure
```javascript
let sum = 10 + 5;
let isAdult = age >= 18;
let safeName = user?.name; // Optional Chaining
```

## 4. Detailed Explanation

### 1. Arithmetic Operators
`+` (Add), `-` (Subtract), `*` (Multiply), `/` (Divide), `%` (Modulus/Remainder), `**` (Exponent).

### 2. Assignment Operators
`=` (Assign), `+=` (Add & Assign), `-=` (Subtract & Assign), `*=` (Multiply & Assign).
`x += 5` is short for `x = x + 5`.

### 3. Comparison Operators
- `==`: Loose equality (Checks value). `5 == "5"` is `true`.
- `===`: Strict equality (**Value AND Type**). `5 === "5"` is `false`. **ALWAYS USE THIS.**
- `!=` vs `!==`: Loose vs Strict inequality.
- `>`, `<`, `>=`, `<=`.

### 4. Logical Operators
- `&&` (AND): Both must be true.
- `||` (OR): At least one must be true.
- `!` (NOT): Flips the boolean (True -> False).

### 5. Bitwise Operators (Binary Level)
Operates on the binary representation of numbers.
- `&` (AND), `|` (OR), `^` (XOR), `~` (NOT).
- `<<` (Left Shift), `>>` (Right Shift).

### 6. Unary Operators
Operate on a single operand.
- `++` (Increment), `--` (Decrement).
- `typeof`: Returns the type definition.
- `+` (Unary Plus): Converts string to number.
- `delete`: Removes a property from an object.

### 7. Relational Operators
- `in`: Checks if a property exists in an object.
- `instanceof`: Checks prototype chain.

### 8. Special Operators
- **Ternary**: `condition ? true : false`
- **Comma (`,`)**: Evaluates operands from left to right, returns result of the last one.
- **BigInt Operators**: Logic for `n` suffixed numbers.
- **Optional Chaining (`?.`)**: Safely access nested properties.
- **Nullish Coalescing (`??`)**: Returns right-side operand if left is `null` or `undefined`.
- **String Operators**: `+` for concatenation.

## 5. Examples

### Arithmetic & Assignment
```javascript
let x = 10;
x += 5; // 15
let power = 2 ** 3; // 8
```

### Comparison Weirdness (Coercion)
```javascript
console.log(1 == "1");  // true (Matches value)
console.log(1 === "1"); // false (Number !== String)
```

### Bitwise Operations
```javascript
// 5 (0101) & 1 (0001) -> 0001 (1)
console.log(5 & 1); // 1
```

### Unary Operators
```javascript
let counter = 5;
console.log(counter++); // 5 (Prints then increments)
console.log(++counter); // 7 (Increments then prints)
console.log(typeof "Hello"); // "string"
```

### Relational & Special
```javascript
// 'in' Operator
const car = { make: "Toyota" };
console.log("make" in car); // true

// Comma Operator
let a = (1, 2, 3);
console.log(a); // 3

// Optional Chaining
const user = { address: { city: "New York" } };
console.log(user.contact?.phone); // undefined (No error thrown!)
```

### BigInt
```javascript
const bigNum = 9007199254740991n;
const result = bigNum + 1n; // Works!
```

## 6. Key Points to Remember
- **Equality**: Always use `===` and `!==`. It saves you from invisible bugs where JS tries to convert types automatically.
- **Order of Operations**: `*` and `/` happen before `+` and `-`. Use parenthesis `()` to force order.

## 7. Common Mistakes
- **Mistake**: Confusing `=` (Assignment) with `==` (Comparison).
  ```javascript
  if (x = 5) { ... } // This assigns 5 to x, and returns 5 (true). It ALWAYS runs!
  ```
- **Mistake**: Using bitwise `&` or `|` instead of logical `&&` or `||`.

## 8. Pro Tips / Tricks
- **Short-circuit Evaluation**:
  ```javascript
  // Uses 'name' if it exists, otherwise uses 'Guest'
  let displayName = userName || "Guest";
  ```
- **Ternary Operator**: A one-line if-statement.
  ```javascript
  let type = age >= 18 ? "Adult" : "Minor";
  ```

## 9. Related Topics
- [04_Control_Flow.md](./04_Control_Flow.md) - Using operators in If statements.
- [02_Variables_and_Data_Types.md](./02_Variables_and_Data_Types.md) - Types that operators work on.
