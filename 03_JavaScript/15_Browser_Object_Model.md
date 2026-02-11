# 3.10b Browser Object Model (BOM)

## 1. What is the BOM?
The **BOM** (Browser Object Model) allows JavaScript to interact with the **browser** itself, not just the webpage content (DOM).
- While DOM handles the *page*, BOM handles the *window*, *URL*, *history*, etc.
- **Top Object**: `window`. All global variables and the DOM `document` itself are members of `window`.

## 2. The `window` Object
Represents the browser window or tab.
```javascript
window.alert("Hello!");
console.log(window.innerWidth); // Width of viewport
```
> **Note**: You can technically skip `window.` prefix for global methods (e.g., just `alert()`), but it's good to know where they come from.

### Resizing Window
```javascript
// Opens a new window and resizes it
let newWin = window.open("", "NewWin", "width=500,height=500");
newWin.resizeTo(300, 300);
```

## 3. BOM Components

### 1. Navigator Object (Browser Info)
Contains info about the browser and user environment.
```javascript
console.log(navigator.userAgent); // Browser/OS details
console.log(navigator.language);  // User's language (e.g., "en-US")
console.log(navigator.onLine);    // true if online
```

### 2. Location Object (URL Handling)
Manages the current URL.
```javascript
console.log(location.href);     // Full URL
console.log(location.hostname); // Domain (e.g., google.com)
console.log(location.pathname); // Path after domain

// Redirect user
// location.href = "https://geeksforgeeks.org";
```

### 3. Screen Object (Display Info)
Info about the user's physical screen/monitor.
```javascript
console.log(screen.width);  // Full screen width
console.log(screen.height); // Full screen height
console.log(screen.availWidth); // Width excluding taskbars
```

### 4. History Object (Navigation)
Interact with browser session history (Back/Forward buttons).
```javascript
history.back();    // Go to previous page
history.forward(); // Go to next page
// history.go(-2); // Go back 2 pages
```

## 4. Key Features Summary
| Object | Description |
| :--- | :--- |
| **window** | The global object, controls the browser window. |
| **navigator** | Browser and OS information. |
| **location** | URL information and redirection. |
| **screen** | User's screen resolution. |
| **history** | Browsing history navigation. |

## 5. Related Topics
- [14_DOM_Manipulation.md](./14_DOM_Manipulation.md) - The document content.
- [25_Asynchronous_JS.md](./25_Asynchronous_JS.md) - `setTimeout` and `setInterval` (also BOM methods).
