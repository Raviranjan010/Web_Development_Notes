# 🚫 Routing Avoids: SPA Navigation and Structure Mistakes

## 1. Using Standard Anchor (`<a>`) Tags for Internal Navigation

**The Mistake**: Using standard HTML anchor tags (`<a href="/profile">`) to navigate between routes.
**Why it is bad**: Anchor tags bypass React Router's routing logic. The browser is forced to perform a full page reload, requesting a new HTML document from the server. This destroys all in-memory React state, terminates pending network requests, and degrades performance.

### ❌ Bad Code
```jsx
// ❌ DANGER: Clicking this link forces a full page refresh, destroying state
import React from 'react';

export default function SidebarNavigation() {
  return (
    <aside>
      <a href="/dashboard">Dashboard</a>
      <a href="/profile">Profile Settings</a>
    </aside>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Use the Link component to update the URL client-side
import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarNavigation() {
  return (
    <aside>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile Settings</Link>
    </aside>
  );
}
```

---

## 2. Omitting a Catch-All Route (404 Page)

**The Mistake**: Failing to declare a catch-all (`*`) route mapping to a 404 page.
**Why it is bad**: If a user visits an invalid URL, the router fails to find a match, resulting in a blank page. The user is left confused, assuming the application crashed.

### ❌ Bad Code
```jsx
// ❌ If a user types '/unknown-path', they get a blank page
import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* ❌ Missing catch-all fallback */}
    </Routes>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Add a catch-all route mapping to a 404 page
import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* Catch-all route maps any unrouted path to a 404 view */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function PageNotFound() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
```

---

## 3. Hardcoding Absolute URLs in Nested Layout Paths

**The Mistake**: Writing absolute paths (e.g. `to="/dashboard/profile"`) inside nested layout buttons instead of using relative paths.
**Why it is bad**: It couples child navigation components to their parents. If you rename the parent route's path (e.g., changing `/dashboard` to `/panel`), you have to search and replace every absolute link reference inside the child components.

### ❌ Bad Code
```jsx
// ❌ Rigid links: Renaming parent '/dashboard' path breaks these route matches
import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div>
      <aside>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/billing">Billing</Link>
      </aside>
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Use relative paths (automatically appends path to parent)
import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div>
      <aside>
        {/* React Router appends settings to the active parent path */}
        <Link to="settings">Settings</Link>
        <Link to="billing">Billing</Link>
      </aside>
    </div>
  );
}
```
