# 3.1.b JavaScript Code Execution

## 1. How JavaScript Works?
JavaScript was initially designed to run within a web browser using a **JavaScript Engine**.
- **Browser Engines**:
  - **V8**: Google Chrome, Node.js
  - **SpiderMonkey**: Mozilla Firefox
  - **JavaScriptCore**: Safari
  - **Chakra**: Edge (Classic)

The browser cannot directly understand high-level JavaScript code. The engine translates it.

## 2. The Execution Process
The process involves three key stages:
1.  **Parsing** (~15%): The engine reads and interprets the raw JS code.
2.  **Compilation** (~25%): Converts code into machine-readable instructions (JIT - Just In Time compilation).
3.  **Execution** (~50%): The compiled code is run. The engine also handles **Memory Management** (Garbage Collection).

> **Note**: The **Event Loop** manages asynchronous operations (like waiting for a file or API) to ensure the main thread isn't blocked.

## 3. Development vs Production Mode

| Mode | Description | How it works |
| :--- | :--- | :--- |
| **Development** | Working on local machine (VS Code, LocalHost). | Browser fetches files from local server. JS Engine executes them on your machine. |
| **Production** | Live website deployed to a server. | User's browser fetches optimized files from remote server. JS Engine executes them on *user's* machine. |

## 4. Execution Context
Everything in JS happens inside an **Execution Context**. It is the environment where the code is evaluated and executed.

### Phases of Execution Context
1.  **Memory Allocation Phase (Creation Phase)**:
    - JS scans the code.
    - Allocates memory for variables and functions.
    - **Variables** (`var`) are stored with `undefined`.
    - **Functions** are stored with their entire code body.
2.  **Code Execution Phase**:
    - JS runs the code line-by-line.
    - Values are assigned to variables.
    - Function calls are executed.

### Example Walkthrough
```javascript
let x = 2;
let y = x * x;
console.log(y);
```

#### Step 1: Memory Phase (Creation)
- `x`: allocated, uninitialized (in TDZ if `let/const`, `undefined` if `var`).
- `y`: allocated, uninitialized.

#### Step 2: Execution Phase
- `let x = 2;`: `x` is assigned `2`.
- `let y = x * x;`: JS reads `x` (2), calculates `2*2`, assigns `4` to `y`.
- `console.log(y);`: Prints `4`.

## 5. Call Stack
JavaScript is **Single-Threaded**. It has one Call Stack.
- Keep track of where we are in the code.
- **Global Context** goes at the bottom.
- **Function Contexts** stack on top when called, and pop off when finished.

## 6. Related Topics
- [02_Variables_and_Data_Types.md](./02_Variables_and_Data_Types.md) - Understanding Hoisting and Scope.
