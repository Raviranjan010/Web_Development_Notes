# 4.4 Project: InnoCascade (Idea Sharing Platform)

## 1. Objective
Build a modern, responsive website for **InnoCascade**, a platform where users can share and discover creative ideas.
This project focuses on **Flexbox Layouts**, **Clean UI/UX**, and **Responsive Design**.

**Goal**: Create a landing page with a Navigation Bar, Hero Section, Ideas Grid (Cards), and Footer.

## 2. Project Preview
- **Navbar**: Logo and Navigation links (Flexbox).
- **Hero**: Catchy headline and Call-to-Action (CTA) button.
- **Ideas Grid**: A collection of idea cards displayed in a flexible grid.
- **Responsive**: Adjusts layout for mobile and tablet screens.

---

## 3. Source Code

### HTML Structure (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InnoCascade | Share Your Spark</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Using Google Fonts for better typography -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>

    <!-- NAVIGATION -->
    <nav>
        <div class="container nav-container">
            <h1 class="logo">InnoCascade</h1>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Explore</a></li>
                <li><a href="#">Mentors</a></li>
                <li><a href="#" class="btn-login">Login</a></li>
            </ul>
        </div>
    </nav>

    <!-- HERO SECTION -->
    <header class="hero">
        <div class="container hero-content">
            <h2>Where Ideas Cascade into Reality</h2>
            <p>Join a vibrant community of innovators, thinkers, and creators. Share your spark, get feedback, and build the future.</p>
            <a href="#" class="btn-primary">Start Sharing</a>
        </div>
    </header>

    <!-- FEATURES / IDEAS SECTION -->
    <section class="ideas-section">
        <div class="container">
            <h3 class="section-title">Trending Ideas</h3>
            <div class="ideas-grid">
                
                <!-- Idea Card 1 -->
                <div class="card">
                    <div class="card-header platform-eco">Eco-Tech</div>
                    <h3>Smart Urban Gardens</h3>
                    <p>Automated vertical gardens for city apartments using IoT sensors to minimize water usage.</p>
                    <div class="card-footer">
                        <span>🔥 1.2k Upvotes</span>
                        <a href="#">Read More &rarr;</a>
                    </div>
                </div>

                <!-- Idea Card 2 -->
                <div class="card">
                    <div class="card-header platform-ed">Ed-Tech</div>
                    <h3>VR History Class</h3>
                    <p>Immersive virtual reality experiences that allow students to "walk" through historical events.</p>
                    <div class="card-footer">
                        <span>💡 985 Upvotes</span>
                        <a href="#">Read More &rarr;</a>
                    </div>
                </div>

                <!-- Idea Card 3 -->
                <div class="card">
                    <div class="card-header platform-health">Health</div>
                    <h3>Mental Wellness AI</h3>
                    <p>An AI companion that tracks mood patterns and suggests personalized mindfulness exercises.</p>
                    <div class="card-footer">
                        <span>❤️ 2.5k Upvotes</span>
                        <a href="#">Read More &rarr;</a>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer>
        <div class="container">
            <p>&copy; 2026 InnoCascade using HTML & CSS. All rights reserved.</p>
        </div>
    </footer>

</body>
</html>
```

### CSS Styling (`styles.css`)

```css
/* --- RESET & VARIABLES --- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #6C63FF; /* Modern Purple */
    --secondary-color: #3F3D56; /* Dark Gray */
    --accent-color: #00BFA6; /* Teal */
    --bg-light: #F9F9FB;
    --text-dark: #333;
    --white: #fff;
    --shadow: 0 4px 6px rgba(0,0,0,0.1);
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-light);
    color: var(--text-dark);
    line-height: 1.6;
}

/* --- UTILITIES --- */
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
}

a {
    text-decoration: none;
    color: inherit;
}

/* --- NAVIGATION --- */
nav {
    background-color: var(--white);
    box-shadow: var(--shadow);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    color: var(--primary-color);
    font-size: 1.5rem;
    font-weight: 700;
}

.nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 20px;
}

.nav-links a {
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--primary-color);
}

.btn-login {
    background-color: var(--primary-color);
    color: var(--white) !important;
    padding: 0.5rem 1.2rem;
    border-radius: 5px;
    transition: transform 0.2s ease;
}

.btn-login:hover {
    transform: translateY(-2px);
    opacity: 0.9;
}

/* --- HERO SECTION --- */
.hero {
    background: linear-gradient(135deg, var(--secondary-color), #2C2A40);
    color: var(--white);
    text-align: center;
    padding: 80px 20px;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

.hero p {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 30px auto;
    opacity: 0.9;
}

.btn-primary {
    display: inline-block;
    background-color: var(--accent-color);
    color: var(--white);
    padding: 12px 30px;
    border-radius: 30px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 191, 166, 0.4);
}

.btn-primary:hover {
    transform: scale(1.05);
    background-color: #00a38d;
}

/* --- IDEAS SECTION --- */
.ideas-section {
    padding: 60px 0;
}

.section-title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2rem;
    color: var(--secondary-color);
    position: relative;
}

.section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
    margin: 10px auto;
    border-radius: 2px;
}

.ideas-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

/* --- CARDS --- */
.card {
    background: var(--white);
    border-radius: 10px;
    box-shadow: var(--shadow);
    width: 320px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.card-header {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
    color: var(--accent-color);
}

.card h3 {
    font-size: 1.25rem;
    margin-bottom: 10px;
    color: var(--secondary-color);
}

.card p {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 20px;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eee;
    padding-top: 15px;
    font-size: 0.9rem;
}

.card-footer a {
    color: var(--primary-color);
    font-weight: 600;
}

/* --- FOOTER --- */
footer {
    text-align: center;
    padding: 20px;
    background-color: var(--secondary-color);
    color: #aaa;
    margin-top: auto;
}

/* --- RESPONSIVE DESIGN --- */
@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
        gap: 15px;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .card {
        width: 100%; /* Full width on small screens */
    }
}
```

---

## 4. Key Design Decisions

1.  **Color Palette**: Using **CSS Variables (`:root`)** allows us to define theme colors (Purple, Teal, Dark Gray) in one place and reuse them. Changing the theme becomes very easy.
2.  **Flexbox**: Used extensively for the `navbar`, `ideas-grid`, and inside the `cards` to align elements perfectly.
3.  **Modern Typography**: Imported 'Poppins' from Google Fonts for a clean, modern look.
4.  **UI Components**:
    -   **Buttons**: distinct styles for "Login" (small, secondary) and "Start Sharing" (large, CTA, accented).
    -   **Cards**: Used shadows and hover effects (`transform: translateY(-5px)`) to make them interactive and "clickable".

## 5. Next Steps
-   Add more pages like "Explore" or "Login".
-   Use JavaScript to make the "Upvote" button functional.
-   Implement a real backlight/dark mode switch.
