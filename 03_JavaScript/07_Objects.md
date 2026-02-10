# 3.7 Objects

## 1. What is it?
An Object is a collection of related data and functionality. While Arrays are ordered lists, Objects are **key-value pairs**.

## 2. Why it is used?
To model real-world things. A "Car" has properties like color, model, and engine type. It also has actions (methods) like start, stop, and drive.

## 3. Syntax / Structure
Curly braces `{}` define an object.

```javascript
const person = {
    name: "John",
    age: 30,
    isMarried: false,
    greet: function() {
        console.log("Hello!");
    }
};
```

## 4. Detailed Explanation

### Accessing Properties
1.  **Dot Notation** (`.`): Common and clean. `person.name`.
2.  **Bracket Notation** (`[]`): Useful if key has spaces or is stored in a variable. `person['age']`.

### Methods
Functions stored inside objects are called **methods**.
Inside a method, `this` refers to the object itself.

## 5. Examples

### Creating and Modifying
```javascript
const car = {
    brand: "Tesla",
    model: "Model 3"
};

// Add new property
car.color = "Red";

// Change property
car.model = "Model Y";

// Delete propert
delete car.brand;
```

### Methods and `this`
```javascript
const user = {
    firstName: "Jane",
    lastName: "Doe",
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(user.fullName()); // "Jane Doe"
```

### Destructuring (ES6)
Extracting values into variables cleanly.
```javascript
const book = { title: "1984", author: "Orwell" };

// Old way
// let title = book.title;

// New way
const { title, author } = book;
console.log(title); // "1984"
```

## 6. Key Points to Remember
- Keys are always **strings** (behind the scenes).
- Values can be anything (Strings, Numbers, Arrays, Functions, even other Objects).
- `const` objects can be mutated (properties changed), but the variable cannot be reassigned to a new object.

## 7. Common Mistakes
- **Mistake**: Using Arrow functions for object methods.
  **Why**: Arrow functions do not have their own `this`. They inherit it from the parent scope (usually window), which breaks the method.
  **Fix**: Use standard function syntax `function() {}` or shorthand method syntax `method() {}` inside objects.

## 8. Pro Tips / Tricks
- **Object.keys() / Object.values()**: Get an array of all keys or values.
  ```javascript
  console.log(Object.keys(person)); // ["name", "age", ...]
  ```
- **JSON**: JavaScript Object Notation. It's basically a string representation of a JS object, used for sending data to servers.
  ```javascript
  const jsonString = JSON.stringify(person);
  ```

## 9. Related Topics
- [06_Arrays.md](./06_Arrays.md) - Storing lists of objects.
- [13_ES6_Features.md](./13_ES6_Features.md) - Destructuring & Spread Operator.
