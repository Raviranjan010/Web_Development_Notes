# 🔐 Project 4: Secure Authentication & Protected Routes

A complete Authorization workflow component detailing login panels, local storage token caching, session header indicators, and Protected Route wrapper guards.

---

## 1. Features
1. **Mock Authentication**: Simulates validating email credentials and returning mock JWT tokens.
2. **Persistent Sessions**: Caches authentication status inside `localStorage` across page reloads.
3. **Session Header**: Displays logged-in user profile name or sign-in buttons dynamically.
4. **Protected Route Wrapper**: Guard component that redirects unauthenticated visitors back to `/login`.

---

## 2. Authorization Flow Diagram
```
                     ┌──────────────────┐
                     │   User Visits    │
                     │  Protected Route │
                     └────────┬─────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼ (Token Found)               ▼ (No Token Found)
       ┌──────────────┐              ┌──────────────┐
       │ Render Route │              │ Redirect to  │
       │ Component    │              │ Login Page   │
       └──────────────┘              └──────────────┘
```

---

## 3. Complete Implementation Code

```jsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// 1. Create global Authentication context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Read session state from local storage on mount
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    return savedToken ? { name: savedUser, token: savedToken } : null;
  });

  const login = (username, password) => {
    // Simulate validation
    if (username === 'admin' && password === 'password123') {
      const mockToken = 'jwt-secure-session-token-abc';
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', username);
      setUser({ name: username, token: mockToken });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const val = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
}

// 2. Custom consumer hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

// 3. Protected Route wrapper guard component
export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Redirect unauthenticated user to login view
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 4. Page components
function NavigationHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #ccc', backgroundColor: '#f8f9fa' }}>
      <nav style={{ display: 'flex', gap: '12px' }}>
        <Link to="/">Home</Link>
        <Link to="/profile">Protected Profile</Link>
      </nav>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Active User: <strong>{user.name}</strong></span>
            <button onClick={() => { logout(); navigate('/'); }}>Sign Out</button>
          </>
        ) : (
          <Link to="/login"><button>Sign In</button></Link>
        )}
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Home View</h2>
      <p>This page is public. Anyone can read this text content.</p>
    </div>
  );
}

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div style={{ padding: '20px' }}>
      <h2>🔐 Protected Profile View</h2>
      <p>This layout is protected. Only logged-in users can view this text content.</p>
      <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '4px', backgroundColor: '#fafafa' }}>
        <h4>Session metadata</h4>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      navigate('/profile'); // Redirect user to protected page
    } else {
      setError('Invalid username or password (Hint: admin / password123)');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '40px auto', padding: '16px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h3>Sign In</h3>
      {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          style={{ padding: '6px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          style={{ padding: '6px' }}
        />
        <button type="submit" style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Login
        </button>
      </form>
    </div>
  );
}

// 5. Root application router configuration
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```
