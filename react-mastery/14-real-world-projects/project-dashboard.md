# 📊 Project 3: Real-Time Metrics Dashboard (useInterval)

A real-time analytics dashboard component featuring simulation timers (`useInterval`), dynamic category filter buttons, and live updates.

---

## 1. Features
1. **Real-Time Data Simulation**: Periodically modifies key metrics (CPU load, Network latency, memory usage) using a declarative interval timer hook.
2. **Alert States**: Highlights metrics in red if they exceed safe thresholds (e.g. CPU > 85%).
3. **Toggle Controls**: Allows users to pause or resume active telemetry updates.
4. **Historical Ticks**: Displays a history list of recent sensor alerts.

---

## 2. Telemetry Flow Diagram
```
                     ┌──────────────────┐
                     │ Timer (Interval) │
                     └────────┬─────────┘
                              │
                              ▼ (Simulate Ticks)
                     ┌──────────────────┐
                     │  Update Metrics  │
                     └────────┬─────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼ (Normal Range)              ▼ (Exceeds Threshold)
       ┌──────────────┐              ┌──────────────┐
       │ Render Green │              │ Add Alert to │
       │ Card State   │              │ History List │
       └──────────────┘              └──────────────┘
```

---

## 3. Complete Implementation Code

```jsx
import React, { useState, useEffect, useRef } from 'react';

// 1. Declarative Custom Interval Hook
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function AnalyticsDashboard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [alertLogs, setAlertLogs] = useState([]);
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 62,
    network: 24 // ms latency
  });

  // 2. Simulate real-time metric fluctuations
  useInterval(() => {
    // Generate new random values near current metrics
    setMetrics(prev => {
      const nextCpu = Math.max(10, Math.min(100, prev.cpu + Math.floor(Math.random() * 21) - 10));
      const nextMemory = Math.max(20, Math.min(100, prev.memory + Math.floor(Math.random() * 9) - 4));
      const nextNetwork = Math.max(5, Math.min(250, prev.network + Math.floor(Math.random() * 31) - 15));

      // Trigger automatic log warnings for threshold violations
      if (nextCpu > 85) {
        logAlert(`High CPU load alert: ${nextCpu}%`);
      }
      if (nextNetwork > 180) {
        logAlert(`High network latency alert: ${nextNetwork}ms`);
      }

      return { cpu: nextCpu, memory: nextMemory, network: nextNetwork };
    });
  }, isPlaying ? 1500 : null);

  const logAlert = (msg) => {
    setAlertLogs(prev => [
      { id: Date.now(), timestamp: new Date().toLocaleTimeString(), message: msg },
      ...prev.slice(0, 9) // Limit logs list length to 10 entries
    ]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif', padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3>📊 Infrastructure Telemetry</h3>
        <button 
          onClick={() => setIsPlaying(p => !p)}
          style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: isPlaying ? '#ffc107' : '#28a745', border: 'none', borderRadius: '4px' }}
        >
          {isPlaying ? '⏸️ Pause Telemetry' : '▶️ Resume Telemetry'}
        </button>
      </div>

      {/* Metric Cards Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        
        {/* CPU Metric Card */}
        <div style={{ border: '1px solid #eee', padding: '12px', borderRadius: '6px', backgroundColor: metrics.cpu > 80 ? '#fff0f0' : '#f0fff0', transition: 'background-color 0.3s' }}>
          <strong>CPU Usage</strong>
          <h2 style={{ margin: '8px 0', color: metrics.cpu > 80 ? 'red' : 'green' }}>{metrics.cpu}%</h2>
          <progress value={metrics.cpu} max="100" style={{ width: '100%' }} />
        </div>

        {/* Memory Metric Card */}
        <div style={{ border: '1px solid #eee', padding: '12px', borderRadius: '6px', backgroundColor: '#f0f4ff' }}>
          <strong>Memory usage</strong>
          <h2 style={{ margin: '8px 0', color: '#007bff' }}>{metrics.memory}%</h2>
          <progress value={metrics.memory} max="100" style={{ width: '100%' }} />
        </div>

        {/* Network Latency Card */}
        <div style={{ border: '1px solid #eee', padding: '12px', borderRadius: '6px', backgroundColor: metrics.network > 150 ? '#fff0f0' : '#f0fff5' }}>
          <strong>Latency</strong>
          <h2 style={{ margin: '8px 0', color: metrics.network > 150 ? 'red' : 'green' }}>{metrics.network}ms</h2>
          <span style={{ fontSize: '12px', color: '#666' }}>Standard Response</span>
        </div>

      </div>

      {/* Log Feed Console */}
      <div style={{ backgroundColor: '#1e1e1e', color: '#00ff00', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', height: '180px', overflowY: 'auto' }}>
        <span style={{ color: '#aaa' }}># Telemetry Alert Console Logs:</span>
        {alertLogs.length === 0 ? (
          <p style={{ color: '#666', fontSize: '13px' }}>Console idle. Waiting for telemetry updates...</p>
        ) : (
          alertLogs.map(log => (
            <div key={log.id} style={{ fontSize: '12px', margin: '4px 0' }}>
              [{log.timestamp}] {log.message}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
```
