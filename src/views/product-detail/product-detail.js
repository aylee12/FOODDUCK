const product_img = document.getElementById("product_img");
// product_name의 dataset에 role(사용자 권한) 들어감
const product_name = document.getElementById("product_name");
const product_company = document.getElementById("product_company");
const product_price = document.getElementById("product_price");
const product_description = document.getElementById("product_description");
const product_quantity = document.getElementById("quantity");
const product_total_price = document.getElementById("product_total_price");
// url에서 productId 찾기 -> 상품정보 가져올 때 사용
const productId = window.location.pathname.split('/').pop();

const btn_buy_now = document.getElementById("btn_buy_now");
const btn_add_to_cart = document.getElementById("btn_add_to_cart");

let cart = [];

// 회원 role이 admin이면 수정, 삭제 버튼 생성
function adminControl() {
  if (product_name.dataset.role === "admin") {
    const btn_admin_zone =  document.querySelector(".btn_admin_zone")
    // 수정 버튼 생성
    const btn_edit = document.createElement("button");
    const btn_edit_text = document.createTextNode("상품 수정");
    btn_edit.appendChild(btn_edit_text);
    const btn_edit_css = "background-color: white; font-size: 15px; color: #434343; margin: 5px; padding: 7px; border: 2px solid #f5bf4f; border-top-left-radius: 30px; border-top-right-radius: 30px; border-bottom-left-radius: 30px; border-bottom-right-radius: 30px;";
    btn_edit.style.cssText = btn_edit_css;
    btn_admin_zone.appendChild(btn_edit);

    // 삭제 버튼 생성
    const btn_del = document.createElement("button");
    const btn_del_text = document.createTextNode("상품 삭제");
    btn_del.appendChild(btn_del_text);
    const btn_del_css = "background-color: white; font-size: 15px; color: #434343; margin: 5px; padding: 7px; border: 2px solid #ed6a5e; border-top-left-radius: 30px; border-top-right-radius: 30px; border-bottom-left-radius: 30px; border-bottom-right-radius: 30px;";
    btn_del.style.cssText = btn_del_css;
    btn_admin_zone.appendChild(btn_del);

    // hover 따라하기_edit
    btn_edit.addEventListener("mouseover", function() {
      this.style.cssText = 
      "background-color: #f5bf4f; font-size: 15px; color: white; margin: 5px; padding: 7px; border: 2px solid #f5bf4f; border-top-left-radius: 30px; border-top-right-radius: 30px; border-bottom-left-radius: 30px; border-bottom-right-radius: 30px;"
    });
    btn_edit.addEventListener("mouseout", function() {
      this.style.cssText = btn_edit_css;
    });

    // hover 따라하기_del
    btn_del.addEventListener("mouseover", function() {
      this.style.cssText = 
      "background-color: #ed6a5e; font-size: 15px; color: white; margin: 5px; padding: 7px; border: 2px solid #ed6a5e; border-top-left-radius: 30px; border-top-right-radius: 30px; border-bottom-left-radius: 30px; border-bottom-right-radius: 30px;"
    });
    btn_del.addEventListener("mouseout", function() {
      this.style.cssText = btn_del_css;
    });

    // 버튼 클릭 이벤트
    btn_edit.addEventListener("click", editHandler);
    btn_del.addEventListener("click", delHandler);
  }
}

window.onload = function() {
  // 상품 데이터 가져오기
  fetch("URL")
      .then(res => res.json())
      .then(res => {
        product_name.dataset.id = res.productId;
        product_img.src = res.img;
        product_name.innerText = res.productName;
        product_company.innerText = res.company;
        product_price.dataset.value = res.price;
        product_description.innerText = res.description;
      });

  //유저 데이터 가져오기
  fetch("URL")
      .then(res => res.json())
      .then(res => {
          // 유저가 회원인지 관리자인지 확인할 값을 수정 버튼의 권한 속성에 넣기
          product_name.dataset.role = res.role;
      });

  product_price.innerText = numberWithCommas(product_price.dataset.value);
  product_total_price.dataset.value = product_price.dataset.value;
  product_total_price.innerText = product_price.innerText;
  adminControl();
}

// 가격 단위 표현
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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


// 상품수정 이벤트핸들러
function editHandler() {
  const confirm_result = confirm("상품을 수정하시겠습니까?");

  if (confirm_result) {
    location.href =  `/product/edit/:${product_name.dataset.id}`;
  }
}

// 상품삭제 이벤트핸들러
function delHandler() {
  const confirm_result = confirm("상품을 삭제하시겠습니까?");
  
  // 아직 api 없음
  if (confirm_result) {
    fetch("URL", {
      method:"DELETE"})
      .then(res => res.json())
      .then(data => {
        console.log(data);
        location.href =  `../../../`;
      })
      .catch(err => {
        console.log(err);
        alert("상품 삭제에 실패했습니다.");
      });
  }
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

btn_buy_now.addEventListener("click", buyNowHandler);
btn_add_to_cart.addEventListener("click", addToCartHandler);