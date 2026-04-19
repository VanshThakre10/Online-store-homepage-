const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
    fetchAdminProducts();
});

function showSection(sectionId) {
    document.getElementById('ordersSection').classList.add('hidden');
    document.getElementById('productsSection').classList.add('hidden');
    
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('pageTitle').innerText = sectionId === 'ordersSection' ? 'Manage Orders' : 'Manage Products';
}

// ---------------- ORDERS (Step 11) ----------------
async function fetchOrders() {
    try {
        const res = await fetch(`${API_URL}/orders`);
        const orders = await res.json();
        
        const tbody = document.getElementById('ordersTableBody');
        tbody.innerHTML = orders.map(order => `
            <tr class="hover:bg-gray-50 transition">
                <td class="p-4 text-xs font-mono text-gray-500">${order._id}</td>
                <td class="p-4 text-sm font-semibold text-gray-800">${order.customerName}</td>
                <td class="p-4 text-sm text-gray-800 font-bold">$${order.totalAmount.toFixed(2)}</td>
                <td class="p-4">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}">${order.status}</span>
                </td>
                <td class="p-4 text-sm">
                    <select onchange="updateOrderStatus('${order._id}', this.value)" class="border rounded p-1 text-xs bg-white focus:outline-primary">
                        <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

function getStatusColor(status) {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Shipped') return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
}

async function updateOrderStatus(id, newStatus) {
    try {
        await fetch(`${API_URL}/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        fetchOrders();
    } catch (err) {
        alert('Failed to update status');
    }
}

// ---------------- PRODUCTS (Step 12) ----------------
async function fetchAdminProducts() {
    try {
        const res = await fetch(`${API_URL}/products`);
        const products = await res.json();
        
        const grid = document.getElementById('adminProductsGrid');
        grid.innerHTML = products.map(prod => `
            <div class="border rounded-xl p-4 shadow-sm relative group bg-gray-50">
                <img src="${prod.image}" class="w-full h-32 object-cover rounded-lg mb-3">
                <h4 class="font-bold text-sm truncate">${prod.name}</h4>
                <p class="text-xs text-primary font-semibold mb-2">$${prod.price.toFixed(2)}</p>
                <div class="flex gap-2">
                    <button onclick="deleteProduct('${prod._id}')" class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded w-full hover:bg-red-200">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

function toggleProductModal() {
    document.getElementById('productModal').classList.toggle('hidden');
    document.getElementById('productForm').reset();
    document.getElementById('prodId').value = '';
}

async function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('prodId').value;
    const isEditing = !!id;

    const body = {
        name: document.getElementById('prodName').value,
        category: document.getElementById('prodCat').value,
        price: Number(document.getElementById('prodPrice').value),
        image: document.getElementById('prodImg').value,
        description: document.getElementById('prodDesc').value,
    };

    try {
        const res = await fetch(`${API_URL}/products${isEditing ? '/' + id : ''}`, {
            method: isEditing ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error('Save failed');

        toggleProductModal();
        fetchAdminProducts();
    } catch (err) {
        alert(err.message);
    }
}

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        fetchAdminProducts();
    } catch (err) {
        alert('Delete failed');
    }
}
