let cart = JSON.parse(localStorage.getItem('myCart')) || [];


function displayCart() {
    let cartContainer = document.querySelector('#cart-container'); 
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-gray-500 text-center py-10 uppercase tracking-wider text-sm'>Your cart is empty!</p>";
        updateCartCounter();
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center border border-gray-200 p-4 bg-white rounded my-2 shadow-sm">
            <img src="${item.thumbnail}" class="w-16 h-16 object-contain" />
            <div class="flex-1 px-4">
                <h4 class="font-bold text-gray-900 uppercase text-xs tracking-wide">${item.title}</h4>
                <p class="text-xs text-gray-600 mt-1">$${item.price} + ${item.quantity}</p>
            </div>
            <button onclick="deleteFromCart(${item.id})" class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-red-600 transition-colors">
                Remove
            </button>
        </div>
    `).join('');

    updateCartCounter();
}


function deleteFromCart(id) {
    cart = cart.filter(value => value.id !== id);
    localStorage.setItem('myCart', JSON.stringify(cart));
    alert("Product removed");
    displayCart();
}


function updateCartCounter() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let counterElement = document.querySelector('#cart-counter');
    if (counterElement) counterElement.innerHTML = totalItems;
}


displayCart();