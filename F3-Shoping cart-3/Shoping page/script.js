  const productsContainer = document.querySelector('.products');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const toggleButtons = document.querySelectorAll('.toggle-button');
  const colorCheckboxes = document.querySelectorAll('.color-filter');
  const priceRange = document.getElementById('price-range');
  const priceValue = document.getElementById('priceValue');
  const sizeCheckboxes = document.querySelectorAll('.size-filter');
  const ratingSlider = document.getElementById('slider');
  const ratingLabel = document.getElementById('label');
  const filterButton = document.getElementById('filterbtn');

let productsData = [];

// Fetch products data from the API
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    productsData = data;
    displayProducts(productsData);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


// Display products in the products container
function displayProducts(products) {
  productsContainer.innerHTML = '';
  if (products.length === 0) {
    productsContainer.innerHTML = 'No products found.';
    return;
  }
  products.forEach(product => {
    // Create product card and populate with data
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}">
      <p>$${product.price}</p>
      <p>Size: S,L,XL</p>
      <p> ${product.title}</p>
      <button type="button" id="cartbtn">Add to Cart</button>
      <!-- Add more product details as needed -->
    `;
    productsContainer.appendChild(card);
  });
}
productsContainer.addEventListener('click', addToCart);

  // Function to add a product to the cart
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  
  function addToCart(event) {
    if (event.target && event.target.matches('#cartbtn')) {
      const card = event.target.closest('.product-card');
      const productIndex = Array.from(productsContainer.children).indexOf(card);

      if (productIndex !== -1) {
        const selectedProduct = productsData[productIndex];

        // Get existing cart items from local storage or initialize an empty array
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the selected product to the cart
        existingCart.push(selectedProduct);

        // Update the local storage with the new cart items
        localStorage.setItem('cart', JSON.stringify(existingCart));

        // Provide user feedback (optional)
        alert('Product added to cart.');

        
      }
    }
  }

// Filter products by category (toggle buttons)
function filterByCategory(category) {
    let filteredProducts;

    if (category === 'All clothing') {
      filteredProducts = productsData;
    } else {
      filteredProducts = productsData.filter(product => product.category === category);
    }
  displayProducts(filteredProducts);
}

 // Function to filter products based on color, size, and price filters
function applyFilters() {
    const selectedColors = Array.from(colorCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    const selectedSizes = Array.from(sizeCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    const minPrice = parseFloat(priceRange.value);
    const minRating = parseFloat(ratingSlider.value);

    filteredProducts = productsData.filter(product => {
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size);
      const matchesPrice = product.price >= minPrice;
      const matchesRating = product.rating.rate >= minRating;
      return matchesColor && matchesSize && matchesPrice && matchesRating;
    });

    displayProducts(filteredProducts);
  }



// Add event listeners
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = productsData.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    filterByCategory(category);
  });
});

// Fetch products on page load
fetchProducts();



// filtereproduct

let filteredProducts = [];

// Update filtered products based on color and price filters
function updateFilters() {
  const selectedColors = Array.from(colorCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const minPrice = parseFloat(priceRange.value);

  filteredProducts = productsData.filter(product => {
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.Colours);
    const matchesPrice = product.price >= minPrice;
    return matchesColor && matchesPrice;
  });

  displayProducts(filteredProducts);
}

// Add event listeners to color checkboxes
colorCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateFilters);
});

// Add event listener to price range slider
priceRange.addEventListener('input', () => {
  priceValue.textContent = `$${priceRange.value}`;
  updateFilters();
});

// Add event listener to size checkboxes
sizeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Add event listener to the "Apply Filter" button
  filterButton.addEventListener('click', applyFilters);

// Rating slider
const slider = document.getElementById('slider');
const label = document.getElementById('label');

label.innerHTML = slider.value;

slider.oninput = function() {
    label.innerHTML = slider.value;
};
