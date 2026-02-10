# 3.10 DOM Manipulation

## 1. What is it?
The **DOM (Document Object Model)** is the bridge between JavaScript and HTML. It treats the HTML document as a tree structure of objects that JS can read and modify.

## 2. Why it is used?
Without the DOM, JS would just be math running in the console. The DOM allows JS to:
- Change text (`<h1>` -> "Welcome User")
- Change styles (Dark Mode)
- Add/Remove elements (To-Do Lists)

## 3. Syntax / Structure
Global object: `document`.

```javascript
// Select -> Manipulate
const title = document.querySelector("h1");
title.innerText = "New Title";
```

## 4. Detailed Explanation

### Selecting Elements
1.  **`getElementById("id")`**: Fastest, selects one element.
2.  **`querySelector("css-selector")`**: Most versatile. Selects the **first** match (`.class`, `#id`, `tag`).
3.  **`querySelectorAll("css-selector")`**: Returns a NodeList (array-like) of **all** matches.

### Modifying Content
1.  **`innerText`**: Visible text only (aware of CSS styling).
2.  **`textContent`**: All text, even hidden ones.
3.  **`innerHTML`**: HTML content (can insert tags). **Security Risk** (XSS attacks) if used with user input.

### Modifying Styles
Access the `style` object. Properties are camelCased.
`element.style.backgroundColor = "red";`

### Classes
Best practice is to toggle classes rather than changing individual styles.
`element.classList.add("active");`
`element.classList.remove("hidden");`
`element.classList.toggle("open");`

## 5. Examples

### Changing Text
```javascript
const p = document.querySelector(".description");
p.innerText = "Updated description via JS!";
```

### Creating & Adding Elements
```javascript
// 1. Create
const newBtn = document.createElement("button");
newBtn.innerText = "Click Me";

// 2. Append to Body
document.body.appendChild(newBtn);
```

### Looping through Elements
```javascript
const items = document.querySelectorAll("li");

items.forEach(item => {
    item.style.color = "blue";
});
```

## 6. Key Points to Remember
- **DOM Loading**: If your script runs before the HTML exists, it returns `null`. Always put scripts at the end of `<body>` or use `defer`.
- **NodeList vs Array**: `querySelectorAll` returns a NodeList. You can use `forEach`, but not `map` or `filter` directly comfortably. (Convert to array with `Array.from()` first if needed).

## 7. Common Mistakes
- **Mistake**: `document.getElementsByClassName`.
  **Why**: It returns an "HTMLCollection" (live list), which behaves differently than NodeLists. `querySelectorAll` is generally safer and more consistent for beginners.

## 8. Pro Tips / Tricks
- **Traversal**: You can move up/down the tree.
  - `element.parentElement`
  - `element.children`
  - `element.nextElementSibling`

## 9. Related Topics
- [11_Events.md](./11_Events.md) - Reacting to user actions on these elements.
- [../02_CSS/03_Selectors.md](../02_CSS/03_Selectors.md) - Selectors used in `querySelector`.
