# 🔄 Props and Data Flow: Unidirectional Bindings and lifting State

## 1. Props Are Immutable

In React, **props** (short for properties) represent the input configuration passed from a parent component down to a child component. 

A fundamental rule of React is that **props are read-only (immutable)**. A component must never modify its own props.

### Why React Enforces Immutability
React relies on shallow reference checks to determine if a component's inputs have changed. If a child component were allowed to mutate its own props, the parent component would have no way of knowing the data had changed because the object reference remained identical. This would lead to state desynchronization, layout bugs, and break the predictability of the rendering loop.

If a child component needs to change a value received via props, it must notify the parent component via a **callback function**, asking the parent to update its state, which will flow down as new props.

---

## 2. The One-Way Data Flow Principle

React enforces a **unidirectional (one-way) data flow**. Data (state) can only flow *downwards* from parent components to child components as props. Child components can communicate *upwards* to their parents only by triggering event callback functions passed to them as props.

```
       ┌────────────────────────┐
       │   Parent Component     │◄────────────────┐
       │   [State: cartItems]   │                 │
       └───────────┬────────────┘                 │
                   │                              │
                   │ (Props: item, onAdd)         │ (Callback: onAdd())
                   ▼                              │
       ┌────────────────────────┐                 │
       │   Child Component      │─────────────────┘
       │   [ProductCard]        │
       └────────────────────────┘
```

### Unidirectional Data Flow: 4-Level Tree
Here is how data and callbacks flow in a multi-level component tree:

```
[App Root (Holds State)]
       │
       ├─► (Data: userObj) ───────────────────────────────────┐
       ├─► (Callback: onLogout()) ──────────────────────────┐ │
       │                                                    ▼ ▼
┌──────────────┐                                     ┌──────────────┐
│  PublicPage  │                                     │  HeaderArea  │
└──────────────┘                                     └──────┬───────┘
                                                            │
                                        ┌───────────────────┴───────────────────┐
                                        ▼                                       ▼
                               ┌─────────────────┐                     ┌─────────────────┐
                               │   NavbarLinks   │                     │   UserProfile   │
                               └─────────────────┘                     └────────┬────────┘
                                                                                │
                                                                                ▼
                                                                       ┌─────────────────┐
                                                                       │  LogoutButton   │
                                                                       │ (Triggers:      │
                                                                       │  onLogout)      │
                                                                       └─────────────────┘
```

---

## 3. Handling Prop Signatures

Props can carry any JavaScript type, including primitives, objects, arrays, functions (callbacks), and even other React elements or component definitions.

### Destructuring Props
The modern way to access props is by destructuring them directly inside the function signature. This makes parameters explicit, allows you to assign default values, and avoids repeating `props.` throughout the template.

```jsx
// Destructuring with default values
export default function UserBadge({ 
  username, 
  role = 'user', 
  avatarUrl = '/default-avatar.png' 
}) {
  return (
    <div className="user-badge">
      <img src={avatarUrl} alt={username} />
      <h4>{username}</h4>
      <span>Role: {role}</span>
    </div>
  );
}
```

### Spreading Props: `{...props}`
The object spread operator allows you to pass all properties of an object to a child component without typing each one manually.

```jsx
// Parent Component
const buttonConfig = {
  type: 'submit',
  disabled: false,
  className: 'btn-submit'
};

return <CustomButton {...buttonConfig}>Save</CustomButton>;
```

> [!WARNING]
> Spreading props can be dangerous. It makes it easy to pass unintended, stale, or invalid HTML attributes to the underlying DOM element, triggering browser validation errors and makes tracking data flow more difficult.

---

## 4. Lifting State Up

When two or more sibling components need access to the same state data, you must **lift the state up** to their closest common ancestor component. The ancestor acts as the single source of truth, managing the state and passing it down to both siblings as props.

### Lifting State Example: Temperature System
Imagine an input field where you enter temperature in Celsius, and a sibling display widget showing the same value in Fahrenheit.

