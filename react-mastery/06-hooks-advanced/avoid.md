# 🚫 Advanced Hooks Avoids: Concurrent and Hook Design Pitfalls

## 1. Misusing `useLayoutEffect` (Blocking Paint Render)

**The Mistake**: Running API data fetches, analytics tracking, or state changes inside a `useLayoutEffect` block.
**Why it is bad**: `useLayoutEffect` blocks browser paint rendering. The browser main thread is halted until the layout code completes. Using it for expensive, non-visual operations like network requests results in slower page loads and unresponsive user interfaces.

### ❌ Bad Code
```jsx
// ❌ DANGER: Blocks user display while fetching remote profile details
import React, { useLayoutEffect, useState } from 'react';

export default function UserCard({ id }) {
  const [profile, setProfile] = useState(null);

  useLayoutEffect(() => {
    // ❌ WRONG: Non-visual data fetches should run asynchronously inside useEffect
    fetch(`/api/profile/${id}`)
      .then(res => res.json())
      .then(setProfile);
  }, [id]);

  return <div>{profile?.name}</div>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Runs asynchronously in useEffect, allowing the browser to paint loading screens
import React, { useEffect, useState } from 'react';

export default function UserCard({ id }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`/api/profile/${id}`)
      .then(res => res.json())
      .then(setProfile);
  }, [id]);

  return <div>{profile ? profile.name : 'Loading Profile...'}</div>;
}
```

---

## 2. Returning Large Destructured Arrays from Custom Hooks

**The Mistake**: Returning a destructured array containing four or more elements from a custom hook.
**Why it is bad**: Unlike objects where property names can be ignored or renamed during destructuring, array destructuring is positional. The consumer is forced to keep track of the exact positions of elements, and cannot easily omit intermediate values.

### ❌ Bad Code
```jsx
// ❌ Position-dependent return array makes this hook fragile
export function useUserSession() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logout = () => setUser(null);

  // ❌ Positional array returns force strict naming positions
  return [user, loading, error, logout];
}

// Consumer
// const [user, , error] = useUserSession(); // Confusing double commas to skip loading
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Return an object with named properties.
export function useUserSession() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logout = () => setUser(null);

  return { user, loading, error, logout };
}

// Consumer
// const { user, error } = useUserSession(); // Omit and import only what is required
```

---

## 3. Using `useTransition` to Wrap Urgent State Updates

**The Mistake**: Wrapping urgent inputs (like input fields or toggles) inside the `startTransition` callback.
**Why it is bad**: The UI will feel laggy. `startTransition` schedules updates at a lower priority, meaning the browser prioritizes other tasks first, resulting in delayed visual feedback.

### ❌ Bad Code
```jsx
// ❌ Laggy UI: Input typing freezes or stutters because text updates are deferred
import React, { useState, useTransition } from 'react';

export default function DelayedInput() {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    // ❌ WRONG: Typing is an urgent action. Users expect instant input feedback.
    startTransition(() => {
      setInputValue(e.target.value);
    });
  };

  return <input value={inputValue} onChange={handleChange} />;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Keep typing updates urgent; defer non-urgent computations
import React, { useState, useTransition } from 'react';

export default function OptimizedSearch() {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    // Keep input responsive (urgent update)
    setInputValue(e.target.value);

    // Defer the expensive calculation (non-urgent update)
    startTransition(() => {
      const match = Array.from({ length: 10000 }, (_, i) => `Search Item ${i}`)
        .filter(item => item.includes(e.target.value));
      setResults(match);
    });
  };

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      {isPending && <p>Filtering results...</p>}
    </div>
  );
}
```
