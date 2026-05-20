# 2.20 Bootstrap Components & Utilities — Complete Notes

---

## 1. Buttons

Buttons always need **two classes**: `btn` (base) + a color variant.

```html
<!-- Solid (filled) buttons -->
<button class="btn btn-primary">Primary (Blue)</button>
<button class="btn btn-secondary">Secondary (Gray)</button>
<button class="btn btn-success">Success (Green)</button>
<button class="btn btn-danger">Danger (Red)</button>
<button class="btn btn-warning">Warning (Yellow)</button>
<button class="btn btn-info">Info (Cyan)</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>

<!-- Outline buttons (transparent background) -->
<button class="btn btn-outline-primary">Outline Primary</button>
<button class="btn btn-outline-danger">Outline Danger</button>
<button class="btn btn-outline-success">Outline Success</button>

<!-- Button sizes -->
<button class="btn btn-primary btn-lg">Large Button</button>
<button class="btn btn-primary">Normal Button</button>
<button class="btn btn-primary btn-sm">Small Button</button>

<!-- Full-width button -->
<button class="btn btn-primary d-block w-100">Full Width</button>

<!-- Disabled state -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- Link styled as button -->
<a href="#" class="btn btn-secondary">Link Button</a>
```

> **Note:** `btn` alone gives no color. Always pair it with a color class like `btn-primary`.

---

## 2. Navbar

A responsive navigation header that collapses into a hamburger menu on mobile.

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">

    <!-- Brand / Logo -->
    <a class="navbar-brand" href="#">MySite</a>

    <!-- Hamburger button (visible only on mobile) -->
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navigation links (collapses on mobile) -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>

      <!-- Right-side button -->
      <button class="btn btn-outline-light">Login</button>
    </div>

  </div>
</nav>
```

> **How the hamburger works:** The button's `data-bs-target="#navbarNav"` must match the `id="navbarNav"` on the collapsible div. Bootstrap's JS handles the toggle automatically.

### Navbar Color Variants

```html
<!-- Dark navbar -->
<nav class="navbar navbar-dark bg-dark">...</nav>

<!-- Light navbar -->
<nav class="navbar navbar-light bg-light">...</nav>

<!-- Primary color navbar -->
<nav class="navbar navbar-dark bg-primary">...</nav>

<!-- Transparent navbar (works on colored pages) -->
<nav class="navbar navbar-dark bg-transparent">...</nav>
```

### Navbar with Dropdown

```html
<ul class="navbar-nav">
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
      Dropdown
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
  </li>
</ul>
```

---

## 3. Cards

Cards are flexible content containers.

```html
<!-- Basic card with image -->
<div class="card" style="width: 18rem;">
  <img src="image.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Quick description text goes here.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<!-- Card without image (text only) -->
<div class="card">
  <div class="card-header">Featured</div>
  <div class="card-body">
    <h5 class="card-title">Special Title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Subtitle</h6>
    <p class="card-text">Some quick example text.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
  <div class="card-footer text-muted">2 days ago</div>
</div>

<!-- Card with list group -->
<div class="card">
  <div class="card-header">Today's Tasks</div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Task 1</li>
    <li class="list-group-item">Task 2</li>
    <li class="list-group-item">Task 3</li>
  </ul>
</div>
```

### Card Grid (Multiple Cards in a Row)

```html
<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card h-100">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card 1</h5>
        <p class="card-text">Description here.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card 2</h5>
        <p class="card-text">Description here.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card 3</h5>
        <p class="card-text">Description here.</p>
      </div>
    </div>
  </div>
</div>
```

> **Tip:** `h-100` makes all cards in a row the same height. `g-4` adds consistent gaps between cards.

---

## 4. Alerts

Provide contextual feedback messages.

```html
<!-- Basic alerts -->
<div class="alert alert-primary" role="alert">Primary alert!</div>
<div class="alert alert-secondary" role="alert">Secondary alert!</div>
<div class="alert alert-success" role="alert">Action was successful!</div>
<div class="alert alert-danger" role="alert">Something went wrong!</div>
<div class="alert alert-warning" role="alert">Warning — watch out!</div>
<div class="alert alert-info" role="alert">Helpful information here.</div>

