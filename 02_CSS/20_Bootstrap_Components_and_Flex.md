# 2.20 Bootstrap Components & Utilities

## 1. Common Components
Bootstrap comes with a huge library of reusable components. Here are the essentials.

### Buttons (`.btn`)
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-outline-primary">Outline</button>
```

### Navbar
A responsive navigation header that collapses into a "hamburger" menu on mobile.
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <!-- Toggler for mobile -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Links -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
      </ul>
    </div>
  </div>
</nav>
```

### Cards
A flexible container for content.
```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### Alerts
Provide contextual feedback messages.
```html
<div class="alert alert-warning" role="alert">
  This is a warning alert!
</div>
```

---

## 2. Flexbox Utilities (`d-flex`)
Bootstrap 5 is built on Flexbox, and it exposes utility classes so you don't have to write custom CSS for layout alignment.

### Enable Flex
Add `d-flex` to any container.
```html
<div class="d-flex p-2 bg-light">I'm a flexbox container!</div>
```

### Direction (`flex-row`, `flex-column`)
```html
<div class="d-flex flex-row">...</div> <!-- Default -->
<div class="d-flex flex-column">...</div> <!-- Vertical Stack -->
```

### Justify Content (Main Axis Alignment)
Equivalent to CSS `justify-content`.
-   `.justify-content-start`
-   `.justify-content-center`
-   `.justify-content-end`
-   `.justify-content-between`
-   `.justify-content-around`

```html
<div class="d-flex justify-content-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Align Items (Cross Axis Alignment)
Equivalent to CSS `align-items`.
-   `.align-items-start`
-   `.align-items-center`
-   `.align-items-end`
-   `.align-items-stretch`

### Auto Margins
Push items to one side using `me-auto` (margin-end: auto) or `ms-auto` (margin-start: auto).
```html
<div class="d-flex">
  <div class="p-2">Item 1</div>
  <div class="p-2">Item 2</div>
  <div class="ms-auto p-2">Item 3 (Pushed to right)</div>
</div>
```
