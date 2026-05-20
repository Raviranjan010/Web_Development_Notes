# 🚫 Core Hooks Avoids: Dependency and Call Order Pitfalls

## 1. Calling Hooks Conditionally or Inside Loops

**The Mistake**: Wrapping hooks inside `if` checks, loops, or nesting them in utility functions.
**Why it is bad**: React tracks state by the execution order of hooks. Changing the call order across renders corrupts the internal linked list index, causing state values to bleed into unrelated components.

### ❌ Bad Code
```jsx
// ❌ CRASH: Hook order changes when user logs in/out
import React, { useEffect, useState } from 'react';

export default function ProfileLoader({ isLoggedIn }) {
  if (!isLoggedIn) return <div>Access Denied</div>;

  // ❌ Hook called conditionally! Breaks the internal index queue.
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/profile').then(res => res.json()).then(setData);
  }, []);

  return <div>Welcome, {data?.name}</div>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Hooks are called unconditionally at the top level.
import React, { useEffect, useState } from 'react';

export default function ProfileLoader({ isLoggedIn }) {
  const [data, setData] = useState(null);

  // Hook runs unconditionally; logic checks happen inside the callback
  useEffect(() => {
    if (!isLoggedIn) return;
    
    fetch('/profile')
      .then(res => res.json())
      .then(setData);
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div>Access Denied</div>;
  return <div>Welcome, {data?.name}</div>;
}
```

---

## 2. Using `useEffect` for Data Transformations

**The Mistake**: Synchronizing state via `useEffect` when props or other state variables change.
**Why it is bad**: This causes redundant render cycles. First, React paints the screen. Then it detects the state change, triggers the effect, mutates the state, and runs a second paint cycle. This can be computed synchronously during the render phase or memoized with `useMemo`.

### ❌ Bad Code
```jsx
// ❌ Double renders: Updates list, paints, triggers effect, updates filtered list, paints again
import React, { useState, useEffect } from 'react';

export default function SearchPanel({ items }) {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(
      items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, items]);

  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}
```

### ✅ Good Code
```jsx
// ✅ Clean: Compute values on the fly or memoize them to prevent double renders
import React, { useState, useMemo } from 'react';

export default function SearchPanel({ items }) {
  const [search, setSearch] = useState('');

  // Computed synchronously during render. useMemo caches values if items is large.
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, items]);

  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}
```

---

## 3. Suppressing ESLint Dependency Warnings (`eslint-disable-next-line`)

**The Mistake**: Suppressing lint warnings to avoid updating the dependency array in `useEffect`, `useMemo`, or `useCallback`.
**Why it is bad**: It introduces stale closure bugs. The hook captures references to variables from older render cycles. When executed, it uses outdated values, causing unexpected UI behaviors.

### ❌ Bad Code
```jsx
// ❌ Stale Closure: Increment button uses stale 'step' values because of suppressed linter
import React, { useState, useEffect } from 'react';

export default function Tracker() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') {
        setCount(c => c + step); // Uses stale step value if step changes
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // ❌ Suppressed warning hides stale closure bug!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} />;
}
```

### ✅ Good Code
```jsx
// ✅ Correct: List all outer variables read inside the effect in the dependency array
import React, { useState, useEffect } from 'react';

export default function Tracker() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') {
        setCount(c => c + step);
      }
    };
    window.addEventListener('keydown', handleKey);
    
    // Clean up and re-register listener when step updates to prevent stale references
    return () => window.removeEventListener('keydown', handleKey);
  }, [step]); // Refreshes whenever step updates

  return <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} />;
}
```
*Tip: If you want to run updates without re-registering event listeners, look at the **useRef Ref Cache trick** in the Tricks file.*
