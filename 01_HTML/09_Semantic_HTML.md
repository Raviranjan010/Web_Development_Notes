# 1.9 Semantic HTML

## 1. What is it?
Semantic HTML means using tags that clearly describe their meaning to both the browser and the developer.
- **Non-semantic**: `<div>` and `<span>` (Contextless containers).
- **Semantic**: `<header>`, `<footer>`, `<article>`, `<section>` (Clearly describe their content).

## 2. Why it is used?
- **SEO**: Search engines rank semantic sites higher because they understand the content structure better.
- **Accessibility**: Screen readers can navigate semantic regions (e.g., "Skip to Main Content").
- **Readability**: Code is easier for humans to read and maintain.

## 3. Syntax / Structure
Common semantic layout tags:

```html
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <section>...</section>
    <article>...</article>
    <aside>...</aside>
  </main>
  <footer>...</footer>
</body>
```

## 4. Detailed Explanation

### 1. `<header>`
Introductory content for a page or section. Usually contains the logo, search bar, and navigation.

### 2. `<nav>`
Contains navigation links to other pages or parts of the page.

### 3. `<main>`
The dominant content of the `<body>`. There should be only **one** `<main>` per page.

### 4. `<section>`
A thematic grouping of content, typically with a heading. Examples: "Services", "Contact Us", "Testimonials".

### 5. `<article>`
Self-contained, independent content. A blog post, news story, or forum comment. It should make sense if you pull it out and place it elsewhere.

### 6. `<aside>`
Content tangentially related to the main content. Usually sidebars, ads, or "Recommended Reading".

### 7. `<footer>`
Information about the author, copyright, sitemap, contact details.

## 5. Examples

### Standard Blog Layout
```html
<header>
  <h1>My Tech Blog</h1>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>Understanding Semantic HTML</h2>
    <p>Using the right tags matters...</p>
  </article>

  <aside>
    <h3>About the Author</h3>
    <p>John Doe is a web developer.</p>
  </aside>
</main>

<footer>
  <p>&copy; 2023 John Doe.</p>
</footer>
```

### The `<details>` and `<summary>` tags
A semantic way to create accordions (collapsible content).
```html
<details>
  <summary>Click to show more info</summary>
  <p>Here is the hidden content that expands on click.</p>
</details>
```

## 6. Key Points to Remember
- Don't just replace every `<div>` with a semantic tag. Use them where they make sense. `<div>` is still perfect for purely visual wrappers (like a flex container).
- Use `<h1>` only once per page (usually in the header/main). Use `<h2>` for section titles.

## 7. Common Mistakes
- **Mistake**: Using `<section>` just as a wrapper for styling.
  **Fix**: Use `<div>` for styling. Use `<section>` if the content has a theme/heading.

## 8. Pro Tips / Tricks
- **Time Tag**: Use `<time>` for machine-readable dates.
  ```html
  <p>Published on <time datetime="2023-12-25">Christmas Day</time>.</p>
  ```
- **Figure Tag**: Use `<figure>` and `<figcaption>` for images and diagrams to associate captions semantically.

## 9. Related Topics
- [02_HTML_Document_Structure.md](./02_HTML_Document_Structure.md) - Basic structure using `header` and `footer`.
- [12_Accessibility_and_SEO.md](./12_Accessibility_and_SEO.md) - Why semantics win at SEO.
