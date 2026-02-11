# 3.17 JavaScript Best Practices

## 1. What is it?
The standard rules professional developers follow to write clean, secure, and efficient JavaScript.

## 2. Why it is used?
- To avoid common bugs (like global variable pollution).
- To make code readable for teams.
- To improve performance.

## 3. Top Best Practices

### 1. Use `const` and `let`
Stop using `var`. It creates confusing scope issues. Use `const` by default.

### 2. Use Strict Mode
If you aren't using Modules (which enable it by default), add this to the top of your file:
```javascript
"use strict";
```
It prevents you from using undeclared variables and throwing safer errors.

### 3. Avoid Global Variables
Variables declared outside functions are global. Any script can overwrite them.
**Bad**: `name = "John";`
**Good**: `const name = "John";` inside a block or module.

### 4. Use `===` (Strict Equality)
Never use `==`. It does type coercion (`0 == false` is true). `===` checks type too.

### 5. Descriptive Naming
- Variables: Nouns (`user`, `itemList`).
- Functions: Verbs (`getUser`, `calculateTotal`).
- Constants: UPPERCASE (`MAX_USERS`).
- camelCase: `myVariableName`.

## 4. Code Style & Linting
Use a "Linter" like **ESLint**. It automatically underlines dirty code in your editor.
Format code with **Prettier** so indentation is always perfect.

## 5. Summary Checklist
- [ ] No `var` used?
- [ ] `===` instead of `==`?
- [ ] Semicolons used consistently?
- [ ] Variable names meaningful?
- [ ] Logic broken into small functions?
- [ ] Comments explaining "Why", not "What"?

## 6. What's Next?
You have learned the **syntax**. Now you need to learn the **logic**. The best way to do that is to build projects.

👉 **Next Step**: [Projects](../04_Projects/HTML_Only_Projects.md)
