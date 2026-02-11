# 3.15b Object-Oriented Programming (OOP) in JavaScript

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data (properties) and code (methods).

## 1. Classes and Objects

In JavaScript, classes are templates for creating objects. They encapsulate data with code to work on that data.

### Defining a Class
A `class` is defined using the `class` keyword. It usually contains a `constructor` and methods.

```javascript
class Dog {
  // Class Property (Static)
  static species = "Canine";

  // Constructor: unique to each instance
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  // Method
  bark() {
    console.log(`${this.name} says woof!`);
  }
}
```

### Creating an Object
An **object** is an instance of a class.

```javascript
const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.name); // Buddy
myDog.bark(); // Buddy says woof!
```

### Static Properties/Methods
Static members belong to the class itself, not to instances.

```javascript
console.log(Dog.species); // Canine
// console.log(myDog.species); // undefined
```

### Getters and Setters
Use `get` and `set` to intercept property access.

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name.toUpperCase();
  }
  set name(newName) {
    this._name = newName;
  }
}
const p = new Person("Raj");
console.log(p.name); // RAJ
p.name = "Amit";
```

## 2. Inheritance

Inheritance allows one class to derive properties and methods from another.

### ES6 Class Inheritance (`extends`)
The `extends` keyword is used to create a child class. Use `super()` to call the parent's constructor.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // Call parent constructor
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Tommy");
d.speak(); // Tommy barks.
```

### Prototype-based Inheritance (The Old Way)
Before ES6 classes, inheritance was done using `prototype`.

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound.`);
};

function Dog(name) {
  Animal.call(this, name); // Call parent constructor
}
// Inherit prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log("Woof!");
};
```

### Mixins (Multiple Inheritance)
JavaScript doesn't support multiple inheritance directly, but you can use `Object.assign` to mix properties from multiple objects.

```javascript
const canEat = {
  eat() { console.log("Eating..."); }
};
const canWalk = {
  walk() { console.log("Walking..."); }
};

function Person(name) {
  this.name = name;
}
Object.assign(Person.prototype, canEat, canWalk);

const p = new Person("Raj");
p.eat();
p.walk();
```

## 3. Encapsulation

Encapsulation restricts direct access to some of an object's components.

### Using Closures (Factory Functions)
Private variables are created using function scope.

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    }
  };
}
const account = createBankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.balance); // undefined
```

### Using Private Fields (ES6 Classes)
Use `#` prefix for private fields.

```javascript
class BankAccount {
  #balance; // Private field declaration

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
    console.log(`Deposited: ${amount}, New Balance: ${this.#balance}`);
  }
}
const acc = new BankAccount(1000);
acc.deposit(200);
// console.log(acc.#balance); // Syntax Error: Private field '#balance' must be declared in an enclosing class
```

## 4. Polymorphism

Polymorphism allows objects to be treated as instances of their parent class, but exhibit specific behaviors.

### Method Overriding
Child classes can provide a specific implementation of a method already defined in the parent class.

```javascript
class Shape {
  draw() {
    console.log("Drawing a shape...");
  }
}
class Circle extends Shape {
  draw() {
    console.log("Drawing a circle...");
  }
}
class Square extends Shape {
  draw() {
    console.log("Drawing a square...");
  }
}

const shapes = [new Shape(), new Circle(), new Square()];
shapes.forEach(s => s.draw());
// Output:
// Drawing a shape...
// Drawing a circle...
// Drawing a square...
```

### Method Overloading (Simulated)
JavaScript does not support true method overloading (same name, different parameters). However, you can simulate it by checking arguments.

```javascript
class Calculator {
  add(a, b) {
    if (b === undefined) {
      return a + a; // If 1 arg, double it
    }
    return a + b;   // If 2 args, add them
  }
}
const c = new Calculator();
console.log(c.add(5));    // 10
console.log(c.add(5, 10)); // 15
```

## 5. Other Creation Patterns

### Object.create()
Creates a new object using an existing object as the prototype.

```javascript
const proto = {
  greet() { return `Hello, ${this.name}`; }
};
const obj = Object.create(proto);
obj.name = "Raj";
console.log(obj.greet());
```

### Factory Functions
Functions that return objects.

```javascript
function createPerson(name) {
  return {
    name,
    greet() {
      return `Hello, I am ${name}`;
    }
  };
}
const person1 = createPerson("Alice");
```

## 6. Related Topics
- [08_Objects.md](./08_Objects.md)
- [21_ES6_Features.md](./21_ES6_Features.md)
