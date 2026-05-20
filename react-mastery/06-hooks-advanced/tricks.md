# ⚡ Advanced Hooks Tricks: Custom Hook Optimization & Testing

## 1. Testing Custom Hooks with `@testing-library/react`

**The Problem**: Custom hooks cannot be executed inside standard test files because hooks require a running React component context.
**The Trick**: Use the `renderHook` wrapper from `@testing-library/react`. This utility mounts a temporary dummy component behind the scenes to run the hook, exposing an `.result` property to query updates:

```javascript
import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';

// Custom Hook to test
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}

// Vitest Unit Test Block
describe('useCounter Custom Hook', () => {
  it('should initialize and increment state values', () => {
    // Mount custom hook using renderHook
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);

    // Trigger state changes inside the 'act' callback
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(11);
  });
});
```

---

## 2. Composing Custom Hooks Together (Modular Architecture)

**The Problem**: You want to build a complex state workflow, but writing it in a single custom hook makes it long and hard to maintain.
**The Trick**: Compose multiple custom hooks together. Since custom hooks are pure functions, you can pass the output of one hook as an input to another:

```javascript
import { useLocalStorage } from './useLocalStorage';
import { useFetch } from './useFetch';

// Enhanced custom hook that fetches profile data and caches it locally
export function usePersistentUser(userId) {
  // Hook 1: Read/Write local storage cache
  const [cachedUser, setCachedUser] = useLocalStorage(`usr-${userId}`, null);

  // Hook 2: Fetch data from API
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  // Compose hooks: Update cache when API returns new data
  if (data && JSON.stringify(data) !== JSON.stringify(cachedUser)) {
    setCachedUser(data);
  }

  return {
    user: cachedUser || data,
    loading: loading && !cachedUser, // Show loading only if no cache exists
    error
  };
}
```

---

## 3. The Object Destructuring Naming Convention

**The Problem**: If a custom hook returns an object, renaming values during destructuring requires writing verbose syntax: `const { data: userData } = useFetch(...)`.
**The Trick**: When designing custom hooks that will be called multiple times in a single component file (like `useFetch`), return a dynamic named key inside the returned object, or return standard variables but follow a clear naming convention:

```javascript
// Return generic parameters but support easy destructuring rename
const { data: products, loading: productsLoading } = useFetch('/api/products');
const { data: users, loading: usersLoading } = useFetch('/api/users');
```
*Returning objects instead of arrays allows the consumer to rename only what they need, keeping their imports clean.*
