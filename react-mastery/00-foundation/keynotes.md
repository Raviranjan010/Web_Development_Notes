# 📝 Foundation Keynotes: Core Concepts Cheat Sheet

- **React Library**: React is a UI library focused solely on rendering the view layer of an application, not a full-featured framework.
- **Unidirectional Data Flow**: Data flows downward (parents to children via immutable props); events flow upward (children notify parents via callbacks).
- **Virtual DOM**: An in-memory cache of JavaScript objects mimicking the browser DOM, decoupling code from target environments.
- **Fiber Engine**: React's core scheduling mechanism introduced in React 16 to enable concurrent rendering and interruptible rendering phases.
- **Render Phase**: Asynchronous, interruptible process where React constructs the Work-in-Progress (WIP) Fiber tree and calculates mutations.
- **Commit Phase**: Synchronous, uninterruptible process where React applies calculated mutations to the actual browser DOM.
- **Reconciliation**: The process of syncing the Virtual DOM with the real DOM using a highly optimized heuristic $O(n)$ diffing algorithm.
- **Diffing Rules**: React assumes different element types yield completely different subtrees, and array items need a unique, consistent `key` prop.
- **Strict Mode**: A development-only helper that double-invokes component functions and effects to uncover side effects and memory leaks.
- **Component Lifecycle**: Render (executes component function) $\rightarrow$ Commit (mutates DOM) $\rightarrow$ Passive Effects (runs layout/cleanup hooks).
- **JSX compilation**: JSX is syntactic sugar transformed by Babel or compiler plugins into `React.createElement()` or runtime `_jsx()` calls.
- **Bypassing the DOM**: Directly querying or mutating the DOM bypasses the VDOM tree, causing visual bugs and state desynchronization.
- **React State**: The trigger for component updates. Mutating local variables does not notify React; state setters must be called.
- **UI Projection Formula**: $\text{UI} = f(\text{State})$, meaning the interface is a direct, predictable function of the application's state.
