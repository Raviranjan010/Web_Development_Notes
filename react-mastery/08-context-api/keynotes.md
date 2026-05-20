# 📝 Context API Keynotes: Global Propagation Rules

- **Prop Drilling Alternative**: The Context API passes data down the component tree without passing props manually at every level.
- **Consumer Re-renders**: Every component consuming a context via `useContext` re-renders whenever the provider's value changes.
- **Reference Instability**: Passing inline object literals directly to a provider's `value` prop triggers re-renders on every render cycle.
- **Value Memoization**: Wrap provider values in `useMemo` to stabilize object reference addresses.
- **Default Fallback**: Always pass a default fallback object to `createContext` to prevent app crashes when components are used outside of providers.
- **Context Splitting**: Split state values and dispatch actions into separate contexts so components that only trigger actions do not re-render when state changes.
- **High-Frequency Warning**: Avoid using Context for high-frequency updates (e.g. cursor tracking) due to the lack of selector-based rendering.
- **Zustand comparison**: For complex or high-frequency states, use global state stores like Zustand or Redux which support selector-based rendering.
- **Modular Providers**: Nest multiple context providers (e.g., Auth, Theme) to keep responsibilities separate.
- **Development Guard**: Implement custom hooks (e.g. `useTheme()`) that throw descriptive errors if a context is consumed outside its provider.
