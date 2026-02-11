# 4.8 Project: Job Search Portal (Bootstrap)

## 1. Objective
Create a professional Job Search Portal template using **Bootstrap** components.
Key features:
-   **Header & Navbar**: Navigation links.
-   **Search Section**: Inputs for keywords, location, company.
-   **Job Listings**: Cards displaying job details.

## 2. Project Source Code

### HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Search Portal</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .hero-section {
            background-color: #f8f9fa;
            padding: 40px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .job-card {
            transition: transform 0.2s;
        }
        .job-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    
    <!-- HEADER -->
    <header class="bg-success text-white text-center py-4">
        <h1>Job Search Portal</h1>
    </header>

    <!-- NAVIGATION -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link text-white" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#">Jobs</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#">Companies</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#">About Us</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- SEARCH SECTION -->
    <section class="hero-section mb-5">
        <div class="container text-center">
            <h2 class="mb-4">Find Your Dream Job</h2>
            <form action="#" class="row justify-content-center g-2">
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Keywords (e.g. Java)">
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Location (e.g. Banglore)">
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Company">
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-primary w-100">Search</button>
                </div>
            </form>
        </div>
    </section>

    <!-- LISTINGS -->
    <section class="container pb-5">
        <h2 class="text-center mb-4">Latest Job Listings</h2>
        <div class="row">
            
            <!-- Job 1 -->
            <div class="col-md-6 mb-4">
                <div class="card h-100 job-card">
                    <div class="card-body">
                        <h3 class="card-title text-success">Web Developer</h3>
                        <h6 class="card-subtitle mb-2 text-muted">GeeksforGeeks</h6>
                        <p class="card-text"><strong>Location:</strong> Noida, India</p>
                        <p class="card-text">Looking for a skilled frontend developer with React experience.</p>
                        <a href="#" class="btn btn-outline-success btn-sm">Apply Now</a>
                    </div>
                </div>
            </div>

            <!-- Job 2 -->
            <div class="col-md-6 mb-4">
                <div class="card h-100 job-card">
                    <div class="card-body">
                        <h3 class="card-title text-success">Graphic Designer</h3>
                        <h6 class="card-subtitle mb-2 text-muted">Creative Studio</h6>
                        <p class="card-text"><strong>Location:</strong> Remote</p>
                        <p class="card-text">Need someone proficient in Photoshop and Illustrator for campaign designs.</p>
                        <a href="#" class="btn btn-outline-success btn-sm">Apply Now</a>
                    </div>
                </div>
            </div>

             <!-- Job 3 -->
             <div class="col-md-6 mb-4">
                <div class="card h-100 job-card">
                    <div class="card-body">
                        <h3 class="card-title text-success">Data Analyst</h3>
                        <h6 class="card-subtitle mb-2 text-muted">FinTech Corp</h6>
                        <p class="card-text"><strong>Location:</strong> Mumbai, India</p>
                        <p class="card-text">Analyze large datasets and create visualization reports.</p>
                        <a href="#" class="btn btn-outline-success btn-sm">Apply Now</a>
                    </div>
                </div>
            </div>

             <!-- Job 4 -->
             <div class="col-md-6 mb-4">
                <div class="card h-100 job-card">
                    <div class="card-body">
                        <h3 class="card-title text-success">Product Manager</h3>
                        <h6 class="card-subtitle mb-2 text-muted">Startup Inc.</h6>
                        <p class="card-text"><strong>Location:</strong> Banglore, India</p>
                        <p class="card-text">Lead the product roadmap and coordinate with engineering teams.</p>
                        <a href="#" class="btn btn-outline-success btn-sm">Apply Now</a>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2026 Job Search Portal. All rights reserved.</p>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## 3. Explanation
1.  **Navbar**: Created using `navbar`, `navbar-expand-lg` (for responsive collapse), and `justify-content-center` to center the links.
2.  **Form Row**: Used Bootstrap Grid (`row`, `col-md-3`) to align input fields horizontally on desktop and stack them on mobile.
3.  **Cards**: `card` component used for jobs. Added custom CSS `.job-card:hover` for a nice lift effect.
4.  **Utilities**: Extensive use of spacing (`mb-4`, `py-4`) and color utilities (`text-success`, `bg-secondary`).
