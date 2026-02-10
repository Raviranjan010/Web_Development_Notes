# 3.8 Strings and Methods

## 1. What is it?
Strings are sequences of characters used to represent text. In JS, strings are **immutable objects** (once created, they cannot be changed, only replaced).

## 2. Why it is used?
Text processing is a huge part of web development—validating emails, manipulating user input, formatting messages.

## 3. Syntax / Structure
```javascript
let text = "Hello World";
```

## 4. Detailed Explanation

### String Properties
- `length`: Returns the number of characters. `text.length`.

### Common Methods
- `toUpperCase()` / `toLowerCase()`: Change case.
- `indexOf()`: Find position of substring.
- `slice(start, end)`: Extract part of string.
- `replace()`: Replace content.
- `split()`: Convert string to array.
- `trim()`: Remove whitespace from ends.

## 5. Examples

### Searching and Slicing
```javascript
let str = "JavaScript is fun";

console.log(str.indexOf("is")); // 11
console.log(str.includes("fun")); // true
console.log(str.startsWith("Java")); // true

// Extract 'Script'
// Slice from index 4 up to (but not including) 10
let sub = str.slice(4, 10); 
console.log(sub); // "Script"
```

### Modifying Content
Remember, these return a **new** string. They don't change the original.
```javascript
let msg = "  Hello User  ";

console.log(msg.trim()); // "Hello User"
console.log(msg.toUpperCase()); // "  HELLO USER  "
console.log(msg.replace("User", "Admin")); // "  Hello Admin  "
```

### Converting to Array
```javascript
let data = "Apple,Banana,Orange";
let fruits = data.split(","); 
// ["Apple", "Banana", "Orange"]
```

## 6. Key Points to Remember
- Strings are **Zero-Indexed**. First character is at `0`.
- Methods like `replace()` only replace the **first** match by default. Use `replaceAll()` or Regex for global replacement.

## 7. Common Mistakes
- **Mistake**: `str[0] = "A"` to change a character.
  **Why**: Strings are immutable. You cannot change individual characters this way.
  **Fix**: You must create a new string.
  ```javascript
  let str = "hello";
  str = "H" + str.slice(1); // "Hello"
  ```

## 8. Pro Tips / Tricks
- **Template Literals**: Always prefer backticks `` ` `` over quotes for complex strings.
  ```javascript
  let html = `
      <div>
          <h1>${title}</h1>
      </div>
  `;
  ```
- **Chaining Methods**:
  ```javascript
  let cleanInput = userInput.trim().toLowerCase();
  ```

## 9. Related Topics
- [02_Variables_and_Data_Types.md](./02_Variables_and_Data_Types.md) - String basics.
- [../01_HTML/04_Text_Formatting.md](../01_HTML/04_Text_Formatting.md) - Displaying text.
