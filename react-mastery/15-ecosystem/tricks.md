# ⚡ Ecosystem Tricks: Fetch Clients and Dynamic Tailwind Styles

## 1. Setting Up Global Defaults in TanStack Query (React Query)

**The Problem**: By default, TanStack Query considers fetched data "stale" immediately (staleTime: 0), meaning it refetches queries in the background whenever the browser window is refocused. This can cause unnecessary network traffic.
**The Trick**: Configure global default options on the `QueryClient` instance to set a default `staleTime` and disable window refocus refetching where appropriate:

```jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Configure global defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes (prevents spam refetches)
      refetchOnWindowFocus: false, // Disable automatic background refetching on window focus
      retry: 1, // Retry failed network requests only once before showing error UI
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardView />
    </QueryClientProvider>
  );
}
```

---

## 2. Preventing Tailwind CSS from Purging Dynamic Classes

**The Problem**: You want to change an element's background color dynamically based on a state value using a string template: `className={\`bg-\${statusColor}-500\`}`. However, Tailwind uses static analysis at build time to scan for class names. Because the class name isn't written out fully, Tailwind's purge engine omits it, causing the styles to fail in production.
**The Trick**: Avoid dynamic string templates for Tailwind classes. Instead, map state keys to complete, fully-written Tailwind class names:

```jsx
import React, { useState } from 'react';

// ❌ BAD: Tailwind cannot detect these classes, and will purge them from the production build
// const statusColor = 'red';
// const className = `bg-${statusColor}-500`;

// ✅ CORRECT: Map states to fully-written, static class strings
const ALERT_THEMES = {
  success: 'bg-green-500 text-white border-green-700',
  warning: 'bg-yellow-500 text-black border-yellow-700',
  error: 'bg-red-500 text-white border-red-700'
};

export default function AlertBanner({ status = 'success' }) {
  // Resolve class names statically from the configuration map
  const activeClass = ALERT_THEMES[status] || ALERT_THEMES.success;

  return (
    <div className={`p-4 border rounded ${activeClass}`}>
      Alert Notification Banner
    </div>
  );
}
```
*Writing full class names ensures Tailwind's build engine registers and retains them in the compiled CSS bundle.*
