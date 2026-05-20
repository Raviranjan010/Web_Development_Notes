# 📝 Forms and Inputs: Controlled Loops, Validations, and File Streams

## 1. Controlled vs Uncontrolled Components

In React, forms can be managed in one of two ways:

1. **Controlled Components**: The form data is handled by React state. The input's `value` is bound to a state variable, and updates are pushed back to the state via an `onChange` handler.
2. **Uncontrolled Components**: The form data is handled by the DOM itself. You pull the values from the elements using a `useRef` when the form is submitted.

```
       CONTROLLED INPUT LOOP
       ┌────────────────────────┐
       │   User Types Key       │
       └───────────┬────────────┘
                   │
                   ▼ (Triggers onChange)
       ┌────────────────────────┐
       │  State Setter Invoked  │
       └───────────┬────────────┘
                   │
                   ▼ (Re-render updates state)
       ┌────────────────────────┐
       │ Input Value Prop Syncs │
       └────────────────────────┘
```

### Differences Comparison

| Feature | Controlled Components (React State) | Uncontrolled Components (DOM Refs) |
| :--- | :--- | :--- |
| **Source of Truth** | React State | Browser DOM |
| **Performance** | Re-renders component on every keystroke | No re-renders during typing |
| **Real-time Validation** | Easy (available on every keystroke) | Difficult (requires reading DOM on blur/submit) |
| **Conditional Fields** | Easy | Complex |
| **Best For** | Dynamic inputs, interactive forms, validation | Simple forms, file uploads, performance optimization |

---

## 2. Handling Multiple Inputs with a Single State Object

Instead of creating separate states and handler functions for every input field, you can store the entire form data in a single state object. Using ES6 **computed property names**, a single handler function can update any field dynamically:

```jsx
const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  
  // Update state using computed property names matching input's 'name' attribute
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

// Render
// <input name="username" value={formData.username} onChange={handleChange} />
// <input name="email" value={formData.email} onChange={handleChange} />
```

---

## 3. Client-Side Validation Timings

- **On Change**: Validates the input on every keystroke. Best for real-time validation like password strength checkers, but can be distracting if errors are shown before the user finishes typing.
- **On Blur**: Validates the input when it loses focus. Best for checking required fields or email formats, as it gives the user time to finish typing.
- **On Submit**: Validates the entire form when the user submits it. Best for final validation checks before sending data to the server.

---

## 4. Handling File Inputs (Uncontrolled by Design)

In HTML, the value of a file input (e.g., `<input type="file" />`) is read-only because browsers prevent scripts from programmatically setting file paths for security reasons. As a result, file inputs **must be managed as uncontrolled components** using `useRef` to read the file list on submit:

```jsx
import React, { useRef } from 'react';

export default function FileUploader() {
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedFile = fileInputRef.current?.files[0];
    console.log("Selected file:", selectedFile?.name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileInputRef} />
      <button type="submit">Upload</button>
    </form>
  );
}
```

---

## 5. Real-World Project: Dynamic Registration Form

Below is a complete, runnable registration form demonstrating controlled inputs, computed state handlers, password strength checks, validation on blur, and error handling.

```jsx
import React, { useState } from 'react';

export default function RegistrationForm() {
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 1. Single change handler for all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 2. Validate field on blur (losing focus)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, fields[name]);
  };

  // 3. Field validation helper
  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (name === 'username' && value.trim().length < 3) {
      errorMsg = 'Username must be at least 3 characters long.';
    }
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      errorMsg = 'Invalid email address format.';
    }
    if (name === 'password' && value.length < 6) {
      errorMsg = 'Password must be at least 6 characters.';
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  // 4. Derived password strength feedback
  const getPasswordStrength = () => {
    const len = fields.password.length;
    if (len === 0) return { label: '', color: 'transparent' };
    if (len < 6) return { label: 'Weak', color: 'red' };
    if (len < 10) return { label: 'Medium', color: 'orange' };
    return { label: 'Strong', color: 'green' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation checks before submitting
    if (Object.values(errors).some(err => err) || !fields.agreeToTerms) {
      alert('Please resolve all validation errors before submitting.');
      return;
    }

    console.log('Form submitted successfully:', fields);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3>Create an Account</h3>
      
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Username:</label>
        <input 
          name="username" 
          value={fields.username} 
          onChange={handleChange} 
          onBlur={handleBlur}
          style={{ width: '100%', padding: '6px' }}
        />
        {touched.username && errors.username && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
        <input 
          name="email" 
          value={fields.email} 
          onChange={handleChange} 
          onBlur={handleBlur}
          style={{ width: '100%', padding: '6px' }}
        />
        {touched.email && errors.email && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Password:</label>
        <input 
          type="password"
          name="password" 
          value={fields.password} 
          onChange={handleChange} 
          onBlur={handleBlur}
          style={{ width: '100%', padding: '6px' }}
        />
        {fields.password && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: strength.color }}>
            Password Strength: <strong>{strength.label}</strong>
          </div>
        )}
        {touched.password && errors.password && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          <input 
            type="checkbox"
            name="agreeToTerms"
            checked={fields.agreeToTerms}
            onChange={handleChange}
          />
          {' '}I agree to the Terms of Service
        </label>
      </div>

      <button 
        type="submit" 
        disabled={!fields.agreeToTerms}
        style={{ width: '100%', padding: '10px', backgroundColor: fields.agreeToTerms ? '#007bff' : '#ccc', color: 'white', border: 'none', cursor: fields.agreeToTerms ? 'pointer' : 'not-allowed' }}
      >
        Sign Up
      </button>
    </form>
  );
}
```
