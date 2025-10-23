// Newsletter subscription alert function
document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) { // Check if the form exists on the page
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevents the form from submitting
            alert("Thank you for subscribing");
        });
    }
});


// Function to add items to sessionStorage cart
function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        // Add a new item
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert("Item added to the cart");
}

// Function to retrieve and display cart items from sessionStorage
function viewCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cartItemsList');
    cartItemsList.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price} x 
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
                <button class="remove-item-button" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(li);
        });

        // Add event listeners for quantity changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });

        // Add event listeners for removing items
        document.querySelectorAll('.remove-item-button').forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });
    }

    // Show the modal
    document.getElementById('cartModal').style.display = 'flex';
}

// Function to update the quantity of an item
function updateQuantity(event) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        sessionStorage.setItem('cart', JSON.stringify(cart));
    } else {
        alert('Quantity must be at least 1.');
        event.target.value = cart[index].quantity;  // Reset to previous value if invalid
    }
}

// Function to remove an item from the cart
function removeItemFromCart(event) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const index = event.target.dataset.index;
    cart.splice(index, 1);  // Remove item from cart
    sessionStorage.setItem('cart', JSON.stringify(cart));
    viewCart();  // Refresh the modal
}

// Function to clear the cart
function clearCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("No items to clear");
    } else {
        sessionStorage.removeItem('cart');
        alert("Cart cleared");
        viewCart(); // Refresh cart view
    }
}

// Function to process the order
function processOrder() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Cart is empty");
    } else {
        alert("Thank you for your order");
        sessionStorage.removeItem('cart');
        viewCart(); // Refresh cart view
    }
}

// Close modal function
function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const viewCartButton = document.getElementById('viewCartButton');
    const clearCartButton = document.getElementById('clearCartButton');
    const processOrderButton = document.getElementById('processOrderButton');
    const closeModalButton = document.getElementById('closeModalButton');

    if (viewCartButton) {
        viewCartButton.addEventListener('click', viewCart);
    }

    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    if (processOrderButton) {
        processOrderButton.addEventListener('click', processOrder);
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Add to Cart button listeners for each item
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemName = button.parentElement.parentElement.querySelector('td:nth-child(2)').textContent;
                const itemPrice = button.parentElement.parentElement.querySelector('td:nth-child(3)').textContent.slice(1);
                addToCart(itemName, itemPrice);
            });
        });
    }
});


// Function to store feedback/custom order information in localStorage
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents page refresh

            // Get the form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Ensure all fields have values
            if (!name || !email || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Store the form data in localStorage
            const feedback = {
                name: name,
                email: email,
                phone: phone,
                message: message
            };

            // Retrieve existing feedback from localStorage or initialize an empty array
            let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];

            // Add new feedback to the array
            feedbackList.push(feedback);

            // Save updated feedback list back to localStorage
            localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

            // Display alert after submission
            alert("Thank you for your message");
        });
    }
});
