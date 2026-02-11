# 3.10c Mini Project: Enhanced Dark Mode Toggle

## 1. Overview
This project demonstrates a modern, production-ready Dark Mode toggle.
- **Runnable Demo**: [Open Project Folder](./Projects/DarkMode/)
- **Core Concept**: CSS Variables + `data-theme` attribute + LocalStorage.
- **Enhanced UI**: Uses a sliding toggle switch instead of a simple button.

## 2. Project Structure
Create a folder named `DarkMode` and add these 3 files:

### 1. `index.html` (Structure)
Uses semantic elements (`header`, `main`, `section`).
[View Source Code](./Projects/DarkMode/index.html)

### 2. `style.css` (Styling)
Uses **CSS Custom Properties (Variables)** for easy theming.
[View Source Code](./Projects/DarkMode/style.css)

Key Snippet:
```css
:root {
    --bg-color: #f4f4f4;
    --text-color: #333;
}

[data-theme="dark"] {
    --bg-color: #121212;
    --text-color: #e0e0e0;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

### 3. `script.js` (Logic)
Handles the toggle switch event and persists preference.
[View Source Code](./Projects/DarkMode/script.js)

Key Logic:
```javascript
const toggleSwitch = document.querySelector('input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);
```

## 3. Key Concepts Used
1.  **CSS Variables (`--var-name`)**: Allows changing colors globally by just swapping values in a parent selector (`[data-theme="dark"]`).
2.  **Attribute Selector**: `[data-theme="dark"]` targets the `<html>` element when the attribute is set.
3.  **LocalStorage**: `localStorage.setItem('theme', 'dark')` saves the user's choice so it stays dark even after page reload.
4.  **Event Listener (`change`)**: Detects when the checkbox state changes.

## 4. Why this approach is better?
- **Scalable**: You can add more themes (e.g., "blue-mode") easily by creating new variable sets.
- **Clean**: No need to add/remove multiple classes manually.
- **Persistent**: Remembers user choice.
