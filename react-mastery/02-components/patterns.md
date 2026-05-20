# 🏗️ Advanced Component Patterns: Implementation & Best Practices

## 1. Compound Components Pattern

This pattern allows a group of components to work together by sharing state implicitly. It provides clean, flexible markup, similar to HTML `<select>` and `<option>` tags.

### When to Use
- Highly configurable controls like Tab menus, Select dropdowns, Accordions, or Navigation bars.
- When you want to let the consumer arrange the visual layout of child elements without writing prop drilling controls.

### Implementation Example: Tabs System
We will build a tab switcher that manages active indexes using React Context inside the parent wrapper.

```jsx
import React, { useState, createContext, useContext } from 'react';

// 1. Create the Shared Context
const TabsContext = createContext();

// 2. Parent Component (Tabs Container)
export function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', fontFamily: 'sans-serif' }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// 3. Sub-Component: Tab List Wrapper
export function TabList({ children }) {
  return (
    <div style={{ display: 'flex', borderBottom: '2px solid #eee', gap: '10px', marginBottom: '15px' }}>
      {children}
    </div>
  );
}

// 4. Sub-Component: Individual Tab Button
export function Tab({ index, label }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = activeIndex === index;

  return (
    <button
      onClick={() => setActiveIndex(index)}
      style={{
        padding: '10px 16px',
        border: 'none',
        background: 'none',
        borderBottom: isActive ? '3px solid #007bff' : '3px solid transparent',
        color: isActive ? '#007bff' : '#555',
        fontWeight: isActive ? 'bold' : 'normal',
        cursor: 'pointer',
        marginBottom: '-2px'
      }}
    >
      {label}
    </button>
  );
}

// 5. Sub-Component: Tab Panel content
export function TabPanel({ index, children }) {
  const { activeIndex } = useContext(TabsContext);
  if (activeIndex !== index) return null;
  return <div style={{ padding: '10px 0', animation: 'fadeIn 0.3s ease' }}>{children}</div>;
}

// 6. Consumer Usage Showcase
export default function CompoundTabsDemo() {
  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab index={0} label="Overview" />
        <Tab index={1} label="Security Settings" />
        <Tab index={2} label="Billing Details" />
      </TabList>
      
      <TabPanel index={0}>
        <h4>Dashboard Overview</h4>
        <p>Welcome back! Your system health is normal, and all data integrations are online.</p>
      </TabPanel>
      
      <TabPanel index={1}>
        <h4>Security Controls</h4>
        <p>Two-factor authentication is active. Last password update was 30 days ago.</p>
      </TabPanel>
      
      <TabPanel index={2}>
        <h4>Billing Options</h4>
        <p>Your subscription is on the Enterprise tier. Next auto-renewal invoice: June 1st.</p>
      </TabPanel>
    </Tabs>
  );
}
```

### When NOT to Use
- Simple, static toggles (e.g., showing a single details dropdown) where a basic `useState` is sufficient.
- When child components must live in separate routes or unrelated files, breaking the React Context boundary.

---

## 2. Higher-Order Components (HOC) Pattern

An HOC is a pure function that takes a component as an argument and returns a new, enhanced component with injected props or functionality.

### When to Use
- Reusing cross-cutting concerns (e.g., user authentication guards, logging, theme injections).
- Modifying incoming props before they reach legacy components.

### Implementation Example: Route Protection Wrapper
```jsx
import React from 'react';

// The HOC function
export function withAuth(WrappedComponent) {
  // Returns the enhanced component
  return function AuthenticatedComponent(props) {
    const isAuthenticated = !!localStorage.getItem('auth_token'); // Simple check

    if (!isAuthenticated) {
      return (
        <div style={{ padding: '20px', color: 'red', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h3>Access Denied</h3>
          <p>You must sign in to view this configuration panel.</p>
        </div>
      );
    }

    // Pass inputs through with active enhancements
    return <WrappedComponent {...props} />;
  };
}

// Presentational component to wrap
function AdminPanel({ userRole }) {
  return (
    <div style={{ padding: '20px', border: '2px solid red', borderRadius: '6px' }}>
      <h2>Admin Configuration Console</h2>
      <p>Current session role: <strong>{userRole}</strong></p>
    </div>
  );
}

// Export the enhanced component
export const ProtectedAdminPanel = withAuth(AdminPanel);
```

### When NOT to Use
- In modern codebases, HOCs are mostly replaced by **custom hooks**. If the logic does not need to wrap UI elements (e.g., checking user login status inside an effect), use a hook instead of wrapping the component hierarchy.
- Inside the `render` method of other components (causes unmount loops).

---

## 3. Render Props Pattern

A render prop is a technique for sharing state logic by passing a function as a prop, which returns the JSX elements that should be rendered.

### When to Use
- Sharing dynamic state tracking logic (e.g., tracking scroll positions, mouse movements, or fetching data in legacy structures).

### Implementation Example: Window Size Tracker
```jsx
import React, { useState, useEffect } from 'react';

// Logic Component
export function WindowResizer({ render }) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Executes callback function passing state values
  return render(dimensions);
}

// Usage
export function DisplayDimensions() {
  return (
    <WindowResizer 
      render={({ width, height }) => (
        <div style={{ border: '1px solid #777', padding: '10px', fontFamily: 'monospace' }}>
          Width: {width}px | Height: {height}px
        </div>
      )}
    />
  );
}
```

### When NOT to Use
- When logic can be easily extracted using a custom hook (e.g. `useWindowSize()`), which avoids JSX nesting.

---

## 4. Container & Presenter Split

This pattern splits code into logic components (Containers) and visual components (Presenters).

### When to Use
- When components grow complex, helping to separate data operations from layout rules.

### Implementation Example: User Feed System
```jsx
import React, { useState, useEffect } from 'react';

// Presenter (Dumb Component): Focuses on visual presentation
export function UserListPresenter({ users, isLoading, error }) {
  if (isLoading) return <div>Loading user list...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {users.map(user => (
        <li key={user.id} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
          <strong>{user.name}</strong> ({user.email})
        </li>
      ))}
    </ul>
  );
}

// Container (Smart Component): Focuses on data fetching and state logic
export default function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) throw new Error('Failed to retrieve profiles.');
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return <UserListPresenter users={users} isLoading={isLoading} error={error} />;
}
```

---

## 5. Layout Components Pattern

Layout components structure page grids, sidebars, headers, and spacing, decoupling layouts from visual styling.

### Implementation Example: Dashboard Screen Layout
```jsx
import React from 'react';

export function AppLayout({ header, sidebar, main }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '60px 1fr', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ gridColumn: '1 / -1', backgroundColor: '#333', color: 'white', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        {header}
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        <aside style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRight: '1px solid #ddd' }}>
          {sidebar}
        </aside>
        <main style={{ padding: '20px', backgroundColor: '#fafafa' }}>
          {main}
        </main>
      </div>
    </div>
  );
}
```
*Allows layout components to remain reusable across different page views by swapping the contents passed to each slot.*
