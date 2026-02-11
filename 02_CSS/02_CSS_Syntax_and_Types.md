# 2.2 CSS Syntax and Types

## 1. Overview
There are three ways to apply CSS to HTML. Each method serves a different purpose based on how you organize and manage your styles.

## 2. CSS Syntax (The Rules)
The CSS syntax defines how CSS rules are written so that browsers can interpret them.

```css
h1 {
    color: blue;
    font-size: 24px;
}
```

### Components
1.  **Selector**: Targets the HTML element (e.g., `h1`).
2.  **Declaration Block**: Enclosed in curly braces `{ }`. It contains one or more declarations.
3.  **Property**: The style attribute you want to change (e.g., `color`).
4.  **Value**: The setting for that property (e.g., `blue`).
5.  **Separator**: Properties and values are separated by a colon `:`, and declarations are ended with a semicolon `;`.

---

## 3. The Three Methods

### 1. Inline CSS
Applies styles directly within HTML tags using the `style` attribute.
- **Use Case**: Small-scale styling, testing, or email templates.
- **Disadvantage**: Hard to maintain, no reusability.

```html
<!DOCTYPE html>
<html>
<head> <title>Inline CSS</title> </head>
<body>
    <h2 style="color: green;">
          Welcome to <i style="color: green;">innocascade</i>
      </h2>
</body>
</html>
```

### 2. Internal CSS
Styles are written inside `<style>` tags within the `<head>` section.
- **Use Case**: Single-page websites or unique styles for one specific page.
- **Disadvantage**: Styles are not reusable on other pages.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Internal CSS</title>
    <style>
        h2 { color: green; }
    </style>
</head>
<body>
    <h2>Welcome to innocascade</h2>
</body>
</html>
```

### 3. External CSS
Styles are written in a separate `.css` file and linked using the `<link>` tag.
- **Use Case**: Large projects, multi-page websites.
- **Advantage**: Organize code, maintain consistency, and improve performance (caching).

**index.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>External CSS</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Welcome to innocascade</h2>
</body>
</html>
```

**styles.css**:
```css
h2 {
    color: green;
}
```

---

## 3. Best Practices (Comparison)

| Method | Reusability | Maintenance | Recommended For |
| :--- | :--- | :--- | :--- |
| **Inline** | ❌ None | ❌ Difficult | Quick fixes, Email templates |
| **Internal** | ⚠️ Single Page | ⚠️ Medium | Single-page apps, Landing pages |
| **External** | ✅ High | ✅ Easy | **Everything else (Standard)** |

**Recommendation**: Always use **External CSS** for real-world projects to keep your HTML clean and your styles organized.
