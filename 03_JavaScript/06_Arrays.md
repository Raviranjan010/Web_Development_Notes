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

## 4. Detailed Explanation

### Accessing Items
Arrays are **Zero-Indexed**. The first item is at index `0`.
- `colors[0]` -> "Red"
- `colors[1]` -> "Green"

### Array Properties
- `length`: Returns the number of items. `colors.length`.

### Common Methods (Actions)
- `push()`: Add to end.
- `pop()`: Remove from end.
- `unshift()`: Add to start.
- `shift()`: Remove from start.
- `indexOf()`: Find the index of an item.
- `includes()`: Check if item exists (True/False).

## 5. Examples

### Basic Operations
```javascript
let fruits = ["Apple", "Banana"];

fruits.push("Orange"); // ["Apple", "Banana", "Orange"]
fruits.pop();          // ["Apple", "Banana"]
fruits[0] = "Mango";   // Change item: ["Mango", "Banana"]

console.log(fruits.length); // 2
```

### Iterating (Looping)
There are many ways to loop through arrays. The modern standard is `forEach` or `map`.

```javascript
let numbers = [1, 2, 3];

// 1. Classic For Loop
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// 2. forEach (Modern)
numbers.forEach((num) => {
    console.log(num);
});

// 3. For...of Loop (Cleanest)
for (let num of numbers) {
    console.log(num);
}
```

### High-Order Methods (The Power of Arrays)
`map` creates a **new** array by transforming every item.
```javascript
let numbers = [1, 2, 3];
let doubled = numbers.map(num => num * 2);
// doubled is [2, 4, 6]
```

`filter` creates a **new** array with only items that pass a test.
```javascript
let ages = [10, 25, 14, 30];
let adults = ages.filter(age => age >= 18);
// adults is [25, 30]
```

## 6. Key Points to Remember
- Arrays can hold mixed data types (Strings, Numbers, even other Arrays).
- `const` arrays can still be modified! You can allow pushing/popping, but you cannot reassign the variable itself to a *new* array.

## 7. Common Mistakes
- **Mistake**: Trying to access the last item with `arr[arr.length]`.
  **Why**: Length is 3, but indices are 0, 1, 2. Index 3 is undefined.
  **Fix**: `arr[arr.length - 1]`.

## 8. Pro Tips / Tricks
- **Spread Operator `...`**: Easiest way to copy or merge arrays.
  ```javascript
  let arr1 = [1, 2];
  let arr2 = [3, 4];
  let combined = [...arr1, ...arr2]; // [1, 2, 3, 4]
  ```
- **Destructuring**: Unpacking array values into variables.
  ```javascript
  let [first, second] = ["Red", "Blue"];
  console.log(first); // "Red"
  ```

## 9. Related Topics
- [07_Objects.md](./07_Objects.md) - Arrays are technically objects.
- [09_Loops.md](./09_Loops.md) - More on loops.
