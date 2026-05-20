# ⚡ Effects & Lifecycle Tricks: Advanced Effect Synchronizations

## 1. The "Active Flag" Pattern for Async Fetches

**The Problem**: When triggering asynchronous data fetches on state changes, network speeds can vary. If user selects Tab A, then quickly switches to Tab B, the Tab A request might finish *after* the Tab B request, overwriting the UI with outdated details.
**The Trick**: Use an internal boolean flag (`active` or `ignore`) inside the effect. Setting it to `false` in the cleanup function ensures that late-resolving promises are ignored:

```jsx
import React, { useState, useEffect } from 'react';

export default function TabViewer({ tabCategory }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;

    fetch(`/api/categories/${tabCategory}`)
      .then(res => res.json())
      .then(result => {
        // Only update state if this effect execution is still active
        if (active) {
          setData(result);
        }
      });

    // Cleanup runs when tabCategory changes, disabling the active flag for this request
    return () => {
      active = false;
    };
  }, [tabCategory]);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

---

## 2. Skipping the Initial Mount Render Run

**The Problem**: You want an effect to run only when a dependency changes, but *not* when the component first mounts.
**The Trick**: Use a `useRef` to track whether it is the initial render. Set the ref to `false` on mount and skip the effect's logic:

```jsx
import React, { useState, useEffect, useRef } from 'react';

export default function SettingsToggle() {
  const [toggle, setToggle] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // Skip execution on initial mount
    }

    console.log("Settings changed! Updating remote server configuration...");
    // Save configuration settings to API
  }, [toggle]);

  return (
    <button onClick={() => setToggle(prev => !prev)}>
      Toggle Settings: {toggle ? 'ON' : 'OFF'}
    </button>
  );
}
```

---

## 3. The `useEvent` Custom Pattern (Wrapping Mutable Event Handlers)

**The Problem**: You have an event listener callback that reads state. You want the event listener to use the latest state values without re-registering the listener when state changes.
**The Trick**: Store the event callback inside a mutable ref on every render. This allows you to call the callback from the ref without adding it to the effect's dependency array:

```jsx
import React, { useState, useEffect, useRef } from 'react';

// Custom wrapper to bind functions without changing references
function useEvent(handler) {
  const handlerRef = useRef(handler);
  
  useEffect(() => {
    handlerRef.current = handler;
  });

  return useRef((...args) => {
    return handlerRef.current(...args);
  }).current;
}

export default function CounterKeyLogger() {
  const [count, setCount] = useState(0);

  // useEvent returns a memoized function reference that always reads the latest state
  const logCurrentCount = useEvent(() => {
    console.log("Key pressed. Current count state is:", count);
  });

  useEffect(() => {
    const handleKeyPress = () => {
      logCurrentCount();
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [logCurrentCount]); // Ref never changes, so listener is registered only once

  return <button onClick={() => setCount(c => c + 1)}>Increment Count ({count})</button>;
}
```
*This pattern forms the basis of the official `useEffectEvent` hook currently under development by the React team.*
