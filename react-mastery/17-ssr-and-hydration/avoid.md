# 🚫 SSR & Hydration Avoids: Mismatch Warnings and Browser API Leaks

## 1. Accessing Browser-Only APIs Directly During Rendering

**The Mistake**: Calling browser-specific global variables like `window`, `document`, or `localStorage` directly in your component's render execution path.
**Why it is bad**: During server-side rendering, Node.js executes your component code. Because Node.js lacks browser globals, accessing `window` throws a reference error, causing the server build to crash. If wrapped in check conditions, it returns `undefined` on the server but values on the client, triggering a hydration mismatch error.

### ❌ Bad Code
```jsx
// ❌ SERVER CRASH / HYDRATION MISMATCH: window does not exist on Node.js servers
import React from 'react';

export default function SizeTracker() {
  // ❌ WRONG: Reading window dimensions directly in render scope
  const width = window.innerWidth;

  return <div>Viewport Width: {width}px</div>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Defer browser queries to useEffect (runs on client only after paint)
import React, { useState, useEffect } from 'react';

export default function SizeTracker() {
  const [width, setWidth] = useState(0); // Safe fallback default

  useEffect(() => {
    // Safe: useEffect executes only in browser environments after hydration
    setWidth(window.innerWidth);
  }, []);

  return <div>Viewport Width: {width ? `${width}px` : 'Calculating...'}</div>;
}
```

---

## 2. Rendering Dynamic Variables Directly (Dates and Random Numbers)

**The Mistake**: Rendering dynamic outputs like `new Date()` or `Math.random()` directly in your JSX.
**Why it is bad**: The server renders the HTML string at one time (e.g. `10:00:00 AM`). The client executes the hydration check seconds later (e.g. `10:00:02 AM`). React detects a mismatch between the server string and the client string, throwing a hydration mismatch warning.

### ❌ Bad Code
```jsx
// ❌ HYDRATION MISMATCH: Dates differ between server paint and client hydration tick
import React from 'react';

export default function ServerClock() {
  // ❌ WRONG: Dynamic timestamp renders different strings on server vs client
  const currentTime = new Date().toLocaleTimeString();

  return <div>Current Time: {currentTime}</div>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Initialize state with fallback and update on mount
import React, { useState, useEffect } from 'react';

export default function ServerClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Set time after mounting on the client to avoid hydration mismatch
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <div>Current Time: {time || 'Loading Clock...'}</div>;
}
```

---

## 3. Nesting Invalid HTML Elements

**The Mistake**: Writing nested HTML tags that violate standard browser HTML specifications (such as placing a block-level `<div>` or `<ul>` inside an inline `<p>` tag).
**Why it is bad**: When a browser parses invalid nested HTML, it automatically modifies the DOM tree to correct the structure (e.g., closing the `<p>` early and shifting the `<div>` outside). React expects the DOM to match its Virtual DOM structure exactly. This automatic browser correction leads to a hydration mismatch.

### ❌ Bad Code
```jsx
// ❌ HYDRATION MISMATCH: Div nested inside paragraph is parsed out by the browser
export default function InfoCard() {
  return (
    <p>
      {/* ❌ WRONG: Block elements are not allowed inside paragraph tags */}
      <div>Detailed description text block</div>
    </p>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Use proper block elements
export default function InfoCard() {
  return (
    <div>
      <div>Detailed description text block</div>
    </div>
  );
}
```
