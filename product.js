let products = [];
let cart = JSON.parse(localStorage.getItem("myCart")) || [];
async function getproducts() {
  try {
    const fetchData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer hchcjdjcjc",
      },
    };
    let url = "https://dummyjson.com/products?limit=100";

    let response = await fetch(url, fetchData);
    let data = await response.json();
    console.log(data);
    products = data.products.filter(
      (product) =>
        product.category === "mens-watches" ||
        product.category === "mens-shirts" ||
        product.category === "fragrances" ||
        product.category === "beauty",
    );

    console.log(products);

    let myproductContent = products.map(function (product) {
      return `
        <div class="group flex flex-col justify-between overflow-hidden bg-white shadow-sm transition hover:shadow-md border border-gray-100 rounded-sm">
        
        
        <div class="h-64 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
            <img 
                src="${product.thumbnail}" 
                alt="${product.title}" 
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
        </div>
        
        
        <div class="flex flex-col gap-2 p-3 flex-grow">
            
            
            <div class="text-base font-bold text-neutral-900">
                $${product.price}
            </div>

            
            <h3 class="truncate text-xs text-gray-700 font-semibold" title="${product.title}">
                ${product.title}
            </h3>

            <p class="line-clamp-2 text-[11px] text-gray-500 leading-normal">
                ${product.description}
                </p>
            
            
            <span class="text-[10px] font-medium text-amber-600 bg-amber-50 self-start px-1 mt-1 rounded-sm mb-1">
                #${product.category.replace("-", "")}
            </span>
            
            
            <button 
                onclick="addToCart(${product.id})" 
                class="mt-auto px-4 self-start rounded bg-black py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
                Add to Cart
            </button>
        </div>
        
    </div>
    `;
    });

    document.querySelector("#myProducts").innerHTML = myproductContent.join("");
  } catch (error) {
    console.log(error);
    document.querySelector("#userError").innerHTML =
      "Error loading products...";
  } finally {
    console.log("Fetching completed");
  }
}

function filterProducts() {
  let search = document.querySelector("#searchInput").value;

  let productFilter = products.filter(function (value) {
    return (
      value.title.toLowerCase().includes(search.toLowerCase()) ||
      value.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (productFilter.length === 0) {
    document.querySelector("#myProducts").innerHTML = `
            <p class="text-gray-500 font-medium p-8 text-center col-span-full">
                No products found matching your search.
            </p>
        `;
  } else {
    displayProducts(productFilter);
  }
}

function displayProducts(data) {
  let myproductContent = data.map(function (product) {
    return `
        <div class="group flex flex-col justify-between overflow-hidden bg-white shadow-sm transition hover:shadow-md border border-gray-100 rounded-sm">
        
        
        <div class="h-64 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
            <img 
                src="${product.thumbnail}" 
                alt="${product.title}" 
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
        </div>
        
        
        <div class="flex flex-col gap-2 p-3 flex-grow">
            
            
            <div class="text-base font-bold text-neutral-900">
                $${product.price}
            </div>

            
            <h3 class="truncate text-xs text-gray-700 font-semibold" title="${product.title}">
                ${product.title}
            </h3>

            <p class="line-clamp-2 text-[11px] text-gray-500 leading-normal">
                ${product.description}
                </p>
            
            
            <span class="text-[10px] font-medium text-amber-600 bg-amber-50 self-start px-1 mt-1 rounded-sm mb-1">
                #${product.category.replace("-", "")}
            </span>
            
            
            <button 
                onclick="addToCart(${product.id})" 
                class="mt-auto px-4 self-start rounded bg-black py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
                Add to Cart
            </button>
        </div>
        
    </div>
    `;
  });
  document.querySelector("#myProducts").innerHTML = myproductContent.join("");
}

let searchInputItems = document.querySelector("#searchInput");
if (searchInputItems) {
  searchInputItems.addEventListener("input", filterProducts);
}

function addToCart(id) {
  console.log("button was clicked! product ID is:", id);

  let productToAdd = products.find((value) => value.id === id);

  if (!productToAdd) {
    alert("Product not found");
    return;
  }

  let checkCart = cart.find((value) => value.id === productToAdd.id);

  if (checkCart) {
    checkCart.quantity += 1;
    alert(`Increased quantity of ${productToAdd.title}`);
  } else {
    let cartProduct = { ...productToAdd, quantity: 1 };
    cart.push(cartProduct);
    alert(`${productToAdd.title} added to cart!`);
  }

  localStorage.setItem("myCart", JSON.stringify(cart));

  updateCounter();
}

function updateCounter() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let counterElement = document.querySelector("#cart-counter");
  if (counterElement) {
    counterElement.innerHTML = totalItems;
  }
}

getproducts();
updateCounter();
