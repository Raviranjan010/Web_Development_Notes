# 3.2 Variables and Data Types

## 1. What is it?
- **Variables**: Containers for storing data values. Think of them as labeled boxes.
- **Data Types**: The *kind* of data inside the box (Text, Number, Boolean, etc.).

## 2. Why it is used?
Without variables, we'd have to hardcode everything. Variables allow programs to process dynamic information (e.g., `userScore = userScore + 10`).

## 3. Syntax / Structure
Modern JS uses `let` and `const`. Old JS used `var`.

```javascript
var a = 10;       // Old style (Function/Global Scoped)
let b = 20;       // Preferred (Block Scoped)
const c = 30;     // Constant (Block Scoped)
```

## 4. Detailed Explanation

### 1. Variable Keywords Overview
| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function Scope | Block Scope | Block Scope |
| **Reassignable** | Yes | Yes | No |
| **Redeclarable** | Yes (in same scope) | No | No |
| **Hoisting** | Yes (Initialized as `undefined`) | Yes (In "Temporal Dead Zone") | Yes (In "Temporal Dead Zone") |

### 2. Variable Scopes
Scope defines where a variable can be accessed.

#### A. Global Scope
Variables declared outside any function or block. Accessible everywhere.
```javascript
let globalLet = "I am global";
console.log(window.globalLet); // undefined (let is not attached to window)
var globalVar = "I am also global";
console.log(window.globalVar); // "I am also global"
```

#### B. Function Scope
Variables declared with `var` inside a function are **private** to that function.
```javascript
function test() {
    var x = 10;
}
console.log(x); // Error: x is not defined
```

#### C. Block Scope (`let` & `const`)
Variables declared inside `{ }` (if, for, while) are only accessible within that block.
```javascript
if (true) {
    let y = 20;
    const z = 30;
    var a = 40; // var ignores block scope!
}
console.log(y); // Error
console.log(a); // 40 (Accessible!)
```

#### D. Lexical Scope (Closures)
Inner functions can access variables from their outer functions.
```javascript
function outer() {
    let outerVar = "Outer";
    function inner() {
        console.log(outerVar); // Works!
    }
    inner();
}
```

### 3. Naming Rules
1.  Must begin with a **letter**, **underscore `_`**, or **dollar sign `$`**.
2.  Cannot start with a number.
3.  **Case-sensitive** (`age` vs `Age`).
4.  No reserved keywords (`function`, `class`, `return`).
    - `let 123name = "Invalid";` (Error)
    - `let $price = 100;` (Valid)

### 4. Data Types (Primitives)
Immutable values stored directly in memory (Stack).

1.  **Number**: Integers and Floats (`10`, `10.5`). `NaN` is also a Number type.
2.  **String**: Text in quotes (`""`, `''`, `` ` ``).
3.  **Boolean**: `true` or `false`.
4.  **Null**: Intentionally empty value. `typeof null` is `"object"` (Legacy bug).
5.  **Undefined**: Declared but not assigned.
6.  **Symbol**: Unique identifier (ES6). `Symbol("id") !== Symbol("id")`.
7.  **BigInt**: Large integers (`9007199254740991n`).

### 5. Data Types (Non-Primitive / Reference)
Mutable values stored in Heap memory.

1.  **Object**: Key-value pairs. `{ name: "John" }`.
2.  **Array**: Ordered list. `[1, 2, 3]`.
3.  **Function**: Codes blocks.
4.  **Date**: `new Date()`.
5.  **RegExp**: Patterns `/abc/`.

## 5. Examples

### Redeclaration Issues
```javascript
var x = 10;
var x = 20; // Allowed (Bad practice)

let y = 30;
// let y = 40; // SyntaxError: Identifier 'y' has already been declared
```

### Mutating `const` Objects
You cannot reassign the variable, but you **can** change its contents.
```javascript
const user = { name: "Alice" };
user.name = "Bob"; // Allowed!

// user = { name: "Charlie" }; // Error: Assignment to constant variable.
```

### Template Literals (Strings)
```javascript
let age = 25;
console.log(`I am ${age} years old.`); // Embedded expression
```

## 6. Key Points & Interesting Facts
- **Dynamically Typed**: Variables are not bound to a specific kind of data. `let x = 42; x = "Text";` is valid.
- **NaN**: Stands for "Not-a-Number", but `typeof NaN` is `number`. It results from invalid math like `"abc" / 2`.
- **Everything is an Object**: Primitives like strings have methods (`"hello".toUpperCase()`) because JS creates a temporary wrapper object around them.
- **Shadowing**: A local variable can "shadow" a global one with the same name.

## 7. Common Mistakes
- **Mistake**: Using `var` inside a loop or if-statement giving it global/function scope accidentally.
- **Mistake**: Thinking `const` makes an array immutable (you can still push/pop items).

## 8. Related Topics
- [03_Operators.md](./03_Operators.md) - Operands and Logic.
- [01_b_Code_Execution.md](./01_b_Code_Execution.md) - Hoisting in depth.
