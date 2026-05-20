# 🚫 Performance Avoids: Premature Optimization and Prop Instability

## 1. Premature Optimization (Wrapping Everything in `useMemo` and `useCallback`)

**The Mistake**: Wrapping every single variable and function inside `useMemo` or `useCallback` by default.
**Why it is bad**: Memoization is not free. Both hooks add memory and execution overhead because React has to store the dependency array and perform reference comparisons on every render cycle. For simple operations (like basic string concat or minor array mapping), the cost of React running these dependency checks is higher than simply recreating the variable or function.

### ❌ Bad Code
```jsx
// ❌ DANGER: Waste of resource overhead. Memoizing simple numbers or array methods adds unnecessary work.
import React, { useMemo, useCallback } from 'react';

export default function BasicDetails({ username, score }) {
  // ❌ PREMATURE: Simple calculations do not need useMemo
  const upperUsername = useMemo(() => username.toUpperCase(), [username]);

  // ❌ PREMATURE: inline callback does not need memoization unless passed to a memoized child
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return <button onClick={handleClick}>{upperUsername} Score: {score}</button>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Keep it simple. Re-declare inline values unless you prove they are slow.
import React from 'react';

export default function BasicDetails({ username, score }) {
  const upperUsername = username.toUpperCase();
  const handleClick = () => console.log("Button clicked!");

  return <button onClick={handleClick}>{upperUsername} Score: {score}</button>;
}
```

---

## 2. Inlining Objects or Arrow Functions Passed to Memoized Children

**The Mistake**: Wrapping a child component in `React.memo` but passing inline objects or functions to its props.
**Why it is bad**: Because javascript compares objects and functions by reference, inline objects/functions are recreated on every parent render cycle, changing their memory address. This causes `React.memo`'s shallow comparison check to fail, forcing the child component to re-render anyway, rendering the memoization useless.

### ❌ Bad Code
```jsx
// ❌ React.memo fails. The inline style object and onClick handler change references on every render.
import React, { useState } from 'react';

const HeavyDisplay = React.memo(({ style, onTrigger }) => {
  return <div style={style} onClick={onTrigger}>Display Node</div>;
});

export default function ParentPanel() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Clicks: {count}</button>
      {/* ❌ Inlined style object and arrow function break memoization */}
      <HeavyDisplay 
        style={{ color: 'red', border: '1px solid black' }} 
        onTrigger={() => console.log('Triggered!')} 
      />
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Extract objects and callbacks to maintain stable references
import React, { useState, useCallback } from 'react';

const HeavyDisplay = React.memo(({ style, onTrigger }) => {
  return <div style={style} onClick={onTrigger}>Display Node</div>;
});

// ✅ Stabilize object references by declaring them outside the component
const displayStyles = { color: 'red', border: '1px solid black' };

export default function ParentPanel() {
  const [count, setCount] = useState(0);

  // ✅ Memoize callbacks to maintain stable references across renders
  const handleTrigger = useCallback(() => {
    console.log('Triggered!');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Clicks: {count}</button>
      <HeavyDisplay 
        style={displayStyles} 
        onTrigger={handleTrigger} 
      />
    </div>
  );
}
```
