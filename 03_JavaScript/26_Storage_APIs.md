# 3.14b Storage APIs

## 1. Overview
Web Storage APIs allow you to store data **locally** within the user's browser.
- **LocalStorage**: Persistent (No expiration).
- **SessionStorage**: Temporary (Clears when tab closes).
- **Cookies**: Small data sent with every HTTP request (Used for auth).

## 2. LocalStorage vs SessionStorage
Both use the same API methods but have different lifetimes.

| Feature | LocalStorage | SessionStorage |
| :--- | :--- | :--- |
| **Lifetime** | Forever (until manually cleared) | Session (Until tab/window close) |
| **Scope** | Shared across tabs/windows of same origin | Unique per tab |
| **Capacity** | ~5MB-10MB | ~5MB |
| **Use Case** | Theme preference, Shopping Cart | Form data steps, Single Session user |

## 3. The API (Methods)
The syntax is `key` - `value`. **Values must be Strings**.

```javascript
/* 1. SET Data */
localStorage.setItem("username", "JohnDoe");
localStorage.setItem("score", "100");

/* 2. GET Data */
const user = localStorage.getItem("username"); // "JohnDoe"

/* 3. REMOVE Data */
localStorage.removeItem("score");

/* 4. CLEAR All */
localStorage.clear();
```

## 4. Storing Objects / Arrays (JSON)
Since storage only accepts strings, you must use `JSON.stringify()` to store and `JSON.parse()` to read.

```javascript
const user = {
    name: "Ravi",
    role: "Admin",
    preferences: { theme: "dark" }
};

// WRITE
localStorage.setItem("userProfile", JSON.stringify(user));

// READ
const storedData = localStorage.getItem("userProfile");
if (storedData) {
    const parsedUser = JSON.parse(storedData);
    console.log(parsedUser.role); // "Admin"
}
```

## 5. Cookies
Legacy storage method.
- **Example**: `document.cookie = "username=John; expires=Thu, 18 Dec 2026 12:00:00 UTC; path=/"`
- **Downside**: Sent with *every* network request (slows down site), difficult API.
- **Modern Alternative**: Use LocalStorage for data, Cookies only for authentication tokens (HttpOnly).

## 6. Pro Tips
- **Storage Event**: Listen for changes in other tabs.
  ```javascript
  window.addEventListener("storage", (e) => {
      console.log(`Key \${e.key} changed from \${e.oldValue} to \${e.newValue}`);
  });
  ```
- **Security Warning**: NEVER store passwords, credit card info, or sensitive tokens in LocalStorage (it is accessible by any JS script, vulnerable to XSS). 
