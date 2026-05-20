# 📑 Complete Effect Cleanup Cheatsheet

Below are clean code snippets for common resource cleanup operations inside React `useEffect` hooks.

---

## 1. Event Listener Cleanup

```javascript
useEffect(() => {
  const handleScroll = (event) => {
    console.log("Viewport position:", window.scrollY);
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup: Remove listener on dependency changes or unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

---

## 2. Timer Cleanup (setTimeout / setInterval)

```javascript
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("Heartbeat pulse...");
  }, 1000);

  // Cleanup: Clear interval to prevent memory leaks
  return () => {
    clearInterval(intervalId);
  };
}, []);
```

---

## 3. Intersection Observer Cleanup

```javascript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Element is visible!");
      }
    });
  });

  if (targetRef.current) {
    observer.observe(targetRef.current);
  }

  // Cleanup: Disconnect the observer instance
  return () => {
    observer.disconnect();
  };
}, []);
```

---

## 4. Resize Observer Cleanup

```javascript
useEffect(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      console.log("Width updated to:", entry.contentRect.width);
    }
  });

  if (containerRef.current) {
    resizeObserver.observe(containerRef.current);
  }

  // Cleanup: Stop observing the element
  return () => {
    resizeObserver.disconnect();
  };
}, []);
```

---

## 5. WebSocket Connection Cleanup

```javascript
useEffect(() => {
  const socket = new WebSocket('wss://api.example.com/live');

  socket.onmessage = (event) => {
    console.log("Message received:", event.data);
  };

  // Cleanup: Close the connection
  return () => {
    if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
      socket.close();
    }
  };
}, []);
```

---

## 6. AbortController Fetch Cleanup

```javascript
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/userdata', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log("Fetch request aborted successfully.");
      } else {
        console.error("Fetch failed:", err);
      }
    });

  // Cleanup: Cancel the request if dependencies change before it resolves
  return () => {
    controller.abort();
  };
}, [userId]);
```
