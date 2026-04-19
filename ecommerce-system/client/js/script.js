const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    const productsGrid = document.getElementById('productsGrid');
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const products = await response.json();
        
        if (products.length === 0) {
            productsGrid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">No products available. Add some from the admin panel!</div>';
            return;
        }

        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productsGrid.innerHTML = `<div class="col-span-full text-center py-12 text-red-500">Failed to load products: ${error.message}</div>`;
    }
}

function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    
    const productsHTML = products.map(product => `
        <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div class="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img src="${product.image || 'https://via.placeholder.com/400'}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-x-4 bottom-4 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button onclick="addToCart('${product._id}', '${product.name.replace(/'/g, "\\'")}', ${product.price})" class="w-full bg-gray-900/95 backdrop-blur text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="text-xs font-semibold text-primary uppercase tracking-wider mb-1">${product.category}</div>
                <h3 class="font-bold text-gray-900 text-lg mb-1 leading-tight">${product.name}</h3>
                <p class="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="font-extrabold text-xl text-gray-900">$${product.price.toFixed(2)}</span>
                    <div class="flex items-center gap-1 text-yellow-400 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span class="text-gray-600 font-medium ml-1">${product.rating || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    productsGrid.innerHTML = productsHTML;
}

// Cart System
let cart = [];

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.product === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product: id, name, price, quantity: 1 });
    }
    updateCartUI();
    toggleCart(true); // Open modal to show it's added
}

function removeFromCart(id) {
    cart = cart.filter(item => item.product !== id);
    updateCartUI();
}

function adjustQuantity(id, amount) {
    const item = cart.find(i => i.product === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) removeFromCart(id);
        else updateCartUI();
    }
}

function updateCartUI() {
    // Update badge count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').innerText = totalCount;

    // Update modal items
    const cartItemsDiv = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="text-center text-gray-400 mt-10">Your cart is empty</div>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800 text-sm truncate pr-2">${item.name}</h4>
                    <p class="text-sm text-gray-500">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex bg-white border border-gray-200 rounded-lg">
                        <button onclick="adjustQuantity('${item.product}', -1)" class="px-2 text-gray-500 hover:text-primary">-</button>
                        <span class="px-2 border-x text-sm py-1">${item.quantity}</span>
                        <button onclick="adjustQuantity('${item.product}', 1)" class="px-2 text-gray-500 hover:text-primary">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').innerText = `$${totalAmount.toFixed(2)}`;
}

// UI Toggles
function toggleCart(forceOpen = false) {
    const modal = document.getElementById('cartModal');
    if (forceOpen) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.toggle('hidden');
    }
}

function openCheckout() {
    if (cart.length === 0) return alert('Your cart is empty!');
    toggleCart(false); // hide cart
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.add('hidden');
}

// Checkout Submission
async function submitOrder(e) {
    e.preventDefault();
    if (cart.length === 0) return alert('Empty cart');

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderData = {
        customerName: document.getElementById('custName').value,
        phone: document.getElementById('custPhone').value,
        address: document.getElementById('custAddr').value,
        products: cart.map(i => ({ product: i.product, quantity: i.quantity, price: i.price })),
        totalAmount
    };

    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (!res.ok) throw new Error('Order placement failed');

        alert('Order placed successfully!');
        cart = []; // clear cart
        updateCartUI();
        closeCheckout(); // close modal
        document.getElementById('checkoutForm').reset(); // reset form
    } catch (err) {
        alert(err.message);
    }
}
