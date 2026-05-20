# 🧱 JSX and Rendering: From Markup to DOM Elements

## 1. What JSX Actually Is

**JSX** (JavaScript XML) is an HTML-like syntax extension to JavaScript. It is not understood by browsers, nor is it raw HTML. JSX is **syntactic sugar** for `React.createElement()` (in legacy systems) or the modern `_jsx()` compiler entry points.

### The Transformation Pipeline
When you write JSX code, the build tool (Babel, SWC, or Esbuild) compiles it into standard JavaScript statements.

```
┌──────────────────────────────────────┐
│             JSX Markup               │
│ <h1 id="main">Hello {name}</h1>      │
└──────────────────┬───────────────────┘
                   │
                   ▼ (Babel / SWC Compiler)
┌──────────────────────────────────────┐
│          Compiled JavaScript         │
│ _jsx("h1", {                         │
│   id: "main",                        │
│   children: ["Hello ", name]         │
│ })                                   │
└──────────────────┬───────────────────┘
                   │
                   ▼ (Execution in Runtime)
┌──────────────────────────────────────┐
│          React Element (VDOM)        │
│ { type: 'h1', props: { id: 'main' }} │
└──────────────────┬───────────────────┘
                   │
                   ▼ (Reconciliation)
┌──────────────────────────────────────┐
│           Real DOM Element           │
│ <h1 id="main">Hello John</h1>        │
└──────────────────────────────────────┘
```

### Babel REPL Compilation Comparison
Let us inspect how JSX translates to vanilla JavaScript code.

#### JSX Source Input:
```jsx
const profile = (
  <div className="user-profile" data-status="active">
    <h2 style={{ color: 'blue' }}>Alice</h2>
    <p>Age: {20 + 5}</p>
  </div>
);
```

#### Babel Output (React 17+ Modern runtime):
```javascript
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const profile = _jsxs("div", {
  className: "user-profile",
  "data-status": "active",
  children: [
    _jsx("h2", {
      style: { color: 'blue' },
      children: "Alice"
    }),
    _jsxs("p", {
      children: ["Age: ", 20 + 5]
    })
  ]
});
```

---

## 2. Core Rules of JSX

To write valid JSX, you must adhere to three primary constraints:

### Rule 1: A Component Must Return a Single Root Element
Every component must return a single wrapping element. This is because a JavaScript function cannot return multiple values unless they are wrapped in an array or object. Under the hood, `_jsxs` needs a single parent type to map the children properties.

```jsx
// ❌ INVALID: Will fail compilation
return (
  <h1>Title</h1>
  <p>Description</p>
);

// ✅ VALID: Wrapped in a Fragment
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

### Rule 2: All Tags Must Be Explicitly Closed
Unlike HTML where elements like `<img>` or `<input>` do not require closing tags, JSX requires all elements to be self-closing or have explicit closing tags.

```jsx
// ❌ INVALID
const img = <img src="logo.png">;

// ✅ VALID
const img = <img src="logo.png" />;
```

### Rule 3: Attributes Must Use camelCase
Because JSX compiles down to JavaScript objects, attributes are mapped directly to JavaScript keys. Therefore, words are joined using standard camelCase naming conventions.

- `class` $\rightarrow$ `className` (since `class` is a reserved keyword in JS)
- `for` $\rightarrow$ `htmlFor` (since `for` is a reserved keyword in JS)
- `onclick` $\rightarrow$ `onClick`
- `tabindex` $\rightarrow$ `tabIndex`

---

## 3. JSX vs HTML Attribute Differences

| HTML Attribute | JSX equivalent | Value Type | Example |
| :--- | :--- | :--- | :--- |
| `class` | `className` | String | `className="card-container"` |
| `for` | `htmlFor` | String | `htmlFor="email-input"` |
| `style` | `style` | JavaScript Object | `style={{ display: 'flex', color: 'red' }}` |
| `onclick` | `onClick` | Callback Function | `onClick={handleClick}` |
| `tabindex` | `tabIndex` | Number | `tabIndex={0}` |
| `autoplay` | `autoPlay` | Boolean | `autoPlay={true}` |
| `maxlength` | `maxLength` | Number | `maxLength={100}` |

---

## 4. Conditional Rendering (4 Patterns)

React allows you to conditionally render portions of the UI based on state or props.

### Pattern 1: `if / else` (Best for large block diversions)
Typically used at the top of a component function to handle early returns (e.g., loading screens, error states).

```jsx
export default function AuthPanel({ isLoading, isLoggedIn }) {
  if (isLoading) {
    return <div>Loading credentials...</div>;
  }
  
  if (isLoggedIn) {
    return <button>View Dashboard</button>;
  }

  return <button>Sign In</button>;
}
```

### Pattern 2: Ternary Operator `condition ? A : B` (Best for inline toggling)
Used inside JSX when you need to switch between two elements depending on a boolean state.

```jsx
export default function LightIndicator({ isOn }) {
  return (
    <div className="indicator">
      Status: {isOn ? <span className="status-on">ON</span> : <span className="status-off">OFF</span>}
    </div>
  );
}
```

### Pattern 3: Logical AND `&&` (Best for conditional show/hide)
Used when you want to render an element if a condition is true, and render nothing if it is false.

```jsx
export default function Banner({ hasAlert, alertMsg }) {
  return (
    <div>
      <h3>Dashboard</h3>
      {hasAlert && (
        <div className="alert-box">
          <p>DANGER: {alertMsg}</p>
        </div>
      )}
    </div>
  );
}
```

### Pattern 4: `switch` Statement (Best for complex multi-state layouts)
Used when a component has multiple distinct views (e.g. step-by-step wizard forms, role-based dashboards).

```jsx
export default function UserRoleView({ role }) {
  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'moderator':
      return <ModeratorDashboard />;
    case 'user':
      return <UserFeed />;
    default:
      return <GuestLandingPage />;
  }
}
```

---

## 5. List Rendering & The Key Prop

To render multiple identical components from an array, use the JavaScript `.map()` method.

```jsx
const users = [
  { id: 'usr-1', name: 'Alice' },
  { id: 'usr-2', name: 'Bob' }
];

