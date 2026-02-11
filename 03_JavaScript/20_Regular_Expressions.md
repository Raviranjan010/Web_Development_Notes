# 3.12b Regular Expressions (Regex)

## 1. What is Regex?
A **Regular Expression** is a sequence of characters that forms a **search pattern**.
- Used for **text search** and **text replace** operations.
- Essential for formatting (dates, phone numbers) and validation (email, password).

## 2. Syntax
You can create a regex in two ways:
1.  **Literal Syntax** (Preferred):
    ```javascript
    const regex = /pattern/flags;
    const re = /abc/i;
    ```
2.  **Constructor Syntax** (Dynamic):
    ```javascript
    const re = new RegExp("abc", "i");
    ```

## 3. Flags
Modifiers that change how the search is performed.
- `g`: **Global** (Find all matches, not just the first).
- `i`: **Case-insensitive** (Match `A` and `a`).
- `m`: **multiline** (Start/End anchors match each line).

## 4. Patterns & Character Classes

| Symbol | Meaning | Example |
| :--- | :--- | :--- |
| `^` | Starts with | `^Hello` matches "Hello World" |
| `$` | Ends with | `World$` matches "Hello World" |
| `.` | Any character (except newline) | `h.t` matches "hot", "hat" |
| `\d` | Digit (0-9) | `\d{3}` matches "123" |
| `\w` | Word character (a-z, A-Z, 0-9, _) | `\w+` matches "User_1" |
| `\s` | Whitespace (space, tab, newline) | |
| `[abc]` | Set (Any of a, b, or c) | `[a-z]` matches any lowercase letter |
| `[^abc]` | Negation (Not a, b, or c) | `[^0-9]` matches non-digits |

## 5. Quantifiers
How many times something should occur.
- `+`: One or more (`a+` -> "a", "aa").
- `*`: Zero or more.
- `?`: Zero or one (Optional).
- `{n}`: Exactly n times.
- `{n,m}`: Between n and m times.

## 6. Key Methods

### 1. `regex.test(string)`
Returns `true` or `false`. Best for validation.
```javascript
const emailRegex = /@/;
console.log(emailRegex.test("user@gmail.com")); // true
```

### 2. `regex.exec(string)`
Returns an array of details (or null).
```javascript
const re = /quick\s(brown)/;
const res = re.exec("The quick brown fox");
console.log(res[0]); // "quick brown" (Full match)
console.log(res[1]); // "brown" (Group 1)
```

### 3. `string.match(regex)`
Returns an array of matches.
```javascript
const str = "Rain in SPAIN stays mainly in the plain";
console.log(str.match(/ain/gi)); // ["ain", "AIN", "ain", "ain"]
```

### 4. `string.replace(regex, newSubstr)`
Replaces matches.
```javascript
const str = "Visit Microsoft!";
const res = str.replace(/microsoft/i, "Google"); // "Visit Google!"
```

## 7. Common Use Cases

### Email Validation (Simple)
```javascript
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### Password Strength
(At least 8 chars, 1 number, 1 letter)
```javascript
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
```

### Formatting Phone Numbers
```javascript
let phone = "1234567890";
let formatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
// Output: "(123) 456-7890"
```