<!-- Alert with heading and text -->
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p>You successfully completed this action.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities.</p>
</div>

<!-- Alert with a link -->
<div class="alert alert-warning" role="alert">
  Check out <a href="#" class="alert-link">this link</a> for more info.
</div>

<!-- Dismissible alert (can be closed) -->
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Error!</strong> Please check your input.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

---

## 5. Modal (Popup Dialog)

Modals require JavaScript (included in Bootstrap bundle).

```html
<!-- Trigger button -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Open Modal
</button>

<!-- Modal HTML (place anywhere in body) -->
<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Header -->
      <div class="modal-header">
        <h5 class="modal-title" id="myModalLabel">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        Modal body content goes here. Can include any HTML.
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Save Changes</button>
      </div>

    </div>
  </div>
</div>
```

### Modal Sizes

```html
<div class="modal-dialog modal-sm">...</div>    <!-- Small -->
<div class="modal-dialog">...</div>             <!-- Default -->
<div class="modal-dialog modal-lg">...</div>    <!-- Large -->
<div class="modal-dialog modal-xl">...</div>    <!-- Extra large -->
<div class="modal-dialog modal-fullscreen">...</div> <!-- Full screen -->
```

> **Rule:** The trigger button's `data-bs-target="#myModal"` must match the modal's `id="myModal"`. Always include the `#` symbol.

---

## 6. Forms

```html
<form>
  <!-- Text input -->
  <div class="mb-3">
    <label for="name" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter your name">
  </div>

  <!-- Email input -->
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com">
    <div class="form-text">We'll never share your email.</div>
  </div>

  <!-- Password input -->
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password">
  </div>

  <!-- Select dropdown -->
  <div class="mb-3">
    <label for="country" class="form-label">Country</label>
    <select class="form-select" id="country">
      <option selected>Choose...</option>
      <option value="in">India</option>
      <option value="us">USA</option>
      <option value="uk">UK</option>
    </select>
  </div>

  <!-- Textarea -->
  <div class="mb-3">
    <label for="message" class="form-label">Message</label>
    <textarea class="form-control" id="message" rows="3"></textarea>
  </div>

  <!-- Checkbox -->
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="terms">
    <label class="form-check-label" for="terms">I agree to the terms</label>
  </div>

  <!-- Radio buttons -->
  <div class="mb-3">
    <div class="form-check">
      <input class="form-check-input" type="radio" name="gender" id="male">
      <label class="form-check-label" for="male">Male</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="gender" id="female">
      <label class="form-check-label" for="female">Female</label>
    </div>
  </div>

  <!-- File input -->
  <div class="mb-3">
    <label for="file" class="form-label">Upload File</label>
    <input class="form-control" type="file" id="file">
  </div>

  <!-- Range slider -->
  <div class="mb-3">
    <label for="range" class="form-label">Volume</label>
    <input type="range" class="form-range" id="range" min="0" max="100">
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Inline Form

```html
<form class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="search" class="visually-hidden">Search</label>
    <input type="text" class="form-control" id="search" placeholder="Search...">
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Search</button>
  </div>
</form>
```

---

## 7. Badges & Spinners

```html
<!-- Badges -->
<span class="badge bg-primary">Primary</span>
<span class="badge bg-secondary">New</span>
<span class="badge bg-success">Active</span>
<span class="badge bg-danger">3</span>     <!-- notification count -->
<span class="badge bg-warning text-dark">Warning</span>

<!-- Badge inside heading -->
<h2>Messages <span class="badge bg-secondary">4</span></h2>

<!-- Pill badge (rounded) -->
<span class="badge rounded-pill bg-primary">New</span>

<!-- Loading spinners -->
<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>

<div class="spinner-border text-success" role="status"></div>
<div class="spinner-border text-danger" role="status"></div>

<!-- Growing spinner -->
<div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>

<!-- Spinner sizes -->
<div class="spinner-border spinner-border-sm"></div>   <!-- Small -->
<div class="spinner-border"></div>                     <!-- Default -->

<!-- Button with spinner (loading state) -->
<button class="btn btn-primary" disabled>
  <span class="spinner-border spinner-border-sm me-2"></span>
  Loading...
