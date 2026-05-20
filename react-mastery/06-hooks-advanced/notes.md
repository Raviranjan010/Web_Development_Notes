# 🚀 Advanced Hooks: Concurrent Render, Transitions, and Custom hooks

## 1. useLayoutEffect vs useEffect

While `useEffect` executes asynchronously after the DOM has been painted, `useLayoutEffect` fires **synchronously after all DOM mutations but BEFORE the browser paints the screen.**

```
[DOM Mutated] ──► [useLayoutEffect Executes (Sync)] ──► [Browser Paints Screen] ──► [useEffect Executes (Async)]
```

### When to Use `useLayoutEffect`
Use it only when you need to calculate dimensions or positions of DOM nodes (like tooltips, popups, or dropdowns) and update state *before* the user sees the paint. If you use `useEffect` for this, the element will render in its initial position for a brief millisecond, then jump to its calculated position, causing a noticeable **visual flicker**.

### Flickering Example: Tooltip Alignment
```jsx
import React, { useState, useLayoutEffect, useRef } from 'react';

export default function TooltipButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (!showTooltip || !buttonRef.current || !tooltipRef.current) return;

    const btnRect = buttonRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // Calculate tooltip coordinates directly above the button
    setPosition({
      top: btnRect.top - tooltipRect.height - 10,
      left: btnRect.left + (btnRect.width / 2) - (tooltipRect.width / 2)
    });
  }, [showTooltip]); // Fires synchronously before paint to prevent flashing

  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <button ref={buttonRef} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        Hover Me
      </button>
      {showTooltip && (
        <div 
          ref={tooltipRef} 
          style={{ position: 'fixed', top: position.top, left: position.left, backgroundColor: '#333', color: 'white', padding: '6px 12px', borderRadius: '4px', zIndex: 1000 }}
        >
          Dynamic Tooltip
        </div>
      )}
    </div>
  );
}
```

---

## 2. useImperativeHandle: Exposing Imperative Child API

By default, React DOM elements are referenced directly. However, you might want to expose a custom, restricted API from a child component to its parent instead of leaking the entire underlying HTML node.

`useImperativeHandle` works in tandem with `forwardRef` to define custom methods:

```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// Child component exposing imperative methods
const VideoPlayer = forwardRef((props, ref) => {
  const videoElRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // Expose only these methods to parent
    triggerPlay: () => videoElRef.current?.play(),
    triggerPause: () => videoElRef.current?.pause(),
    resetVideo: () => {
      if (videoElRef.current) {
        videoElRef.current.currentTime = 0;
        videoElRef.current.pause();
      }
    }
  }));

  return <video ref={videoElRef} src="sample.mp4" width="300" />;
});

// Parent Controller
export default function MediaController() {
  const playerRef = useRef(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} />
      <button onClick={() => playerRef.current?.triggerPlay()}>Play</button>
      <button onClick={() => playerRef.current?.triggerPause()}>Pause</button>
      <button onClick={() => playerRef.current?.resetVideo()}>Reset</button>
    </div>
  );
}
```

---

## 3. Concurrent Features (React 18): useTransition & useDeferredValue

React 18 introduces concurrent rendering to improve responsiveness. Updates are split into:
- **Urgent updates**: Direct physical actions (typing in an input, clicking buttons).
- **Transition (Non-Urgent) updates**: UI transitions (filtering list elements, fetching tab layouts).

### useTransition
`useTransition` lets you mark specific state updates as transitions, preventing them from blocking the user input:

```jsx
import React, { useState, useTransition } from 'react';

export default function SearchDashboard() {
  const [isPending, startTransition] = useTransition();
  const [searchVal, setSearchVal] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleInput = (e) => {
    // 1. Urgent State Update: immediately update the input field
    setSearchVal(e.target.value);

    // 2. Non-Urgent Update: mark computation search as transition
    startTransition(() => {
      // simulate filtering large list
      const query = e.target.value.toLowerCase();
      const match = Array.from({ length: 20000 }, (_, i) => `Item ${i}`).filter(item => 
        item.toLowerCase().includes(query)
      );
      setFilteredList(match);
    });
  };

  return (
    <div>
      <input value={searchVal} onChange={handleInput} />
      {isPending ? <span>Searching records...</span> : <ul>{filteredList.map((item, idx) => <li key={idx}>{item}</li>)}</ul>}
    </div>
  );
}
```

### useDeferredValue
`useDeferredValue` does the same thing, but it is used when you receive a value via props rather than triggering the state setter directly. It defers updating the child component until the main thread is idle.

```jsx
// Defer update on incoming prop values
const deferredQuery = useDeferredValue(searchQuery);
```

---

## 4. useSyncExternalStore (Subscribing to Browser State)

`useSyncExternalStore` is a React 18 hook designed for safely subscribing to external data stores, preventing **tearing** (components displaying different values for the same state during concurrent renders).

```jsx
import React, { useSyncExternalStore } from 'react';

// 1. Subscribe method
const subscribe = (callback) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

// 2. Snapshot queries
const getSnapshot = () => navigator.onLine;

export default function ConnectionStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div style={{ padding: '10px', backgroundColor: isOnline ? 'green' : 'red', color: 'white' }}>
      Connection Status: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

---

## 5. Five Complete Custom Hooks

Custom hooks allow you to package state logic and reuse it across multiple components.

### 1. `useLocalStorage` (State Persistor)
```javascript
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [key, state]);

  return [state, setState];
}
```

### 2. `useFetch` (API Fetcher)
```javascript
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
```

### 3. `useDebounce` (Input Delayer)
```javascript
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedVal;
}
```

### 4. `useMediaQuery` (Responsive layouts)
```javascript
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

### 5. `useOnClickOutside` (Overlay Closer)
```javascript
import { useEffect } from 'react';

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking target ref element or children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
```
