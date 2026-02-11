# 3.12 Form Validation

## 1. What is it?
Form validation ensures that user input meets specific criteria *before* it's sent to the server.
- **Client-Side**: Instant feedback in the browser (JS/HTML).
- **Server-Side**: Final security check on the backend (Must have).

## 2. Types of Validation
1.  **Built-in HTML Validation**: Using attributes like `required`, `min`, `max`, `type="email"`, `pattern`.
2.  **JavaScript Validation**: Custom logic for complex rules (e.g., "Password must contain a symbol").

## 3. The Constraint Validation API
Browsers have a powerful built-in API to check validity without writing complex regex manually.

### Key Methods
- `element.checkValidity()`: Returns `true` if valid, `false` if not.
- `element.reportValidity()`: Shows the browser's default error bubble.
- `element.setCustomValidity(message)`: Sets a custom error message (and marks field as invalid). Pass `""` to mark as valid.

### The `validity` State Object
Every input has a `validity` property with detailed boolean flags:
- `validity.valueMissing`: Input is empty but has `required`.
- `validity.typeMismatch`: Content doesn't match type (e.g., bad email).
- `validity.patternMismatch`: Content doesn't match `pattern` attribute.
- `validity.tooShort` / `validity.tooLong`: Length constraints via `minlength`/`maxlength`.
- `validity.rangeUnderflow` / `validity.rangeOverflow`: Number constraints via `min`/`max`.

## 4. Visual Feedback (CSS)
Use pseudo-classes to style valid/invalid states.
- `:valid` / `:invalid`: Matches based on current state.
- `:user-valid` / `:user-invalid` (Modern): Matches only *after* user interaction (prevents red fields on page load).

```css
input:user-invalid {
    border: 2px solid red;
    background-color: #ffe6e6;
}
input:user-valid {
    border: 2px solid green;
}
```

## 5. Examples

### Modern Validation using API
```javascript
const emailInput = document.getElementById("email");

emailInput.addEventListener("input", () => {
    if (emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity("I am expecting an email address!");
    } else {
        emailInput.setCustomValidity(""); // Clear error -> Valid
    }
});
```

### Complete Form Example with Custom Messages
```html
<form id="form">
    <label>Username (Min 3 chars):</label>
    <input type="text" id="username" minlength="3" required>
    <span class="error" aria-live="polite"></span>
    <button>Submit</button>
</form>

<script>
    const form = document.getElementById('form');
    const user = document.getElementById('username');
    const error = document.querySelector('.error');

    // 1. Live Validation
    user.addEventListener('input', () => {
        if (user.validity.valid) {
            error.textContent = ""; // Reset
            error.className = "error";
        } else {
            showError();
        }
    });

    // 2. Submit Validation
    form.addEventListener('submit', (e) => {
        if (!user.validity.valid) {
            showError();
            e.preventDefault();
        }
    });

    function showError() {
        if (user.validity.valueMissing) {
            error.textContent = "You need to enter a username.";
        } else if (user.validity.tooShort) {
            error.textContent = `Too short! Needs \${user.minLength} chars.`;
        }
        error.className = "error active";
    }
</script>
```

## 6. Key Points to Remember
- **`input` vs `change` events**: 
    - `input`: Fires on *every keystroke* (Good for removing errors).
    - `change`: Fires when element *loses focus* (Good for expensive checks).
- Always use `form.noValidate = true` in JS if you want to completely disable browser bubbles and use your own UI.

## 7. Related Topics
- [20_Regular_Expressions.md](./20_Regular_Expressions.md) - For advanced pattern matching.
- [16_Events.md](./16_Events.md) - Handling form events.
