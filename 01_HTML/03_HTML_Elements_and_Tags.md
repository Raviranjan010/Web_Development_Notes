# 1.3 HTML Elements and Tags

## 1. What is it?
**Elements** are the building blocks of HTML. An element typically consists of a start tag, content, and an end tag. **Tags** are the labels you use to define the start and end of an element (like `<p>` and `</p>`).

## 2. Why it is used?
Different tags have different meanings (semantics) and default behaviors. Using the correct tag ensures your content is structured logically and styled correctly by the browser.

## 3. Syntax / Structure
```html
<tagname attribute="value">Content</tagname>
```

### Types of Elements
1.  **Container Tags (Normal Elements)**: Have a start and end tag.
    - Example: `<h1>Title</h1>`, `<div>Section</div>`
2.  **Void Tags (Self-Closing Elements)**: Have ONLY a start tag. They cannot hold content.
    - Example: `<br>`, `<img>`, `<hr>`, `<input>`

## 4. Detailed Explanation

### Block-level Elements vs. Inline Elements
This is a **crucial** concept in HTML/CSS.

#### Block-level Elements
- Always start on a **new line**.
- Take up the **full width** available (stretch to the left and right).
- Examples: `<div>`, `<h1>` to `<h6>`, `<p>`, `<form>`, `<header>`, `<footer>`, `<ul>`, `<li>`.

#### Inline Elements
- Do **not** start on a new line.
- Take up only as much width as necessary.
- Examples: `<span>`, `<a>`, `<img>`, `<strong>`, `<em>`, `<button>`, `<input>`.

## 5. Examples

### Block-level Example
```html
<div style="background-color: lightblue;">
  I am a DIV (Block-level). I take up the full width.
</div>
<p style="background-color: lightgreen;">
  I am a Paragraph (Block-level). I start on a new line.
</p>
```

### Inline Example
```html
<span style="background-color: yellow;">I am a SPAN (Inline).</span>
<a href="#" style="background-color: pink;">I am a LINK (Inline).</a>
<!-- These will appear on the same line if there is space -->
```

### Void Element Example
```html
<p>First Line.<br>Second Line (after break).</p>
<hr> <!-- Horizontal Rule (Line) -->
<img src="logo.png" alt="Logo">
```

## 6. Key Points to Remember
- You can put **inline** elements inside **block** elements (e.g., a `<span>` inside a `<div>`).
- You usually should **not** put **block** elements inside **inline** elements (e.g., don't put a `<div>` inside a `<span>` or `<a>`). *Note: HTML5 allows `<div>` inside `<a>` in specific cases, but be careful.*
- `<div>` is the generic container for **flow content** (layout).
- `<span>` is the generic container for **phrasing content** (text styling).

## 7. Common Mistakes
- **Mistake**: Using `<br>` to create spacing between paragraphs.
  **Fix**: Use CSS (`margin` or `padding`) for layout spacing. Use `<br>` only for line breaks within text (like a poem or address).

- **Mistake**: Forgetting `alt` text on images.
  **Fix**: Always include `alt="Description"` for accessibility.

## 8. Pro Tips / Tricks
- **Semantic Replacements**:
  - Instead of `<b>`, use `<strong>` (implies importance).
  - Instead of `<i>`, use `<em>` (implies emphasis).
  - Instead of `<div id="header">`, use `<header>`.
- **CSS Reset**: Browsers apply default margins to block elements (like `<body>` and `<p>`). Developers often remove these with CSS to have full control.

## 9. Related Topics
- [09_Semantic_HTML.md](./09_Semantic_HTML.md) - Why standard tags like `<div>` might not be enough.
- [04_Text_Formatting.md](./04_Text_Formatting.md) - Specific tags for styling text.
