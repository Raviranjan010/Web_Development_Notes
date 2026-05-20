# 📝 Performance Keynotes: Optimization and Memoization Rules

- **Render vs Commit Phase**: Rendering runs component logic to calculate diffs; committing applies those updates to the browser DOM.
- **Parent Trigger Cascade**: When a parent component updates, all of its children re-render by default, regardless of their props.
- **Shallow Prop Check**: `React.memo` uses shallow reference comparisons (`Object.is`) to check if props have changed.
- **Memoization Prop Leak**: Passing inline objects or arrow functions as props breaks `React.memo`'s shallow comparison checks.
- **Stabilize Objects**: Declare static style or configuration objects outside the component file to preserve their memory reference.
- **Expensive Memoization**: Use `useMemo` only for heavy calculations (like filtering large lists), as it adds check overhead.
- **Callback Stabilizer**: Use `useCallback` to cache function references, preventing unnecessary re-renders of memoized child components.
- **List Virtualization**: Render only the list items visible in the viewport to maintain a small, fast DOM tree.
- **Profiler Diagnostics**: Use the React DevTools Profiler tab to identify slow renders and locate unoptimized components.
- **Deferred Computations**: Use `useDeferredValue` to delay heavy computations, keeping text inputs responsive.
