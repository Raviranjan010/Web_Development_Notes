# Deploying a Frontend Project on GitHub Pages

GitHub Pages is a free service to host static websites (HTML, CSS, JS) directly from a GitHub repository.

## Prerequisites
1.  **Git Installed**: Download from [git-scm.com](https://git-scm.com/).
2.  **GitHub Account**: Sign up at [github.com](https://github.com/).

## Step-by-Step Guide

### Step 1: Initialize Git
Open your project folder in the terminal/command prompt.

```bash
# Initialize local repo
git init

# Configure Identity (First time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 2: Create a Repository on GitHub
1.  Log in to GitHub.
2.  Click the **+** icon (top-right) -> **New repository**.
3.  Name it (e.g., `my-portfolio`).
4.  Select **Public**.
5.  Click **Create repository**.

### Step 3: Push Code
Copy the commands shown on GitHub or use these:

```bash
# Stage all files
git add .

# Commit changes
git commit -m "Initial commit"

# Link to GitHub repo (Replace URL with yours)
git remote add origin https://github.com/your-username/my-portfolio.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages
1.  Go to your Repository **Settings**.
2.  Click **Pages** (in the left sidebar).
3.  Under **Source**, select `Deploy from a branch`.
4.  Under **Branch**, select `main` and folder `/ (root)`.
5.  Click **Save**.

### Step 5: Verification
Wait a minute or two. Refresh the page. You will see a link like:
`https://your-username.github.io/my-portfolio/`

Click it to see your live website!
