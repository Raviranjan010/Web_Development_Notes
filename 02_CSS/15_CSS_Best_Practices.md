# 2.15 CSS Best Practices

## 1. Organizing Your CSS

### 1. External Files
Always use **External CSS** (`<link>`). It allows you to:
- Reuse code across pages.
- Cache styles for better performance.
- Keep HTML clean and readable.

### 2. Grouping
Group related styles together.
```css
/* Header Styles */
header { ... }

/* Navigation Styles */
nav { ... }

/* Footer Styles */
footer { ... }
```

## 2. Writing Clean Code

### 1. Meaningful Names
Naming is hard, but important. Use names that describe **function**, not appearance.
- **Bad**: `.red-button`, `.large-text`
- **Good**: `.btn-danger`, `.hero-title`

### 2. Shorthand Properties
Use shorthand to save space and time.
```css
/* Bad */
margin-top: 10px;
margin-right: 5px;
margin-bottom: 10px;
margin-left: 5px;

/* Good */
margin: 10px 5px;
```

### 3. Avoid Inline Styles (`style="..."`)
They have high specificity, are hard to override, and are impossible to reuse.

### 4. Do Not Rely on `!important`
Using `!important` breaks the cascade. It helps temporarily, but creates a "Specifity War" later. Use it only as a last resort (e.g., overriding a 3rd party library).

## 3. Best Practices by Type

### Inline
- **Use for**: Quick testing or unique, dynamic values set by JS.
- **Avoid for**: General Layouts.

### Internal
- **Use for**: Single Page Applications or unique Landing Pages.
- **Avoid for**: Multi-page sites.

### External
- **Use for**: **Basically Everything.**
- **Benefit**: Consistent design, caching, maintainability.

## 4. Performance
- **Minify CSS**: Remove spaces and comments for production code (tools do this for you).
- **Combine Files**: Reduce HTTP requests by combining multiple CSS files into one (if possible).
