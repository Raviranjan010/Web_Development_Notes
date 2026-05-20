# ⚡ JSX & Rendering Tricks: Advanced Template Patterns

## 1. Inline Debugging inside JSX

**The Problem**: You cannot write `console.log()` statements directly inside a JSX block because JSX only accepts expressions, not statements.
**The Trick**: You can run inline console outputs by wrapping them in a logical OR (`||`) expression, since `console.log` returns `undefined` (a falsy value) and allows the template to fall back to the actual element:

```jsx
export default function UserWidget({ user }) {
  return (
    <div className="card">
      {/* Trick: print properties inline to verify values without breaking templates */}
      <h3>{user.name}</h3>
      {console.log("Current user object:", user) || null}
    </div>
  );
}
```

---

## 2. The Conditional Wrapper Pattern

**The Problem**: You want to wrap a component inside a parent link or container *only* if a certain condition is met (e.g. wrapping an image inside an `<a>` tag if a URL is provided, but leaving it as-is if it is empty).
**The Trick**: Define a wrapper helper function inline or as a sub-component:

```jsx
import React from 'react';

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

export default function ProductImage({ imageUrl, linkUrl }) {
  return (
    <ConditionalWrapper 
      condition={!!linkUrl} 
      wrapper={children => <a href={linkUrl} className="image-link">{children}</a>}
    >
      <img src={imageUrl} alt="Product preview" />
    </ConditionalWrapper>
  );
}
```

---

## 3. Dynamic Class Construction (The Classnames Utility Pattern)

**The Problem**: Writing manual template literals for multiple conditional class combinations becomes messy: `className={`btn ${isActive ? 'btn-active' : ''} ${isDisabled ? 'btn-disabled' : ''}`}`.
**The Trick**: Write a small helper function to join valid class strings, mimicking the popular `clsx` or `classnames` libraries:

```jsx
// A lightweight class name merger
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function CustomButton({ isActive, isDisabled, size }) {
  return (
    <button 
      className={cn(
        'btn-core',
        isActive && 'btn-active',
        isDisabled && 'btn-disabled',
        size === 'large' ? 'btn-lg' : 'btn-sm'
      )}
    >
      Click Me
    </button>
  );
}
```

---

## 4. Rendering SVGs in React

**The Problem**: standard HTML SVGs contain attributes like `fill-rule`, `clip-path`, or `stroke-width` which will trigger compilation warnings in React because they are not camelCased.
**The Trick**: SVGs must be written with camelCase properties in React JSX. Make sure:
- `fill-rule` becomes `fillRule`
- `stroke-width` becomes `strokeWidth`
- `clip-path` becomes `clipPath`

```jsx
import React from 'react';

export default function ShieldIcon({ color = 'currentColor', stroke = 2 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="24" 
      height="24"
      fill="none" 
      stroke={color} 
      strokeWidth={stroke} // Note camelCase
      strokeLinecap="round" // Note camelCase
      strokeLinejoin="round" // Note camelCase
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
```

---

## 5. Portal Rendering for Modals and Overlays

**The Problem**: A modal component placed deep inside your DOM tree might inherit layout constraints (e.g. `overflow: hidden` on a parent card, or parent `z-index` limits), breaking its visual overlay.
**The Trick**: Use `createPortal` to render the modal's DOM nodes outside the current layout, while keeping its react context, hooks, and props inside the parent component tree.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

export default function ModalPortal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Renders the modal element directly at the document body level
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose} style={backdropStyle}>
      <div className="modal-body" onClick={e => e.stopPropagation()} style={modalStyle}>
        <button onClick={onClose} style={{ float: 'right' }}>Close</button>
        {children}
      </div>
    </div>,
    document.body // Target container outside the React root root
  );
}

const backdropStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 };
const modalStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px' };
```
