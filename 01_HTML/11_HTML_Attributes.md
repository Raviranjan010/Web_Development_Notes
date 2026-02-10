# 1.11 HTML Attributes

## 1. What is it?
Attributes provide additional information about HTML elements. They come in name/value pairs like `name="value"`.

## 2. Why it is used?
- **Configuration**: Defining how an element should behave (e.g., `target="_blank"`).
- **Identification**: Giving unique names to elements for CSS styling or JavaScript logic.
- **Data storage**: Keep custom data directly on an element.

## 3. Syntax / Structure
Attributes are always specified in the **start tag**.
```html
<tagname attribute="value" another-attribute="value">Content</tagname>
```

## 4. Detailed Explanation

### Global Attributes
These can be used on **almost any** HTML element.
- `class`: Specifies one or more classnames (used by CSS/JS).
- `id`: Specifies a unique id (must be unique per page).
- `style`: Inline CSS styles.
- `title`: Extra info shown as a tooltip on hover.
- `hidden`: Hides the element from view.
- `data-*`: Used to store custom data.

### Boolean Attributes
Attributes that do not require a value. Their presence implies "true".
- `disabled`: Disables an input.
- `checked`: Pre-checks a checkbox.
- `required`: Marks an input as mandatory.
- `readonly`: Input cannot be modified.

## 5. Examples

### ID and Class
```html
<h1 id="main-title">Welcome</h1>
<p class="text-large text-bold">This is a paragraph.</p>
```

### Boolean Attribute
```html
<!-- The input is disabled just by adding the attribute -->
<input type="text" disabled>

<!-- Equivalent to disabled="disabled" but shorthand is preferred -->
```

### Custom Data Attributes
Great for JavaScript.
```html
<div data-user-id="12345" data-role="admin">User Profile</div>
```
*(In JS, we can access this via `element.dataset.userId`)*

### Event Attributes (Intro to JS)
```html
<button onclick="alert('Hello!')">Click Me</button>
```

## 6. Key Points to Remember
- The `id` attribute **must be unique** on the entire page. If two elements have `id="header"`, your CSS and JS might break.
- The `class` attribute is reusable. You can have 100 elements with `class="card"`.
- Attribute names are case-insensitive, but lowercase is the standard.

## 7. Common Mistakes
- **Mistake**: Using spaces in IDs.
  `id="my header"` ❌ -> `id="my-header"` ✅
- **Mistake**: Quoting issues.
  `class="red box'` ❌ (Mismatched quotes) -> `class="red box"` ✅

## 8. Pro Tips / Tricks
- **Tabindex**: Use `tabindex="0"` to make non-interactive elements (like a `div`) focusable with the keyboard. Use `tabindex="-1"` to remove an element from the tab order.
- **Contenteditable**: Makes any element editable by the user!
  ```html
  <div contenteditable="true">You can edit this text!</div>
  ```

## 9. Related Topics
- [../02_CSS/03_Selectors.md](../02_CSS/03_Selectors.md) - How to target IDs and Classes in CSS.
- [../03_JavaScript/11_Events.md](../03_JavaScript/11_Events.md) - Handling `onclick` and other events.
