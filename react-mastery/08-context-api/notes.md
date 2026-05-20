# 🌐 The Context API: Global Shared State and Render Optimizations

## 1. Context API Core Concepts

The **Context API** provides a way to pass data down the component tree without having to pass props manually at every level (avoiding **prop drilling**).

```
         ┌─────────────────────────┐
         │   App (ThemeProvider)   │
         └────────────┬────────────┘
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
     ┌───────────┐         ┌───────────┐
     │  Sidebar  │         │   Main    │
     └─────┬─────┘         └─────┬─────┘
           │                     │
           ▼                     ▼
     ┌───────────┐         ┌───────────┐
     │  NavLinks │         │ UserCard  │◄──[useContext(ThemeContext)]
     └───────────┘         └───────────┘
```

### The Three Context Elements
1. **`createContext`**: Declares a new context object.
2. **`Context.Provider`**: Wraps the subtree and provides the shared value.
3. **`useContext`**: Reads the active value of the context from the nearest provider above in the tree.

---

## 2. The Context Re-Render Behavior

A common issue with the Context API is that **whenever the provider's value changes, every component that consumes that context via `useContext` re-renders.**

If the provider passes a non-memoized object:

```jsx
// ❌ BAD: A new object reference is created on every render of App
<ThemeContext.Provider value={{ theme, setTheme }}>
  <SubTree />
</ThemeContext.Provider>
```

Any changes to *other* states in the `App` component will recreate the value object, causing all context consumers to re-render, even if the `theme` value itself didn't change.

### Optimization Techniques
1. **Memoize the Provider Value**: Wrap the value object in `useMemo` to keep its reference stable.
2. **Split Contexts**: Separate the state value and the setter actions into two different context providers (e.g., `ThemeStateContext` and `ThemeDispatchContext`). This ensures components that only trigger actions (like buttons) do not re-render when the state value changes.

---

## 3. Comparison: Props vs Context vs Global State Stores

| Criteria | Props | Context API | Global State (Zustand, Redux) |
| :--- | :--- | :--- | :--- |
| **Scope** | Parent to direct child | Component Subtree | Global (any component in the app) |
| **Setup Overhead** | Zero | Medium | High (requires store configuration) |
| **Performance** | Excellent (isolated) | Poor for high-frequency updates | Excellent (via selector optimization) |
| **Best For** | Local, custom layout parameters | Low-frequency updates (Auth, Themes) | High-frequency, complex global states |

---

## 4. Real-World Project: Combined Theme + User Auth Providers

Below is a complete, runnable dashboard app utilizing optimized Context Providers.

```jsx
import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Create contexts with default fallback values
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// 2. Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username, role: 'Administrator' });
  const logout = () => setUser(null);

  // Memoize auth details to prevent unnecessary re-renders
  const authValue = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

// 3. Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

// 4. Custom hooks for cleaner consuming imports
export function useAuth() {
  return useContext(AuthContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}

// 5. Component Subtree Consumers
function Header() {
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ 
      display: 'flex', justifyContent: 'space-between', padding: '12px 20px',
      backgroundColor: theme === 'light' ? '#eee' : '#222', 
      color: theme === 'light' ? '#000' : '#fff' 
    }}>
      <span>Dashboard App</span>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button onClick={toggleTheme}>Mode: {theme}</button>
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={logout}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => login('Jane Doe')}>Sign In</button>
        )}
      </div>
    </header>
  );
}

export default function DashboardRoot() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Header />
        <main style={{ padding: '20px' }}>
          <h4>Main Workspace Content</h4>
          <p>This layout is synchronized with the global theme and user session contexts.</p>
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}
```
