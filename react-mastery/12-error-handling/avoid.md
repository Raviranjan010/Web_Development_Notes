# 🚫 Error Handling Avoids: Catch Boundaries and Async Pitfalls

## 1. Assuming `try/catch` Blocks Catch Render Errors

**The Mistake**: Wrapping JSX elements inside a JavaScript `try/catch` block to handle layout crashes.
**Why it is bad**: JSX is compiled to description objects (the Virtual DOM), not actual DOM nodes. The actual rendering execution happens asynchronously inside React's reconciler loop, far outside the scope of your local component's `try/catch` block. The try block executes successfully, returning the Virtual DOM object, but the crash occurs later during the render phase, bypassing the catch block.

### ❌ Bad Code
```jsx
// ❌ CRASH: The try/catch block is useless here. The crash happens during React's render phase.
import React from 'react';

function BrokenPanel() {
  throw new Error('Crash!');
}

export default function App() {
  try {
    // ❌ WRONG: try/catch cannot catch rendering errors inside child JSX
    return <BrokenPanel />;
  } catch (e) {
    return <div>Error caught: {e.message}</div>;
  }
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Wrap the component in an Error Boundary class wrapper
import React, { Component } from 'react';

class SimpleErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>An error occurred rendering this section.</div>;
    }
    return this.props.children;
  }
}

function BrokenPanel() {
  throw new Error('Crash!');
}

export default function App() {
  return (
    <SimpleErrorBoundary>
      <BrokenPanel />
    </SimpleErrorBoundary>
  );
}
```

---

## 2. Expecting Error Boundaries to Catch Asynchronous Errors (e.g., fetch, timeouts)

**The Mistake**: Expecting an Error Boundary to automatically catch exceptions thrown inside asynchronous code like `fetch` promises, timers (`setTimeout`), or event handlers.
**Why it is bad**: Error Boundaries only catch errors that occur during the **render phase** of components. Errors thrown in asynchronous callbacks or event handlers occur outside the React render loop, so the Error Boundary never receives them.

### ❌ Bad Code
```jsx
// ❌ CRASH: The Error Boundary will not catch the error thrown in this async fetch promise
import React, { useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

function AsyncWidget() {
  useEffect(() => {
    fetch('/api/corrupt-data')
      .then(res => res.json())
      .then(data => {
        if (data.isCorrupt) {
          // ❌ Async throw is not caught by parent Error Boundaries!
          throw new Error('Corrupt database records!'); 
        }
      });
  }, []);

  return <div>Data Panel</div>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AsyncWidget />
    </ErrorBoundary>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Capture async errors and pass them to React's state setter to trigger render-phase updates
import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

function AsyncWidget() {
  const [error, setError] = useState(null);

  // If we have an async error, throw it during render to let the boundary catch it
  if (error) {
    throw error;
  }

  useEffect(() => {
    fetch('/api/corrupt-data')
      .then(res => res.json())
      .then(data => {
        if (data.isCorrupt) {
          setError(new Error('Corrupt database records!')); // Update state to trigger render throw
        }
      })
      .catch(setError);
  }, []);

  return <div>Data Panel</div>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AsyncWidget />
    </ErrorBoundary>
  );
}
```
*Note: In functional components, you can also use the `showBoundary` hook from the `react-error-boundary` library to propagate async errors to the nearest boundary.*
---

## 3. Not Resetting Error States Before Retrying

**The Mistake**: Providing a "Try Again" recovery button that doesn't reset the local state of the crashing component.
**Why it is bad**: When the user clicks retry, the Error Boundary resets its state and attempts to render the child component again. If the state that caused the crash isn't reset, the child component will crash immediately, trapping the user in an infinite crash loop.

**The Correction**:
- Always reset the state that caused the crash (e.g. clearing search input value or clearing state errors) before or during the boundary recovery click.
