# ⚓ Core Hooks: Lifecycle, Memoization, and DOM References

## 1. The Rules of Hooks (And Why They Exist)

Hooks were introduced in React 16.8 to enable state and lifecycle features inside functional components. To ensure predictable execution, React enforces two strict rules:

1. **Only Call Hooks at the Top Level**: Do not call hooks inside loops, conditional blocks (`if` statements), or nested functions.
2. **Only Call Hooks from React Functions**: Call hooks only from React functional components or custom hooks, not regular JavaScript helper files.

### The Linked List Internals
React does not use key-value maps to track hook state. Internally, React represents hooks as a **singly linked list** of hook cells mapped to the active Fiber node:

```
[Fiber Node] ──► Hook Cell 1 ──► Hook Cell 2 ──► Hook Cell 3
                 (useState)       (useEffect)      (useRef)
```

During rendering, React steps through this linked list in the exact order the hooks are declared. If you put a hook inside a conditional statement:

```javascript
if (isLoggedIn) {
  useEffect(() => { ... }, []); // ❌ Breaks hook order index!
}
```

If `isLoggedIn` becomes `false` on a subsequent render, React skips this cell. Hook Cell 2 is now mapped to Hook Cell 3's slot, shifting all subsequent hook states by one. This causes state desynchronization, memory leaks, and compilation errors.

---

## 2. useEffect: Synchronizing with External Systems

`useEffect` allows you to sync your component with external systems (like WebSockets, browser APIs, timers, or network endpoints). It is not a component lifecycle handler, though it replaces class lifecycle methods.

```jsx
useEffect(setupFunction, dependencyArray);
```

### Dependency Array Behaviors

| Dependency Array Syntax | Trigger Timing | Use Case |
| :--- | :--- | :--- |
| **No Array** (`undefined`) | After **every single render** cycle. | Logging, general debug updates. |
| **Empty Array** (`[]`) | Runs **once** after the initial mount. | Subscriptions, event listeners, API fetches. |
| **With Values** (`[a, b]`) | Runs on mount, and whenever `a` or `b` change reference. | Re-fetching on search keyword change. |

### Cleanup Functions
If the `setupFunction` returns a callback function, React executes this **cleanup function** before running the setup again, and when the component unmounts. This is critical for preventing memory leaks:

```jsx
useEffect(() => {
  const handleScroll = () => console.log(window.scrollY);
  window.addEventListener('scroll', handleScroll);

  // Clean up listener before re-running or on unmount
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Fetching Data Safely with AbortController
Standard `fetch` triggers race conditions if search parameters change rapidly. If Request A is fired first and takes 5 seconds, and Request B is fired second and takes 1 second, Request A will overwrite Request B when it finishes. Use `AbortController` to cancel stale requests:

```jsx
import React, { useState, useEffect } from 'react';

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setLoading(false);
        }
      });

    // Cleanup: cancels fetch request if userId changes before request completes
    return () => controller.abort();
  }, [userId]);

  if (loading) return <div>Loading user profile...</div>;
  return <div><h3>{user?.name}</h3></div>;
}
```

---

## 3. useRef: Persistent References

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument.

```jsx
const myRef = useRef(initialValue);
```

### Two Core Use Cases
1. **Accessing DOM Elements**: Directly referencing HTML nodes for focus, measurements, or canvas operations.
2. **Persisting Values Across Renders**: Storing values that persist across renders without triggering a re-render when modified.

### forwardRef
To pass a DOM reference from a parent down to a custom child component, wrap the child in `forwardRef`:

```jsx
import React, { useRef, forwardRef } from 'react';

// Child component forwarding input node ref
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} className="fancy-input" {...props} />;
});

// Parent component managing focus
export default function InputController() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus(); // Access child input element directly
  };

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input Field</button>
    </div>
  );
}
```

---

## 4. useMemo vs useCallback (Performance Triad)

Both hooks are used to memoize values and prevent redundant calculations or render cascades.

- **`useMemo`**: Memoizes the **result value** of an expensive computation.
- **`useCallback`**: Memoizes the **function reference** itself to prevent reference changes across render cycles.

```jsx
// useMemo: Returns the computed value
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback: Returns the function signature itself
const memoizedCallback = useCallback(() => { doSomething(a) }, [a]);
```

### When Do They Matter?
In JavaScript, functions and objects are compared by reference. Every time a parent component re-renders, all functions declared inside it are recreated, changing their reference addresses. If you pass these functions to children wrapped in `React.memo`, the children will re-render anyway because their props changed references.

```
[Parent Render] ──► Re-creates handleSearch callback (New Reference) ──► Re-renders [React.memo(Child)]
```

Wrapping `handleSearch` in `useCallback` preserves its reference across renders, allowing `React.memo` to skip re-rendering the child component.
