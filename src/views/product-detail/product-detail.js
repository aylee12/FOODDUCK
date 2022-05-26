const btn_buy_now = document.getElementById('btn_buy_now');
const btn_cart = document.getElementById('btn_cart');

const id = ;
const img = document.getElementById("product_img");
const name = document.getElementById("product_name");
const company = document.getElementById("product_company");
const price = document.getElementById("product_price");
const description = document.getElem
window.onload = function() {
  // 제품 데이터 가져오기
  // fetch('api 주소')
  //   .then(res => res.json())
  //   .then(res => {
  //     // data를 응답 받은 후의 로직
  //     document.getElementById("product_img").innerText = res;
  //     document.getElementById("product_name").innerText = res;
  //     document.getElementById("product_price").innerText = res;
  //     document.getElementById("prodcut_origin").innerText = res;
  //     document.getElementById("product_description").innerText = res;
  //   });

  const org_elem = document.getElementById("product_price");
  let org = parseInt(org_elem.innerText);
  document.getElementById("sum").innerText = org;
}

function count(type) {
  const n_elem = document.getElementById("quantity");
  let n = parseInt(n_elem.value);
  
  const org_elem = document.getElementById("product_price");
  let org = parseInt(org_elem.innerText);

  if (type === "plus") {
    n = n + 1;
  } else if (type === "minus" && n > 1) {
    n = n - 1;
  }
  
  n_elem.value = n;
  
  document.getElementById("sum").innerText = org * n;
}

function addToCartHandler() {
  // 제품 아이디, 이미지, 이름, 가격, 제조사, 수량
  const id = ;
  const img = document.getElementById("product_img").innerText;
  const name = document.getElementById("product_name").innerText;
  const company = document.getElementById("").innerText;
  const price = document.getElementById("product_price").innerText;
  const quantity = document.getElementById("quantity").innerText;

  const product = {id: id, img: img, name: name, price: price, quantity: quantity, total_price: total_price};

  localStorage.setItem('cart', JSON.stringify(product));
  alert("장바구니에 추가되었습니다.");
}

btn_buy_now.addEventListener('click', buyHandler)
btn_cart.addEventListener('click', addToCartHandler)