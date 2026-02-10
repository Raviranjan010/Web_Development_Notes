# 3.9 Loops

## 1. What is it?
Loops allow you to run a block of code repeatedly.

## 2. Why it is used?
- iterating over arrays (processing a list of items).
- repeating an action until a condition is met (e.g., "Keep asking for password until correct").

## 3. Syntax / Structure
Common loops: `for`, `while`, `do-while`, `for...of` (modern).

## 4. Detailed Explanation

### 1. `for` Loop
The classic loop. Best when you know exactly how many times to run.
`for (start; condition; set) { ... }`

### 2. `while` Loop
Best when the number of iterations is unknown (depends on a condition).
`while (condition) { ... }`

### 3. `do-while` Loop
Guarantees the code runs **at least once**, even if the condition is false initially.

## 5. Examples

### Standard For Loop
```javascript
// Print 1 to 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

### While Loop
```javascript
let health = 100;
while (health > 0) {
    console.log("Still alive!");
    health -= 20; // Reduce health to eventually stop loop
}
```

### For...of Loop (Best for Arrays/Strings)
Simpler syntax for iterating over items.
```javascript
const colors = ["Red", "Green", "Blue"];

for (const color of colors) {
    console.log(color);
}
```

### For...in Loop (Best for Objects)
Iterates over keys of an object.
```javascript
const user = { name: "John", age: 30 };

for (const key in user) {
    console.log(`${key}: ${user[key]}`);
}
```
*Note: Use `for...of` for arrays, `for...in` for objects.*

### Break and Continue
- **`break`**: Exits the loop immediately.
- **`continue`**: Skips the current iteration and jumps to the next one.

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) break; // Stops loop at 5
    if (i % 2 === 0) continue; // Skips even numbers
    console.log(i); // Prints 1, 3
}
```

## 6. Key Points to Remember
- **Infinite Loops**: If your condition never becomes `false` (e.g., `while(true)` without a break), your browser tab will freeze/crash. Always ensure loop variables change.

## 7. Common Mistakes
- **Mistake**: Using `for...in` on Arrays.
  **Why**: It iterates over indices (strings "0", "1"), not values, and order isn't guaranteed.
  **Fix**: Use `for...of` or `forEach`.

## 8. Pro Tips / Tricks
- **Performance**: In very large loops, standard `for` loop is technically faster than `forEach`, but `forEach`/`for...of` is much more readable. Prioritize readability unless performance is a critical bottleneck.

## 9. Related Topics
- [06_Arrays.md](./06_Arrays.md) - Looping through arrays.
- [04_Control_Flow.md](./04_Control_Flow.md) - Break/case structures.
