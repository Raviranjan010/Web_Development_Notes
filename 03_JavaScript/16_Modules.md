# 3.16 JavaScript Modules

## 1. What is it?
Modules allow you to break up your code into separate files. This makes it easier to maintain, reuse, and debug.

## 2. Why it is used?
Imagine writing a 10,000 line application in a single file. Nightmare! Modules let you put "User Logic" in `user.js` and "Math Logic" in `math.js`.

## 3. Syntax / Structure
To use modules, you must add `type="module"` to your script tag in HTML.

```html
<script type="module" src="main.js"></script>
```

Then you use `export` and `import`.

## 4. Detailed Explanation

### Importing and Exporting
There are two types of exports:
1.  **Named Exports**: You can export multiple things from a file. Names MUST match.
2.  **Default Export**: You can export ONE main thing per file. Name doesn't matter when importing.

## 5. Examples

### Named Exports
**math.js**:
```javascript
export const pi = 3.14;
export function add(a, b) { return a + b; }
```

**main.js**:
```javascript
import { pi, add } from './math.js';
console.log(add(2, 2)); // 4
```

### Default Export
**user.js**:
```javascript
export default class User {
    constructor(name) { this.name = name; }
}
```

**main.js**:
```javascript
import User from './user.js'; // Name can be anything
const u = new User("Alice");
```

### Mixing Both
```javascript
export default function log() { ... }
export const version = "1.0";

// Import like this:
import log, { version } from './library.js';
```

## 6. Key Points to Remember
- **CORS Policy**: If you open `index.html` directly from your file system (`file://`), modules **won't work**. You must run a local server (like Live Server in VS Code).
- **Strict Mode**: Modules run in strict mode automatically (`"use strict"`). You can't use undeclared variables.

## 7. Common Mistakes
- **Mistake**: Forgetting the dot-slash `./`.
  `import { add } from 'math.js';` ❌ (Browser thinks it's a node module).
  `import { add } from './math.js';` ✅
- **Mistake**: Forgetting `.js` extension.
  In pure browser JS, you MUST include the file extension. In React/bundlers, you can skip it.

## 8. Pro Tips / Tricks
- **Import as Alias**: If you have two functions named `add`, rename one.
  `import { add as sum } from './math.js';`
- **Import All**: Grab everything into one object.
  `import * as Math from './math.js';` -> `Math.add(1, 2)`.

## 9. Related Topics
- [05_Functions.md](./05_Functions.md) - Exporting functions.
- [../04_Projects/JS_Projects.md](../04_Projects/JS_Projects.md) - Structuring large projects.
