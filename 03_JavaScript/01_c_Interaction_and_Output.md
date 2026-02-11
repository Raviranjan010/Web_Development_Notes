# 3.1.c Interaction and Output

## 1. Output Methods
We can print or display data in JavaScript using several methods.

### 1. `console.log()` (Debugging)
Used by developers to see data in the browser's developer console.
```javascript
console.log("Hello Debugger");
let name = "Alice";
console.log("User:", name);
```
- **Pros**: Non-intrusive, great for debugging complex objects.
- **Cons**: Users cannot see it unless they open DevTools.

### 2. `alert()` (Pop-up)
Shows a modal alert box. Stops code execution until the user clicks "OK".
```javascript
alert("Welcome to my site!");
```
- **Pros**: Impossible to miss.
- **Cons**: Annoying, blocks other interactions.

### 3. `document.write()` (Direct HTML)
Writes directly to the HTML document stream.
```javascript
document.write("<h1>Hello World</h1>");
```
- **Warning**: If used after the page has finished loading, it will **overwrite the entire page**. Use mainly for testing.

### 4. `document.getElementById()` (DOM Manipulation)
The standard way to update specific parts of a webpage.
```javascript
document.getElementById("output").innerHTML = "New Content";
```

## 2. Input Methods

### 1. `prompt()`
Asks the user for input via a dialog box. Returns the string entered, or `null` if cancelled.
```javascript
let user = prompt("What is your name?");
console.log("User entered:", user);
```

### 2. `confirm()`
Asks for a Yes/No (OK/Cancel) decision. Returns `true` or `false`.
```javascript
let isSure = confirm("Are you sure you want to delete this?");
if (isSure) {
    console.log("Deleted.");
} else {
    console.log("Cancelled.");
}
```

## 3. Example Program: Print Your Name
Here is a complete HTML file demonstrating these methods.

```html
<!DOCTYPE html>
<html>
<body>

    <h1 id="header">Waiting for input...</h1>
    <div id="result"></div>
    
    <button onclick="askName()">Enter Name</button>

    <script>
        function askName() {
            // 1. Get Input
            let name = prompt("Please enter your name:");
            
            if (name) {
                // 2. Alert Output
                alert("Hello, " + name + "!");
                
                // 3. Console Output
                console.log("User name is: " + name);
                
                // 4. DOM Output (Best Practice)
                document.getElementById("header").innerText = "Welcome, " + name;
                document.getElementById("result").innerHTML = "<p>It is great to have you here.</p>";
            }
        }
    </script>

</body>
</html>
```

## 4. Related Topics
- [14_DOM_Manipulation.md](./14_DOM_Manipulation.md) - Advanced page updates.
