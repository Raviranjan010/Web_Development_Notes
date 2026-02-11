# 01 HTML Cheatsheet

A quick reference guide for HTML5 structural elements, tags, and common patterns.

## 📄 Section 1: Basic Structure

The skeleton of every webpage.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
```

---

## 🏷️ Section 2: Essential Tags

| Tag | Description | Type |
| :--- | :--- | :--- |
| `<h1>` - `<h6>` | Headings (h1 = most important) | Block |
| `<p>` | Paragraph | Block |
| `<a>` | Anchor (Link) | Inline |
| `<img>` | Image (Self-closing) | Inline-block |
| `<div>` | Generic container | Block |
| `<span>` | Generic text wrapper | Inline |
| `<br>` | Line break | Self-closing |
| `<hr>` | Horizontal rule (line) | Block |
| `<ul>` + `<li>` | Unordered List (Bullets) | Block |
| `<ol>` + `<li>` | Ordered List (Numbers) | Block |

---

## 🖼️ Section 3: Media & Links

### Links
```html
<a href="https://google.com" target="_blank">Open Google</a>
<!-- target="_blank" opens in new tab -->
```

### Images
```html
<img src="image.jpg" alt="Description of image" width="300">
<!-- Always include 'alt' for accessibility -->
```

---

## 📊 Section 4: Tables

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>25</td>
    </tr>
  </tbody>
</table>
```

---

## 📝 Section 5: Forms

```html
<form action="/submit" method="POST">
  <!-- Text Input -->
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" placeholder="Enter name">

  <!-- Password -->
  <input type="password" placeholder="Secret">

  <!-- Checkbox -->
  <input type="checkbox" id="terms">
  <label for="terms">I accept terms</label>

  <!-- Button -->
  <button type="submit">Submit</button>
</form>
```

---

## 🏛️ Section 6: Semantic HTML (Modern Layout)

Use these instead of generic `<div>`s for better SEO and Accessibility.

*   `<header>`: Top of page/section.
*   `<nav>`: Navigation links.
*   `<main>`: Primary content.
*   `<section>`: Thematic grouping of content.
*   `<article>`: Independent content (blog post).
*   `<aside>`: Sidebar/Indirectly related content.
*   `<footer>`: Bottom of page (Copyright, contacts).

---

## ⚡ Section 7: Emmet Shortcuts (VS Code)

*   `!` + Tab -> HTML Boilerplate.
*   `div.container` -> `<div class="container"></div>`
*   `h1#title` -> `<h1 id="title"></h1>`
*   `ul>li*3` -> Unordered list with 3 items.
*   `p{Hello}` -> `<p>Hello</p>`
