# 1.6 HTML Lists

## 1. What is it?
HTML Lists are used to group related items together. There are three main types: Unordered, Ordered, and Description lists.

## 2. Why it is used?
- **Organization**: Presents data in a structured, readable format.
- **Navigation Menus**: Almost all website navigation bars are actually styled lists!
- **Steps/Instructions**: Perfect for recipes or tutorials.

## 3. Syntax / Structure
- `<ul>`: Unordered List (Bullet points)
- `<ol>`: Ordered List (Numbered)
- `<li>`: List Item (The actual item inside the list)
- `<dl>`: Description List (Terms and definitions)

## 4. Detailed Explanation

### Unordered List (`<ul>`)
Used when the order of items does strictly matter. Default style is bullet points.

### Ordered List (`<ol>`)
Used when sequence is important (e.g., "Step 1, Step 2"). Default style is numbers.

### List Item (`<li>`)
Must be nested inside `<ul>` or `<ol>`.

## 5. Examples

### Unordered List
```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>
```

### Ordered List
```html
<ol>
  <li>Boil water</li>
  <li>Add pasta</li>
  <li>Cook for 10 minutes</li>
</ol>
```

### Nested Lists
Lists inside lists.
```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Mango</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrot</li>
      <li>Potato</li>
    </ul>
  </li>
</ul>
```

### Formatting Ordered Lists (Attributes)
You can customize the numbering using these attributes:

1.  **`reversed`**: Reverses the numbering order (e.g., 3, 2, 1).
    ```html
    <ol reversed>
      <li>HTML</li>
      <li>CSS</li>
      <li>JS</li>
    </ol>
    ```

2.  **`start`**: Specifies the starting number.
    ```html
    <ol start="5">
      <li>Item 5</li>
      <li>Item 6</li>
    </ol>
    ```

3.  **`type`**: Changes the marker type.
    - `1`: Numbers (Default)
    - `A`: Uppercase Letters
    - `a`: Lowercase Letters
    - `I`: Uppercase Roman Numerals
    - `i`: Lowercase Roman Numerals
    ```html
    <ol type="i">
      <li>Introduction</li>
      <li>Main Content</li>
    </ol>
    
    ```

### Description List (`<dl>`)
A description list is a list of terms, with a description of each term. Useful for glossaries or key-value pairs.

- `<dl>`: Defines the description list.
- `<dt>`: Defines the term/name.
- `<dd>`: Describes the term.

```html
<dl>
  <dt>Coffee</dt>
  <dd>- 500 gms</dd>
  <dt>Milk</dt>
  <dd>- 1 ltr Tetra Pack</dd>
</dl>
```

## 6. Key Points to Remember
- Always put `<li>` inside `<ul>` or `<ol>`. Putting text directly inside `<ul>` is invalid HTML.
- Unordered lists (`<ul>`) are the standard for creating navigation menus (navbars).

## 7. Common Mistakes
- **Mistake**: Forgetting to close the `<ul>` or `<ol>`.
- **Mistake**: Using lists for layout just to get indentation. Use CSS margins/padding instead.

## 8. Pro Tips / Tricks
- **Remove Bullets**: Use CSS `list-style: none;` to remove bullets. This is the first step in creating a custom navbar.
- **Custom Markers**: CSS `::marker` pseudo-element allows you to change the color or content of the bullet/number visually.

## 9. Related Topics
- [09_Semantic_HTML.md](./09_Semantic_HTML.md) - Structuring content.
- [../02_CSS/03_Selectors.md](../02_CSS/03_Selectors.md) - Styling lists with CSS.
