const cart = [];
const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.getElementById("cartItems");
const addToCartButtons = document.querySelectorAll(".products button");

addToCartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const productCard = btn.closest("div");
    const name = productCard.querySelector("h1").innerText;
    const price = productCard.querySelector(".price").innerText;

    cart.push({ name, price });
    cartCount.innerText = cart.length;
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  cart.forEach(item => {
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