const cart = {};
const menu = document.querySelector("#menu");
const cartDisplay = document.querySelector("#cart-items");
const totalDisplay = document.querySelector("#total");
const resetButton = document.querySelector("#reset");
const orderButton = document.querySelector("#order");
const popup = document.querySelector("#popup");
const closePopup = document.querySelector("#closePopup");

menu.addEventListener("click", (event) => {
  const target = event.target.closest(".menu-item");
  if (target) {
    const name = target.getAttribute("data-name");
    const price = parseInt(target.getAttribute("data-price"), 10);

    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price, count: 1 };
    }

    updateCart();
  }
});

function updateCart() {
  cartDisplay.innerHTML = ""; // 장바구니 초기화
  let total = 0;

  for (const name in cart) {
    const { price, count } = cart[name];
    total += price * count;

    const item = document.createElement("div");
    item.classList.add("cart-item");

    // 아이템 이름, 버튼, 수량 배치
    item.innerHTML = `
      <span class="item-name">${name}</span>
      <div class="item-controls">
        <button onclick="changeCount('${name}', -1)">-</button>
        <span class="item-count">${count}</span>
        <button onclick="changeCount('${name}', 1)">+</button>
      </div>
    `;
    cartDisplay.appendChild(item);
  }

  totalDisplay.textContent = `₩ ${total.toLocaleString()}`;
}

// 수량 변경 함수
function changeCount(name, delta) {
  if (cart[name]) {
    cart[name].count += delta;
    if (cart[name].count <= 0) delete cart[name];
    updateCart();
  }
};

resetButton.addEventListener("click", () => {
  for (const key in cart) delete cart[key];
  updateCart();
});

orderButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  resetButton.click(); // 주문 후 초기화
});
