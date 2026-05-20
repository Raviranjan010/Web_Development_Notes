# ⚡ Forms & Inputs Tricks: Advanced Input Workflows

## 1. The Computed Property Name Trick (Single Handler)

**The Problem**: Writing individual event handlers for every form input field results in cluttered, repetitive code.
**The Trick**: Use ES6 **computed property names** inside a single change handler. Enforce that the `name` attribute of each HTML input element matches the exact key name in your React state object:

```jsx
import React, { useState } from 'react';

export default function SignupForm() {
  const [fields, setFields] = useState({
    username: '',
    email: '',
    role: 'developer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Dynamic key update
    setFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input name="username" value={fields.username} onChange={handleChange} />
      <input name="email" value={fields.email} onChange={handleChange} />
      <select name="role" value={fields.role} onChange={handleChange}>
        <option value="developer">Developer</option>
        <option value="manager">Manager</option>
      </select>
    </form>
  );
}
```

---

## 2. The Custom Button File Upload Trigger (Hidden Input Hack)

**The Problem**: The browser's default file input button `<input type="file" />` is notoriously difficult to style using standard CSS.
**The Trick**: Hide the file input using `display: none` and assign a `useRef` to it. Create a styled button that triggers the click event on the hidden input when clicked:

```jsx
import React, { useRef } from 'react';

export default function CustomFileUploader() {
  const hiddenFileInputRef = useRef(null);

  const triggerUploadClick = () => {
    // Programmatically trigger click on hidden input node
    hiddenFileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file?.name);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Hidden native input */}
      <input 
        type="file" 
        ref={hiddenFileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />

      {/* Styled custom button */}
      <button 
        type="button"
        onClick={triggerUploadClick}
        style={{ padding: '10px 16px', backgroundColor: '#007bfe', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Choose Profile Image
      </button>
    </div>
  );
}
```

---

## 3. Resetting Forms via Native DOM Reset API

**The Problem**: Resetting forms that mix controlled and uncontrolled states can be tedious, requiring you to set each state variable back to its initial value.
**The Trick**: Use the native HTML form element's **`reset()`** method. By passing a reference to the form element, you can reset all inputs back to their defaults in one line:

```jsx
import React, { useRef } from 'react';

export default function FeedbackForm() {
  const formRef = useRef(null);

  const handleReset = () => {
    // Triggers native browser reset event
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={e => e.preventDefault()}>
      <input defaultValue="Default Username" />
      <textarea defaultValue="Default Feedback Message" />
      <button type="button" onClick={handleReset}>Reset to Defaults</button>
    </form>
  );
}
```
