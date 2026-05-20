# 🔮 React 19 and Future Features: Actions, Compiler, and the use API

React 19 introduces a shift in how developers handle asynchronous operations, forms, styling assets, and performance memoization.

---

## 1. The Actions API (Async Form States)

In React 18, handling form states during API calls required manually setting state flags for loading, error, and response data. React 19 introduces **Actions**, which automatically manage the lifecycle of asynchronous form submissions.

### The `useActionState` Hook (formerly `useFormState`)
`useActionState` accepts an async submission function (Action) and returns the current form state, a wrapped dispatch function to call inside form elements, and an `isPending` state indicating whether the async action is executing.

```jsx
import React, { useActionState } from 'react';

// Async Action function
async function updateUsernameState(prevState, formData) {
  const newName = formData.get('username');
  try {
    const res = await fetch('/api/profile/update', {
      method: 'POST',
      body: JSON.stringify({ name: newName })
    });
    if (!res.ok) throw new Error('Update failed.');
    return { success: true, message: `Username updated to ${newName}!`, error: null };
  } catch (err) {
    return { success: false, message: null, error: err.message };
  }
}

export default function ProfileUpdater() {
  // useActionState handles pending and response state values automatically
  const [state, formAction, isPending] = useActionState(updateUsernameState, {
    success: false,
    message: null,
    error: null
  });

  return (
    <form action={formAction}>
      <input name="username" placeholder="New username..." required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Update Name'}
      </button>
      {state.message && <p style={{ color: 'green' }}>{state.message}</p>}
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
}
```

### The `useFormStatus` Hook
`useFormStatus` allows nested child components inside form elements to read the status of their parent form (such as whether it is pending) without passing props manually.

```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus(); // Reads pending state of the parent form element
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Save Settings'}
    </button>
  );
}
```

---

## 2. The `use` API (Dynamic Promises and Context)

React 19 introduces the **`use`** API, which can read values from promises or context dynamic structures directly inside rendering blocks (even within conditional checks or loops where hooks are traditionally banned).

### Reading Promises on Render
If you pass a promise from a parent Server Component to a Client Component, you can resolve it dynamically during rendering using `use(promise)`. If the promise is pending, React suspends rendering and displays the nearest `<Suspense>` fallback UI:

```jsx
import React, { use, Suspense } from 'react';

// Client component resolving dynamic fetch promise
function UserDetailsCard({ userPromise }) {
  const user = use(userPromise); // Resolves promise directly on render!
  return <h3>Username: {user.name}</h3>;
}

export default function ProfileDashboard({ fetchPromise }) {
  return (
    <Suspense fallback={<div>Resolving server records...</div>}>
      <UserDetailsCard userPromise={fetchPromise} />
    </Suspense>
  );
}
```

---

## 3. Simplified Ref API (No more `forwardRef`)

In React 19, `forwardRef` is deprecated. **`ref` is now passed as a normal prop** directly to components, making custom wrapper inputs simpler to declare:

```jsx
// React 19: ref is received directly as a standard function argument prop!
export function TextInput({ label, ref, ...props }) {
  return (
    <label>
      {label}
      <input ref={ref} {...props} />
    </label>
  );
}
```

---

## 4. Document Metadata Support

React 19 natively supports managing HTML document metadata (like `<title>`, `<meta>`, and `<link>` stylesheet tags) directly within component files. React automatically hoists these tags to the HTML document `<head>` during render:

```jsx
export function BlogPostPage({ post }) {
  return (
    <article>
      {/* React hoists these elements to the document <head> automatically */}
      <title>{post.title}</title>
      <meta name="description" content={post.summary} />
      <meta name="keywords" content="react, coding, hooks" />

      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </article>
  );
}
```

---

## 5. The React Compiler (React Forget)

Traditionally, developers had to manually optimize renders using `useMemo`, `useCallback`, and `React.memo` to prevent unnecessary child re-renders. 

In React 19, the new **React Compiler** (also known as React Forget) automatically optimizes performance behind the scenes at build time. It analyzes JavaScript code and injects memoization checks automatically, rendering manual `useMemo` and `useCallback` invocations obsolete for most standard components.
