# 3.12 Form Validation

## 1. What is it?
Checking that the user's input follows specific rules (e.g., "Password must be 8 chars", "Email must have @") *before* sending it to the server.

## 2. Why it is used?
- **User Experience**: Give instant feedback (red borders, error messages).
- **Security**: Though server-side validation is mandatory, client-side validation saves bandwidth and server load.

## 3. Syntax / Structure
We listen for the form's `submit` event, prevent the default reload, and check values.

```javascript
form.addEventListener("submit", (e) => {
    e.preventDefault(); // STOP reload
    // Check values...
});
```

## 4. Detailed Explanation

### Accessing Values
- `input.value`: Gets the current text inside an input field.
- `checkbox.checked`: Gets true/false.

### Common Checks
- **Required**: `value === ""` or `value.trim() === ""`.
- **Length**: `value.length < 8`.
- **Pattern (Regex)**: `regex.test(email)`.

## 5. Examples

### Basic Validation Script
**HTML**:
```html
<form id="loginForm">
    <input type="text" id="username" placeholder="Username">
    <small id="errorMsg"></small>
    <button type="submit">Login</button>
</form>
```

**JS**:
```javascript
const form = document.querySelector("#loginForm");
const username = document.querySelector("#username");
const errorMsg = document.querySelector("#errorMsg");

form.addEventListener("submit", (e) => {
    let messages = [];
    
    // Check Username
    if (username.value === "" || username.value == null) {
        messages.push("Username is required");
    }

    if (username.value.length < 6) {
        messages.push("Username must be longer than 6 characters");
    }

    // If errors exist
    if (messages.length > 0) {
        e.preventDefault(); // Stop submission
        errorMsg.innerText = messages.join(", ");
        errorMsg.style.color = "red";
    }
});
```

### Regular Expressions (Regex)
A pattern to match character combinations.
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(emailInput.value)) {
    console.log("Invalid Email");
}
```

## 6. Key Points to Remember
- **Always** prevent default on submit (`e.preventDefault()`) if validation fails.
- Client-side validation can be bypassed (by disabling JS). **Always validate on the server (Backend) as well.**

## 7. Common Mistakes
- **Mistake**: Checking `input.value` at the top of the file.
  **Why**: The variable will store the empty string from when the page loaded.
  **Fix**: Check `input.value` **inside** the event listener function, so you get the value at the moment of clicking submit.

## 8. Pro Tips / Tricks
- **Real-time Feedback**: Listen to the `input` event (fires every keystroke) to remove error messages as the user types, making the form feel responsive.
- **Constraint Validation API**: Browsers have built-in validation methods like `input.checkValidity()` and `input.setCustomValidity('Error!')`.

## 9. Related Topics
- [../01_HTML/08_Forms_and_Input_Types.md](../01_HTML/08_Forms_and_Input_Types.md) - HTML built-in validation attributes.
- [11_Events.md](./11_Events.md) - Handling the submit event.
