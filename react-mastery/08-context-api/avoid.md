# 🚫 Context API Avoids: Re-render and Optimization Pitfalls

## 1. Passing Inline Non-Memoized Object Literals as Provider Values

**The Mistake**: Writing object literals directly inside the `value` prop of a context provider.
**Why it is bad**: Every time the provider component re-renders (due to any local state update), a new object reference is created in memory. This forces **every consumer** of the context to re-render, even if the values inside the object did not change.

### ❌ Bad Code
```jsx
// ❌ DANGER: A new object is created on every render, causing all children to re-render
import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);

  return (
    // ❌ WRONG: Passing an inline object reference
    <SettingsContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Memoize the provider's value object
import React, { useState, useMemo } from 'react';

export const SettingsContext = React.createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);

  // useMemo ensures the reference remains stable across renders
  const providerValue = useMemo(() => ({
    theme, setTheme, fontSize, setFontSize
  }), [theme, fontSize]); // Only updates if these variables change

  return (
    <SettingsContext.Provider value={providerValue}>
      {children}
    </SettingsContext.Provider>
  );
}
```

---

## 2. Using Context for High-Frequency Volatile Updates

**The Mistake**: Using the Context API to manage fast, continuous updates like mouse coordinates, animations, game loops, or input fields.
**Why it is bad**: React Context lacks selector-based rendering out of the box. Every consumer of the context is forced to re-render on every state change. High-frequency updates will cause noticeable lag and performance issues.

**The Correction**:
- For high-frequency state updates, use local state (`useState` colocated inside the component), refs (`useRef`), or global state libraries that support selectors (like Zustand or Redux) to prevent unnecessary re-renders.

---

## 3. Forgetting Default Fallback Values in `createContext`

**The Mistake**: Declaring contexts without default values (e.g. `createContext()`).
**Why it is bad**: If a developer mounts a component that consumes the context outside of its Provider wrapper during testing or refactoring, `useContext` returns `undefined`. This causes the application to crash.

### ❌ Bad Code
```jsx
// ❌ If UserCard is mounted outside its provider, the app crashes with TypeError
import React, { createContext, useContext } from 'react';

const UserContext = createContext(); // Defaults to undefined

export function UserCard() {
  const user = useContext(UserContext);
  return <p>Username: {user.name}</p>; // ❌ Crash: Cannot read properties of undefined (reading 'name')
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Provide a sensible default fallback object
import React, { createContext, useContext } from 'react';

const UserContext = createContext({
  name: 'Guest User',
  role: 'Guest'
});

export function UserCard() {
  const user = useContext(UserContext);
  return <p>Username: {user.name}</p>; // ✅ Renders 'Guest User' if outside a provider
}
```
*Tip: Look at the Custom useContext hook pattern in the tricks file to learn how to throw helpful development errors for missing provider contexts.*
