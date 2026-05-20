# 📝 State Management Keynotes: Core Mutability Rules

- **State Definition**: Local component memory that, when updated, schedules a re-render to update the user interface.
- **Reference Equality Check**: React uses shallow reference comparisons (`Object.is`) to check if state object values have changed.
- **Spread Immutability**: Always use the spread operator (`...`) to create copy references when updating objects or arrays in state.
- **Lazy Initialization**: Pass a function to `useState` (e.g. `useState(() => initVal)`) to run expensive setup code only once on mount.
- **Asynchronous Scheduling**: State updates are asynchronous and batched; reading state immediately after updates yields the old value.
- **Functional Setter Callback**: Always use functional updater setters `setState(prev => prev + 1)` when the next state depends on the previous state.
- **Derived Calculation**: Calculate derived data dynamically during rendering instead of syncing multiple state variables.
- **State Colocation**: Place state variables close to where they are used to avoid unnecessary parent re-renders.
- **useReducer Centralization**: Use `useReducer` to manage complex, nested, or dependent state transitions inside a single reducer function.
- **Non-Serializable Values**: Keep complex objects like WebSockets, class instances, or functions in `useRef` rather than state.
- **Time-Travel Friendly**: Store clean, serializable data structures in state to support debugger logging in React DevTools.
- **Automatic Batching**: In React 18, state setters called within event handlers, timeouts, or promises are batched into a single re-render cycle.
