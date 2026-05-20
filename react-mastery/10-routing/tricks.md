# ⚡ Routing Tricks: Advanced Navigation Workflows

## 1. Dynamic Document Title Syncing on Route Changes

**The Problem**: In a Single Page Application, navigating to a new route updates the UI but does not update the browser tab's title automatically.
**The Trick**: Create a simple effect that updates `document.title` on mount inside each page component, or build a hook that syncs the title based on route changes:

```jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Custom hook to update document title
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | MyApp`;
  }, [title]);
}

// Usage inside a page component
export function AnalyticsPage() {
  useDocumentTitle('System Analytics');

  return <div>Analytics Dashboard Content</div>;
}
```

---

## 2. Relative Navigation Shortcuts (Going Back and Up)

**The Problem**: You need a cancel button that returns to the parent dashboard, but hardcoding the parent URL makes the component less reusable.
**The Trick**: Use relative path shortcuts. Pass numbers to `navigate` to traverse the history stack, or pass path strings without slashes to navigate relative to the active URL:

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetailPanel() {
  const navigate = useNavigate();

  return (
    <div>
      <h4>Configuration Details</h4>
      
      {/* Trick A: Go back exactly one step in the browser history stack */}
      <button onClick={() => navigate(-1)}>
        Go Back
      </button>

      {/* Trick B: Go up one level in the route hierarchy relative to current location */}
      <button onClick={() => navigate('..', { relative: 'path' })}>
        Cancel and Close
      </button>
    </div>
  );
}
```

---

## 3. The Query Parameters Parser helper

**The Problem**: Extracting and updating query parameters (e.g. `?search=react&sort=desc`) can be tedious.
**The Trick**: Use the standard `useSearchParams` hook. It returns a URL-search-parameter object along with a setter function to update search params dynamically without reloading the page:

```jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchResultsList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get active query parameter (defaults to empty string if missing)
  const searchQuery = searchParams.get('q') || '';
  const sortDirection = searchParams.get('sort') || 'asc';

  const handleSearchChange = (e) => {
    // Update query params without reloading the page
    setSearchParams({ q: e.target.value, sort: sortDirection });
  };

  const toggleSort = () => {
    const nextSort = sortDirection === 'asc' ? 'desc' : 'asc';
    setSearchParams({ q: searchQuery, sort: nextSort });
  };

  return (
    <div>
      <input value={searchQuery} onChange={handleSearchChange} placeholder="Search..." />
      <button onClick={toggleSort}>Sort order: {sortDirection}</button>
    </div>
  );
}
```
*useSearchParams syncs search states with the URL, allowing users to bookmark search queries and share links.*
