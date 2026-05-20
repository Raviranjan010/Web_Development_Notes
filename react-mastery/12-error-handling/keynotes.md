# 📝 Error Handling Keynotes: Catching and Recovering Rules

- **Unmount Protection**: Uncaught JavaScript errors during rendering unmount the entire React component tree from the DOM.
- **Error Boundaries**: Error Boundaries catch rendering errors in child components and display fallback UIs instead of crashing the page.
- **Class Restriction**: Error Boundaries must be written as Class components because functional components lack error lifecycle equivalents.
- **getDerivedStateFromError**: The static lifecycle `getDerivedStateFromError` is used to update state and trigger fallback renders.
- **componentDidCatch**: The lifecycle method `componentDidCatch` is used to run side-effects (like logging errors to analytics APIs).
- **Render Phase Constraint**: Error Boundaries only catch errors that occur during the React render phase.
- **Async Exemption**: Error Boundaries cannot catch errors thrown inside asynchronous effects, timeouts, or event handlers.
- **Async Throw Trick**: Trigger async error catches by saving the error object in state and throwing it during the component's render phase.
- **Granular Isolation**: Wrap isolated layout features in separate Error Boundaries to keep the rest of the application responsive.
- **Reset State Before Retry**: Always reset the state that caused the crash before re-mounting child components on recovery retries.
