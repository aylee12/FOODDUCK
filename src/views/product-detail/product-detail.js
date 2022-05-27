const product_img = document.getElementById("product_img");
const product_name = document.getElementById("product_name");
const product_company = document.getElementById("product_company");
const product_price = document.getElementById("product_price");
const product_description = document.getElementById("product_description");
const product_quantity = document.getElementById("quantity");
const product_total_price = document.getElementById("product_total_price");

const btn_product_edit = document.getElementById("btn_product_edit");
const btn_buy_now = document.getElementById("btn_buy_now");
const btn_add_to_cart = document.getElementById("btn_add_to_cart");

let cart = [];

window.onload = function() {
  // 상품 데이터 가져오기
  fetch("api 주소")
      .then(res => res.json())
      .then(res => {
          product_name.dataset.id = res.id;
          product_img.innerText = res.img;
          product_name.innerText = res.name;
          product_company.innerText = res.company;
          product_price.dataset.value = res.price;
          product_description.innerText = res.description;
      });

  //유저 데이터 가져오기
  fetch("api 주소")
      .then(res => res.json())
      .then(res => {
          // 유저가 회원인지 관리자인지 확인할 값을 수정 버튼의 권한 속성에 넣기
          btn_product_edit.dataset.role = res.role;
      });

  product_price.innerText = numberWithCommas(product_price.dataset.value);
  product_total_price.dataset.value = product_price.dataset.value;
  product_total_price.innerText = product_price.innerText;
  editBtnControl();
}

// 가격 단위 표현
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 제품수정 버튼: 관리자만 보이게
function editBtnControl() {
  if (btn_product_edit.dataset.role === "admin") {
    btn_product_edit.style.display = "block";
  }
}

function editHandler() {
  location.href = "/* 상품수정 창 url product-edit?*/";
}

// 수량 변경
function count(type) {
  let n = parseInt(product_quantity.value);
  let org_price = parseInt(product_price.dataset.value);
  
  if (type === "plus") {
    n = n + 1;
  } else if (type === "minus" && n > 1) {
    n = n - 1;
  }
  
  quantity.value = n;
  product_total_price.dataset.value = org_price * n;
  product_total_price.innerText = numberWithCommas(product_total_price.dataset.value);
}


// 구매 이벤트핸들러
// sessionStorage에 배열로 제품 아이디, 이미지, 이름, 가격, 제조사, 수량 추가
function buyNowHandler() {
  // 제품 아이디, 이미지, 이름, 가격, 제조사, 수량
  const product = {
    id: product_name.dataset.id, 
    img: product_img.innerText, 
    name: product_name.innerText, 
    price: product_price.dataset.value, 
    company: product_company.innerText, 
    quantity: product_quantity
  };
  
  sessionStorage.setItem("buy_now", JSON.stringify(product));
  location.href = "/pay";
}


// 장바구니 이벤트핸들러
// 중복 검사 -> sessionStorage에 배열로 제품 아이디, 이미지, 이름, 가격, 제조사, 수량 추가
function addToCartHandler() {
  let state_result = true;
  const state = JSON.parse(sessionStorage.getItem("cart"));
  
  // 장바구니 중복 확인
  if (state !== null) {
    for (let i = 0; i < state.length; i++) {
      if (state[i].id === product_name.dataset.id) {
        state_result = false;
        break;
      }
    }
  }
  // 중복 없을 시 상품 추가 -> 이동 권유
  if (state_result) {
    const product = {
      id: product_name.dataset.id, 
      img: product_img.innerText, 
      name: product_name.innerText, 
      price: product_price.dataset.value, 
      company: product_company.innerText, 
      quantity: product_quantity
    };

    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    move_result = confirm("장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?");
  } 
  // 중복일 시 추가 X -> 이동 권유
  else {
    move_result = confirm("이미 장바구니에 담긴 상품입니다. 장바구니로 이동하시겠습니까?");
  }
  //이동 권유 결과 
  if (move_result) {
    location.href = "/cart";
  }
}

btn_product_edit.addEventListener("click", editHandler);
btn_buy_now.addEventListener("click", buyNowHandler);
btn_add_to_cart.addEventListener("click", addToCartHandler);