function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + ' added to cart!');
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = "Total: ₹0";
    return;
  }

  cartItems.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(div);
    total += item.price;
  });

  totalDisplay.textContent = "Total: ₹" + total;
}

function confirmOrder() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let history = JSON.parse(localStorage.getItem('history')) || [];
  history.push({ items: cart, date: new Date().toLocaleString() });
  localStorage.setItem('history', JSON.stringify(history));

  localStorage.removeItem('cart');
  alert("Order confirmed! Thank you!");
  window.location.href = "index.html";
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const historyList = document.getElementById('history-list');

  if (history.length === 0) {
    historyList.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  historyList.innerHTML = "";
  history.forEach((order, index) => {
    const div = document.createElement('div');
    div.style.marginBottom = "20px";
    div.innerHTML = `<strong>Order #${index + 1}</strong><br>Date: ${order.date}<br>Items:<ul>` +
      order.items.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('') +
      `</ul><hr>`;
    historyList.appendChild(div);
  });
}

if (window.location.pathname.includes("cart.html")) {
  loadCart();
}

if (window.location.pathname.includes("history.html")) {
  loadHistory();
}