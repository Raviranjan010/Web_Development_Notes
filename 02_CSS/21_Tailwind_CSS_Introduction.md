# 2.21 Introduction to Tailwind CSS

**Tailwind CSS** is a modern, utility-first class framework that allows developers to style their websites directly within HTML using concise utility classes. Unlike traditional CSS, Tailwind CSS promotes rapid development by eliminating the need to write custom styles for every component.

## Why Use Tailwind CSS?
Tailwind CSS offers a faster UI-building process by allowing you to utilize utility classes directly in their HTML, eliminating the need for custom styles. Here's why Tailwind CSS stands out:

- **Utility-first approach**: Tailwind allows custom designs without writing custom CSS, making the development process more streamlined.
- **Responsive by default**: Tailwind simplifies the creation of responsive designs with built-in utility classes.
- **Granular control**: It offers extensive control over your design, enabling precise customization and faster prototyping.

## Key Advantages of Tailwind CSS
- **No need for complex class names**: You don't have to worry about naming conventions for CSS classes and IDs.
- **Minimized CSS code**: Tailwind reduces the need for large custom CSS files, keeping your codebase smaller and more manageable.
- **Easy customization**: Tailwind allows easy customization of designs without writing additional CSS, helping you create reusable components.
- **Built-in responsiveness**: Tailwind's classes are optimized for responsiveness, allowing developers to create mobile-friendly layouts effortlessly.
- **Scoped styles**: Tailwind's utility classes help in making local changes to specific elements without affecting the entire stylesheet, unlike traditional global CSS.

## Why Choose Tailwind Over Other CSS Frameworks?
Tailwind CSS stands out from traditional frameworks like Bootstrap or Foundation because of its utility-first methodology, which offers:

- **Granular control over styling**: Tailwind provides control at the atomic level, allowing you to customize each aspect of your design.
- **Faster prototyping**: By using utility classes, developers can iterate faster without worrying about conflicting styles or overriding pre-built components.
- **Lightweight code**: Tailwind generates smaller CSS files by purging unused styles, improving website performance with faster load times.
- **Simplified responsive design**: Tailwind’s utility classes make responsive design effortless without the need for custom media queries.
- **Extensive documentation**: Tailwind provides clear documentation and an intuitive syntax that speeds up the development process.

## Installing and Using Tailwind CSS in a Project
There are two main methods to use Tailwind CSS into your project: installing it locally or using a CDN link.

### Method 1: Install Tailwind CSS via npm
Follow these steps to set up Tailwind CSS in your project using npm:

**Step 1: Initialize your project**
```bash
npm init
```

**Step 2: Install Tailwind CSS**
```bash
npm install -D tailwindcss
```

**Step 3: Use the @tailwind directive**
Inject Tailwind's base, components, and utility styles into your CSS file.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 4: Create a Config File**
This is used to create a config file to customize the designs. It is an optional step.
```bash
npx tailwindcss init
```

**Step 5: Compile Styles**
This command is used to compile `style.css` (input) to `output.css` (output).
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### Method 2: Use Tailwind CSS via CDN
The quickest way to start using Tailwind CSS is by including a CDN link in the `<head>` section of your HTML file.

```html
<link href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
```

*Note*: This method allows you to use Tailwind without installing it on your server. However, there are some limitations:
- **Customization**: You cannot customize Tailwind's default theme.
- **Directives**: You cannot use directives like `@apply` and `@variants`.
- **Plugins**: Third-party plugins cannot be installed.

### Example: Using Tailwind CSS via CDN
Below is a basic example that imports Tailwind CSS via CDN and applies margin to the body. The heading is styled with Tailwind's utility classes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- Tailwind CSS CDN link -->
    <link href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="m-4">
    <h1 class="text-green-500 text-4xl font-bold">
        Geeksforgeeks
    </h1>
    <p><strong>Tailwind CSS Tutorial</strong></p>
    <p>
        You can use Tailwind CSS as a replacement 
        of CSS, this is a framework that increase 
        your pace to design any website.
    </p>
</body>
</html>
```