</button>
```

---

## 8. List Group

```html
<!-- Basic list group -->
<ul class="list-group">
  <li class="list-group-item">Item 1</li>
  <li class="list-group-item">Item 2</li>
  <li class="list-group-item active">Active Item</li>  <!-- highlighted -->
  <li class="list-group-item disabled">Disabled Item</li>
</ul>

<!-- List group with badges -->
<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Inbox
    <span class="badge bg-primary rounded-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Spam
    <span class="badge bg-danger rounded-pill">2</span>
  </li>
</ul>

<!-- Colored list group items -->
<ul class="list-group">
  <li class="list-group-item list-group-item-success">Success item</li>
  <li class="list-group-item list-group-item-danger">Danger item</li>
  <li class="list-group-item list-group-item-warning">Warning item</li>
  <li class="list-group-item list-group-item-info">Info item</li>
</ul>
```

---

## 9. Tables

```html
<!-- Basic Bootstrap table -->
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Rahul</td>
      <td>21</td>
      <td>Delhi</td>
    </tr>
    <tr>
      <td>Priya</td>
      <td>22</td>
      <td>Mumbai</td>
    </tr>
  </tbody>
</table>

<!-- Table variants -->
<table class="table table-striped">...</table>   <!-- Alternate row colors -->
<table class="table table-hover">...</table>     <!-- Row highlights on hover -->
<table class="table table-bordered">...</table>  <!-- All borders -->
<table class="table table-borderless">...</table><!-- No borders -->
<table class="table table-sm">...</table>        <!-- Compact table -->
<table class="table table-dark">...</table>      <!-- Dark theme -->

<!-- Responsive table (horizontal scroll on mobile) -->
<div class="table-responsive">
  <table class="table">...</table>
</div>
```

---

## 10. Flexbox Utilities (`d-flex`)

Bootstrap 5 exposes Flexbox as utility classes so you rarely need to write custom CSS for layouts.

### Enable Flex

```html
<div class="d-flex">Flexbox container</div>
```

### Direction

```html
<div class="d-flex flex-row">Horizontal (default)</div>
<div class="d-flex flex-column">Vertical stack</div>
<div class="d-flex flex-row-reverse">Right to left</div>
<div class="d-flex flex-column-reverse">Bottom to top</div>
```

### Justify Content (Main Axis — Horizontal by default)

```html
<div class="d-flex justify-content-start">Left (default)</div>
<div class="d-flex justify-content-center">Center</div>
<div class="d-flex justify-content-end">Right</div>
<div class="d-flex justify-content-between">Space between (items at edges)</div>
<div class="d-flex justify-content-around">Space around (equal around each)</div>
<div class="d-flex justify-content-evenly">Space evenly (equal between all)</div>
```

### Align Items (Cross Axis — Vertical by default)

```html
<div class="d-flex align-items-start">Top</div>
<div class="d-flex align-items-center">Middle</div>
<div class="d-flex align-items-end">Bottom</div>
<div class="d-flex align-items-stretch">Stretch to fill (default)</div>
<div class="d-flex align-items-baseline">Baseline</div>
```

### Wrapping

```html
<div class="d-flex flex-wrap">Items wrap to next line if needed</div>
<div class="d-flex flex-nowrap">Items never wrap (default)</div>
<div class="d-flex flex-wrap-reverse">Wrap in reverse direction</div>
```

### Auto Margins (Most Useful Trick)

Push items to one side using auto margins:

```html
<!-- Push last item to the right -->
<div class="d-flex">
  <div class="p-2">Logo</div>
  <div class="p-2">Nav Link</div>
  <div class="ms-auto p-2">Login Button (pushed right)</div>
</div>

<!-- Push all items to the right -->
<div class="d-flex">
  <div class="me-auto p-2">Left Item</div>
  <div class="p-2">Right 1</div>
  <div class="p-2">Right 2</div>
