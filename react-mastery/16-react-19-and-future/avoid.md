# 🚫 React 19 Avoids: Action Pitfalls and API Misuses

## 1. Wrapping the `use(promise)` API Inside Standard `try/catch` Blocks

**The Mistake**: Wrapping a promise lookup using the `use` hook inside a traditional `try/catch` block to handle network errors.
**Why it is bad**: React's Suspense engine works by throwing a Promise to trigger rendering suspension. If you wrap the `use()` function in a `try/catch` block, the catch block intercepts the thrown promise, preventing Suspense from catching it and causing rendering to fail.

### ❌ Bad Code
```jsx
// ❌ CRASH: Catch block intercepts the Suspense promise, breaking the render cycle
import React, { use } from 'react';

export default function UserDisplay({ userPromise }) {
  try {
    // ❌ WRONG: use() throws a promise to trigger Suspense. The catch block catches this promise!
    const user = use(userPromise);
    return <div>Username: {user.name}</div>;
  } catch (error) {
    return <div>Error loading user details: {error.message}</div>;
  }
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Handle errors using an Error Boundary wrapper component
import React, { use, Suspense } from 'react';
import { ErrorBoundary } from '../12-error-handling/notes';

function UserDisplay({ userPromise }) {
  // Safe: Promise bubbles up to the nearest Suspense wrapper
  const user = use(userPromise);
  return <div>Username: {user.name}</div>;
}

export default function App({ userPromise }) {
  return (
    <ErrorBoundary fallback={<div>Failed to load user info.</div>}>
      <Suspense fallback={<div>Loading user profile...</div>}>
        <UserDisplay userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## 2. Continuing to Wrap Components in Legacy `forwardRef` Wrappers

**The Mistake**: Writing standard components wrapping DOM elements using `React.forwardRef`.
**Why it is bad**: In React 19, `forwardRef` is deprecated. React passes refs as standard props, meaning you can access them directly from the function argument. Continuing to use `forwardRef` adds unnecessary boilerplate and increases bundle size.

### ❌ Bad Code
```jsx
// ❌ Legacy, verbose forwardRef syntax
import React, { forwardRef } from 'react';

export const CustomInput = forwardRef((props, ref) => {
  return (
    <label>
      {props.label}
      <input ref={ref} {...props} />
    </label>
  );
});
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Receive ref directly as a normal prop argument
import React from 'react';

export function CustomInput({ label, ref, ...props }) {
  return (
    <label>
      {label}
      <input ref={ref} {...props} />
    </label>
  );
}
```

---

## 3. Manually Writing `useMemo` and `useCallback` when using the React Compiler

**The Mistake**: Manually writing memoization hooks in projects where the new React Compiler (React Forget) is active.
**Why it is bad**: The React Compiler analyzes your code and applies dynamic memoization automatically at build time. Manually writing `useMemo` or `useCallback` adds visual noise, clutter, and extra reference checks without providing any performance benefits.

**The Correction**:
- Trust the compiler. Write standard, readable JavaScript functions and variables. Let the compiler handle performance optimizations at build time, and reserve manual optimizations only for complex edge cases.
