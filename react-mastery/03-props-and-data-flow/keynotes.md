# 📝 Props & Data Flow Keynotes: Essential Bindings

- **Immutability Contract**: React props are read-only; child components must treat them as immutable inputs.
- **Directional Flow**: Data flows down the component tree as props; actions flow up the tree as event callback invocations.
- **Syncing Sibling State**: To share state between sibling components, lift the state up to their closest common ancestor.
- **Destructuring with Defaults**: Destructure props in the function signature to improve readability and assign fallback default values.
- **Spread Safety**: Spreading props using `{...props}` is convenient but can leak invalid attributes to DOM elements.
- **Default Callbacks**: Always default optional callback props to a no-operation function `() => {}` to prevent crash errors.
- **Explicit Naming**: Name props after the domain model they represent rather than using generic names like `data` or `value`.
- **Children Propagation**: Nested tags placed between component elements are automatically accessible inside the `children` prop.
- **React Nodes as Props**: Components can accept React elements or entire component declarations as props to allow flexible layouts.
- **Prop Validation**: Use JSDoc, PropTypes, or TypeScript to document and validate expected prop shapes and types.
