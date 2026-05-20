# 🚫 State Management Avoids: Mutation and Redundancy Pitfalls

## 1. Mutating State Directly (Object/Array Mutation)

**The Mistake**: Modifying keys of an object or pushing elements to an array directly in state before passing the variable to the setter.
**Why it is bad**: React uses shallow reference checking (`Object.is`) to check if state has changed. If you mutate the existing object/array in place, its memory reference remains the same. When you call the state setter, React assumes no changes occurred and skips the re-render.

### ❌ Bad Code
```jsx
// ❌ DANGER: Mutating state directly using .push(). 
// The array reference remains identical, and React will not trigger a re-render.
import React, { useState } from 'react';

export default function BrokenList() {
  const [list, setList] = useState(['Item 1']);

  const addItem = () => {
    list.push('New Item'); // Mutates state in place!
    setList(list);         // Passes the same reference. No re-render triggers.
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>{list.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Use the spread operator to create a new array reference.
import React, { useState } from 'react';

export default function WorkingList() {
  const [list, setList] = useState(['Item 1']);

  const addItem = () => {
    // Spread creates a brand new array reference in memory
    setList(prevList => [...prevList, 'New Item']);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>{list.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
    </div>
  );
}
```

---

## 2. Storing Derived State

**The Mistake**: Creating separate state variables for values that can be computed from existing state or props.
**Why it is bad**: It introduces synchronization bugs. If you update the base state (e.g. `items`), you must remember to update all associated states (e.g. `itemCount`, `totalPrice`). If you forget or perform updates out of order, the UI displays incorrect data.

### ❌ Bad Code
```jsx
// ❌ DANGER: Storing derived values in separate state. 
// Requires keeping three separate states synchronized.
import React, { useState } from 'react';

export default function BadCart() {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddItem = (item) => {
    setItems([...items, item]);
    setItemCount(itemCount + 1);
    setTotalPrice(totalPrice + item.price);
  };

  return <button onClick={() => handleAddItem({ price: 10 })}>Buy ($10)</button>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Calculate derived state values dynamically during rendering.
import React, { useState } from 'react';

export default function GoodCart() {
  const [items, setItems] = useState([]); // Single source of truth

  // Compute values on the fly during render. Zero synchronization overhead.
  const itemCount = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const handleAddItem = (item) => {
    setItems(prevItems => [...prevItems, item]);
  };

  return (
    <div>
      <p>Items: {itemCount} | Total: ${totalPrice}</p>
      <button onClick={() => handleAddItem({ price: 10 })}>Buy ($10)</button>
    </div>
  );
}
```

---

## 3. Updating State Based on Stale Value References

**The Mistake**: Calling a state setter using the current state variable name when the next state is dependent on the previous state.
**Why it is bad**: Because state updates are asynchronous, calling the state setter multiple times in a row will read stale state snapshots from the current render closure rather than the updated value queue.

### ❌ Bad Code
```jsx
// ❌ DANGER: If clicked, 'count' only increments by 1, not 3.
// Each call reads 'count' as 0 during the single render closure.
import React, { useState } from 'react';

export default function StaleCounter() {
  const [count, setCount] = useState(0);

  const incrementTriple = () => {
    setCount(count + 1); // Reads count = 0 -> schedules count = 1
    setCount(count + 1); // Reads count = 0 -> schedules count = 1
    setCount(count + 1); // Reads count = 0 -> schedules count = 1
  };

  return <button onClick={incrementTriple}>Value: {count}</button>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Pass a functional updater callback.
// React passes the latest queued state to the callback.
import React, { useState } from 'react';

export default function SafeCounter() {
  const [count, setCount] = useState(0);

  const incrementTriple = () => {
    setCount(prev => prev + 1); // Receives 0 -> returns 1
    setCount(prev => prev + 1); // Receives 1 -> returns 2
    setCount(prev => prev + 1); // Receives 2 -> returns 3
  };

  return <button onClick={incrementTriple}>Value: {count}</button>;
}
```

---

## 4. Storing Non-Serializable Values in State

**The Mistake**: Storing values like HTML DOM elements, class instances, functions, or active WebSockets directly in a `useState` variable.
**Why it is bad**: React state is meant to store data structures representing UI states. Storing non-serializable objects causes memory leaks, breaks time-travel debugging in React DevTools, and triggers unnecessary re-renders.

**The Correction**:
- For **DOM elements**, use `useRef` elements instead of saving them in state.
- For **timers**, **sockets**, or **class instances**, store references in `useRef` so they persist across renders without triggering UI updates.
