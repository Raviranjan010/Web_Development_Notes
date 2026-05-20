# 📝 Core Hooks Keynotes: Execution and Scheduling Rules

- **Execution Order Contract**: React tracks hook states by their declaration order; hooks must never be called conditionally or in loops.
- **Top-Level Calls**: Call hooks at the top level of React functions or custom hooks, never in helper files or nested callbacks.
- **Render vs Effect Execution**: Component rendering runs synchronously to construct the VDOM; effects execute asynchronously after DOM paint.
- **Empty Dependency Array**: An empty dependency array `[]` runs the effect once after mount and its cleanup function on unmount.
- **Stale Closure Risk**: Omitting dynamic values read inside an effect from its dependency array creates stale state bugs.
- **Race Condition Prevention**: Always return cleanup callbacks (like `AbortController`) to cancel pending fetches and prevent out-of-order state overwrites.
- **Ref State Exemption**: Mutating the `.current` property of a `useRef` object is synchronous and does not trigger component re-renders.
- **DOM Refs**: Pass `useRef` to an element's `ref` prop to get direct, synchronous access to its underlying HTML DOM node.
- **Forwarding References**: Wrap custom components in `forwardRef` to pass DOM references from parent down to child nodes.
- **Value Memoization**: `useMemo` caches the calculated results of expensive operations, avoiding re-calculation on every render.
- **Reference Memoization**: `useCallback` caches function signatures to prevent child component re-renders when parent states change.
- **Targeted Optimizations**: Only apply `useMemo` and `useCallback` when passing values to memoized child components (`React.memo`) or as dependencies.
