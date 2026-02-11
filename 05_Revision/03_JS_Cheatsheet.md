# 03 JS Cheatsheet

Quick reference for JavaScript syntax, methods, and DOM manipulation.

## 📦 Section 1: Variables

```javascript
const pi = 3.14;   // Constant (Cannot change). USE BY DEFAULT.
let age = 25;      // Variable (Can change). Use for counters, flags.
var old = 10;      // Legacy (Function scoped). AVOID.
```

## 🔢 Section 2: Data Types
*   **Primitive**: String, Number, Boolean, Null, Undefined, Symbol.
*   **Reference**: Object, Array, Function.

---

## 🔧 Section 3: Functions

**Standard:**
```javascript
function add(a, b) {
    return a + b;
}
```

**Arrow (ES6):**
```javascript
const add = (a, b) => a + b; // Implicit return for one line
```

---

## 📂 Section 4: Arrays & Methods

```javascript
const nums = [1, 2, 3, 4];

// Add/Remove
nums.push(5);    // Add to end
nums.pop();      // Remove from end
nums.unshift(0); // Add to start

// Higher Order Methods
// 1. Map (Transform each item)
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8]

// 2. Filter (Select items)
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// 3. ForEach (Loop - no return)
nums.forEach(n => console.log(n));

// 4. Find (First match)
const firstEven = nums.find(n => n % 2 === 0); // 2
```

---

## 🧱 Section 5: Objects & JSON

```javascript
const user = {
    name: "John",
    age: 30,
    greet() { console.log("Hi!"); }
};

// Accessing
console.log(user.name);      // Dot notation
console.log(user['age']);    // Bracket notation

// ES6 Destructuring
const { name, age } = user;  // Extracts variables

// JSON
const jsonStr = JSON.stringify(user); // Object -> String
const parsed = JSON.parse(jsonStr);   // String -> Object
```

---

## 🌐 Section 6: DOM Manipulation

```javascript
// Selecting
const btn = document.querySelector("#myBtn");
const list = document.querySelectorAll(".item");

// Changing Content
btn.innerText = "Clicked!";
btn.innerHTML = "<span>Bold</span>";

// Styling
btn.style.backgroundColor = "green";

// Classes
btn.classList.add("active");
btn.classList.remove("hidden");
btn.classList.toggle("dark-mode");
```

---

## ⚡ Section 7: Events

```javascript
btn.addEventListener("click", (event) => {
    console.log("Button clicked!");
    event.preventDefault(); // Prevents form submission refresh
});
```

---

## ⏳ Section 8: Async JavaScript

**Fetch API with Async/Await:**
```javascript
async function getUser() {
    try {
        const response = await fetch("https://api.github.com/users/octocat");
        if (!response.ok) throw new Error("Not found");
        
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}
```
