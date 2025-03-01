// Store cart data in local storage to persist across page reloads
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count in the navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Function to update the cart modal content
function updateCartModal() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItemsList.innerHTML = '';  // Clear previous cart items
    let totalPrice = 0;

    // Loop through each item in the cart to add it to the modal
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(li);
        totalPrice += parseFloat(item.price);
    });

    // Update the total price in the modal
    cartTotal.textContent = totalPrice.toFixed(2);
}

// Function to handle adding a product to the cart
function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productName = productElement.querySelector('h3').textContent;
    const productPrice = productElement.querySelector('p').textContent.replace('$', '');

    // Create the product object
    const product = {
        name: productName,
        price: productPrice
    };

    // Add the product to the cart array
    cart.push(product);

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count and modal
    updateCartCount();
    updateCartModal();
}

// Function to toggle the visibility of the cart modal
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('visible');
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
}

// Function to handle checkout (just a placeholder for now)
function checkout() {
    alert('Proceeding to checkout...');
}

// Add event listeners to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Add event listener to the cart icon to toggle the cart modal
document.getElementById('cart-icon').addEventListener('click', toggleCart);

// Initialize the cart count and modal on page load
updateCartCount();
updateCartModal();
