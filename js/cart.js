let cart = [];
const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.getElementById("cartItems");
const addToCartButtons = document.querySelectorAll(".products button");

// Function to get current user's cart
function getUserCart() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return [];

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[currentUser.email];
  return user ? user.cart || [] : [];
}

// Function to save user's cart
function saveUserCart(cartItems) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return;

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[currentUser.email]) {
    users[currentUser.email].cart = cartItems;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Load user's cart when page loads
function loadUserCart() {
  cart = getUserCart();
  cartCount.innerText = cart.length;
  updateCartDisplay();
}

// Initialize cart
loadUserCart();

addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login to add items to your cart");
      return;
    }

    const productCard = btn.closest("div");
    const name = productCard.querySelector("h1").innerText;
    const price = productCard.querySelector(".price").innerText;

    cart.push({ name, price });
    cartCount.innerText = cart.length;
    updateCartDisplay();
    saveUserCart(cart);
  });
});

function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ${item.price}`;
    cartItemsContainer.appendChild(li);
  });
}

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

// Update cart when user logs in/out
document.addEventListener("userStateChange", loadUserCart);
