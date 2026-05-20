# 📑 React 19 Quick-Reference Cheatsheet

Below is a quick reference comparing React 18 API patterns with React 19 upgrades.

---

## 1. API Mapping Comparison

| Feature | React 18 Pattern | React 19 Upgrade Pattern |
| :--- | :--- | :--- |
| **Context Sharing** | `<MyContext.Provider value={val}>` | `<MyContext value={val}>` |
| **Ref Passing** | `const Child = forwardRef((props, ref) => ...)` | `function Child({ ref, ...props })` |
| **Form Transitions** | `startTransition(() => { triggerFetch() })` | `<form action={asyncAction}>` |
| **Pending Form Status** | Manual `const [loading, setLoading] = useState()` | `const { pending } = useFormStatus()` |
| **Form State Handling** | Manual hook state wiring | `const [state, action, isPending] = useActionState(...)` |
| **Optimistic Updates** | Manual rollbacks inside try/catch blocks | `const [optState, addOpt] = useOptimistic(...)` |
| **Asset Hoisting** | Requires libraries like React Helmet | Built-in `<title>`, `<meta>`, `<link>` hoisting |
| **Performance Hooks** | Manual `useMemo`, `useCallback`, `React.memo` | Automated at build time via the React Compiler |

---

## 2. Copy-Paste Code Templates

### A. The Action Form Template
```jsx
import React, { useActionState } from 'react';

async function formSubmitAction(state, formData) {
  const email = formData.get('email');
  // API logic
  return { success: true, message: `Subscribed ${email}` };
}

export function SubscriptionForm() {
  const [state, action, isPending] = useActionState(formSubmitAction, { success: false });

  return (
    <form action={action}>
      <input name="email" type="email" placeholder="Email Address" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Subscribe'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

### B. Standard Component Ref Template
```jsx
import React from 'react';

// Ref is passed directly as a prop
export function CustomButton({ label, ref, ...props }) {
  return (
    <button ref={ref} className="btn-primary" {...props}>
      {label}
    </button>
  );
}
```
