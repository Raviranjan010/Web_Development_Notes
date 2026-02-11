# 03 Version Control (Git)

## What is Version Control?
Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. It allows multiple developers to collaborate without overwriting each other's work.

### Git vs GitHub
- **Git**: The version control **software** installed on your computer. It tracks changes.
- **GitHub**: A **cloud-based hosting service** for Git repositories. It lets you share your code with the world.

---

## Git Concepts

### Repository (Repo)
A storage space where your project's files and history are kept.
- **Local Repo**: On your computer.
- **Remote Repo**: On a server (like GitHub).

### Commit
A snapshot of your changes. Think of it like a "Save Point" in a game.

### Branching
Creating a separate line of development. You can work on a new feature in a "branch" without affecting the main code.

---

## Essential Git Commands

### 1. Initialize a Repository
Start tracking a project folder.
```bash
git init
```

### 2. Check Status
See which files have changed.
```bash
git status
```

### 3. Stage Changes
Prepare files to be committed (add to the staging area).
```bash
git add filename.html   # Add specific file
git add .               # Add all changed files
```

### 4. Commit Changes
Save the staged changes with a message.
```bash
git commit -m "My first commit"
```

### 5. Push to Remote
Upload your local commits to GitHub.
```bash
git push origin main
```

### 6. Pull from Remote
Download changes from GitHub to your local machine.
```bash
git pull
```

### 7. Clone a Repository
Download an entire existing repository from GitHub.
```bash
git clone https://github.com/username/repo-name.git
```

---

## The `.gitignore` File
A special file where you list files or folders that Git should **ignore** (not track).
**Common examples:**
- `node_modules/` (heavy dependency folders)
- `.env` (sensitive API keys)
- `.DS_Store` (Mac system files)

---

## Best Practices
1.  **Commit Often**: Make small, frequent commits rather than one huge one.
2.  **Clear Messages**: Write meaningful commit messages (e.g., "Fix login button bug" instead of "Update").
3.  **Branch Out**: Use branches for new features to keep the main branch stable.
