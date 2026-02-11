# 4.9 Project: E-commerce Website

## 1. Objective
Build a fully responsive E-commerce home page featuring:
-   **Sticky Header** with Cart count.
-   **Hero Section** with Gradient.
-   **Product Grid** with "Add to Cart" functionality.
-   **Tech Stack**: Bootstrap 5 (for structure/components) + Tailwind CSS (for utility styling) + JavaScript (for Cart logic).

## 2. Project Source Code

### HTML & Integrated CSS/JS (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-commerce Website</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
    
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f5f5f5;
        }
        header {
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .hero {
            background-image: linear-gradient(to right, #6b46c1, #805ad5);
            color: #fff;
            padding: 4rem 2rem;
            text-align: center;
        }
        .btn-custom {
            background-color: #6b46c1;
            color: white;
            transition: all 0.3s;
        }
        .btn-custom:hover {
            background-color: #553c9a;
            color: white;
            transform: scale(1.05);
        }
        .category-item, .product-item {
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            text-align: center;
            transition: transform 0.3s ease;
            height: 100%;
        }
        .category-item:hover, .product-item:hover {
            transform: translateY(-0.5rem);
        }
        .product-item img {
            height: 200px;
            object-fit: contain;
            margin-bottom: 1rem;
        }
        .price {
            font-size: 1.25rem;
            font-weight: 700;
            color: #6b46c1;
        }
    </style>
</head>
<body>

    <!-- HEADER -->
    <header class="p-3">
        <div class="container d-flex justify-content-between align-items-center">
            <h3 class="text-xl font-bold text-indigo-700 m-0">ShopMaster</h3>
            <nav>
                <ul class="d-flex list-none gap-4 m-0 p-0 text-indigo-800 font-semibold">
                    <li><a href="#" class="no-underline hover:text-indigo-600">Home</a></li>
                    <li><a href="#" class="no-underline hover:text-indigo-600">Orders</a></li>
                    <li><a href="#" class="no-underline hover:text-indigo-600" id="cartLink">My Cart (0)</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- HERO SECTION -->
    <section class="hero">
        <h1 class="text-4xl font-bold mb-3">Summer Collection 2026</h1>
        <p class="text-lg mb-6">Discover the best products and enjoy a seamless shopping experience.</p>
        <button class="btn btn-custom px-6 py-2 rounded-pill fw-bold">Shop Now</button>
    </section>

    <!-- CATEGORIES -->
    <section class="container my-5">
        <h2 class="text-2xl font-bold mb-4 border-b-2 border-indigo-200 pb-2">Shop by Category</h2>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="category-item cursor-pointer">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724124356374694/male_1.jpg" class="h-24 mx-auto mb-3" alt="Men">
                    <h3 class="font-bold text-lg">Men's Wear</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="category-item cursor-pointer">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724125020503946/women_5.jpg" class="h-24 mx-auto mb-3" alt="Women">
                    <h3 class="font-bold text-lg">Women's Wear</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="category-item cursor-pointer">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724125020976003/kids_2.jpg" class="h-24 mx-auto mb-3" alt="Kids">
                    <h3 class="font-bold text-lg">Kids Wear</h3>
                </div>
            </div>
        </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="container my-5">
        <h2 class="text-2xl font-bold mb-4 border-b-2 border-indigo-200 pb-2">Featured Products</h2>
        <div class="row g-4">
            
            <!-- Product 1 -->
            <div class="col-md-4 col-lg-3">
                <div class="product-item" id="prod1">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724124201503672/women_1.jpg" class="w-100" alt="Product 1">
                    <h3 class="font-bold text-lg">Floral Summer Dress</h3>
                    <p class="text-sm text-gray-500 text-left">Lightweight and breathable fabric.</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="price">$49</span>
                        <button class="btn btn-sm btn-custom add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>

            <!-- Product 2 -->
             <div class="col-md-4 col-lg-3">
                <div class="product-item" id="prod2">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724124356374694/male_1.jpg" class="w-100" alt="Product 2">
                    <h3 class="font-bold text-lg">Classic Denim Jacket</h3>
                    <p class="text-sm text-gray-500 text-left">Timeless style for any occasion.</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="price">$89</span>
                        <button class="btn btn-sm btn-custom add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>

            <!-- Product 3 -->
             <div class="col-md-4 col-lg-3">
                <div class="product-item" id="prod3">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724125020976003/kids_2.jpg" class="w-100" alt="Product 3">
                    <h3 class="font-bold text-lg">Kids Hoodie</h3>
                    <p class="text-sm text-gray-500 text-left">Comfy cotton blend for active kids.</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="price">$35</span>
                        <button class="btn btn-sm btn-custom add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
             <!-- Product 4 -->
             <div class="col-md-4 col-lg-3">
                <div class="product-item" id="prod4">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20250724181649377442/ecommerce-cart.webp" class="w-100" alt="Product 4">
                    <h3 class="font-bold text-lg">Travel Bag</h3>
                    <p class="text-sm text-gray-500 text-left">Durable and spacious for travel.</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="price">$120</span>
                        <button class="btn btn-sm btn-custom add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-indigo-700 text-white text-center py-4 mt-5">
        <p class="m-0">&copy; 2026 ShopMaster. All rights reserved.</p>
    </footer>

    <!-- LOGIC -->
    <script>
        // Init Cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Update UI
        function updateCartUI() {
            const cartLink = document.getElementById('cartLink');
            if (cartLink) {
                cartLink.innerText = `My Cart (\${cart.length})`;
            }
        }
        updateCartUI();

        // Add Event Listeners
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-item');
                const id = productCard.id;
                const name = productCard.querySelector('h3').innerText;
                const price = productCard.querySelector('.price').innerText;

                // Check duplicate
                const exists = cart.find(item => item.id === id);
                if (exists) {
                    alert(`\${name} is already in your cart!`);
                    return;
                }

                // Add to cart
                cart.push({ id, name, price });
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                
                // Animation Feedback
                const originalText = e.target.innerText;
                e.target.innerText = "Added!";
                e.target.classList.remove('btn-custom');
                e.target.classList.add('btn-success');
                setTimeout(() => {
                    e.target.innerText = originalText;
                    e.target.classList.add('btn-custom');
                    e.target.classList.remove('btn-success');
                }, 1000);
            });
        });
    </script>
</body>
</html>
```

## 3. Key Concepts Used

1.  **Hybrid Approach**: We used **Bootstrap** for the Grid (`row`, `col-md-4`) and **Tailwind** for atomic styling (`text-xl`, `font-bold`, `bg-indigo-700`). This demonstrates how both can coexist (though usually you pick one).
2.  **LocalStorage**: The JavaScript saves the cart array to the browser's LocalStorage. This means if you refresh the page, your cart count remains!
3.  **DOM Traversal**: We used `e.target.closest('.product-item')` to find the parent card of the clicked button, allowing us to scrape the product Name and Price relative to that button.
