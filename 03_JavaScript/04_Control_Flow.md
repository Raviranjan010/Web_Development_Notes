# 3.4 Control Flow (Conditionals)

## 1. What is it?
Control flow statements in JavaScript control the order in which code is executed. These statements allow you to make decisions, repeat tasks, and jump between parts of a program based on specific conditions.

## 2. Why it is used?
Programs aren't useful if they do the exact same thing every time.
- **Decision-Making**: To execute specific blocks of code based on conditions (e.g., if, if...else).
- **Branching**: To exit loops or skip iterations (break, continue).
- **Switching**: To handle multiple conditions effectively (switch).

## 3. Syntax / Structure
```javascript
if (condition) {
    // Code if true
} else {
    // Code if false
}
```

## 4. Detailed Explanation

### 1. `if` Statement
Executes a block of code **only** if a specified condition is true.

### 2. `if...else` Statement
Provides an alternate block of code to execute if the condition is false.

### 3. `if...else if...else` Statement
Used when you want to handle multiple conditions sequentially.

### 4. `switch` Statement
Evaluates an expression and executes a block of code based on matching cases. It provides an alternative to long `if-else` chains.

### 5. Ternary Operator
A shorthand for simple if-else statements: `condition ? true : false`.

## 5. Examples

### 1. Categorize a Score (If-Else If)
```javascript
function categorizeGrade(score) {
    if (score >= 90) {
        console.log("Grade: A");
    } else if (score >= 80) {
        console.log("Grade: B");
    } else if (score >= 70) {
        console.log("Grade: C");
    } else {
        console.log("Grade: D");
    }
}
categorizeGrade(85); // Output: Grade: B
```

### 2. Identify Weekday or Weekend (Switch)
```javascript
function checkDay(day) {
    switch (day) {
        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
        case "Friday":
            console.log("Weekday");
            break;
        case "Saturday":
        case "Sunday":
            console.log("Weekend");
            break;
        default:
            console.log("Invalid Day");
    }
}
checkDay("Sunday"); // Output: Weekend
```

### 3. Ternary Operator
```javascript
let a = 10;
console.log(a === 5 ? "a is equal to 5" : "a is not equal to 5");
```

## 6. Key Points to Remember
- **Break Command**: In a `switch` statement, if you forget `break`, the code "falls through" and executes the next case too.
- **Truthiness**: `0`, `""`, `null`, `undefined`, `NaN` are **falsy**. Everything else is **truthy**.

## 7. Common Mistakes
- **Mistake**: Using `=` instead of `===` in the condition.
- **Mistake**: Not accounting for all edge cases (e.g., what if `score` is negative?).

## 8. Pro Tips / Tricks
- **Early Return**: Instead of nesting huge if-else blocks inside a function, check for the negative case first and return.
  ```javascript
  function checkUser(user) {
      if (!user) return; // Stop if no user
      // ... continue logic
  }
  ```
- **Object Lookup**: Sometimes an object map is cleaner than a switch statement.
  ```javascript
  const roles = { admin: "Mega Access", editor: "Edit Access" };
  console.log(roles[userRole] || "No Access");
  ```

## 9. Related Topics
- [03_Operators.md](./03_Operators.md) - Using `&&` and `||` in conditions.
- [05_Loops.md](./05_Loops.md) - Repeating code based on conditions.
