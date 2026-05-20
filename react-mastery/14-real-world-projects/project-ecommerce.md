# 🛒 Project 2: E-Commerce Store with Shopping Cart (useReducer)

A complete Product Catalog and Shopping Cart dashboard using `useReducer` state management to handle multi-step checkouts, quantity updates, and pricing calculations.

---

## 1. Features
1. **Catalog View**: Displays products with category and price.
2. **Cart Management**: Adds items to the cart, increments/decrements quantities, and removes items.
3. **Price Engine**: Computes total items, subtotal, sales tax (10%), and final order totals dynamically.
4. **Validation Check**: Disables the checkout button if the cart is empty.
5. **Loading States**: Simulates order placement loading feedback.

---

## 2. Reducer Action Flow Diagram
```
                     ┌───────────────────┐
                     │   Dispatch Event  │
                     └─────────┬─────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│ ADD_TO_CART  │        │ UPDATE_QTY   │        │ REMOVE_ITEM  │
└──────────────┘        └──────────────┘        └──────────────┘
```

---

## 3. Complete Implementation Code

```jsx
import React, { useReducer, useState } from 'react';

// 1. Initial State Definition
const INITIAL_STATE = {
  cart: [],
  products: [
    { id: 'p1', name: 'Premium Leather Boots', price: 120, category: 'Apparel' },
    { id: 'p2', name: 'Ergonomic Wireless Mouse', price: 45, category: 'Electronics' },
    { id: 'p3', name: 'Noise-Cancelling Headphones', price: 180, category: 'Electronics' },
    { id: 'p4', name: 'Minimalist Steel Water Bottle', price: 25, category: 'Lifestyle' }
  ]
};

// 2. Reducer Function handling state modifications
function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Increment quantity if product is already in the cart
        return {
          ...state,
          cart: state.cart.map(item => 
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      // Add new product with quantity 1
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== id)
        };
      }
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export default function StoreApp() {
  const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // 3. Derived Pricing Computations
  const cartSubtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const salesTax = cartSubtotal * 0.10; // 10% tax rate
  const grandTotal = cartSubtotal + salesTax;

  const handleCheckout = () => {
    if (state.cart.length === 0) return;
    setIsCheckingOut(true);

    // Simulate async payment processing
    setTimeout(() => {
      alert(`Order placed successfully! Total charged: $${grandTotal.toFixed(2)}`);
      dispatch({ type: 'CLEAR_CART' });
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'sans-serif', padding: '16px' }}>
      <h2>🛒 Custom E-Store</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        
        {/* Product Catalog list */}
        <div>
          <h3>Product Catalog</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {state.products.map(product => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '4px' }}>
                <h4>{product.name}</h4>
                <p style={{ color: '#888', margin: '4px 0' }}>{product.category}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <strong>${product.price}</strong>
                  <button 
                    onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                    style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart Summary */}
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px', backgroundColor: '#fcfcfc' }}>
          <h3>Shopping Cart</h3>
          {state.cart.length === 0 ? (
            <p style={{ color: '#999' }}>Your cart is empty.</p>
          ) : (
            <>
              {state.cart.map(item => (
                <div key={item.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{item.name}</strong>
                    <button 
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                      style={{ fontSize: '11px', cursor: 'pointer', border: 'none', background: 'none', color: 'red' }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span>${item.price} each</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pricing Totals */}
              <div style={{ marginTop: '16px', borderTop: '2px solid #ddd', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Subtotal:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Sales Tax (10%):</span>
                  <span>${salesTax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', marginTop: '8px' }}>
                  <span>Grand Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                style={{ width: '100%', marginTop: '16px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                {isCheckingOut ? 'Processing Order...' : 'Proceed to Checkout'}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
```
