# ⚡ SSR & Hydration Tricks: Client-Only rendering and Warning suppression

## 1. The Client-Only Wrapper Component Pattern

**The Problem**: You have a component (like a third-party chat widget or canvas animator) that relies heavily on browser APIs. Trying to render it on the server causes compilation crashes.
**The Trick**: Create a `<ClientOnly>` wrapper component that uses a boolean state updated inside `useEffect` to ensure the child component is rendered only on the client side:

```jsx
import React, { useState, useEffect } from 'react';

// Wrapper component to isolate client-only rendering
export function ClientOnly({ children, fallback = null }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Executes only in browser scope after hydration mount
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return fallback; // Render server-safe loading fallback
  }

  return <>{children}</>;
}

// Usage inside SSR pages:
// <ClientOnly fallback={<div>Loading WebGL Canvas...</div>}>
//   <HeavyWebGLCanvas /> {/* Safe: Will never compile on the server */}
// </ClientOnly>
```

---

## 2. Resolving Minor Mismatches with `suppressHydrationWarning`

**The Problem**: You must render a timestamp (like a comment post time) on the server, but it will inevitably mismatch the client time slightly, triggering warning logs in the console.
**The Trick**: Use the **`suppressHydrationWarning`** attribute. This tells React to ignore minor text differences on that specific element during hydration without disabling mismatch checks for the rest of the application:

```jsx
import React from 'react';

export default function TimeCard() {
  const postDate = new Date().toLocaleDateString();

  return (
    <div>
      <h4>Article Posted:</h4>
      {/* 
        ✅ TRICK: React ignores mismatches on this tag.
        Only use on text values that are expected to change (like dates).
      */}
      <p suppressHydrationWarning>
        {postDate}
      </p>
    </div>
  );
}
```
*Note: `suppressHydrationWarning` only works one level deep, so it must be applied directly to the tag containing the text.*

---

## 3. Disabling Server-Side Rendering via Dynamic Imports

**The Problem**: You are using Next.js and want to load a heavy component without rendering it on the server.
**The Trick**: Use Next.js's built-in dynamic import with the **`ssr: false`** configuration option:

```jsx
import dynamic from 'next/dynamic';

// Import component dynamically and disable server rendering
const HeavyChart = dynamic(
  () => import('./HeavyChart'),
  { ssr: false, loading: () => <p>Loading chart module...</p> }
);

export default function Dashboard() {
  return (
    <div>
      <h3>Admin Dashboard</h3>
      {/* HeavyChart is loaded and rendered only in the browser */}
      <HeavyChart />
    </div>
  );
}
```
