# 1.13 HTML Best Practices

## 1. What is it?
A collection of rules, conventions, and habits that professional developers follow to write clean, maintainable, and efficient code.

## 2. Why it is used?
- **Maintainability**: Easier for you (and others) to read and edit later.
- **Performance**: Cleaner code often loads faster.
- **Debugging**: Fewer syntax errors means less time fixing bugs.

## 3. Top Best Practices

### 1. Always Declare a Doctype
It prevents the browser from guessing how to render the page (Quirks Mode).
```html
<!DOCTYPE html>
```

### 2. Use Lowercase Tag Names
HTML is case-insensitive, but `ALL CAPS` looks like you are screaming and is harder to read.
```html
<!-- Bad -->
<DIV CLASS="CONTAINER">

<!-- Good -->
<div class="container">
```

### 3. Quote Attribute Values
Always use double quotes around values.
```html
<!-- Bad -->
<img src=image.jpg alt=photo>

<!-- Good -->
<img src="image.jpg" alt="photo">
```

### 4. Close All Tags
Even if the browser forgives you, unclosed tags can cause layout issues.
```html
<!-- Bad -->
<li>Item 1
<li>Item 2

<!-- Good -->
<li>Item 1</li>
<li>Item 2</li>
```

### 5. Proper Indentation
Nest elements cleanly explicitly to show hierarchy.
```html
<!-- Bad -->
<div>
<p>
Text
</p>
</div>

<!-- Good (2 or 4 spaces) -->
<div>
  <p>
    Text
  </p>
</div>
```

### 6. Meaningful Names (Classes & IDs)
Don't use names like `div1`, `box2`, `red-text`. Describe **what** it is, not what it looks like.
```html
<!-- Bad -->
<div class="red-box-top">...</div>

<!-- Good -->
<div class="alert-error">...</div>
```

### 7. Avoid Inline Styles
Separation of concerns is key. Keep CSS in `.css` files.
```html
<!-- Avoid -->
<p style="color: red; font-size: 20px;">Error</p>

<!-- Prefer -->
<p class="error-message">Error</p>
```

### 8. Use Semantic Elements
Don't use `div` for everything.
```html
<!-- Bad -->
<div id="nav">...</div>

<!-- Good -->
<nav>...</nav>
```

### 9. Validate Your Code
Use the [W3C Markup Validation Service](https://validator.w3.org/) to find syntax errors you missed.

## 4. Summary Checklist
- [ ] `<!DOCTYPE html>` at the top?
- [ ] `<html lang="en">` present?
- [ ] Proper `<head>` meta tags (charset, viewport)?
- [ ] Lowercase tags and attributes?
- [ ] Attributes quoted?
- [ ] Indentation consistent?
- [ ] `alt` attributes on images?
- [ ] No inline styles?

## 5. What's Next?
Congratulations! You have mastered the fundamentals of HTML. The structure is ready. Now, it's time to make it look beautiful.

👉 **Next Step**: [Introduction to CSS](../02_CSS/01_Introduction_to_CSS.md)
