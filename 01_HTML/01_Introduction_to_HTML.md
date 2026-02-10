# 1.1 Introduction to HTML

## 1. What is it?
**HTML** stands for **HyperText Markup Language**. It is the standard markup language used to create the structure and content of web pages. Think of HTML as the **skeleton** of a website—it defines *what* content is on the page (headings, paragraphs, images, buttons), but not what it looks like (that's CSS) or how it behaves (that's JavaScript).

## 2. Why it is used?
Every website you visit—from Google to Facebook to your personal portfolio—is built on HTML.
- **Foundation of the Web**: Browsers (like Chrome, Firefox, Edge) read HTML files and render them into visible web pages.
- **Structure**: It organizes content logically so users and search engines can understand it.
- **Accessibility**: Proper HTML allows screen readers to read content to visually impaired users.

## 3. Syntax / Structure
An HTML element usually consists of a **start tag**, some **content**, and an **end tag**.

```html
<!-- Anatomy of an HTML Element -->
<tagname>Content goes here...</tagname>
```

- **`<tagname>`**: The opening tag (starts the element).
- **`Content`**: The text or other elements inside.
- **`</tagname>`**: The closing tag (ends the element). Note the forward slash `/`.

### Basic HTML Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

## 4. Detailed Explanation

### `<!DOCTYPE html>`
- This is **not a tag**. It is a declaration that tells the browser: "This document is an HTML5 document."
- It must be the very first line in your file.

### `<html>`
- The root element of the page. All other elements (except the specific `<!DOCTYPE>` declaration) live inside here.
- The `lang="en"` attribute specifies that the page content is in English, which helps search engines and screen readers.

### `<head>`
- Contains **meta-information** about the page that is **not visible** to the user in the main browser window.
- Includes the page title, character set, CSS links, and scripts.

### `<meta charset="UTF-8">`
- Ensures your page can display almost any character clearly (including emojis 🚀 and foreign language characters).

### `<body>`
- Contains the **visible** content of the page—headings, paragraphs, images, links, etc.

## 5. Examples

### Basic Example
A simple heading and a paragraph.
```html
<h1>My First Heading</h1>
<p>My first paragraph.</p>
```

### Intermediate Example
Adding an image and a link.
```html
<h2>About Me</h2>
<p>I am learning Web Development.</p>
<!-- Image tag is self-closing (no end tag) -->
<img src="profile.jpg" alt="My Profile Picture">
<br>
<a href="https://google.com">Visit Google</a>
```

### Advanced Example
A nested structure with a division container.
```html
<div class="card">
    <h3>Article Title</h3>
    <p>This is a summary of the article.</p>
    <button>Read More</button>
</div>
```

## 6. Key Points to Remember
- HTML is **not** a programming language; it is a **markup language**.
- HTML tags are **not case-sensitive**, but it is a W3C standard / best practice to use **lowercase** (e.g., `<div>`, not ` <DIV>`).
- Some tags, like `<img>` and `<br>`, are **self-closing** or "void" elements, meaning they don't have a closing tag.
- Whitespace (extra spaces or newlines) in your HTML code is mostly ignored by the browser.

## 7. Common Mistakes
- **Mistake**: Forgetting the closing tag.
  ```html
  <p>This is a paragraph
  <!-- The browser might guess where it ends, but it can break your layout -->
  ```
  **Fix**: Always close your tags! `<p>This is a paragraph</p>`

- **Mistake**: Nesting tags incorrectly.
  ```html
  <!-- Wrong -->
  <p>This is <strong>bold</p></strong>
  ```
  **Fix**: Close the inner tag before closing the outer tag.
  ```html
  <!-- Correct -->
  <p>This is <strong>bold</strong></p>
  ```

## 8. Pro Tips / Tricks
- **Use Emmet Abbreviations**: Most code editors (like VS Code) support Emmet. You can type `!` and hit `Tab` to generate the entire basic HTML skeleton instantly.
- **Inspect Element**: Right-click on any webpage and select "Inspect" to see the live HTML structure. It's the best way to learn from others!
- **Comments**: Use comments `<!-- This is a comment -->` to document your code. They are not displayed in the browser but are helpful for you and other developers.

## 9. Related Topics
- [02_HTML_Document_Structure.md](./02_HTML_Document_Structure.md) - Learn more about the `<head>`, `<body>`, and overall layout.
- [03_HTML_Elements_and_Tags.md](./03_HTML_Elements_and_Tags.md) - Deep dive into common tags.