return (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);
```

### Why the `key` Prop is Mandatory
React's diffing engine uses the `key` prop to match Virtual DOM elements with real DOM elements. When state changes (e.g., items are sorted, added, or removed), React relies on keys to decide whether it can reuse an existing DOM node or if it must destroy it and build a new one.

- **Without Keys**: React does a "naive" update. If you prepend an item to a list of 100 items, React will overwrite the properties of every single existing DOM node in order, and then append one new element at the end. This is slow and destroys local input states.
- **With Unique Keys**: React realizes that the 100 existing keys have just shifted position, moves the DOM elements without recreating them, and inserts the new element at the beginning.

---

## 6. How React Renders to the DOM

The entry point of a React application initializes the rendering process using two key methods from `react-dom/client`:

1. **`ReactDOM.createRoot(container)`**: Creates a root representation inside a target HTML node.
2. **`root.render(element)`**: Mounts the React element tree into the root.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Select the real DOM element defined in index.html
const container = document.getElementById('root');

// 2. Initialize the Virtual root
const root = ReactDOM.createRoot(container);

// 3. Render the root component tree
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 7. Rendering Nothing (null vs false vs undefined)

If a component should render nothing on the screen, it must return `null`. Returning `false` or `undefined` is handled as follows:

- **Returning `null`**: Instructs React to skip rendering this component. The node is unmounted or omitted from the DOM layout.
- **Returning `false`**: Compiles successfully but does not render anything. Often used in inline logical operations: `{condition && <Component />}` evaluates to `false` when condition is false, which renders nothing.
- **Returning `undefined`**: In React 17 and below, returning `undefined` from a component function threw a runtime crash. In React 18, it is treated the same as returning `null` (renders nothing), though it is still considered bad practice. Always return `null` explicitly for clarity.

---

## 8. XSS Protections and `dangerouslySetInnerHTML`

By default, React escapes all strings rendered inside JSX templates to protect against Cross-Site Scripting (XSS) attacks. If user input contains malicious markup like `<script>window.location.replace("attacker.com")</script>`, React displays it as plain text instead of executing it.

If you must render rich HTML (e.g., markdown output from a trusted CMS API), you can bypass this safety block using `dangerouslySetInnerHTML`:

```jsx
import React from 'react';

export default function RenderRichContent({ htmlPayload }) {
  // Bypasses React escaping. The input markup is written directly to the DOM node.
  return (
    <div 
      className="cms-content" 
      dangerouslySetInnerHTML={{ __html: htmlPayload }} 
    />
  );
}
```

> [!CAUTION]
> Never pass unsanitized user inputs directly into `dangerouslySetInnerHTML`. An attacker could inject malicious scripts. Always pass inputs through a sanitization library first (e.g., `dompurify`).

---

## 9. Comprehensive Example: ProductCard

Below is a complete, runnable component combining conditional styling, list mapping, dynamic class names, and ternary operators.

```jsx
import React from 'react';

// Sample product dataset representing API payload
const PRODUCTS = [
  { id: 'p1', name: 'Premium Wireless Headset', price: 129.99, stock: 15, isFeatured: true, description: 'High-fidelity audio with noise-canceling technology.' },
  { id: 'p2', name: 'Mechanical Gaming Keyboard', price: 89.99, stock: 0, isFeatured: false, description: 'Tactile switch keyboard with customizable RGB backlighting.' },
  { id: 'p3', name: 'Ultra-Wide Curved Monitor', price: 349.99, stock: 3, isFeatured: true, description: '34-inch curved desktop display for immersive gaming and workflows.' }
];

function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div 
      style={{
        border: product.isFeatured ? '2px solid #ff9900' : '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '12px 0',
        backgroundColor: isOutOfStock ? '#f9f9f9' : '#fff',
        position: 'relative',
        fontFamily: 'sans-serif'
      }}
    >
      {/* Featured Badge rendered conditionally via && */}
      {product.isFeatured && (
        <span 
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#ff9900',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '4px'
          }}
        >
          FEATURED
        </span>
      )}

      <h3 style={{ margin: '0 0 8px 0', color: isOutOfStock ? '#777' : '#111' }}>
        {product.name}
      </h3>

      <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>
        {product.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
          ${product.price.toFixed(2)}
        </span>

        {/* Stock Alert rendering via Ternary Operators */}
        {isOutOfStock ? (
          <span style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</span>
        ) : isLowStock ? (
          <span style={{ color: 'orange', fontSize: '13px' }}>Only {product.stock} left!</span>
        ) : (
          <span style={{ color: 'green', fontSize: '13px' }}>In Stock ({product.stock})</span>
        )}
      </div>

      <button 
        disabled={isOutOfStock}
        style={{
          marginTop: '12px',
          width: '100%',
          padding: '10px',
          backgroundColor: isOutOfStock ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: isOutOfStock ? 'not-allowed' : 'pointer'
        }}
      >
        {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default function ProductCatalog() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Product Showcase</h2>
      {PRODUCTS.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```
