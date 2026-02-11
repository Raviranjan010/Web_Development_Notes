# 3.16 JavaScript Modules

A **Module** is a script file capable of exporting code (variables, functions, classes) for use in other files. It helps break down big projects into manageable sections.

## 1. Types of Module Systems

### 1. CommonJS (Node.js Default)
Used primarily in Node.js. It loads modules **synchronously**.

-   **Export**: `module.exports`
-   **Import**: `require()`

#### Example: Utility Module
**utils.js**:
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
module.exports = { greet };
```

**app.js**:
```javascript
const { greet } = require('./utils');
console.log(greet("Raj")); // Hello, Raj!
```

```

#### Example: Building a Configuration File
 **config.js**:
```javascript
module.exports = {
    port: 3000,
    dbURL: 'mongodb://localhost:27017/mydb'
};
```

**app.js**:
```javascript
const config = require('./config');
console.log(`Server running on port ${config.port}`);
```

#### Example: Express Routes (Common Use Case)
```javascript
// routes.js
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.send('Home Page'));
module.exports = router;

// server.js
const routes = require('./routes');
app.use('/', routes);
```

### 2. ES6 Modules (Browser & Modern Node)
The modern standard. Uses `import` and `export`. Loads **asynchronously** and is statically analyzed (better optimization).

-   **Export**: `export` or `export default`
-   **Import**: `import`
-   **Config**: Add `"type": "module"` in `package.json` for Node.js.

#### Named Exports (Multiple per file)
**math.js**:
```javascript
export const PI = 3.14159;
export function add(a, b) { return a + b; }
```

**main.js**:
```javascript
import { PI, add } from './math.js';
console.log(add(2, PI));
```

#### Default Export (One per file)
**Person.js**:
```javascript
export default class Person {
    constructor(name) { this.name = name; }
}
```

**main.js**:
```javascript
import Person from './Person.js'; // Name it whatever you want
```

## 2. Dynamic Imports
You can load modules conditionally or on-demand using `import()` which returns a Promise.

```javascript
/* Inside an async function */
async function loadMath() {
    const math = await import('./math.js');
    console.log(math.add(5, 10));
}
loadMath();
```

## 3. Use Cases for Modules
1.  **Utilities**: Formatting dates, validation logic (e.g., `utils.js`).
2.  **Configuration**: Storing API keys or constants (e.g., `config.js`).
3.  **Components**: In frameworks like React, every component is a module.

## 4. CommonJS vs ES6 Modules

| Feature | CommonJS | ES6 Modules |
| :--- | :--- | :--- |
| **Syntax** | `require` / `module.exports` | `import` / `export` |
| **Loading** | Synchronous (Runtime) | Asynchronous (Compile-time) |
| **Environment** | Node.js (Default) | Browsers & Modern Node |
| **Scope** | Function scope wrapper | Module scope |

## 5. Related Topics
- [06_Functions.md](./06_Functions.md)
