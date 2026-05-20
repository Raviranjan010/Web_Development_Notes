# ⚡ Error Handling Tricks: Async Propagations and Recovery Resets

## 1. Propagating Async Errors to Error Boundaries (The "State Setter Throw" Trick)

**The Problem**: Error Boundaries cannot catch errors thrown inside asynchronous code blocks (like `fetch` promises, event listeners, or `setInterval`).
**The Trick**: Write a custom hook that returns a state setter function designed to throw immediately during the render phase:

```jsx
import React, { useState, useCallback } from 'react';

// Custom hook to catch async errors in boundaries
export function useAsyncError() {
  const [, setError] = useState(null);

  // Return a callback that accepts an error object and throws it in render scope
  return useCallback((err) => {
    setError(() => {
      throw err; // Throws during the React render phase, where parent boundaries can catch it
    });
  }, []);
}

// Usage inside functional component
export function FetchWidget() {
  const throwError = useAsyncError();

  const handleFetch = () => {
    fetch('/api/broken-endpoint')
      .then(res => res.json())
      .catch((err) => {
        // Pass async error to hook to propagate it to the boundary
        throwError(err);
      });
  };

  return <button onClick={handleFetch}>Load Data</button>;
}
```

---

## 2. Using `react-error-boundary` for Functional Apps

**The Problem**: Writing legacy class components for Error Boundaries is verbose.
**The Trick**: Use the standard `react-error-boundary` library. It wraps class configurations into functional wrapper components, and provides a custom `useErrorBoundary` hook to catch async errors easily:

```jsx
import React from 'react';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

// 1. Fallback UI Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '20px', border: '2px solid red' }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// 2. Component throwing async errors
function DataFeed() {
  const { showBoundary } = useErrorBoundary();

  const loadData = () => {
    fetch('/api/failing-endpoint')
      .then(res => res.json())
      .catch((err) => showBoundary(err)); // Direct hook propagation
  };

  return <button onClick={loadData}>Fetch Data</button>;
}

// 3. Parent configuration
export default function App() {
  const handleReset = () => {
    console.log("Resetting app states...");
  };

  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback} 
      onReset={handleReset}
    >
      <DataFeed />
    </ErrorBoundary>
  );
}
```
*This library simplifies error boundaries and makes handling async errors in functional components clean.*