```jsx
import React, { useState } from 'react';

// Sibling A: Input Field
function TempInput({ celsius, onTempChange }) {
  return (
    <fieldset>
      <legend>Enter temperature in Celsius:</legend>
      <input 
        type="number" 
        value={celsius} 
        onChange={(e) => onTempChange(Number(e.target.value))} 
      />
    </fieldset>
  );
}

// Sibling B: Display Widget
function TempDisplay({ celsius }) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return (
    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#eee' }}>
      <p>Celsius: {celsius}°C</p>
      <p>Fahrenheit: {fahrenheit.toFixed(1)}°F</p>
    </div>
  );
}

// Common Ancestor (Holds the State)
export default function TempCalculator() {
  const [celsius, setCelsius] = useState(20); // Lifted state

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Temperature Sync</h2>
      <TempInput celsius={celsius} onTempChange={setCelsius} />
      <TempDisplay celsius={celsius} />
    </div>
  );
}
```

---

## 5. Props vs State

| Criteria | Props | State |
| :--- | :--- | :--- |
| **Definition** | Configuration inputs passed from a parent | Local, private memory managed within the component |
| **Immutability** | **Immutable** (read-only inside the component) | **Mutable** (via state setter functions only) |
| **Source** | Received from external parent contexts | Declared and managed locally inside the component |
| **Updates** | Triggered when the parent passes new values | Triggered when local state setters are called |
| **Use Case** | Configuring layouts, content, and hooks | Tracking user input, tabs, loading states, toggles |
| **Re-render** | Causes child updates when values change | Causes component updates when state setters run |

---

## 6. Real-World Project: Shopping Cart System

Below is a complete, runnable shopping cart system where the parent component manages the cart list state, and the child components communicate updates via callback props.

```jsx
import React, { useState } from 'react';

// 1. ProductCard (Child component receiving data + click callbacks)
function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '12px', margin: '8px 0', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: 0 }}>{product.name}</h4>
        <span style={{ fontSize: '14px', color: '#666' }}>${product.price.toFixed(2)}</span>
      </div>
      <button 
        onClick={() => onAddToCart(product)}
        style={{ padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add to Cart
      </button>
    </div>
  );
}

// 2. CartSummary (Child component displaying aggregated cart details)
function CartSummary({ cartItems, onRemoveFromCart }) {
  const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #ccc' }}>
      <h3 style={{ marginTop: 0 }}>Shopping Cart ({cartItems.length} items)</h3>
      {cartItems.length === 0 ? (
        <p style={{ color: '#777' }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ paddingLeft: '20px', margin: '0 0 16px 0' }}>
            {cartItems.map((item, index) => (
              <li key={`${item.id}-${index}`} style={{ margin: '6px 0', display: 'flex', justifyContent: 'space-between', maxWidth: '250px' }}>
                <span>{item.name}</span>
                <button 
                  onClick={() => onRemoveFromCart(index)}
                  style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '12px' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 'bold', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
            Total: ${totalCost.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}

// 3. ECommerceRoot (Parent component managing cart state)
export default function ECommerceRoot() {
  const [cart, setCart] = useState([]);

  const PRODUCTS_LIST = [
    { id: 'p-1', name: 'Design Patterns Book', price: 45.99 },
    { id: 'p-2', name: 'Ergonomic Mouse', price: 79.99 },
    { id: 'p-3', name: 'Coffee Beans (1kg)', price: 24.50 }
  ];

  const handleAddToCart = (product) => {
    // Add product object to cart state array
    setCart(prevCart => [...prevCart, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    // Filter item out of the cart array by index
    setCart(prevCart => prevCart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h2>Tech Catalog</h2>
      <div style={{ marginBottom: '20px' }}>
        {PRODUCTS_LIST.map(prod => (
          <ProductCard 
            key={prod.id} 
            product={prod} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>
      <CartSummary 
        cartItems={cart} 
        onRemoveFromCart={handleRemoveFromCart} 
      />
    </div>
  );
}
```
