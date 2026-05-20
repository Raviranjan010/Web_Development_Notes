# 🚫 Effects & Lifecycle Avoids: Infinite Loops and Cleanup Omissions

## 1. Triggering Infinite Render Loops

**The Mistake**: Modifying a state variable inside `useEffect` while listing that same state variable in the dependency array.
**Why it is bad**: This triggers an infinite rendering loop. The state update schedules a re-render. After the re-render, React detects the dependency changed, fires the effect again, updates the state, and repeats the cycle indefinitely, eventually freezing the browser tab.

### ❌ Bad Code
```jsx
// ❌ CRASH: Triggers an infinite rendering loop
import React, { useState, useEffect } from 'react';

export default function InfiniteCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ❌ WRONG: Modifying 'count' inside the effect triggers a re-render,
    // which runs this effect again because 'count' is in the dependency array.
    setCount(count + 1);
  }, [count]);

  return <div>Count: {count}</div>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Run the timer on mount and clean up on unmount
import React, { useState, useEffect } from 'react';

export default function SafeIntervalCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set up the interval once on mount
    const timer = setInterval(() => {
      // Use functional state updates to avoid listing 'count' as a dependency
      setCount(prev => prev + 1);
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array

  return <div>Count: {count}</div>;
}
```

---

## 2. Omitting Cleanup Operations on Unmount

**The Mistake**: Setting up event listeners, intervals, or subscriptions inside `useEffect` without returning a cleanup function.
**Why it is bad**: The subscription continues running in the background even after the component is unmounted. This leaks memory, degrades browser performance, and can cause the app to crash if the subscription tries to update state on an unmounted component.

### ❌ Bad Code
```jsx
// ❌ Memory Leak: Mouse event listener is never cleaned up
import React, { useState, useEffect } from 'react';

export default function MouseLogger() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    
    // Registers listener but never removes it
    window.addEventListener('mousemove', handleMove);
  }, []); // ❌ Warning: Missing cleanup function

  return <div>Mouse positions: {coords.x}, {coords.y}</div>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Event listener is cleaned up when the component unmounts
import React, { useState, useEffect } from 'react';

export default function MouseLogger() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMove);

    // ✅ Clean up listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return <div>Mouse positions: {coords.x}, {coords.y}</div>;
}
```

---

## 3. Creating Stale Closures by Omitting Dependencies

**The Mistake**: Omitting state variables or props read inside the effect from the dependency array, often to prevent the effect from running again.
**Why it is bad**: The effect retains a reference to the variables from the initial render cycle (a stale closure). When executed, the effect uses outdated values instead of the latest state.

### ❌ Bad Code
```jsx
// ❌ Stale closure: The click listener always reads the initial count (0)
import React, { useState, useEffect } from 'react';

export default function StaleLogger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleKeyPress = () => {
      // ❌ Stale Closure: Reads 'count' as 0 because it's missing from dependencies
      console.log(`Current Count value: ${count}`);
    };

    window.addEventListener('click', handleKeyPress);
    return () => window.removeEventListener('click', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ❌ Empty array captures initial render values only

  return <button onClick={() => setCount(c => c + 1)}>Increment ({count})</button>;
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Re-register the event listener whenever dependencies update
import React, { useState, useEffect } from 'react';

export default function WorkingLogger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleKeyPress = () => {
      console.log(`Current Count value: ${count}`);
    };

    window.addEventListener('click', handleKeyPress);
    
    // Clean up and re-register listener when count updates to prevent stale references
    return () => window.removeEventListener('click', handleKeyPress);
  }, [count]); // ✅ Lists count in dependencies

  return <button onClick={() => setCount(c => c + 1)}>Increment ({count})</button>;
}
```
