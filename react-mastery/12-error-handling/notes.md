# 🚨 Error Handling: Boundaries, Fallbacks, and Recovery Systems

## 1. What Are Error Boundaries?

By default, if a JavaScript error is thrown inside a React component during rendering, React unmounts the entire component tree from the DOM. This leaves the user with a blank white screen, rendering the application unusable.

An **Error Boundary** is a specialized React component that catches JavaScript errors anywhere in its child component tree, logs those errors to an analytics service, and displays a fallback UI instead of crashing the entire page.

```
       ERROR BOUNDARY ZONES IN DOM
       ┌────────────────────────┐
       │   GlobalErrorBoundary  │
       │   ┌────────────────┐   │
       │   │  HeaderBar     │   │
       │   └────────────────┘   │
       │   ┌────────────────┐   │
       │   │ WidgetsBoundary│   │
       │   │ ┌────────────┐ │   │
       │   │ │Widget (🔥) │◄────┼── Error caught here, widget unmounts
       │   │ └────────────┘ │   │   but HeaderBar remains interactive!
       │   └────────────────┘   │
       └────────────────────────┘
```

---

## 2. Why Error Boundaries Must Be Class Components

React does not have a functional hook equivalent for error boundary lifecycles yet. To catch errors, you must use a class component that defines one or both of these lifecycle methods:

- **`static getDerivedStateFromError(error)`**: A static method that returns the state to update when an error occurs, triggering a re-render to display the fallback UI. It runs during the **render phase**, so no side effects are allowed here.
- **`componentDidCatch(error, info)`**: A lifecycle method used to run side-effects (like logging the error stack trace to an external service like Sentry or LogRocket). It runs during the **commit phase**.

---

## 3. Comparison: Global vs Local Error Boundaries

| Criteria | Global Error Boundary | Local (Granular) Error Boundary |
| :--- | :--- | :--- |
| **Placement** | Wraps the entire `<App />` component | Wraps isolated widgets (like a Sidebar or Feed Card) |
| **Fallback UI** | Full-page 500 server error screen | Small widget alert box ("Failed to load chart") |
| **App Behavior** | The entire app unmounts on error | Rest of the app remains fully functional |
| **Recovery** | Hard refresh required | "Try Again" button resets local widget state |

---

## 4. Real-World Project: Log-Reporting Error Boundary

Below is a complete implementation of a robust Error Boundary component that logs errors to an API endpoint and provides a "Try Again" recovery button.

```jsx
import React, { Component } from 'react';

// Class Error Boundary Component
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  // 1. Catches error and updates state to show fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 2. Catches error and runs side-effects (e.g. logging to server)
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Simulate logging to an API endpoint
    fetch('/api/logs/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      })
    }).catch(err => console.warn("Failed to submit error report:", err));
  }

  // 3. Reset state to allow recovery tries
  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div style={{ padding: '20px', border: '1px solid red', backgroundColor: '#fff5f5', borderRadius: '6px', fontFamily: 'sans-serif' }}>
          <h4>Something went wrong.</h4>
          <p style={{ fontSize: '13px', color: '#555' }}>
            {this.state.error?.message || "An unexpected rendering error occurred."}
          </p>
          <button 
            onClick={this.handleReset}
            style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 5. Example usage wrapping a broken child component
function BrokenWidget() {
  const [shouldCrash, setShouldCrash] = React.useState(false);

  if (shouldCrash) {
    throw new Error("Simulated critical rendering crash!");
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>Analytics Widget</h3>
      <button onClick={() => setShouldCrash(true)}>Force Crash</button>
    </div>
  );
}

export default function ErrorHandlingShowcase() {
  return (
    <div style={{ maxWidth: '400px', margin: '30px auto' }}>
      <ErrorBoundary>
        <BrokenWidget />
      </ErrorBoundary>
    </div>
  );
}
```
