# 3.7 Objects

## 1. What is it?
An **Object** is a dynamic data structure that stores related data as **key-value pairs**, where each key uniquely identifies its value.
- Values can be primitives, objects, or functions (methods).
- Objects are mutable (can be changed).

## 2. Creating Objects
There are two primary ways to create an object:

### 1. Object Literal `{}` (Recommended)
Concise and efficient.
```javascript
let obj = {
    name: "Sourav",
    age: 23,
    job: "Developer"
};
```

### 2. `new Object()` Constructor
Less common, slightly slower.
```javascript
let obj = new Object();
obj.name = "Sourav";
obj.age = 23;
```

**Comparison**:
| Feature | `{}` (Literal) | `new Object()` |
| :--- | :--- | :--- |
| **Ease of Use** | Concise, readable | Verbose |
| **Performance** | Faster | Slightly slower |

## 3. Basic Operations

### 1. Accessing Properties
- **Dot Notation**: `obj.name` (Simple, used most often).
- **Bracket Notation**: `obj["age"]` (Use for dynamic keys or special characters).

### 2. Modifying & Adding
```javascript
let obj = { model: "Tesla" };
obj.model = "Ford"; // Modify
obj.color = "Red";  // Add new property
```

### 3. Removing Properties
Use the `delete` operator.
```javascript
delete obj.color;
```

### 4. Checking Existence
```javascript
console.log("model" in obj); // true
console.log(obj.hasOwnProperty("model")); // true
```
- **`in`**: Checks object AND prototype chain.
- **`hasOwnProperty`**: Checks ONLY the object itself.

### 5. Merging Objects
```javascript
let obj1 = { a: 1 };
let obj2 = { b: 2 };

// Using Spread (Modern)
let merged = { ...obj1, ...obj2 };

// Using Object.assign (Old)
Object.assign({}, obj1, obj2);
```

### 6. Object Length
Objects don't have a `.length` property. Use `Object.keys()`.
```javascript
console.log(Object.keys(obj).length);
```

## 4. Iterating Loop (3 Approaches)

### 1. `for...in` Loop
Iterates over keys (including inherited ones).
```javascript
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key, obj[key]);
    }
}
```

### 2. `Object.keys()` + `forEach`
Returns array of keys.
```javascript
Object.keys(obj).forEach(key => {
    console.log(`${key}: ${obj[key]}`);
});
```

### 3. `Object.entries()` + `map`
Returns array of `[key, value]` pairs.
```javascript
Object.entries(obj).map(([key, val]) => {
    console.log(key, val);
});
```

## 5. Advanced Properties & Accessors

### Property Attributes
Control behavior using `Object.defineProperty`.
- **`writable`**: Can be changed?
- **`enumerable`**: Shows up in loops?
- **`configurable`**: Can be deleted?

```javascript
let obj = { name: "Sourav" };
Object.defineProperty(obj, 'id', {
    value: 101,
    writable: false, // Read-only
    enumerable: false // Hidden from loops
});
```

### Getters and Setters
Computed properties.
```javascript
let user = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(" ");
    }
};
user.fullName = "Jane Smith";
console.log(user.firstName); // Jane
```

## 6. Shallow Copy vs Deep Copy

### Shallow Copy
Copies the **reference** of nested objects. Changing nested data affects BOTH.
- **Methods**: `Object.assign({}, obj)`, `{ ...obj }`.
```javascript
let original = { a: 1, nested: { b: 2 } };
let shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 (Affected!)
```

### Deep Copy
Creates a **completely independent** copy.
**Method 1: JSON (Quick & Dirty)**
- Limits: Loses functions, `undefined`, and `Symbol`.
```javascript
let deep = JSON.parse(JSON.stringify(original));
```

**Method 2: Lodash `_.cloneDeep` (Robust)**
- Best for complex objects.
```javascript
// const _ = require('lodash');
// let deep = _.cloneDeep(original);
```

## 7. Related Topics
- [21_ES6_Features.md](./21_ES6_Features.md) - Destructuring/Spread.
- [07_Arrays.md](./07_Arrays.md) - Storing objects in arrays.
