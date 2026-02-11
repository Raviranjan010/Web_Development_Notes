# 2.18 Bootstrap: Getting Started

## 1. What is Bootstrap?
**Bootstrap** is a powerful, open-source front-end toolkit. It features Sass variables and mixins, a responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.

-   **Current Version**: Bootstrap 5 (Removes reliance on jQuery).
-   **Core Concept**: Mobile-first design.

## 2. Installation Methods

### Method 1: CDN (Easiest)
You just include the links to Bootstrap's servers in your HTML `<head>` and `<body>`. No downloading required.

**CSS** (Put in `<head>`):
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

**JavaScript** (Put before closing `</body>`):
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Method 2: Download
1.  Go to [getbootstrap.com](https://getbootstrap.com/).
2.  Download the compiled CSS and JS files.
3.  Unzip and place them in your project folder.
4.  Link them locally: `<link rel="stylesheet" href="css/bootstrap.min.css">`.

### Method 3: Package Manager (npm)
For Node.js projects:
```bash
npm install bootstrap
```

---

## 3. Basic Bootstrap Template

Here is the standard starter template to ensure everything is set up correctly (viewport meta tag is crucial!).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <title>Hello, Bootstrap!</title>
</head>
<body>

    <div class="container">
        <h1>Hello, world!</h1>
        <p>This is a Bootstrap page.</p>
        <button class="btn btn-primary">Click Me</button>
    </div>

    <!-- Bootstrap JS Bundle (includes Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## 4. Key Concepts
1.  **Containers**: Bootstrap requires a containing element to wrap site contents.
    -   `.container`: Fixed-width, responsive container (has max-width at each breakpoint).
    -   `.container-fluid`: Full-width container, spanning the entire width of the viewport used.
2.  **Breakpoints**: predetermined screen sizes.
    -   `xs` (Extra small): <576px
    -   `sm` (Small): ≥576px
    -   `md` (Medium): ≥768px
    -   `lg` (Large): ≥992px
    -   `xl` (Extra large): ≥1200px
    -   `xxl` (Extra extra large): ≥1400px
