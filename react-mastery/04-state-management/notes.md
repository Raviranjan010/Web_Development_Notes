# 💾 State Management: useState, useReducer, and Derived State

## 1. What State Actually Is

In React, **state** is the local, private memory managed within a component. It is not just "dynamic data." Specifically, state is **data that, when modified, triggers React to re-render the component and its children to sync the UI with the new values.**

### The Three Questions of State Design
Before declaring a state variable using `useState`, ask yourself these three qualifying questions:
1. **Does it need to persist between renders?** If not (e.g. a simple temporary index in a loop), use a standard local variable. If it does need to persist but *should not* trigger re-renders, use `useRef`.
2. **Can it be computed from existing state or props?** If yes, it is **derived state**. Do not store it in state; calculate it dynamically during the render phase.
3. **Does changing it need to update the UI?** If the value has no visual impact on the DOM tree (e.g., tracking analytics counts or timers in the background), do not store it in state.

---

## 2. useState Deep Dive

The `useState` hook allows functional components to store state.

```jsx
const [state, setState] = useState(initialValue);
```

### Lazy State Initialization
If the initial state value is the result of an expensive calculation (e.g., reading from `localStorage`, parsing a large JSON file, or filtering a dataset), React will run that calculation on *every single render cycle*, even though it only uses the value during the first mount.

To fix this, pass a **function** to `useState` instead of a direct value. React will execute the function only once on mount:

```jsx
// ❌ BAD: localStorage is queried on every single render
const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_profile')));

// ✅ GOOD: Lazy initialization function is run once on mount
const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem('user_profile')) || { name: 'Guest' };
});
```

### Asynchronous State Batching (React 18)
State updates are not applied immediately. They are scheduled and processed asynchronously. If you read the state value immediately after calling the setter, you will get the old value:

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // ❌ Logs '0', not '1'! The state snapshot for this render is frozen.
};
```

In React 18, updates are batched together. If you update multiple states in a single event handler, promise, or timeout, React runs a single re-render cycle instead of multiple repaints:

```javascript
const handleUpdate = () => {
  setUsers(newUsers);
  setLoading(false);
  // React runs exactly ONE re-render here (automatic batching)
};
```

### Functional Updates
If your next state depends on the previous state value, always pass a callback function to the state setter. This guarantees you are updating the most recent state value, bypassing any asynchronous closures:

```jsx
// ❌ BAD: can cause stale state bugs if clicked quickly
setCount(count + 1);

// ✅ GOOD: guarantees access to the latest state queue
setCount(prev => prev + 1);
```

---

## 3. Immutable Updates for Objects and Arrays

You must never mutate state directly. Mutating arrays/objects (e.g. `arr.push()` or `obj.key = val`) modifies the reference value. Since the reference is unchanged, React's shallow comparison checker assumes no change occurred and skips the re-render.

### Object Update Pattern
```jsx
// ✅ Create a new object copy using the spread operator
setUser(prevUser => ({
  ...prevUser,
  email: 'newemail@domain.com' // Overwrites email property
}));
```

### Array Update Patterns

| Operation | ❌ Imperative Mutation (Skip Render) | ✅ Immutable Update (Triggers Render) |
| :--- | :--- | :--- |
| **Add Item** | `list.push(item)` | `setList(prev => [...prev, item])` |
| **Remove Item** | `list.splice(index, 1)` | `setList(prev => prev.filter((_, idx) => idx !== index))` |
| **Update Item** | `list[index].val = newVal` | `setList(prev => prev.map((item, idx) => idx === index ? { ...item, val: newVal } : item))` |
| **Clear List** | `list.length = 0` | `setList([])` |

---

## 4. useState vs useReducer

As component state grows, managing multiple `useState` calls with complex transitions becomes difficult. `useReducer` organizes state updates into a centralized state machine.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

| Criteria | `useState` | `useReducer` |
| :--- | :--- | :--- |
| **Complexity** | Best for simple primitives or isolated states | Best for complex objects with nested relationships |
| **Logic** | Event handlers contain state mutation logic | State mutations are grouped in a single reducer |
| **Readability** | Messy when state transitions depend on other states | Clean, actions are dispatched via descriptors |
| **Testing** | Difficult to test state transitions in isolation | Easy to test (reducer is a pure JS function) |

---

## 5. State Colocation and Derived State

- **State Colocation**: Keeping state as close to where it is used as possible. Do not put every state variable in the root component. If a modal only opens in the Sidebar, declare its open state in the Sidebar.
- **Derived State**: Values that can be computed on the fly from existing state or props. 
  *Example*: Do not store `totalItems` or `cartTotal` in state. Calculate them during rendering by reducing the `cartItems` state array.

---

## 6. Real-World Project: Reducer-Driven Cart System

Below is a complete, runnable Shopping Cart component utilizing `useReducer` to handle item insertions, quantity adjustments, and removals.

```jsx
import React, { useReducer } from 'react';

// 1. Initial State Definition
const initialCartState = {
  items: [],
  promoApplied: false
};

// 2. Reducer Function (Pure State Machine)
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIdx = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIdx > -1) {
        // Increment quantity if item already exists
        const updatedItems = state.items.map((item, idx) => 
          idx === existingItemIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updatedItems };
      }
      // Add new item with quantity = 1
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== id) };
      }
      return {
        ...state,
        items: state.items.map(item => item.id === id ? { ...item, quantity } : item)
      };
    }
    
    case 'APPLY_PROMO':
      return { ...state, promoApplied: true };
      
    case 'CLEAR_CART':
      return initialCartState;
      
    default:
      throw new Error(`Unsupported action action type: ${action.type}`);
  }
}

// 3. Main ShoppingCart Component
export default function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Sample inventory catalog
  const INVENTORY = [
    { id: 'item-1', name: 'Developer Keyboard', price: 99.99 },
    { id: 'item-2', name: 'Noise-Canceling Headphones', price: 199.99 }
  ];

  // Derived State (Calculated on the fly during render)
  const totalItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cart.promoApplied ? rawSubtotal * 0.10 : 0;
  const finalTotal = rawSubtotal - discount;

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h2>Store Catalog</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {INVENTORY.map(prod => (
          <button 
            key={prod.id}
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: prod })}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            Buy {prod.name} (${prod.price})
          </button>
        ))}
      </div>

      <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
        <h3>Your Cart ({totalItemCount} items)</h3>
        {cart.items.length === 0 ? (
          <p>Cart is empty.</p>
        ) : (
          <div>
            {cart.items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                <span>{item.name} (${item.price})</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
                  <button 
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '12px' }}>
              <p>Subtotal: ${rawSubtotal.toFixed(2)}</p>
              {cart.promoApplied ? (
                <p style={{ color: 'green' }}>Promo Discount (10%): -${discount.toFixed(2)}</p>
              ) : (
                <button 
                  onClick={() => dispatch({ type: 'APPLY_PROMO' })}
                  style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}
                >
                  Apply 10% Discount Code
                </button>
              )}
              <h4 style={{ marginTop: '10px' }}>Total: ${finalTotal.toFixed(2)}</h4>
              <button 
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                style={{ width: '100%', padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```
