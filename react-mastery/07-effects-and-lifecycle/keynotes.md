# 📝 Effects & Lifecycle Keynotes: Synchronization Rules

- **Synchronization Boundary**: Treat `useEffect` as a synchronization tool for external systems rather than a component lifecycle handler.
- **Top-Level Render Exemption**: Effects execute asynchronously *after* the browser layout phase and paint cycle are complete.
- **Cleanup Timing**: The cleanup callback runs before the effect setup runs again, and when the component unmounts.
- **Strict Mode Mounts**: React Strict Mode intentionally mounts, unmounts, and remounts components in development to test for cleanup leaks.
- **Infinite Loop Avoidance**: Do not modify state inside an effect if that state variable is listed in the dependency array.
- **Stale Closure Bug**: Omitting variables read inside an effect from its dependency array causes the effect to capture outdated states.
- **Abort controller Fetching**: Use `AbortController` cleanup callbacks to cancel pending fetch requests and prevent race conditions.
- **Persistent Resource Cleanup**: Always remove event listeners, stop intervals, and disconnect socket instances in your cleanup function.
- **Functional State Setters**: Use functional updates `setCount(c => c + 1)` inside effects to update state without adding the state variable to dependencies.
- **Avoid Over-synchronization**: Perform simple data filtering and transformations directly during rendering instead of wrapping them in effects.
