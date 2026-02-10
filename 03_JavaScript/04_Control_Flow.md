# 3.4 Control Flow (Conditionals)

## 1. What is it?
Control flow determines which blocks of code are executed based on conditions. It allows your program to make decisions.

## 2. Why it is used?
Programs aren't useful if they do the exact same thing every time.
- *"If the user is logged in, show profile. Else, show login button."*
- *"If score > 50, you win."*

## 3. Syntax / Structure
Common structures: `if-else`, `switch`, and `ternary`.

```javascript
if (condition) {
    // Code if true
} else {
    // Code if false
}
```

## 4. Detailed Explanation

### If...Else
The standard way to make decisions.
- `if`: Starts the check.
- `else if`: Checks another condition if the first one failed.
- `else`: Runs if NONE of the above were true.

### Switch Statement
Useful when checking **one** variable against **many** possible values (e.g., checking user role: 'admin', 'editor', 'guest').

### Ternary Operator
A shortcut for simple if-else statements.
`condition ? trueCode : falseCode`

## 5. Examples

### Basic If-Else
```javascript
let hour = 14; // 2 PM

if (hour < 12) {
    console.log("Good Morning");
} else if (hour < 18) {
    console.log("Good Afternoon");
} else {
    console.log("Good Evening");
}
```

### Switch Statement
```javascript
let day = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break; // Stops execution here
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Invalid Day");
}
```

### Ternary Operator (One-Liner)
```javascript
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // "Yes"
```

## 6. Key Points to Remember
- **Break Command**: In a `switch` statement, if you forget `break`, the code "falls through" and executes the next case too, even if it doesn't match!
- **Truthiness**: In JS, values like `0`, `""` (empty string), `null`, `undefined`, and `NaN` are considered **falsy**. Everything else is **truthy**.

## 7. Common Mistakes
- **Mistake**: Using `=` instead of `===` in the condition.
  `if (x = 10)` assigns 10 to x and runs the block.
- **Mistake**: Not accounting for all edge cases (e.g., what if `hour` is exactly 12?).

## 8. Pro Tips / Tricks
- **Early Return**: Instead of nesting huge if-else blocks inside a function, check for the negative case first and return.
  ```javascript
  function checkUser(user) {
      if (!user) return; // Stop if no user
      // ... continue logic
  }
  ```

## 9. Related Topics
- [03_Operators.md](./03_Operators.md) - Using `&&` and `||` in conditions.
- [09_Loops.md](./09_Loops.md) - Repeating code based on conditions.
