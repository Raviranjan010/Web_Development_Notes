# 3.10 DOM Manipulation

## 1. What is the DOM?
The **DOM (Document Object Model)** is a powerful tool that represents the structure of an HTML document as a tree of objects. It allows JavaScript to interact with the structure and content of a webpage.
- **Tree Structure**: Organized like a family tree (Parent, Child, Sibling).
- **Element Access**: Find and change elements efficiently.

### Structure of the DOM
- **Root**: `document` (The entry point).
- **Branches**: `<html>`, `<head>`, `<body>`.
- **Leaves**: Elements (`<h1>`, `<p>`), Attributes, and Text.

## 2. Accessing Elements
Methods to find elements in the DOM.

### 1. `getElementById()`
Retrieves a single element by its unique ID.
```javascript
let heading = document.getElementById("title");
console.log(heading.textContent);
```

### 2. `getElementsByClassName()`
Returns a **live HTMLCollection** of elements with a specific class.
```javascript
let items = document.getElementsByClassName("list-item");
console.log(items[0].textContent); // Access first item
```

### 3. `getElementsByTagName()`
Selects all elements by their tag name.
```javascript
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length);
```

### 4. `querySelector()`
Returns the **first** element matching a CSS selector (id, class, tag).
```javascript
let firstPara = document.querySelector("p.intro");
```

### 5. `querySelectorAll()`
Returns a **static NodeList** of ALL elements matching a CSS selector.
```javascript
let allParas = document.querySelectorAll("p");
allParas.forEach(p => console.log(p.textContent));
```

## 3. Modifying the DOM

### 1. Changing Content
- **`textContent`**: Sets/Gets text (ignores HTML tags).
- **`innerHTML`**: Sets/Gets HTML content (parses tags).
```javascript
document.getElementById("title").textContent = "New Heading";
document.getElementById("content").innerHTML = "<b>Updated Content</b>";
```

### 2. Changing Attributes
Modify attributes like `src`, `href`, `alt`, `style`.
```javascript
document.getElementById("myImage").src = "new-image.jpg";
document.getElementById("link").href = "https://google.com";
```

### 3. Adding Elements
1.  **Create**: `document.createElement("p")`
2.  **Content**: `newPara.textContent = "Hello"`
3.  **Append**: `document.body.appendChild(newPara)`

```javascript
let newBtn = document.createElement("button");
newBtn.textContent = "Click Me";
document.body.appendChild(newBtn);
```

### 4. Removing Elements
Select the element and call `.remove()`.
```javascript
let oldPara = document.getElementById("removeMe");
oldPara.remove();
```

## 4. Traversing the DOM
Navigating through the tree relationship.

- **`parentNode`**: Gets the parent.
- **`children`**: Gets all child elements (HTMLCollection).
- **`firstChild` / `lastChild`**: Includes text nodes (whitespace).
- **`firstElementChild` / `lastElementChild`**: Elements only (Safer).
- **`nextSibling` / `previousSibling`**: Next/Previous node.

```javascript
let parent = document.getElementById("myDiv").parentNode;
console.log(parent.tagName);
```

## 5. Event Handling (Basics)
Listening for user actions.

**Adding Listener**:
```javascript
document.getElementById("btn").addEventListener("click", function() {
   alert("Button Clicked!");
});
```

**Removing Listener**:
```javascript
function sayHello() { console.log("Hello!"); }
btn.removeEventListener("click", sayHello);
```

## 6. Related Topics
- [15_Browser_Object_Model.md](./15_Browser_Object_Model.md) - Interacting with the Browser (Window, URL).
- [16_Events.md](./16_Events.md) - Deep dive into Events.
- [17_Project_DarkMode.md](./17_Project_DarkMode.md) - Practical Implementation.
