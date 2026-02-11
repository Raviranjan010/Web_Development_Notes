# 05 Developer Tools (DevTools)

## 1. What are DevTools?
Every modern browser (Chrome, Edge, Firefox) comes with built-in **Developer Tools**. These tools allow you to inspect code, debug JavaScript, analyze performance, and view network requests directly in the browser.

**How to Open:**
- Right-click anywhere on a webpage -> **Inspect**.
- Shortcut: `F12` or `Ctrl + Shift + I` (Windows) / `Cmd + Option + I` (Mac).

---

## 2. Core Panels Explained

### A. The Elements Panel (HTML & CSS)
*   **View Source**: See the live HTML structure of the page.
*   **Edit on the Fly**: Double-click tags or text to edit them temporarily.
*   **CSS Styles**: On the right side, you can see applied styles, toggle checkboxes to disable rules, or add new properties to test designs instantly.
*   **Box Model**: Scroll down in the Styles pane to see the margin, border, padding, and content box visualized.

### B. The Console Panel (JavaScript)
*   **Logs**: View messages logged with `console.log()`.
*   **Errors**: Red text indicates errors crashing your script.
*   **Playground**: You can write and execute JavaScript code directly here (e.g., `alert('Hi')`).

### C. The Network Panel (APIs & Loading)
*   **Requests**: Shows every file (images, scripts, CSS) the page loads.
*   **Status Codes**: Use this to debug broken links (404) or server errors (500).
*   **Speed**: Check how long files take to load.

### D. The Application Panel (Storage)
*   **Local/Session Storage**: View and edit data saved in the browser.
*   **Cookies**: Inspect tracking cookies.

---

## 3. VS Code Power User Tips

To work efficiently, you should master your code editor.

### Recommended Extensions
1.  **Live Server (Ritwick Dey)**: Compulsory. Launches a local server with hot-reload.
2.  **Prettier - Code Formatter**: Auto-formats messy code on save.
3.  **ES7+ React/Redux/React-Native snippets**: Useful shortcuts (even for vanilla JS).
4.  **Auto Rename Tag**: Renaming `<div class="box">` automatically renames the closing `</div>`.
5.  **Image Preview**: Shows a tiny preview of an image in the sidebar gutter.

### Keyboard Shortcuts (Windows)
*   `Ctrl + P`: Quick Open file.
*   `Ctrl + Shift + P`: Open Command Palette (Run any command).
*   `Alt + Up/Down`: Move current line up or down.
*   `Shift + Alt + Down`: Duplicate current line down.
*   `Ctrl + /`: Toggle comment.
*   `Ctrl + B`: Toggle sidebar visibility.
