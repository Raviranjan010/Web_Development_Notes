# 30 Package Managers and Bundlers

## 1. What is a Package Manager?
As your projects grow, you will want to use code written by other people (libraries) so you don't have to reinvent the wheel.
*   Examples: `React`, `Bootstrap`, `Lodash`, `Axios`.

A **Package Manager** automates the process of installing, upgrading, and removing these libraries.

### Key Players:
1.  **NPM (Node Package Manager)**: The default package manager installed with Node.js.
2.  **Yarn**: A faster alternative created by Facebook.
3.  **PNPM**: A disk-space efficient alternative.

---

## 2. Using NPM

To use NPM, you must have Node.js installed.

### Basic Commands
1.  **Initialize a project**:
    ```bash
    npm init -y
    ```
    Creates a `package.json` file (the "ID card" of your project).

2.  **Install a package**:
    ```bash
    npm install axios
    ```
    Adds `axios` to `node_modules` and updates `package.json`.

3.  **Install as Dev Dependency** (Tools only needed for development, like SASS):
    ```bash
    npm install sass --save-dev
    ```

4.  **Run Scripts**:
    Defined in `package.json` under `"scripts"`.
    ```bash
    npm run start
    ```

### The `node_modules` Folder
*   Contains the actual code of all installed libraries.
*   **NEVER** touch specific files inside it.
*   **NEVER** upload it to GitHub (it's huge). Use `.gitignore` to exclude it. Another developer can just run `npm install` to download everything based on `package.json`.

---

## 3. What is a Bundler?
Browsers don't natively understand sophisticated code setups like:
*   Importing `.png` files into JS.
*   Compiling SASS to CSS.
*   Minifying code (removing spaces to make it smaller).
*   Supporting older browsers (Babel).

A **Bundler** takes all your source files (HTML, CSS, JS, Images) and "bundles" them into optimal, production-ready files that browsers understand.

### Key Players:
1.  **Webpack**: The old king. Powerful but hard to configure. (Used in CRA).
2.  **Vite** (pronounced "Veet"): The modern standard. Extremely fast.
3.  **Parcel**: Zero configuration bundler.

---

## 4. Modern Project Setup with Vite

Vite is the recommended way to start frontend projects today (Vanilla JS, React, Vue, etc.).

### Why Vite?
*   Instant server start.
*   Hot Module Replacement (HMR) - updates screen instantly without reload.
*   Optimized build for production.

### How to start a Vite project:

1.  **Create Project**:
    ```bash
    npm create vite@latest my-project
    ```
2.  **Select Framework**: Choose `Vanilla` (for plain JS) or `React`/`Vue`.
3.  **Select Variant**: Choose `JavaScript` or `TypeScript`.
4.  **Enter Project**:
    ```bash
    cd my-project
    npm install
    npm run dev
    ```
5.  Open the `Local` URL shown in the terminal (usually `http://localhost:5173`).

---

## 5. Summary
*   **NPM**: Store for downloading tools and libraries.
*   **package.json**: List of what your project needs.
*   **node_modules**: Warehouse of installed code (don't commit this!).
*   **Vite**: The factory that builds your code for the browser.
