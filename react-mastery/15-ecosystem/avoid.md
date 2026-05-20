# 🚫 Ecosystem Avoids: Tooling Deprecations and Fetching Mistakes

## 1. Initializing New Projects with Create React App (CRA)

**The Mistake**: Running `npx create-react-app my-app` to set up a new React project.
**Why it is bad**: Create React App is officially deprecated by the React team. It relies on Webpack configurations that are no longer actively maintained. As your project grows, hot-reloading (HMR) and production builds will become slow.

**The Correction**:
- For standard single-page applications, initialize projects using Vite: `npm create vite@latest`.
- For full-stack applications with server rendering, use Next.js: `npx create-next-app@latest`.

---

## 2. Using Raw `useEffect` Blocks for Heavy API Fetching

**The Mistake**: Manually writing `fetch` calls, loading indicators, and error variables inside local component `useEffect` hooks across your entire application.
**Why it is bad**: This approach duplicates boilerplate code. It lacks automatic query caching, background data refetching, request deduplication, and retry logic. If two components on the same page request the same API endpoint, they will make two separate network requests.

### ❌ Bad Code
```jsx
// ❌ Repetitive data fetching code that lacks caching and background updates
import React, { useState, useEffect } from 'react';

export default function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []); // ❌ No global caching or request deduplication

  if (loading) return <p>Loading...</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Use TanStack Query to manage query states and caching automatically
import React from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchUsers() {
  const res = await fetch('/api/users');
  return res.json();
}

export default function UserList() {
  // TanStack Query handles caching, deduplication, and loading states automatically
  const { data, isLoading } = useQuery({ 
    queryKey: ['users'], 
    queryFn: fetchUsers 
  });

  if (isLoading) return <p>Loading...</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

## 3. Importing Heavy Third-Party Component Libraries Synchronously

**The Mistake**: Importing large third-party components (e.g. rich text editors or chart visualizers) at the top of your files, even when they are only rendered conditionally (e.g., inside a collapsed modal).
**Why it is bad**: Synchronous imports bundle the heavy library code into your main application bundle. This increases the bundle size and delays the initial page load, even if the user never opens the modal.

### ❌ Bad Code
```jsx
// ❌ Heavy library is bundled into the main page bundle, slowing down initial load
import React, { useState } from 'react';
import HeavyEditorComponent from 'large-markdown-editor'; // ❌ Synchronous import

export default function CommentPanel() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <button onClick={() => setShowEditor(true)}>Write Comment</button>
      {showEditor && <HeavyEditorComponent />}
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Lazy load heavy components dynamically only when they are needed
import React, { useState, Suspense, lazy } from 'react';

// ✅ Component code is split into a separate chunk loaded on demand
const HeavyEditorComponent = lazy(() => import('large-markdown-editor'));

export default function CommentPanel() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <button onClick={() => setShowEditor(true)}>Write Comment</button>
      {showEditor && (
        <Suspense fallback={<div>Loading editor...</div>}>
          <HeavyEditorComponent />
        </Suspense>
      )}
    </div>
  );
}
```
