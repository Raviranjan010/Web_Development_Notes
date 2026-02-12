# 1.5 Links and Images!

## 1. What is it?
- **Links (Anchors)** allow users to navigate from one page to another or to a specific part of the same page.
- **Images** embed visual content into the web page.

## 2. Why it is used?
- **Navigation**: The core of the "Web" is the ability to link documents together.
- **Visuals**: Images make content engaging and easier to understand.

## 3. Syntax / Structure

### Link Syntax
```html
<a href="url">Link Text</a>
```

### Image Syntax
```html
<img src="url" alt="description">
```

## 4. Detailed Explanation

### The Anchor Tag `<a>`
- **`href` (Hypertext Reference)**: The most important attribute. It specifies the destination URL.
- **`target`**: Controls where the link opens.
  - `_self` (Default): Opens in the same tab.
  - `_blank`: Opens in a new tab.

### The Image Tag `<img>`
- **`src` (Source)**: The path to the image file.
- **`alt` (Alternative Text)**: Text description shown if the image fails to load. Crudial for screen readers (accessibility) and SEO.
- **Self-closing**: It does not have a closing tag.

## 5. Examples

### Absolute vs. Relative Links
```html
<!-- Absolute Link (Full URL) -->
<a href="https://www.google.com">Go to Google</a>

<!-- Relative Link (File in the same folder) -->
<a href="about.html">About Page</a>

<!-- Relative Link (File in a subfolder) -->
<a href="images/photo.jpg">View Photo</a>
```

### Opening in a New Tab
```html
<a href="https://example.com" target="_blank">Open External Site</a>
```

### Email and Phone Links
```html
<a href="mailto:user@example.com">Send Email</a>
<a href="tel:+1234567890">Call Us</a>
```

### Images
```html
<img src="https://via.placeholder.com/150" alt="Placeholder Image">

<!-- Controlling Size (Not recommended, use CSS instead) -->
<img src="logo.png" alt="Company Logo" width="200" height="100">
```

### Image as a Link
```html
<a href="https://example.com">
  <img src="button.png" alt="Click Here">
</a>
```

### Figure and Caption
Best for semantic image groups.
```html
<figure>
  <img src="cat.jpg" alt="A cute cat" width="300">
  <figcaption>Fig.1 - A cute kitten playing.</figcaption>
</figure>
```

## 6. Key Points to Remember
- Always add `alt` text to images.
- Use `target="_blank"` sparingly, as it can be annoying for users if every link opens a new tab.
- Be careful with file paths. `./` means current directory, `../` means parent directory.

## 7. Common Mistakes
- **Mistake**: Using a local file path that works only on your computer.
  ```html
  <img src="C:/Users/Name/Desktop/image.jpg">
  ```
  **Fix**: Use relative paths inside your project folder.
  ```html
  <img src="images/image.jpg">
  ```

- **Mistake**: Forgetting `href` in anchor tags.
  **Fix**: An `<a>` tag without `href` is just a placeholder, not a link.

## 8. Pro Tips / Tricks
- **Favicon**: The small icon in the browser tab is linked in the head section (`<link rel="icon"...>`), not with an `<img>` tag.
- **Download Attribute**: Add `download` to an anchor tag to prompt a file download instead of navigating to it.
  ```html
  <a href="report.pdf" download>Download Report</a>
  ```
- **Lazy Loading**: Use `loading="lazy"` on images to speed up page load times by only loading images when they scroll into view.
  ```html
  <img src="huge-photo.jpg" loading="lazy" alt="Big Photo">
  ```

## 9. Related Topics
- [11_HTML_Attributes.md](./11_HTML_Attributes.md) - More on file paths and attributes.
- [12_Accessibility_and_SEO.md](./12_Accessibility_and_SEO.md) - Why `alt` text provides SEO value.
