# 📝 Components Keynotes: Essential Rules & Casing

- **Pure Render Functions**: React components must act as pure functions during the render phase, mapping input props into JSX without side effects.
- **PascalCase Casing**: All custom React components must be declared using PascalCase to compile as component references.
- **Lowercase Tags**: Lowercase elements in JSX compile directly to HTML string tags (e.g. `<div>` compiles to `_jsx("div", {})`).
- **Functional Dominance**: Functional components paired with Hooks are the modern standard, replacing heavy ES6 class components.
- **Automatic Children**: The `children` prop represents nested markup placed between component tags and is accessible automatically.
- **No Inner Declarations**: Never nest a component definition inside another component; doing so recreates the type reference and triggers unmounts.
- **Avoid Anonymous Exports**: Always name your component functions before exporting to ensure they are readable in stack traces and DevTools.
- **Composition Benefits**: Component composition simplifies prop layouts and reduces nested prop drilling across intermediates.
- **Prop Immutability**: React elements cannot mutate incoming props; they are read-only arguments passed from parent environments.
- **HOC Wrapper Hell**: Higher Order Components wrap components to share logic, but can cause prop collisions and deep tree nesting.
- **Hooks over HOCs**: Modern state logic is shared using custom Hooks, replacing HOCs and Render Props in modern codebases.
