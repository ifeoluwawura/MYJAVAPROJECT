let cart = JSON.parse(localStorage.getItem("myCart")) || [];

function displayCart() {
  let cartContainer = document.querySelector("#cart-container");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='text-gray-500 text-center py-10 uppercase tracking-wider text-sm'>Your cart is empty!</p>";
    updateCartCounter();
    return;
  }

  let cartHTML = cart
    .map(
      (item) => `
        <div class="flex justify-between items-center border border-gray-200 p-4 bg-white rounded my-2 shadow-sm">
            <img src="${item.thumbnail}" class="w-16 h-16 object-contain" />
            <div class="flex-1 px-4 flex flex-col gap-0.5">
                <h4 class="font-bold text-gray-900 uppercase text-xs tracking-wide">${item.title}</h4>
                <div class="text-xs font-bold text-neutral-900 mt-1">$${item.price}</div>
                <div class="text-[11px] text-gray-500 font-medium">Quantity: ${item.quantity}</div>
            </div>
            <button onclick="deleteFromCart(${item.id})" class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-red-600 transition-colors">
                Remove
            </button>
        </div>
    `,
    )
    .join("");

  cartContainer.innerHTML = `
        <div>${cartHTML}</div>
        <div class="mt-6 flex justify-end">
            <button id="clearCartBtn" class="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 transition-colors rounded shadow-sm">
                Clear Cart
            </button>
        </div>
    `;

  document.getElementById("clearCartBtn")?.addEventListener("click", clearCart);

  updateCartCounter();
}

function clearCart() {
  if (confirm("Are you sure you want to clear your entire cart?")) {
    cart = [];
    localStorage.removeItem("myCart");
    displayCart();
  }
}

function deleteFromCart(id) {
  let productInCart = cart.find((item) => item.id === id);

  if (!productInCart) return;

  if (productInCart.quantity > 1) {
    productInCart.quantity -= 1;
    alert(`Decreased quantity of ${productInCart.title}`);
  } else {
    cart = cart.filter((value) => value.id !== id);
    alert(`${productInCart.title} removed from cart`);
  }

  localStorage.setItem("myCart", JSON.stringify(cart));
  displayCart();
}

function updateCartCounter() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let counterElement = document.querySelector("#cart-counter");
  if (counterElement) counterElement.innerHTML = totalItems;
}

displayCart();
