# 📑 Core Hooks Reference Card

## 1. Quick Reference Table

| Hook | Syntax | Returns | Primary Use Case | Key Rule |
| :--- | :--- | :--- | :--- | :--- |
| **`useState`** | `const [val, setVal] = useState(init)` | `[Value, SetterFunction]` | Local state management | Use functional updates if next value depends on prev |
| **`useEffect`** | `useEffect(() => { ... return () => {} }, [deps])` | `undefined` | Syncing with external systems | Return cleanup callback to prevent memory leaks |
| **`useRef`** | `const ref = useRef(init)` | `{ current: Value }` | DOM access, persisting variables | Mutating `.current` does not trigger re-renders |
| **`useMemo`** | `const memoVal = useMemo(() => compute, [deps])` | `Value` | Caching computed values | Only use for expensive calculations |
| **`useCallback`** | `const memoFn = useCallback(() => fn, [deps])` | `Function` | Caching function references | Use when passing callbacks to memoized children |
| **`useContext`** | `const val = useContext(Context)` | `Value` | Consuming context values | Re-renders when the Provider's value changes |

---

## 2. Copy-Paste Code Templates

### useState Template
```jsx
import React, { useState } from 'react';

export default function CounterTemplate() {
  const [count, setCount] = useState(() => 0); // Lazy initializer optional

  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      Count: {count}
    </button>
  );
}
```

### useEffect Template
```jsx
import React, { useState, useEffect } from 'react';

export default function EffectTemplate({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/items/${id}`, { signal: controller.signal })
      .then(res => res.json())
      .then(setData);

    return () => {
      controller.abort(); // Cleanup
    };
  }, [id]);

  return <div>{data?.name}</div>;
}
```

### useRef Template
```jsx
import React, { useRef } from 'react';

export default function RefTemplate() {
  const inputRef = useRef(null);
  const clickTracker = useRef(0); // Persistent variable

  const handleFocus = () => {
    inputRef.current?.focus();
    clickTracker.current += 1;
    console.log(`Focus clicks: ${clickTracker.current}`);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </div>
  );
}
```

### useMemo Template
```jsx
import React, { useMemo } from 'react';

export default function MemoTemplate({ list, filterKey }) {
  const filteredList = useMemo(() => {
    return list.filter(item => item.category === filterKey);
  }, [list, filterKey]);

  return (
    <ul>
      {filteredList.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

### useCallback Template
```jsx
import React, { useState, useCallback } from 'react';

const MemoizedChild = React.memo(({ onAction }) => {
  return <button onClick={onAction}>Action</button>;
});

export default function CallbackTemplate() {
  const [state, setState] = useState('');

  const handleAction = useCallback(() => {
    console.log('Action triggered without changing reference!');
  }, []);

  return <MemoizedChild onAction={handleAction} />;
}
```

### useContext Template
```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemeDisplay() {
  const theme = useContext(ThemeContext);
  return <div>Active Theme: {theme}</div>;
}

export default function ContextTemplate() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeDisplay />
    </ThemeContext.Provider>
  );
}
```
