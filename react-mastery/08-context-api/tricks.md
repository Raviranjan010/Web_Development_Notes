# ⚡ Context API Tricks: Context Splitting and Consumer Guards

## 1. The Custom Consumer Hook Guard (Debugging Lifesaver)

**The Problem**: Consuming a context outside its provider returns `undefined`, which can lead to confusing errors like `Cannot read properties of undefined (reading 'xyz')`.
**The Trick**: Instead of calling `useContext` directly inside your components, wrap it in a custom hook. This hook checks if the value is `undefined` (or a default fallback) and throws a descriptive error to pinpoint the issue:

```jsx
import React, { createContext, useContext, useState } from 'react';

// Create context, initially set to null
const UserStateContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Bob' });
  return <UserStateContext.Provider value={user}>{children}</UserStateContext.Provider>;
}

// Custom hook to consume the context
export function useUser() {
  const context = useContext(UserStateContext);
  
  // Guard clause throws a helpful error during development
  if (context === null) {
    throw new Error('useUser must be consumed within a <UserProvider> wrapper.');
  }
  
  return context;
}

// Usage inside components
// const user = useUser(); // Safe to use, will throw a clear error if misconfigured
```

---

## 2. The Context Splitting Pattern (Performance Tuning)

**The Problem**: You have a context that changes frequently (e.g. a counter or cart). Components that only dispatch actions (like an increment button) are forced to re-render whenever the state value updates.
**The Trick**: Split the context into two: one for the state value, and one for the dispatch actions. This allows components to consume only what they need:

```jsx
import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Declare two separate contexts
const CounterStateContext = createContext();
const CounterDispatchContext = createContext();

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);

  // Memoize actions to keep their references stable
  const dispatchValue = useMemo(() => ({ increment }), []);

  return (
    <CounterStateContext.Provider value={count}>
      <CounterDispatchContext.Provider value={dispatchValue}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}

// 2. Custom hooks to consume each context separately
export function useCounterState() {
  const context = useContext(CounterStateContext);
  if (context === undefined) throw new Error('Must be used within CounterProvider');
  return context;
}

export function useCounterDispatch() {
  const context = useContext(CounterDispatchContext);
  if (context === undefined) throw new Error('Must be used within CounterProvider');
  return context;
}

// 3. Components consume only what they need
function CounterValueDisplay() {
  const count = useCounterState();
  return <h1>Value: {count}</h1>; // Re-renders when count changes
}

function IncrementButton() {
  const { increment } = useCounterDispatch();
  return <button onClick={increment}>Add</button>; // Never re-renders when count changes
}
```
*By splitting the contexts, `IncrementButton` stays optimized and does not re-render when the counter increments.*
