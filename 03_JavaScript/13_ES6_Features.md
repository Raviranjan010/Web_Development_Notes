# 3.13 ES6+ Features (Modern JavaScript)

## 1. What is it?
ES6 (ECMAScript 2015) was a major update to JavaScript. It added syntax sugar that makes code cleaner and easier to write.

## 2. Why it is used?
Virtually all modern frameworks (React, Vue, Node.js) use ES6+. If you only know old JS (ES5), you won't be able to read modern code.

## 3. Syntax / Structure
Key features: `let/const`, Arrow Functions, Template Literals, Destructuring, Spread/Rest, Modules.

## 4. Detailed Explanation

### 1. Variables (`let` & `const`)
Stop using `var`. Use `const` by default, `let` if it changes.

### 2. Arrow Functions
Values `this` differently and has shorter syntax.
`const add = (a, b) => a + b;`

### 3. Template Literals
Usage of backticks for strings.
`` `Hello ${name}` ``

### 4. Destructuring
Extracting values from arrays/objects.
```javascript
const user = { name: "John", age: 30 };
const { name, age } = user; // name = "John", age = 30
```

### 5. Spread Operator (`...`)
Unpacks arrays/objects.
```javascript
const oldArr = [1, 2];
const newArr = [...oldArr, 3, 4]; // [1, 2, 3, 4]
```

### 6. Rest Parameter (`...`)
Packs arguments into an array.
```javascript
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
}
```

### 7. Classes
Syntactic sugar over prototypes for object-oriented programming.

## 5. Examples

### Destructuring in Function Parameters
Extremely common in React.
```javascript
function printUser({ name, age }) {
    console.log(`${name} is ${age}`);
}

const person = { name: "Alice", age: 25, city: "London" };
printUser(person); // "Alice is 25"
```

### Spread with Objects
```javascript
const basicInfo = { name: "Bob", age: 20 };
const detailedInfo = { ...basicInfo, job: "Developer", city: "NY" };
// { name: "Bob", age: 20, job: "Developer", city: "NY" }
```

### Classes
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

const dog = new Animal("Rex");
dog.speak();
```

## 6. Key Points to Remember
- ES6 is fully supported in all modern browsers. Tools like **Babel** are used to translate it for ancient browsers (like Internet Explorer 11).
- **Default Parameters**: `function(a = 10) {}` is simpler than strict checking inside the function.

## 7. Common Mistakes
- **Mistake**: Using Arrow Functions for everything.
  **Why**: As mentioned in Objects, they don't have their own `this` binding. They are bad for object methods and event listeners where you need `this`.

## 8. Pro Tips / Tricks
- **Short-Circuit Property Names**:
  If the key and variable name are the same, you can skip the value.
  ```javascript
  const name = "John";
  const user = { name }; // Same as { name: name }
  ```

## 9. Related Topics
- [05_Functions.md](./05_Functions.md) - Arrow functions depth.
- [07_Objects.md](./07_Objects.md) - Object literal enhancements.
