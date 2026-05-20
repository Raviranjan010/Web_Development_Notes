# 📊 State Management: Architectural and Decision Diagrams

## 1. The Re-Render Cycle Flow Diagram

```
         ┌────────────────────────────────────────────────────────┐
         │                  INITIAL RENDER                        │
         │  - Executes component functions                       │
         │  - Generates Virtual DOM tree                          │
         │  - Mounts nodes to Real browser DOM                    │
         └──────────────────────────┬─────────────────────────────┘
                                    │
                                    ▼
                     ┌─────────────────────────────┐
                     │     Application Idle        │◄───────────────────────────┐
                     │  - Awaiting user actions    │                            │
                     └──────────────┬──────────────┘                            │
                                    │                                           │
                                    ▼ (User triggers button click/input)        │
                     ┌─────────────────────────────┐                            │
                     │    State Setter Invoked     │                            │
                     │  - schedules re-render      │                            │
                     └──────────────┬──────────────┘                            │
                                    │                                           │
                                    ▼                                           │
 ┌──────────────────────────────────────────────────────────────────────────┐   │
 │                         RE-RENDER CYCLE (Async)                          │   │
 │                                                                          │   │
 │  1. Re-executes component functions with new state values                │   │
 │  2. Generates a new Work-in-Progress (WIP) Virtual DOM tree              │   │
 │  3. Diffing Phase: Compares new VDOM tree with old VDOM tree             │   │
 │  4. Commit Phase: Commits minimal changes (effects) to the Real DOM      │   │
 └──────────────────────────────────┬───────────────────────────────────────┘   │
                                    │                                           │
                                    ▼                                           │
                     ┌─────────────────────────────┐                            │
                     │         DOM Painted         │                            │
                     │  - Interface visual update  │────────────────────────────┘
                     └─────────────────────────────┘
```

---

## 2. State Lifting Diagram

### Before Lifting State (Disconnected)
```
          ┌───────────────┐
          │    Parent     │
          └───────┬───────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│   Sibling A   │   │   Sibling B   │
│ [State: item] │   │ (Needs item)  │
└───────────────┘   └───────────────┘
```
*Note: Sibling B cannot access state declared in Sibling A directly.*

### After Lifting State (Synchronized)
```
             ┌───────────────┐
             │    Parent     │
             │ [State: item] │
             └───────┬───────┘
                     │
         ┌───────────┴───────────┐
         │ (Prop: item)          │ (Prop: item)
         │ (Prop: onUpdate)      │
         ▼                       ▼
┌────────────────┐      ┌────────────────┐
│   Sibling A    │      │   Sibling B    │
│ (Calls onUpdate│      │ (Renders item) │
│  on action)    │      │                │
└────────────────┘      └────────────────┘
```

---

## 3. useState vs useReducer Decision Tree

```
                       ┌───────────────────────────────┐
                       │  What is the complexity shape │
                       │    of the component state?    │
                       └───────────────┬───────────────┘
                                       │
                  ┌────────────────────┴────────────────────┐
                  ▼ (Primitives / Isolated)                 ▼ (Complex / Related)
     ┌────────────────────────┐                ┌──────────────────────────────┐
     │ How many states change │                │ Do state updates depend on   │
     │     at the same time?  │                │ the values of other states?  │
     └────────────┬───────────┘                └──────────────┬───────────────┘
                  │                                           │
          ┌───────┴───────┐                           ┌───────┴───────┐
          ▼ (Only 1)      ▼ (Multiple)                ▼ Yes           ▼ No
   ┌────────────┐  ┌─────────────┐             ┌────────────┐  ┌────────────┐
   │  useState  │  │ useReducer  │             │ useReducer │  │  useState  │
   └────────────┘  └─────────────┘             └────────────┘  └────────────┘
```

---

## 4. Local vs Global State Decision Flowchart

```
                 ┌─────────────────────────────────────────────┐
                 │        Where is this state required?        │
                 └──────────────────────┬──────────────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼ (Only inside this component)                        ▼ (Across multiple files)
  ┌───────────────────────┐                             ┌──────────────────────────┐
  │   Use local state     │                             │ Are the target components│
  │ (`useState` inside)   │                             │ sibling branches or close│
  └───────────────────────┘                             └────────────┬─────────────┘
                                                                     │
                                                   ┌─────────────────┴─────────────────┐
                                                   ▼ Yes                               ▼ No
                                       ┌───────────────────────┐           ┌───────────────────────┐
                                       │    Lift state up to   │           │ Use Context API or a  │
                                       │    closest parent     │           │ State Store (Zustand) │
                                       └───────────────────────┘           └───────────────────────┘
```

---

## 5. Immutable Array Update Patterns Visual Table

| Input State Array | Desired Change | Immutable Syntax Operation | Resulting State Reference |
| :--- | :--- | :--- | :--- |
| `['a', 'b']` | Add item `'c'` | `[...list, 'c']` | `['a', 'b', 'c']` (New Array) |
| `['a', 'b', 'c']` | Remove item `'b'` | `list.filter(x => x !== 'b')` | `['a', 'c']` (New Array) |
| `['a', 'b']` | Update `'b'` to `'z'` | `list.map(x => x === 'b' ? 'z' : x)` | `['a', 'z']` (New Array) |
| `['a', 'b']` | Prepend item `'x'` | `['x', ...list]` | `['x', 'a', 'b']` (New Array) |
