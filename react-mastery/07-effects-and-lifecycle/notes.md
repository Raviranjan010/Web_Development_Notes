# 🔄 Effects and Lifecycle: Synchronization and Cleanup Pipelines

## 1. "Synchronization, Not Lifecycle"

A common mistake is thinking of `useEffect` in terms of class component lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. 

In functional React, the mental model should shift from **"When does this run?"** to **"What system is this component synchronizing with?"**

An effect describes how to synchronize the component's state with an external system (e.g., an API endpoint, a browser API, a socket connection, or a chart library). Because synchronization needs to happen whenever the inputs change, React re-runs the effect whenever variables in the dependency array update.

---

## 2. Mapping Functional Hooks to Class lifecycles

If you are migrating legacy code, here is how class lifecycles translate to `useEffect`:

### ComponentDidMount
Runs once after the component mounts to the DOM.
```jsx
// Class Component
componentDidMount() {
  console.log("Mounted!");
}

// Functional Component
useEffect(() => {
  console.log("Mounted!");
}, []); // Empty dependency array ensures this runs only once
```

### ComponentDidUpdate
Runs after props or states change.
```jsx
// Class Component
componentDidUpdate(prevProps) {
  if (prevProps.userId !== this.props.userId) {
    console.log("User updated!");
  }
}

// Functional Component
useEffect(() => {
  console.log("User updated!");
}, [userId]); // Runs on mount and whenever userId changes
```

### ComponentWillUnmount
Runs before the component is unmounted and destroyed.
```jsx
// Class Component
componentWillUnmount() {
  console.log("Cleaned up!");
}

// Functional Component
useEffect(() => {
  return () => {
    console.log("Cleaned up!");
  };
}, []); // Cleanup function runs when component unmounts
```

---

## 3. The Effect Lifecycle Loop

```
           [COMPONENT MOUNTS]
                   │
                   ▼
         [Run Effect Setup (1)]
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
    [Prop/State Change]   [Component Unmounts]
         │                   │
         ▼                   ▼
  [Run Cleanup (1)]     [Run Cleanup (2)]
         │                   │
         ▼                   ▼
  [Run Setup (2)]      [Subtree Destroyed]
```

---

## 4. Strict Mode and Dual Execution

In development mode, React wraps components inside `<React.StrictMode>`. This causes React to intentionally mount, unmount, and remount every component—running your effect's setup, cleanup, and setup again—immediately upon loading.

### Why does React do this?
To force developers to write resilient cleanup operations. If your component mounts a WebSocket listener and does not return a cleanup function, strict mode will open two concurrent WebSockets. This exposes resource leaks immediately during development, rather than as memory leaks in production.

---

## 5. Real-World Project: WebSocket Chat Room Component

Below is a complete, runnable Chat Room component showing how to establish connections, listen for events, and disconnect safely when the room changes or when the component unmounts.

```jsx
import React, { useState, useEffect } from 'react';

// Mock WebSocket server instance creator
function createConnection(roomId) {
  let messageCallback = null;
  let intervalId = null;

  return {
    connect() {
      console.log(`📡 Connecting to room: ${roomId}...`);
      // Simulate incoming messages from server
      intervalId = setInterval(() => {
        if (messageCallback) {
          messageCallback(`[Room ${roomId}] New notification at ${new Date().toLocaleTimeString()}`);
        }
      }, 3000);
    },
    onMessage(callback) {
      messageCallback = callback;
    },
    disconnect() {
      console.log(`🔌 Disconnected from room: ${roomId}`);
      clearInterval(intervalId);
    }
  };
}

export default function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // 1. Establish the connection channel
    const connection = createConnection(roomId);
    connection.connect();

    // 2. Register callbacks
    connection.onMessage((newMsg) => {
      setMessages(prev => [...prev, newMsg]);
    });

    // 3. Return cleanup: disconnect when room changes or component unmounts
    return () => {
      connection.disconnect();
      setMessages([]); // Clear chat history for next room
    };
  }, [roomId]); // Dependency room trigger

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, `[You]: ${inputValue}`]);
    setInputValue('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'sans-serif', border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h3>Room Channel: {roomId}</h3>
      <div style={{ height: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '8px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
        {messages.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px' }}>No messages yet...</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} style={{ fontSize: '13px', margin: '4px 0' }}>{msg}</div>
          ))
        )}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          placeholder="Send a message..." 
          style={{ flexGrow: 1, padding: '6px' }}
        />
        <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
}
```
