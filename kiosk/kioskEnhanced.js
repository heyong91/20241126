/* 빈 카트 상자 만들기 */
const cart = {};
// = : 오른쪽의 결과를 왼쪽에 넣어라(찾아온 결과를 박스에 담아라) // const : 데이터를 저장할 새로운 박스를 만들겠다 // const menu : 이 박스를 menu 라고 부를게 // 뭘 넣을지는 = 오른쪽에서 결정돼 // {} : 빈 상자

//

/* HTML의 특정 부분을 찾기 */
const menu = document.querySelector("#menu");
// document.querySelector("#menu") : HTML 안에서 id="menu"라는 이름을 가진 친구를 찾아와라 // querySelector()는 "찾는다"는 의미
const cartDisplay = document.querySelector("#cart-items");
const totalDisplay = document.querySelector("#total");
const resetButton = document.querySelector("#reset");
const orderButton = document.querySelector("#order");
const popup = document.querySelector("#popup");
const closePopup = document.querySelector("#closePopup");

/* 메뉴 클릭 이벤트 */
menu.addEventListener("click", (event) => { 
  // addEventListener : 이벤트를 듣겠다 // menu.addEventListener("click" : 메뉴에서 클릭했을 때 이걸 해라 // (event) : 클릭했을 때 일어나는 결과의 자리
  
  /* 클릭한 버튼이 어떤건지 확인하기 */
  const target = event.target.closest(".menu-item");
  // event.target : 클릭한 버튼 // closest() : 그 안에 글씨나 이미지 등 어디가 클릭됐더라도 주변에서 조건에 맞는 가장 가까운 부모 요소(div)를 찾아라
  if (target) {
    /* 아이템 이름과 가격 가져오기 */
    const name = target.getAttribute("data-name");
    // getAttribute() : HTML 속성 값을 가져오는 함수
    const price = parseInt(target.getAttribute("data-price"), 10);
    // parseInt() : 글자를 숫자로 바꿔주는 함수 // 마지막에 10을 적은 이유는 10진수라는 걸 알려주기 위해서임

    /* 장바구니 데이터 추가 */
    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price, count: 1 };
    }
    // 장바구니에 이미 있는 물건이면 개수를 늘리고, 없으면 새로 추가해라 // count++ : 현재 값에 1을 더해라

    updateCart();
    // 장바구니 데이터를 읽어서 화면에 보여주는 역할을 함, 데이터와 화면을 동기화하는 핵심 함수
  }
});

function updateCart() {
  cartDisplay.innerHTML = "";
  // cartDisplay.innerHTML = ""; : 새로운 장바구니 내용을 추가하기 전에 이전 내용을 모두 지움
  let total = 0;
  // 시작값은 0으로 설정

  for (const name in cart) {
    // for...in : 객체(cart)의 모든 항목을 하나씩 반복할 때 사용하는 반복문 // cart : 장바구니 데이터가 들어 있는 상자 // name : cart 안의 각 항목 이름(키)을 하나씩 가져오는 역할
    const { price, count } = cart[name];
    // 장바구니에서 물건의 가격(price)과 수량(count)을 꺼내와라
    total += price * count;
    // total += ... : total에 계산된 값을 더한다

    const item = document.createElement("div");
    // HTML에 새로운 div(박스)를 만들어서 장바구니 아이템을 추가할 준비를 해라
    item.classList.add("cart-item");
    // CSS 스타일을 적용하거나 특정 작업을 쉽게 하기 위해 새로 만든 박스에 cart-item라는 이름표(클래스)를 붙여라

    // 아이템 이름, 버튼, 수량 배치
    item.innerHTML = `
      <span class="item-name">${name}</span>
      <div class="item-controls">
        <button onclick="changeCount('${name}', -1)">-</button>
        <span class="item-count">${count}</span>
        <button onclick="changeCount('${name}', 1)">+</button>
      </div>
    `;
    // item.innerHTML = ... : 새로 만든 박스에 물건 이름, 수량, 버튼 등을 추가
    // <span class="item-name">${name}</span> : 물건 이름을 표시해
    // <button onclick="changeCount('${name}', -1')">-</button> : - 버튼을 눌렀을 때 수량을 줄이는 버튼
    // <span class="item-count">${count}</span> : 현재 수량을 화면에 보여줘
    // <button onclick="changeCount('${name}', 1')">+</button> : + 버튼을 눌렀을 때 수량을 늘리는 버튼
    cartDisplay.appendChild(item);
    // 새로 만든 박스(item)를 HTML 화면에 장바구니 영역에 추가
  }

  totalDisplay.textContent = `₩ ${total.toLocaleString()}`;
  // totalDisplay.textContent = ... : 계산한 합계를 화면에 보여주는 역할 // total.toLocaleString() : 숫자를 3자리마다 쉼표로 나눠서 보여줘

}

// 수량 변경 함수
function changeCount(name, delta) {
  // 장바구니에서 물건의 수량을 늘리거나 줄이는 역할 // delta : 수량을 얼마나 늘리거나 줄일지를 나타내는 숫자(+1이면 수량을 1 늘려라, -1이면 수량을 1 줄여라)
  if (cart[name]) {
    // 장바구니에 이 물건이 있니?
    cart[name].count += delta;
    // cart[name].count : 현재 수량 // 현재 수량에 delta 값을 더해라
    if (cart[name].count <= 0) delete cart[name];
    // 물건의 수량이 0보다 작아지거나 0이 되면 장바구니에서 없애라
    updateCart();
  }
};

resetButton.addEventListener("click", () => {
  for (const key in cart) delete cart[key];
  updateCart();
});

orderButton.addEventListener("click", () => {
  popup.style.display = "block";
  // style.display = "block" : 팝업을 화면에 보이도록 설정해
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  resetButton.click();
  // 주문 후 초기화 버튼 강제 실행
});
