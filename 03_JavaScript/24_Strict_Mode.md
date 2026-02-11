# 3.16b Strict Mode

Strict Mode is a feature in JavaScript that allows you to opt in to a stricter variant of the language. It eliminates some silent errors by changing them to throw errors and prevents unsafe actions.

## 1. Enabling Strict Mode

You can enable it for the whole script or just for a function.

### Global Scope
Add `"use strict";` at the very top of your script.
```javascript
"use strict";
x = 10; // ReferenceError: x is not defined (prevents implicit globals)
```

### Function Scope
```javascript
function strictFunc() {
    "use strict";
    // Code here runs in strict mode
}
```
*(Note: ES6 Modules and Classes use Strict Mode automatically)*

## 2. Key Restrictions & Features

### 1. Variables Must Be Declared
Prevents accidental global variables.
```javascript
"use strict";
// x = 3.14; // Error
let x = 3.14; // OK
```

### 2. No `with` Statement
The `with` statement is messy and deprecated. Strict mode bans it.

### 3. `this` is `undefined` in Global Functions
In non-strict mode, `this` in a plain function call points to the `window` (global) object. In strict mode, it is `undefined`.
```javascript
"use strict";
function showThis() { 
    console.log(this); 
}
showThis(); // undefined
```

### 4. Read-only Properties Cannot Be Written
```javascript
"use strict";
const obj = Object.freeze({ prop: 42 });
// obj.prop = 50; // TypeError: Cannot assign to read only property
```

### 5. No Deleting Variables/Functions
```javascript
"use strict";
let x = 10;
// delete x; // SyntaxError: Delete of an unqualified identifier in strict mode
```

### 6. No Duplicate Parameter Names
```javascript
// SyntaxError in strict mode
// function sum(a, a, c) { ... }
```

## 3. Benefits
1.  **Catches Errors Early**: Fails fast on typos or bad syntax.
2.  **Secure**: Prevents access to global object accidentally.
3.  **Modern**: Prepares code for future JS versions.
4.  **Performance**: Engines can optimize strict code better.
