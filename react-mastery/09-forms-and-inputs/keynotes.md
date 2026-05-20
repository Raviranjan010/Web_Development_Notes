# 📝 Forms & Inputs Keynotes: Core Input Patterns

- **Controlled State Sync**: Controlled inputs store data in React state and synchronize values using the `value` and `onChange` props.
- **Uncontrolled DOM refs**: Uncontrolled inputs store data in the browser DOM and are read using `useRef` elements.
- **Initial Value Rule**: Always initialize controlled inputs with an empty string `''` rather than `undefined` or `null` to prevent console warnings.
- **Prevent Reloads**: Use `e.preventDefault()` inside form submit handlers to prevent page refreshes.
- **Single Object Handler**: Use ES6 computed property names `[e.target.name]: e.target.value` to update a single form state object.
- **File Input Constraint**: File inputs are read-only and must be managed as uncontrolled components using `useRef`.
- **Validation Timing**: Use `onChange` for real-time validation (e.g. password strength) and `onBlur` for structural checks (e.g. email format).
- **Libraries for Complex Forms**: For large forms with complex validation rules, use libraries like React Hook Form or Formik.
- **Checkbox values**: Read checkbox values using `e.target.checked` instead of `e.target.value`.
- **Vanilla Form Resets**: Use DOM references (e.g., `formRef.current.reset()`) to reset uncontrolled inputs back to default values.