</div>
```

> **ms-auto vs me-auto:**
> - `ms-auto` = margin-start: auto → pushes the element to the **right**
> - `me-auto` = margin-end: auto → pushes the element to the **left**

### Gap Between Flex Items

```html
<div class="d-flex gap-2">...</div>   <!-- Small gap -->
<div class="d-flex gap-3">...</div>   <!-- Medium gap (1rem) -->
<div class="d-flex gap-4">...</div>   <!-- Large gap -->
```

---

## 11. Spacing Utilities

Format: `{property}{sides}-{size}`

| Property | Sides | Size |
| :--- | :--- | :--- |
| `m` = margin | `t` top, `b` bottom | 0 = 0px |
| `p` = padding | `s` start(left), `e` end(right) | 1 = 0.25rem (4px) |
| | `x` left + right | 2 = 0.5rem (8px) |
| | `y` top + bottom | 3 = 1rem (16px) |
| | *(none)* = all sides | 4 = 1.5rem (24px) |
| | | 5 = 3rem (48px) |

```html
<div class="mt-3">Margin top 1rem</div>
<div class="mb-5">Margin bottom 3rem</div>
<div class="ms-2">Margin left 0.5rem</div>
<div class="me-2">Margin right 0.5rem</div>
<div class="mx-auto">Center horizontally (auto margin left+right)</div>

<div class="p-4">Padding all sides 1.5rem</div>
<div class="px-3 py-2">Padding x=1rem, y=0.5rem</div>
<div class="pt-0">No top padding</div>
```

---

## 12. Display Utilities

```html
<div class="d-none">Hidden (display: none)</div>
<div class="d-block">Block element</div>
<div class="d-inline">Inline element</div>
<div class="d-inline-block">Inline-block</div>
<div class="d-flex">Flexbox</div>
<div class="d-grid">Grid</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden on mobile, visible on md+</div>
<div class="d-block d-md-none">Visible only on mobile</div>
<div class="d-none d-lg-flex">Flex only on large screens</div>
```

---

## 13. Text & Color Utilities

```html
<!-- Alignment -->
<p class="text-start">Left aligned</p>
<p class="text-center">Centered</p>
<p class="text-end">Right aligned</p>

<!-- Text color -->
<p class="text-primary">Blue</p>
<p class="text-secondary">Gray</p>
<p class="text-success">Green</p>
<p class="text-danger">Red</p>
<p class="text-warning">Yellow</p>
<p class="text-info">Cyan</p>
<p class="text-muted">Muted gray</p>
<p class="text-dark">Dark</p>
<p class="text-light bg-dark">Light (on dark bg)</p>
<p class="text-white bg-dark">White</p>

<!-- Background color -->
<div class="bg-primary text-white p-2">Blue background</div>
<div class="bg-success text-white p-2">Green background</div>
<div class="bg-danger text-white p-2">Red background</div>
<div class="bg-warning p-2">Yellow background</div>
<div class="bg-light p-2">Light gray background</div>
<div class="bg-dark text-white p-2">Dark background</div>

<!-- Font weight & style -->
<p class="fw-bold">Bold (700)</p>
<p class="fw-semibold">Semibold (600)</p>
<p class="fw-normal">Normal (400)</p>
<p class="fw-light">Light (300)</p>
<p class="fst-italic">Italic</p>

<!-- Text decoration -->
<p class="text-decoration-underline">Underline</p>
<p class="text-decoration-line-through">Strikethrough</p>
<p class="text-decoration-none">No decoration</p>

<!-- Text transform -->
<p class="text-uppercase">ALL CAPS</p>
<p class="text-lowercase">all lowercase</p>
<p class="text-capitalize">First Letter Caps</p>
```

---

## 14. Border & Shadow Utilities

```html
<!-- Borders -->
<div class="border">All borders</div>
<div class="border-top">Top border only</div>
<div class="border-bottom">Bottom border only</div>
<div class="border-start">Left border only</div>
<div class="border-end">Right border only</div>
<div class="border-0">No borders</div>

<!-- Border colors -->
<div class="border border-primary">Blue border</div>
<div class="border border-success">Green border</div>
<div class="border border-danger">Red border</div>

<!-- Border radius (rounded corners) -->
<div class="rounded">Rounded (all corners)</div>
<div class="rounded-top">Rounded top corners</div>
<div class="rounded-bottom">Rounded bottom corners</div>
<div class="rounded-circle">Perfect circle (use with equal height/width)</div>
<div class="rounded-pill">Pill shape</div>
<div class="rounded-0">No rounding</div>

