# 3.13c Iterators and Generators

## 1. Generators

A **Generator Function** is a special function that can pause execution and resume later. It returns an **Iterator** object.

-   Syntax: `function* myGen() { ... }`
-   Keyword: `yield` (Pauses and returns a value)

### Basic Syntax
```javascript
function* simpleGenerator() {
    yield 'First';
    yield 'Second';
    return 'Done';
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 'First', done: false }
console.log(gen.next()); // { value: 'Second', done: false }
console.log(gen.next()); // { value: 'Done', done: true }
```

### Infinite Generator
Generators work great for infinite streams because they compute values **on demand** (lazy evaluation).

```javascript
function* infiniteNumbers() {
    let i = 0;
    while (true) {
        yield i++;
    }
}
const numbers = infiniteNumbers();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
```

### Delegating Generators (`yield*`)
You can call one generator from another.
```javascript
function* sub() {
    yield 'A';
    yield 'B';
}
function* main() {
    yield* sub(); // Delegate to sub()
    yield 'C';
}
// Output: A, B, C
```

```

### Stateful Iteration (Two-way communication)
You can pass values *back* into the generator using `.next(value)`.

```javascript
function* counter(start = 0) {
    let count = start;
    while (true) {
        // Pauses here. When resumed, 'yield' returns the value passed to .next()
        count += yield count; 
    }
}
const gen = counter();
console.log(gen.next().value);   // 0 (Initial)
console.log(gen.next(2).value);  // 2 (0 + 2)
console.log(gen.next(3).value);  // 5 (2 + 3)
```

### Iterating Over a Collection
Generators can customize how you loop over objects.

```javascript
function* objectEntries(obj) {
    for (const [key, value] of Object.entries(obj)) {
        yield [key, value];
    }
}

const gen = objectEntries({ a: 1, b: 2, c: 3 });
for (const [key, value] of gen) {
    console.log(`${key}: ${value}`);
}
```

## 2. Iterators

An **Iterator** is any object that implements the **Iterator Protocol**:
1.  Has a `next()` method.
2.  Returns an object `{ value: any, done: boolean }`.

### Using `Simbol.iterator`
To make an object iterable (usable in `for...of`), you must implement `[Symbol.iterator]`.

```javascript
const myCollection = {
    data: [10, 20, 30],
    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => ({
                value: this.data[i],
                done: i++ >= this.data.length
            })
        };
    }
};

for (let val of myCollection) {
    console.log(val); // 10, 20, 30
}
```

## 3. Async Generators
Generators can also handle Promises using `async` and `await`.

```javascript
function* asyncGen() {
    // Simulating API call delay
    yield new Promise(resolve => setTimeout(() => resolve('Data Loaded'), 1000));
}

const gen = asyncGen();
gen.next().value.then(console.log); // "Data Loaded" after 1s
```

## 4. Related Topics
- [05_Loops.md](./05_Loops.md) - for...of loops.
