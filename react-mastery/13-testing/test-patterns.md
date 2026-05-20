# 📑 Test Patterns: Templates for Mocking, Hooks, and API Tests

Below are reusable test templates for common testing workflows in React applications.

---

## 1. Custom Hook Testing Template

```javascript
// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useState, useCallback } from 'react';

// Target Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  return { count, increment, decrement };
}

// Tests
describe('useCounter Custom Hook', () => {
  it('should initialize count state', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('should increment count state', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

---

## 2. API Integration Test Template with MSW

```javascript
// DataFetcher.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import React, { useState } from 'react';

// Component
function DataFetcher() {
  const [data, setData] = useState(null);
  
  const loadData = () => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  };

  return (
    <div>
      <button onClick={loadData}>Load</button>
      {data && <p data-testid="data-output">{data.message}</p>}
    </div>
  );
}

// MSW Server Setup
const server = setupServer(
  http.get('/api/data', () => {
    return HttpResponse.json({ message: 'Success!' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Test
test('intercepts api requests and displays response', async () => {
  const user = userEvent.setup();
  render(<DataFetcher />);

  await user.click(screen.getByRole('button', { name: 'Load' }));

  await waitFor(() => {
    expect(screen.getByTestId('data-output')).toBeInTheDocument();
  });

  expect(screen.getByText('Success!')).toBeInTheDocument();
});
```

---

## 3. Redux / Zustand Connected Component Test Wrapper Template

```javascript
// StoreConnected.test.js
import { render, screen } from '@testing-library/react';
import { createStore, Provider } from 'react-redux';
import React from 'react';

// Dummy reducer
const reducer = (state = { name: 'Alice' }) => state;

// Custom render helper for Redux
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

// Target Component
function UserDashboard() {
  const name = useSelector(state => state.name);
  return <h1>Dashboard: {name}</h1>;
}

// Test
test('renders store connected variables', () => {
  renderWithRedux(<UserDashboard />, {
    initialState: { name: 'Bob' }
  });

  expect(screen.getByText('Dashboard: Bob')).toBeInTheDocument();
});
```
