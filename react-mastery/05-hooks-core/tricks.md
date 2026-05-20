# ⚡ Core Hooks Tricks: Advanced Hooks Workflows

## 1. The "Previous Value" Pattern with `useRef`

**The Problem**: You need to compare the value of a prop or state variable from the previous render cycle with the value in the current render cycle (e.g. tracking if a user ID changed to trigger animation runs).
**The Trick**: Use a `useRef` to store the active value at the end of the render cycle. Because ref updates do not trigger re-renders, the ref will hold the previous value during the next render:

```jsx
import React, { useState, useEffect, useRef } from 'react';

export default function ProfileHeader({ username }) {
  const prevUsernameRef = useRef('');

  useEffect(() => {
    // Updates value at the end of the render cycle
    prevUsernameRef.current = username;
  }, [username]);

  // Accesses ref during rendering to get previous value
  const previousUsername = prevUsernameRef.current;

  return (
    <div>
      <h3>Current User: {username}</h3>
      {previousUsername && <p>Previous Session: {previousUsername}</p>}
    </div>
  );
}
```

---

## 2. The Ref Cache Pattern (Preventing Re-Registering Event Listeners)

**The Problem**: You have an event listener that reads state. If you add the state to the `useEffect` dependency array, the event listener is removed and re-registered on every keystroke, which is inefficient.
**The Trick**: Store the state value in a mutable ref. Since refs do not trigger re-renders, you can omit the dependency array while maintaining access to the latest state inside the event listener:

```jsx
import React, { useState, useEffect, useRef } from 'react';

export default function ChatInput() {
  const [text, setText] = useState('');
  const textRef = useRef(text);

  // Keep ref synchronized with the state
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    const handleShortcut = (e) => {
      // Reads from ref to avoid stale closures
      if (e.key === 'Enter' && e.ctrlKey) {
        console.log("Submitting latest message draft:", textRef.current);
      }
    };
    
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []); // Empty dependency array! Register once on mount.

  return <textarea value={text} onChange={e => setText(e.target.value)} />;
}
```

---

## 3. Inline Effect Logging for Execution Traces

**The Problem**: Debugging asynchronous loops inside `useEffect` can be confusing. You need to know exactly when setup functions run vs when cleanup functions run.
**The Trick**: Add descriptive log statements in both the setup and cleanup blocks. This reveals if your cleanup function is running correctly when dependencies change:

```javascript
useEffect(() => {
  console.log(`[EFFECT SETUP] Initializing subscription for ID: ${id}`);

  const socket = mockConnect(id);

  return () => {
    console.log(`[EFFECT CLEANUP] Closing subscription for ID: ${id}`);
    socket.close();
  };
}, [id]);
```
*Console output when ID changes from 1 to 2:*
1. `[EFFECT SETUP] Initializing subscription for ID: 1`
2. `[EFFECT CLEANUP] Closing subscription for ID: 1`
3. `[EFFECT SETUP] Initializing subscription for ID: 2`

---

## 4. The Extraction Signal: When to Extract a Custom Hook

If a component's file structure contains more than 10-15 lines of raw `useEffect` logic handling external subscriptions, it is a signal to extract that logic into a custom hook. 

- **Before Extraction**: Component is cluttered with state declarations, cleanup returns, and fetch calls.
- **After Extraction**: Component calls a single custom hook, keeping the codebase clean and maintainable.
  ```jsx
  // Simple component view
  const { data, loading } = useFetch(`/api/users/${id}`);
  ```
