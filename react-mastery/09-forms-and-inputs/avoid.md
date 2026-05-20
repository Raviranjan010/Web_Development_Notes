# 🚫 Forms & Inputs Avoids: State Locking and Handler Mistakes

## 1. Mixing Controlled and Uncontrolled Inputs (State Locking)

**The Mistake**: Setting the initial state of a controlled input to `undefined` or `null`, and then updating it to a string when the user types.
**Why it is bad**: React expects inputs to stay either controlled or uncontrolled for their entire lifecycle. Changing an input from uncontrolled (when value is `null` or `undefined`) to controlled (when value is a string) throws a warning in the console: `Warning: A component is changing an uncontrolled input to be controlled.`

### ❌ Bad Code
```jsx
// ❌ CRASH: Throws console errors because state starts as undefined
import React, { useState } from 'react';

export default function InputPanel() {
  // ❌ Initializing state to undefined or leaving it empty makes the input uncontrolled first
  const [name, setName] = useState();

  return (
    <input 
      value={name} 
      onChange={e => setName(e.target.value)} 
    />
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Initialize the state with an empty string ('')
import React, { useState } from 'react';

export default function InputPanel() {
  // Always initialize inputs with empty string fallbacks
  const [name, setName] = useState('');

  return (
    <input 
      value={name} 
      onChange={e => setName(e.target.value)} 
    />
  );
}
```

---

## 2. Writing Separate State Variables and Handlers for Every Input

**The Mistake**: Creating individual `useState` hooks and change handlers for every single input field in a large form.
**Why it is bad**: It creates verbose, repetitive code. If a form has ten fields, declaring ten states and ten handler functions makes the component difficult to read and maintain.

### ❌ Bad Code
```jsx
// ❌ Cluttered code with duplicate state declarations
import React, { useState } from 'react';

export default function FormWidget() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleFirst = (e) => setFirstName(e.target.value);
  const handleLast = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);

  return (
    <form>
      <input value={firstName} onChange={handleFirst} />
      <input value={lastName} onChange={handleLast} />
      <input value={email} onChange={handleEmail} />
      <input value={address} onChange={handleAddress} />
    </form>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Group form fields into a single state object
import React, { useState } from 'react';

export default function FormWidget() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });

  // A single change handler updates all fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input name="firstName" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" value={formData.lastName} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="address" value={formData.address} onChange={handleChange} />
    </form>
  );
}
```

---

## 3. Forgetting to Prevent Default Form Submission Behavior

**The Mistake**: Omitting `e.preventDefault()` inside form submit handlers.
**Why it is bad**: Standard browser behavior is to refresh the entire page on form submission. Skipping this line causes the page to reload, resetting all local states and cancelling any pending API requests.

### ❌ Bad Code
```jsx
// ❌ Page refreshes and state is lost when user submits
import React, { useState } from 'react';

export default function ProfileForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    // ❌ Missing preventDefault()!
    console.log("Submitting name:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Prevent default submission behavior to handle updates asynchronously
import React, { useState } from 'react';

export default function ProfileForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page refresh
    console.log("Submitting name:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
