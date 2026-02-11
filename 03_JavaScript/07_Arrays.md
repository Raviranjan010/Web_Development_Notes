# 3.6 Arrays

## 1. What is it?
An Array is a special variable that can hold **more than one value** at a time. It is an ordered list.

## 2. Why it is used?
If you have a list of items (e.g., a shopping cart), storing them in separate variables (`item1`, `item2`, `item3`) is messy. Arrays let you store them in one variable (`cart`) and loop through them.

## 3. Syntax / Structure
Arrays are defined using square brackets `[]`.
```javascript
let colors = ["Red", "Green", "Blue"];
```

## 4. JavaScript Array Methods
JavaScript provides a wide variety of methods to perform common tasks efficiently.

### 1. `length`
Returns the number of elements in the array.
```javascript
let a = ["HTML", "CSS", "JS", "React"];
console.log(a.length); // 4
```

### 2. `toString()`
Converts the array into a comma-separated string.
```javascript
let a = ["HTML", "CSS", "JS"];
console.log(a.toString()); // "HTML,CSS,JS"
```

### 3. `join()`
Creates a string by concatenating all elements with a specified separator.
```javascript
let a = ["HTML", "CSS", "JS"];
console.log(a.join('|')); // "HTML|CSS|JS"
```

### 4. `delete` Operator
Deletes a property/index. (Note: Leaves `undefined` holes).
```javascript
let emp = { firstName: "Riya", salary: 40000 };
console.log(delete emp.salary); // true
console.log(emp); // { firstName: 'Riya' }
```

### 5. `concat()`
Merges two or more arrays.
```javascript
let a1 = [1, 2];
let a2 = [3, 4];
let newArr = a1.concat(a2);
console.log(newArr); // [1, 2, 3, 4]
```

### 6. `flat()`
Flattens nested arrays into a single level.
```javascript
const a1 = [['1', '2'], ['3', '4']];
const a2 = a1.flat(Infinity);
console.log(a2); // ['1', '2', '3', '4']
```

### 7. `push()`
Adds an element to the **end**.
```javascript
let a = [10, 20];
a.push(30);
console.log(a); // [10, 20, 30]
```

### 8. `unshift()`
Adds an element to the **front**.
```javascript
let a = [20, 30];
a.unshift(10);
console.log(a); // [10, 20, 30]
```

### 9. `pop()`
Removes the **last** element.
```javascript
let a = [20, 30, 40];
a.pop();
console.log(a); // [20, 30]
```

### 10. `shift()`
Removes the **first** element.
```javascript
let a = [20, 30];
a.shift();
console.log(a); // [30]
```

### 11. `splice()`
Adds or removes elements from a specific index. `splice(start, deleteCount, ...items)`
```javascript
let a = [20, 30, 40, 50];
a.splice(1, 2); // Removes 30, 40
console.log(a); // [20, 50]
```

### 12. `slice()`
Returns a **copy** of a portion of an array.
```javascript
const a = [1, 2, 3, 4, 5];
const res = a.slice(1, 4); // Index 1 to 3
console.log(res); // [2, 3, 4]
```

### 13. `some()`
Checks if **at least one** element passes a test.
```javascript
const a = [1, 2, 3];
let res = a.some((val) => val > 2); // true
```

### 14. `map()`
Creates a new array by transforming every element.
```javascript
let a = [4, 9, 16];
console.log(a.map(Math.sqrt)); // [2, 3, 4]
```

### 15. `filter()`
Creates a new array with elements that pass a test.
```javascript
let a = [1, 2, 3, 4];
console.log(a.filter(n => n > 2)); // [3, 4]
```

### 16. `reduce()`
Reduces array to a single value.
```javascript
let a = [10, 20, 30];
let sum = a.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 60
```

### 17. `reverse()`
Reverses the array **in place**.
```javascript
let a = [1, 2, 3];
a.reverse();
console.log(a); // [3, 2, 1]
```

### 18. `values()`
Returns an iterator of values.
```javascript
const a = ["A", "B"];
for (const val of a.values()) console.log(val);
```

## 5. Algorithm: Reverse an Array (6 Methods)

### 1. Using `reverse()`
Built-in method. Mutates the original array.
```javascript
let a = [1, 2, 3];
a.reverse();
```

### 2. Using For Loop
Swapping elements manually.
```javascript
const a = [1, 2, 3, 4, 5];
for (let i = 0; i < Math.floor(a.length / 2); i++) {
    let temp = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = temp;
}
```

### 3. Using Recursion
Removes first element, reverses rest, pushes first to end.
```javascript
const reversed = (function reverse(a) {
    if (a.length === 0) return [];
    return [a.pop()].concat(reverse(a));
})([...[1, 2, 3]]);
```

### 4. Using `reduce()`
Prepending each element to a new array.
```javascript
let a = [1, 2, 3];
let rev = a.reduce((acc, curr) => [curr, ...acc], []);
```

### 5. Using Spread + `reverse()`
Creates a copy first, then reverses. Safe (non-mutating).
```javascript
let a = [1, 2, 3];
let reversed = [...a].reverse();
```

### 6. Using a Stack (LIFO)
Pop from old, push to new.
```javascript
const a = [1, 2, 3];
const rev = [];
while (a.length > 0) rev.push(a.pop());
```

## 6. Related Topics
- [10_Higher_Order_Functions.md](./10_Higher_Order_Functions.md)
- [05_Loops.md](./05_Loops.md)
