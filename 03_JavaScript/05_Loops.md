# 3.9 Loops

## 1. What is it?
Loops allow you to run a block of code repeatedly.  They consist of three parts:
1.  **Initialization** (Start)
2.  **Condition** (Stop)
3.  **Increment/Decrement** (Step)

## 2. Why it is used?
- **Iterating**: Processing items in an array one by one.
- **Repeating**: Executing a task until a condition is met.
- **Automation**: Performing repetitive calculations (like printing a table).

## 3. Detailed Explanation

### 1. `for` Loop
The classic loop. Best when you know exactly how many times to run.
**Syntax**: `for (statement 1; statement 2; statement 3) { ... }`
- **Statement 1**: Initialize counter (executed once).
- **Statement 2**: Condition check (if true, loop continues).
- **Statement 3**: Update counter (after code execution).

### 2. `while` Loop
Best when the number of iterations is **unknown**. It runs **as long as** the condition is true.
**Syntax**: `while (condition) { ... }`

### 3. `do-while` Loop
Similar to `while`, but guarantees the code runs **at least once**. It checks the condition *after* execution.
**Syntax**: `do { ... } while (condition);`

### 4. Comparison Table
| Loop | Description | When to use? |
| :--- | :--- | :--- |
| **for** | Repeats for a specific count. | Known number of iterations. |
| **while** | Repeats while condition is true. | Unknown number of iterations. |
| **do-while** | Repeats while condition is true, runs once first. | Must execute at least once (e.g., menu). |
| **for...of** | Iterates over values (modern). | Arrays, Strings. |
| **for...in** | Iterates over properties. | Objects. |

## 5. Examples

### 1. For Loop (Print Table of 5)
```javascript
let x = 5;
for (let i = 1; i <= 10; i++) {
    console.log(`${x} * ${i} = ${x * i}`);
}
```

### 2. While Loop (Find Primes up to 20)
```javascript
function findPrimes() {
    let num = 2;
    while (num <= 20) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) console.log(num);
        num++;
    }
}
findPrimes();
```

### 3. Factorial of a Number (For Loop)
Calculate `n!` (e.g., 5! = 5*4*3*2*1 = 120).
```javascript
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
console.log(factorial(5)); // 120
```

### 4. Traverse Array (While Loop)
```javascript
let arr = [10, 20, 30, 40];
let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}
```

### 5. Do-While Example
```javascript
let count = 1;
do {
    console.log("Count is: " + count);
    count++;
} while (count <= 5);
```

## 6. Key Points to Remember
- **Infinite Loops**: Always ensure your loop has an exit condition (increment `i` or change the `while` variable), otherwise the browser will crash.
- **`break`**: Exits the loop immediately.
- **`continue`**: Skips the current iteration.

## 7. Common Mistakes
- **Mistake**: Using `for...in` on Arrays. It iterates over indices (strings), not values. Use `for...of` instead.
- **Mistake**: Forgetting to increment the counter in a `while` loop (leads to infinite loop).

## 8. Related Topics
- [04_Control_Flow.md](./04_Control_Flow.md) - Break/case structures.
- [07_Arrays.md](./07_Arrays.md) - Looping through arrays.
