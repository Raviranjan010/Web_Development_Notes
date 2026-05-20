# 🧩 React Components: Composition, Paradigms, and Systems

## 1. What a Component Truly Is

At its core, a React component is a **JavaScript function** that takes an input (props) and returns a React element (usually expressed as JSX). 

$$\text{Component}(Props) \rightarrow \text{Virtual DOM Element}$$

### The Pure Function Concept
React is designed around the concept of **pure functions**. A function is pure if:
1. It returns the exact same output for the same set of inputs.
2. It does not cause side effects (e.g., mutating external variables, modifying the DOM directly, writing to network endpoints).

React components should be pure during rendering. They should only project props and state into JSX. Any side effects (data fetching, subscriptions, manual DOM manipulation) must be isolated inside lifecycle hooks (like `useEffect`) or event handlers.

---

## 2. Functional Components vs Class Components

Historically, React components were declared using ES6 classes. Since React 16.8 (Hooks), functional components have become the modern standard.

### Key Differences Comparison
| Feature | Functional Component (Modern) | Class Component (Legacy) |
| :--- | :--- | :--- |
| **Declaration** | Plain JS Function | ES6 Class extending `React.Component` |
| **State** | `useState` / `useReducer` hooks | `this.state` object, `this.setState()` |
| **Lifecycle** | `useEffect` hook | Lifecycle methods (`componentDidMount`, etc.) |
| **Logic Reuse** | Custom Hooks (composable) | Mixins (deprecated), HOCs, Render Props |
| **Size / Performance** | Smaller bundle footprint, faster execution | Larger footprint, overhead of JS classes |
| **`this` context** | No `this` binding issues | Requires binding class methods |

### Legacy Code Example: Class Component
```jsx
import React, { Component } from 'react';

export default class LegacyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Bind event handlers to avoid 'this' becoming undefined
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Legacy Count: {this.state.count}</p>
        <button onClick={this.handleIncrement}>Increment</button>
      </div>
    );
  }
}
```

### The Migration Path: Class to Functional
To migrate a legacy class component to a functional hook-based component:
1. Convert the class declaration `class MyComponent extends Component` into a function `function MyComponent()`.
2. Extract the state declarations from the constructor into `useState` hooks.
3. Replace class lifecycle methods with `useEffect` blocks.
4. Remove `this.` references throughout the file.
5. Extract the return statement from the `render()` method to the top-level function scope.

---

## 3. Naming Rules: The PascalCase Constraint

React components **must** be named using PascalCase (e.g., `ProductCard` instead of `productCard` or `product-card`).

### Why React Enforces PascalCase
In JSX, elements starting with a lowercase letter are treated as standard HTML elements (e.g., `<div>`, `<span>`, `button`). Elements starting with an uppercase letter compile down to JavaScript variables:

```jsx
// Source JSX
const user = <UserCard />;
const host = <div />;

// Compiled Output
const user = _jsx(UserCard, {}); // References a variable in scope
const host = _jsx("div", {});    // Passes the tag name as a string literal
```

If you name a component starting with a lowercase letter, Babel will compile it as a string tag, causing the browser to look for a non-existent HTML custom element, resulting in rendering failure.

---

## 4. Component Composition

Component composition is the practice of combining small, isolated components to build complex user interfaces. Instead of writing massive monolithic components, you construct layout systems.

### The `children` Prop
The `children` prop is an automatic prop passed to every React component. It represents whatever nested JSX elements are placed between the opening and closing tags of the component.

```jsx
// Wrapper Layout Component
function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children} {/* Renders any nested components */}
      </div>
    </div>
  );
}

// Usage
<Modal isOpen={true}>
  <h2>Confirm Actions</h2>
  <p>Are you sure you want to delete this file?</p>
  <button>Delete</button>
</Modal>
```

---

## 5. Component Categories & Patterns

```
                                 ┌────────────────────────┐
                                 │ Component Architectures│
                                 └───────────┬────────────┘
                                             │
      ┌────────────────────────┬─────────────┴──────────┬────────────────────────┐
      ▼                        ▼                        ▼                        ▼
┌───────────┐            ┌───────────┐            ┌───────────┐            ┌───────────┐
│Presenter  │            │ Container │            │ Layout    │            │ Compound  │
│ (Dumb)    │            │ (Smart)   │            │ Systems   │            │ Patterns  │
└───────────┘            └───────────┘            └───────────┘            └───────────┘
```

1. **Presentational (Dumb) Components**: Focus purely on the UI. They accept data via props, emit actions via callback functions, and contain no state logic or data fetching.
2. **Container (Smart) Components**: Focus on state management, business logic, API integrations, and passing state down to presentational components.
3. **Layout Components**: Focus on formatting page structures (e.g., Headers, Footers, Sidebar alignments). They accept layout children and handle margins or flex layouts.
4. **Compound Components**: A set of components designed to work together to share state implicitly (e.g. `<Select>` and `<Option>`).

---

## 6. Pattern Comparisons

| Pattern | Primary Use Case | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Higher Order Components (HOC)** | Reusing cross-cutting concerns (e.g. `withAuth`) | Reusable logic wrapper | Wrapper hell, prop name collisions |
| **Render Props** | Sharing dynamic state via callback function | Highly flexible layouts | JSX nesting nesting, complex syntax |
| **Compound Components** | Modular UI controls sharing implicit state | Clean markup, high flexibility | Restricted component structure |
| **Custom Hooks** | Extracting component-specific state logic | Clean, composable, no wrapper nesting | Does not dictate UI layout |

---

## 7. Comprehensive Code Example: The Card System

Below is a complete, runnable Card component system demonstrating component composition, type checks, and structural children layouts.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

// 1. Root Card Component
export function Card({ children, borderVariant }) {
  const getBorderColor = () => {
    switch (borderVariant) {
      case 'primary': return '#007bff';
      case 'danger': return '#dc3545';
      default: return '#ddd';
    }
  };

  return (
    <div 
      style={{
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '6px',
        padding: '16px',
        margin: '12px 0',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        fontFamily: 'sans-serif'
      }}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  borderVariant: PropTypes.oneOf(['default', 'primary', 'danger'])
};

Card.defaultProps = {
  borderVariant: 'default'
};

// 2. Card Header
export function CardHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '12px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{title}</h3>
        {subtitle && <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#777' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.node
};

// 3. Card Body
export function CardBody({ children }) {
  return (
    <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  children: PropTypes.node.isRequired
};

// 4. Card Footer
export function CardFooter({ children }) {
  return (
    <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  children: PropTypes.node.isRequired
};

// 5. Assembled Composition Showcase
export default function CardShowcase() {
  const handleEdit = () => console.log('Edit clicked');

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <Card borderVariant="primary">
        <CardHeader 
          title="Account Details" 
          subtitle="User account profile configurations" 
          action={<button onClick={handleEdit}>Edit</button>}
        />
        <CardBody>
          <p><strong>Name:</strong> Jane Doe</p>
          <p><strong>Status:</strong> Active Developer</p>
          <p><strong>Tier:</strong> Enterprise Admin</p>
        </CardBody>
        <CardFooter>
          <button style={{ padding: '6px 12px', cursor: 'pointer' }}>Cancel</button>
          <button style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Save Changes
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
```