<!-- Rounding size -->
<div class="rounded-1">Small rounding</div>
<div class="rounded-3">Large rounding</div>
<div class="rounded-5">Extra large rounding</div>

<!-- Shadows -->
<div class="shadow-none">No shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
```

---

## 15. Width & Height Utilities

```html
<!-- Width -->
<div class="w-25">25% wide</div>
<div class="w-50">50% wide</div>
<div class="w-75">75% wide</div>
<div class="w-100">100% wide</div>
<div class="w-auto">Auto width</div>
<div class="mw-100">Max-width: 100%</div>
<div class="vw-100">100% viewport width</div>

<!-- Height -->
<div class="h-25">25% height</div>
<div class="h-50">50% height</div>
<div class="h-100">100% height</div>
<div class="h-auto">Auto height</div>
<div class="mh-100">Max-height: 100%</div>
<div class="vh-100">100% viewport height</div>
```

---

## 16. Position Utilities

```html
<div class="position-static">Static (default)</div>
<div class="position-relative">Relative</div>
<div class="position-absolute">Absolute</div>
<div class="position-fixed">Fixed</div>
<div class="position-sticky top-0">Sticky at top (sticks when scrolled to)</div>

<!-- Fixed top / bottom -->
<div class="fixed-top">Fixed at top of page</div>
<div class="fixed-bottom">Fixed at bottom of page</div>

<!-- Sticky top / bottom -->
<div class="sticky-top">Sticky to top</div>
<div class="sticky-bottom">Sticky to bottom</div>

<!-- Position coordinates (use with position-relative/absolute) -->
<div class="position-relative" style="height: 100px;">
  <div class="position-absolute top-0 start-0">Top Left</div>
  <div class="position-absolute top-0 end-0">Top Right</div>
  <div class="position-absolute bottom-0 start-0">Bottom Left</div>
  <div class="position-absolute bottom-0 end-0">Bottom Right</div>
  <div class="position-absolute top-50 start-50 translate-middle">Center</div>
</div>
```

---

## 17. Complete Page Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <title>Bootstrap Complete Example</title>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">MyApp</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLinks">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navLinks">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
        </ul>
        <button class="btn btn-outline-light btn-sm">Login</button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <div class="bg-primary text-white py-5">
    <div class="container text-center">
      <h1 class="display-4 fw-bold">Welcome to MyApp</h1>
      <p class="lead">Built with Bootstrap 5</p>
      <button class="btn btn-light btn-lg me-2">Get Started</button>
      <button class="btn btn-outline-light btn-lg">Learn More</button>
    </div>
  </div>

  <!-- Cards Section -->
  <div class="container py-5">
    <h2 class="text-center mb-4">Our Features</h2>
    <div class="row g-4">
      <div class="col-12 col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">Feature One</h5>
            <p class="card-text text-muted">Description of this amazing feature.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-success">Feature Two</h5>
            <p class="card-text text-muted">Description of this amazing feature.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-danger">Feature Three</h5>
            <p class="card-text text-muted">Description of this amazing feature.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Alert -->
  <div class="container mb-4">
    <div class="alert alert-info alert-dismissible fade show">
      <strong>Note:</strong> This is an informational alert.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-dark text-white text-center py-3">
    <p class="mb-0">&copy; 2024 MyApp. All rights reserved.</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## Quick Reference: Most-Used Utility Classes

| Task | Class |
| :--- | :--- |
| Center text | `text-center` |
| Bold text | `fw-bold` |
| Muted gray text | `text-muted` |
| Blue text | `text-primary` |
| Red background | `bg-danger` |
| All-sides padding 1rem | `p-3` |
| Margin top 1rem | `mt-3` |
| Center a block element | `mx-auto` |
| Hide element | `d-none` |
| Full width | `w-100` |
| Flexbox row | `d-flex` |
| Center with Flexbox | `d-flex justify-content-center align-items-center` |
| Rounded corners | `rounded` |
| Pill shape | `rounded-pill` |
| Drop shadow | `shadow` |
| Responsive image | `img-fluid` |
