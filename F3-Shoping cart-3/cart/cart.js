document.addEventListener('DOMContentLoaded', function() {
  const cartitemContainer = document.querySelector('.cartitem-container');
  const cartContainer = document.querySelector('.cartitem-container');
  const totalPriceTag = document.getElementById('total-price');

  updateCartUI();

  // Load cart items and update display
  function updateCartUI() {
    cartitemContainer.innerHTML = '';

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
      <h1>Check out list</h1>
        <p>${item.name} - $${item.price}</p>
        <button class="remove-btn" data-id="${item.id}">Remove From Cart</button>
      `;
      cartitemContainer.appendChild(cartItemDiv);
    });

    // Update total price
    const totalSum = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    totalPriceTag.textContent = `Total: $${totalSum.toFixed(2)}`;
  }

  // Listen for "Remove" button clicks
  cartContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
      const itemId = event.target.getAttribute('data-id');
      removeCartItem(itemId);
      updateCartUI();
    }
  });

  // Remove item from cart
  function removeCartItem(itemId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
});

const Signupbtn = document.getElementById('Signupbtn');
const loginbtn = document.getElementById('loginbtn')
const Mycart = document.getElementById('Mycart')
const Profile = document.getElementById('Profile')

Signupbtn.addEventListener('click', () => {
    window.location.href = '/signup';
  });
 
loginbtn.addEventListener('click',()=>{
  window.location.href='/login/index.html';
})
Mycart.addEventListener('click',()=>{
  window.location.href='/cart/index.html';
})
Profile.addEventListener('click',()=>{
  window.location.href='/profile/index.html';
})