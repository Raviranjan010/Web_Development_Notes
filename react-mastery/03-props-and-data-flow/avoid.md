# 🚫 Props & Data Flow Avoids: Propagation and Mutation Mistakes

## 1. Mutating Incoming Props Directly

**The Mistake**: Writing code inside a child component that reassigns or modifies incoming prop values.
**Why it is bad**: React props are read-only. Modifying prop keys directly (e.g. `props.user = "Bob"`) triggers JS runtime errors in strict mode and hides mutations from React's Virtual DOM change-detection cycle.

### ❌ Bad Code
```jsx
// ❌ DANGER: Mutating an incoming object prop directly.
// The parent has no knowledge of this change, and changes will be lost on next render.
import React from 'react';

export default function UserCard({ user }) {
  const updateRole = () => {
    user.role = 'Admin'; // Direct mutation of prop object!
    console.log("Updated role internally:", user.role);
  };

  return (
    <div>
      <h3>Name: {user.name}</h3>
      <p>Role: {user.role}</p>
      <button onClick={updateRole}>Promote</button>
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Child calls parent callback to request state updates.
import React from 'react';

export default function UserCard({ user, onRoleChange }) {
  const updateRole = () => {
    // Notify parent to update state. The change flows down as new props.
    onRoleChange(user.id, 'Admin');
  };

  return (
    <div>
      <h3>Name: {user.name}</h3>
      <p>Role: {user.role}</p>
      <button onClick={updateRole}>Promote</button>
    </div>
  );
}
```

---

## 2. Prop Over-Fragmentation (Passing Too Many Individual Props)

**The Mistake**: Passing dozens of individual properties down to a component when they all relate to a single object model.
**Why it is bad**: It makes function signatures long and hard to maintain. Adding a new property requires updating the prop list in every parent component.

### ❌ Bad Code
```jsx
// ❌ Long, cluttered prop list
import React from 'react';

function UserStats({ firstName, lastName, age, email, street, city, zip, role }) {
  return (
    <div>
      <h4>{firstName} {lastName} ({role})</h4>
      <p>Email: {email} | Age: {age}</p>
      <p>Location: {street}, {city} - {zip}</p>
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ Clean approach: Pass the model object directly.
import React from 'react';

function UserStats({ userProfile }) {
  const { name, contact, address, role } = userProfile;
  return (
    <div>
      <h4>{name.first} {name.last} ({role})</h4>
      <p>Email: {contact.email} | Age: {contact.age}</p>
      <p>Location: {address.street}, {address.city} - {address.zip}</p>
    </div>
  );
}
```

---

## 3. Unsafe Callback Invocations

**The Mistake**: Invoking callback props without checking if they were provided by the parent.
**Why it is bad**: If a parent mounts a component but omits the optional callback prop, clicking the action button throws a runtime error (e.g., `TypeError: onAction is not a function`), crashing the application.

### ❌ Bad Code
```jsx
// ❌ If the parent omits 'onClose', clicking this button crashes the app.
import React from 'react';

export default function InfoModal({ title, onClose }) {
  return (
    <div className="modal">
      <h3>{title}</h3>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ Correct: Default to a no-operation (no-op) function or use optional chaining.
import React from 'react';

export default function InfoModal({ title, onClose = () => {} }) {
  return (
    <div className="modal">
      <h3>{title}</h3>
      {/* Option A: Default value inside signature guarantees it is executable */}
      <button onClick={onClose}>Close</button>

      {/* Option B: Optional chaining syntax */}
      {/* <button onClick={() => onClose?.()}>Close</button> */}
    </div>
  );
}
```

---

## 4. Unclear Prop Names (Context-Agnostic Naming)

**The Mistake**: Using generic names like `data` or generic event names like `handler` for props.
**Why it is bad**: It makes components difficult to read. The developer must inspect the component's internals to understand what data structures are expected.

### ❌ Bad Code
```jsx
// ❌ Bad naming: What does data contain? What does handler do?
import React from 'react';

function TextWidget({ data, handler }) {
  return (
    <div>
      <p>{data.body}</p>
      <button onClick={handler}>Click</button>
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ Clear naming: Explicit models and action descriptions
import React from 'react';

function TextWidget({ comment, onApproveComment }) {
  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={onApproveComment}>Approve</button>
    </div>
  );
}
```
