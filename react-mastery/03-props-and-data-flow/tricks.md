# ⚡ Props & Data Flow Tricks: Custom Propagation Patterns

## 1. The Rest Parameter / Spread Trick for Custom Wrapper Elements

When building custom wrapper components (e.g. custom inputs, buttons, or card links), you want to pass standard DOM attributes (like `aria-label`, `id`, `onMouseEnter`, `title`) to the underlying HTML element without declaring each one as a prop.

### The Trick
Extract your component-specific props first, and collect all remaining attributes using the JavaScript **rest parameter** (`...rest`). Then, apply them to the target element using the **spread operator**:

```jsx
import React from 'react';

// Extract 'label' and 'variant', collect everything else in 'rest'
export default function StandardButton({ label, variant = 'primary', ...rest }) {
  const getButtonStyle = () => ({
    padding: '8px 16px',
    backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  });

  return (
    <button style={getButtonStyle()} {...rest}>
      {label}
    </button>
  );
}

// Usage: 'onClick', 'disabled', and 'id' are automatically forwarded to the button element via ...rest
// <StandardButton label="Click Me" onClick={() => console.log('Clicked')} disabled={false} id="submit-btn" />
```

---

## 2. Prop Getters Pattern (For Controlled Custom Hooks)

**The Problem**: You want to provide a custom hook that manages UI state (like an accordion or dropdown toggler), but the user needs flexibility to style the element and add custom event handlers.
**The Trick**: Instead of returning raw properties, return a **prop getter** function. This function merges the hook's internal events and accessibility attributes with the user's custom props safely:

```jsx
import React, { useState } from 'react';

// Custom toggle hook returning a prop getter
export function useToggle() {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(p => !p);

  // Prop Getter: Merges internal attributes with custom user props
  const getTogglerProps = (customProps = {}) => ({
    'aria-expanded': isToggled,
    type: 'button',
    ...customProps,
    onClick: (e) => {
      // Run custom click handler if provided
      if (customProps.onClick) customProps.onClick(e);
      // Run hook's toggle click handler
      toggle();
    }
  });

  return { isToggled, getTogglerProps };
}

// Usage
export function ToggleWidget() {
  const { isToggled, getTogglerProps } = useToggle();

  return (
    <div>
      <button 
        {...getTogglerProps({ 
          onClick: () => console.log('User custom click triggered!') 
        })}
        style={{ padding: '10px', background: isToggled ? 'green' : 'gray', color: 'white' }}
      >
        Toggle Status
      </button>
      {isToggled && <p>Visible Content Panel</p>}
    </div>
  );
}
```

---

## 3. Fast Reference: TypeScript Interfaces vs PropTypes

Here is a quick reference comparison for typing props in TypeScript vs standard PropTypes:

### PropTypes (Runtime Validation - JS)
```jsx
import PropTypes from 'prop-types';

function Profile({ name, age, onSelect }) {
  return <div onClick={onSelect}>{name} ({age})</div>;
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};
```

### TypeScript (Compile-time Type Checking - TSX)
```tsx
interface ProfileProps {
  name: string;
  age?: number; // Optional prop
  onSelect: () => void;
}

function Profile({ name, age, onSelect }: ProfileProps) {
  return <div onClick={onSelect}>{name} ({age})</div>;
}
```
*Note: TypeScript is checked at compile-time and adds zero runtime overhead, whereas PropTypes runs in the browser during development.*
