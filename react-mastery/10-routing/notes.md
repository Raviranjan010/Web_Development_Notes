# 🚦 Routing in React: SPA Architecture and Nested Outlets

## 1. Single Page Applications (SPA) vs Multi-Page Applications (MPA)

Traditional websites use **MPA routing**, where every page transition requests a brand new HTML document from the server. React applications use **SPA routing**, where a single HTML document is loaded, and page transitions are handled on the client-side by updating the DOM dynamically.

### Comparisons

| Criteria | Multi-Page Application (MPA) | Single Page Application (SPA) |
| :--- | :--- | :--- |
| **Page Transitions** | Full page refresh (slow, visual flicker) | Dynamic DOM swaps (instant, smooth transitions) |
| **Server Load** | High (server renders HTML for every page) | Low (server sends assets once; client handles renders) |
| **State Retention** | Reset on every page load | Maintained across route transitions |
| **SEO** | Excellent out-of-the-box | Requires hydration (SSR/SSG like Next.js) |

---

## 2. React Router v6 Fundamentals

React Router is the standard routing library for React apps.

### Core Declarative Components
- **`<BrowserRouter>`**: Parent wrapper that syncs the UI with the browser's URL history.
- **`<Routes>`**: Grouping element that selects the best route path match.
- **`<Route>`**: Maps a URL path to a React component.
- **`<Link>`**: Declarative anchor tag replacement that updates URL paths without page refreshes.
- **`<NavLink>`**: A specialized `<Link>` that knows when it is active, useful for styling nav headers.

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* NavLink automatically injects 'active' class when path matches */}
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
        Dashboard
      </NavLink>
    </nav>
  );
}
```

---

## 3. Nested Routes and Layout Outlets

Nested routing allows you to define routes inside other routes, sharing common layout structures (like headers, sidebars, and footers) without repeating layout markup in every page.

```
       NESTED ROUTE LAYOUT IN DOM
       ┌────────────────────────┐
       │     DashboardLayout    │
       │   ┌────────────────┐   │
       │   │    Sidebar     │   │
       │   └────────────────┘   │
       │   ┌────────────────┐   │
       │   │    <Outlet />  │◄──┼── Renders child path:
       │   │ (Child Content)│   │   e.g. /dashboard/analytics
       │   └────────────────┘   │
       └────────────────────────┘
```

### Layout Route Implementation
Use the **`<Outlet>`** component inside a parent route to specify where child routes should render:

```jsx
import { Routes, Route, Outlet, Link } from 'react-router-dom';

// Layout wrapper component
function DashboardLayout() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
      <aside style={{ backgroundColor: '#f4f4f4', padding: '16px' }}>
        <ul>
          <li><Link to="profile">Profile Settings</Link></li>
          <li><Link to="billing">Billing Info</Link></li>
        </ul>
      </aside>
      <main style={{ padding: '20px' }}>
        {/* Child route components render here */}
        <Outlet />
      </main>
    </div>
  );
}

// Router config
export default function AppRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardLayout />}>
        {/* Renders DashboardProfile inside <Outlet /> when URL is /dashboard/profile */}
        <Route path="profile" element={<DashboardProfile />} />
        {/* Renders DashboardBilling inside <Outlet /> when URL is /dashboard/billing */}
        <Route path="billing" element={<DashboardBilling />} />
      </Route>
    </Routes>
  );
}
```

---

## 4. Programmatic Navigation and Route Parameters

### useNavigate Hook
Used to navigate programmatically inside javascript handlers (e.g. redirecting after form submission):

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform authentication check...
    navigate('/dashboard'); // Programmatic redirect
  };

  return <button onClick={handleLogin}>Log In</button>;
}
```

### useParams Hook
Used to read dynamic route parameters from the active URL (e.g., `/user/:id`):

```jsx
// Route Config: <Route path="user/:userId" element={<UserProfile />} />

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams(); // Reads 'userId' from route path
  return <div>Active Profile ID: {userId}</div>;
}
```

---

## 5. Lazy Loading Routes (Performance Splitting)

By default, bundlers pack all application pages into a single large JavaScript bundle. To optimize initial page loads, use **lazy loading** to split routes into smaller bundles that are loaded only when the user navigates to them:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load page components
const Home = lazy(() => import('./Home'));
const Analytics = lazy(() => import('./Analytics'));

export default function App() {
  return (
    <BrowserRouter>
      {/* Suspense renders a fallback UI while lazy chunk is loading */}
      <Suspense fallback={<div>Loading Page Resources...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```
