const product_id = document.getElementById("product_id");
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
  // 제품 데이터 가져오기
  fetch("api 주소")
    .then(res => res.json())
    .then(res => {
      product_name.dataset.id = res.id;
      product_img.innerText = res.img;
      product_name.innerText = res.name;
      product_company.innerText = res.company;
      product_price.innerText = res.price;
      product_description.innerText = res.description;
    });

    //유저 데이터 가져오기
    fetch("api 주소")
    .then(res => res.json())
    .then(res => {
      // 유저가 회원인지 관리자인지 확인할 값을 수정 버튼의 권한 속성에 넣기
      btn_product_edit.dataset.user_type = res.type;
      
    });
    
    product_total_price.innerText = product_price.innerText;
    editBtnControl();
}

// 제품수정 버튼: 관리자만 보이게
function editBtnControl() {
  if (btn_product_edit.dataset.user_type === "admin") {
    btn_product_edit.style.display = "block";
  }
}

function editHandler() {
  location.href = "/* 상품수정 창 url */";
}

// 수량 변경
function count(type) {
  let n = parseInt(product_quantity.value);
  let org_price = parseInt(product_price.innerText);
  
  if (type === "plus") {
    n = n + 1;
  } else if (type === "minus" && n > 1) {
    n = n - 1;
  }
  
  quantity.value = n;
  product_total_price.innerText = org_price * n;
}


// 구매 이벤트핸들러
function buyNowHandler() {
  // 제품 아이디, 이미지, 이름, 가격, 제조사, 수량
  const product = {
    id: product_id.innerText, 
    img: product_img.innerText, 
    name: product_name.innerText, 
    price: product_price.innerText, 
    company: product_company.innerText, 
    quantity: product_quantity
  };
  
  sessionlStorage.setItem("buy_now", JSON.stringify(product));
  location.href = "/* 구매 창 url */";
}


// 장바구니 이벤트핸들러
function addToCartHandler() {
  // 제품 아이디, 이미지, 이름, 가격, 제조사, 수량
  const product = {
    id: product_id.innerText, 
    img: product_img.innerText, 
    name: product_name.innerText, 
    price: product_price.innerText, 
    company: product_company.innerText, 
    quantity: product_quantity
  };
  cart.push(product);

  sessionStorage.setItem("cart", JSON.stringify(cart));
  alert("장바구니에 추가되었습니다.");
}

btn_product_edit.addEventListener("click", editHandler);
btn_buy_now.addEventListener("click", buyNowHandler);
btn_add_to_cart.addEventListener("click", addToCartHandler);