# 1.4 Text Formatting

## 1. What is it?
Text formatting tags are used to define special text with specific meaning or style, such as **bold**, *italic*, <u>underlined</u>, or <code>code</code> snippets.

## 2. Why it is used?
- **Readability**: Breaking up large blocks of text makes it easier to read.
- **Emphasis**: Highlighting key keywords for the user.
- **Meaning**: Screen readers use tags like `<strong>` and `<em>` to change their tone of voice, assisting visually impaired users.

## 3. Syntax / Structure
Most formatting tags are **inline** elements.

```html
<p>This is <strong>important</strong> text.</p>
```

## 4. Detailed Explanation

### Physical vs. Logical Tags
- **Physical tags** (`<b>`, `<i>`): Only change the visual appearance (bold/italic). They have no semantic meaning.
- **Logical tags** (`<strong>`, `<em>`): Convey **meaning** and importance. Browsers usually style them the same as physical tags, but they are better for accessibility and SEO.

| Tag | Description | Visual Style (Default) |
| :--- | :--- | :--- |
| `<b>` | Bold text (Physical) | **Bold** |
| `<strong>` | Important text (Logical) | **Bold** |
| `<i>` | Italic text (Physical) | *Italic* |
| `<em>` | Emphasized text (Logical) | *Italic* |
| `<u>` | Underlined text (Avoid using for non-links) | <u>Underlined</u> |
| `<mark>` | Marked/Highlighted text | Yellow background |
| `<del>` | Deleted/Struck-through text | ~~Strikethrough~~ |
| `<ins>` | Inserted text | <u>Underlined</u> |
| `<sub>` | Subscript text | H<sub>2</sub>O |
| `<sup>` | Superscript text | X<sup>2</sup> |
| `<small>` | Smaller text | Small font |

## 5. Examples

### Emphasis and Importance
```html
<p>You <strong>must</strong> complete the form.</p>
<p>I <em>really</em> love coding.</p>
```

### Scientific Formula (Subscript/Superscript)
```html
<p>Water is H<sub>2</sub>O.</p>
<p>Einstein said E = mc<sup>2</sup>.</p>
```

### Quoting and Citing
```html
<!-- Blockquote for long quotes -->
<blockquote cite="https://example.com">
    This is a long quotation from a source.
</blockquote>

<!-- Q tag for short inline quotes -->
<p>He said, <q>Hello World</q>.</p>

<!-- Cite tag for the title of a work -->
<p><cite>The Great Gatsby</cite> is a classic novel.</p>
```

### Preformatted Text & Code
```html
<!-- pre preserves spaces and line breaks -->
<pre>
    Line 1
        Line 2 (indented)
    Line 3
</pre>

<!-- code is used for computer code snippets -->
<p>Use `<code>console.log()</code>` to debug.</p>
```

## 6. Key Points to Remember
- Prefer `<strong>` over `<b>` and `<em>` over `<i>` for modern web development.
- Do not use `<u>` (underline) for emphasis, as users might confuse it with a hyperlink.
- `<pre>` is useful for displaying code blocks or poetry where spacing matters.

## 7. Common Mistakes
- **Mistake**: Styling headings just by making text bold (`<b>Title</b>`).
  **Fix**: Use heading tags (`<h1>`, `<h2>`, etc.) for structure.

- **Mistake**: Using `<br>` repeatedly inside a `<p>` to force formatting.
  **Fix**: Use `<pre>` if exact formatting is needed, or CSS for spacing.

## 8. Pro Tips / Tricks
- **Keyboard Shortcut**: `<kbd>` tag represents user keyboard input.
  ```html
  <p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
  ```
- **Address Tag**: Use `<address>` for contact information (it usually defaults to italic).

## 9. Related Topics
- [03_HTML_Elements_and_Tags.md](./03_HTML_Elements_and_Tags.md) - General element behavior.
- [09_Semantic_HTML.md](./09_Semantic_HTML.md) - More on meaning behind tags.
