# 📚 The Custom Hooks Library: 10 Production-Ready Solutions

Here are ten production-ready custom hooks for common frontend tasks, complete with implementation code and usage examples.

---

## 1. `useDebounce`

Delays updating a value until a set timeout has passed. Useful for search autocomplete inputs to prevent hitting APIs on every keystroke.

```javascript
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    // Cancel timeout if value changes before delay window finishes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedVal;
}
```

---

## 2. `useThrottle`

Limits how often a function can execute, allowing it to run at most once per specified time interval. Useful for resize or scroll event handlers.

```javascript
import { useState, useEffect, useRef } from 'react';

export function useThrottle(value, limit = 1000) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}
```

---

## 3. `usePrevious`

Stores the value of a variable from the previous render cycle.

```javascript
import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

---

## 4. `useToggle`

Manages a boolean toggle state. Returns the active status and a toggler action.

```javascript
import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle];
}
```

---

## 5. `useLocalStorage`

Synchronizes state with `localStorage`, ensuring data persists across page reloads.

```javascript
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}
```

---

## 6. `useFetch`

Handles HTTP GET queries with built-in loading and error indicators.

```javascript
import { useState, useEffect } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { ...options, signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
```

---

## 7. `useWindowSize`

Listens for browser viewport window adjustments and returns the width and height dimensions.

```javascript
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
```

---

## 8. `useEventListener`

Sets up a global event listener on a target DOM node (defaults to window) and removes it automatically on unmount.

```javascript
import { useEffect, useRef } from 'react';

export function useEventListener(eventName, handler, element = window) {
  // Store the handler in a ref to avoid re-registering the event listener when the handler updates
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
```

---

## 9. `useOnMount`

Syntactic sugar for executing a setup callback once on initial render mount.

```javascript
import { useEffect } from 'react';

export function useOnMount(effectCallback) {
  useEffect(() => {
    effectCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
```

---

## 10. `useInterval`

Sets up a declarative interval timer that automatically cleans up when components unmount.

```javascript
import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Keep callback synchronized
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}
```
