# 1.2 HTML Document Structure

## 1. What is it?
The **Document Structure** refers to the required arrangement of tags that every HTML file must have to be valid and render correctly in a browser. It defines the "shell" of your web page.

## 2. Why it is used?
- **Standards Compliance**: Ensures your page follows W3C standards.
- **Browser Compatibility**: Helps all browsers (Chrome, Safari, etc.) understand how to read your page.
- **SEO (Search Engine Optimization)**: Provides essential metadata to search engines like Google.

## 3. Syntax / Structure
Every standard HTML5 document follows this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Visible content goes here -->
</body>
</html>
```

## 4. Detailed Explanation

### 1. `<!DOCTYPE html>`
- **Role**: Tells the browser "This is standard HTML5".
- **Must handle**: It prevents the browser from switching to "Quirks Mode" (an old compatibility mode that can break layouts).

### 2. `<html lang="en">`
- **Role**: The container for everything.
- **`lang="en"`**: Declares English as the primary language. Screen readers use this to pronounce text correctly.

### 3. `<head>`
The "Brain" of the document. Contains non-visible data:
- **`<meta charset="UTF-8">`**: Supports international characters (UTF-8 is the safest bet).
- **`<meta name="viewport" ...>`**: **CRITICAL for mobile responsiveness**. It tells the browser to scale the page to fit the screen width (prevents tiny text on phones).
- **`<title>`**: The text that appears in the **browser tab** and search engine results.
- **`<link>`**: Used to connect external resources like CSS files and Favicons.
- **`<script>`**: Used to include or write JavaScript (can also be in `<body>`).

### 4. `<body>`
The "Body" of the document. Everything you see on the screen goes here.

## 5. Examples

### Basic: Connecting a CSS file
```html
<head>
    <title>My Styled Page</title>
    <!-- Links to styles.css file -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome!</h1>
</body>
```

### Intermediate: Adding a Favicon (Browser Tab Icon)
```html
<head>
    <!-- Shows an icon in the browser tab -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
```

### Advanced: Adding SEO Meta Tags
```html
<head>
    <meta name="description" content="Learn web development from scratch with these free notes.">
    <meta name="keywords" content="HTML, CSS, JavaScript, Web Dev">
    <meta name="author" content="Your Name">
</head>
```

## 6. Key Points to Remember
- The `<head>` is hidden from the user; the `<body>` is what they see.
- Always include the viewport meta tag (`<meta name="viewport" ...>`) or your site will look broken on mobile devices.
- Title tags are crucial for SEO ranking.

## 7. Common Mistakes
- **Mistake**: Placing content like `<h1>` or `<p>` inside the `<head>`.
  **Fix**: Always put visible content in the `<body>`.

- **Mistake**: Forgetting the `<!DOCTYPE html>` declaration.
  **Fix**: Always make it the first line.

## 8. Pro Tips / Tricks
- **Tab Title Dynamic**: Use JavaScript to change the `<title>` dynamically when a user switches tabs (e.g., "Come back!").
- **Valid XHTML**: While HTML5 is loose, try to close all tags and use lowercase for better readability and fewer bugs.

## 9. Related Topics
- [01_Introduction_to_HTML.md](./01_Introduction_to_HTML.md) - Basics of HTML tags.
- [11_HTML_Attributes.md](./11_HTML_Attributes.md) - Learn more about `lang`, `href`, and `src`.
- [12_Accessibility_and_SEO.md](./12_Accessibility_and_SEO.md) - Deep dive into meta tags for SEO.
