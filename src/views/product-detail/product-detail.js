import * as Api from '/api.js';

const product_img = document.getElementById("product_img");
// product_name의 dataset에 role(사용자 권한) 들어감
const product_name = document.getElementById("product_name");
const product_company = document.getElementById("product_company");
const product_price = document.getElementById("product_price");
const product_description = document.getElementById("product_description");
const product_quantity = document.getElementById("quantity");
const product_total_price = document.getElementById("product_total_price");

// url에서 productId 찾기 -> 제품정보 가져올 때 사용
const product_url = window.location.pathname.split('/');
const productId = product_url[product_url.length - 2];

const btn_cnt_down = document.getElementById("btn_cnt_down");
const btn_cnt_up = document.getElementById("btn_cnt_up");

const btn_add_to_cart = document.getElementById("btn_add_to_cart");
const btn_buy_now = document.getElementById("btn_buy_now");

// 유저 권한 넣을 곳
let role = "";

window.onload = async function () {
  // 제품 데이터 가져오기
  try {
    const res = await Api.get('/api/productListId', productId);
    product_img.src = res.img;
    product_name.innerText = res.name;
    product_company.innerText = res.company;
    product_price.dataset.value = parseInt(res.price);
    product_description.innerText = res.description;
  }
  catch (err) {
    console.error(err.stack);

    new Swal({
      title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
      text: `${err.message}`,
      icon: 'error'
    }).then(function () {
      window.location.href = `/`;
    });
  }

  // token 있는지 검사
  const token = localStorage.getItem('token');
  if (token) {
    // 토큰 있으면 - 유저 정보에서 role(권한) 가져오기
    try {
      const user = await Api.get('/api/getuserInfo');
      role = user.role;
    }
    catch (err) {
      console.error(err.stack);

      new Swal({
        title: '문제가 발생하였습니다. \n확인 후 다시 시도해 주세요',
        text: `${err.message}`,
        icon: 'error'
      }).then(function () {
        window.location.href = `/`;
      });
    }

    // 최근 본 상품 추가
    const state = JSON.parse(sessionStorage.getItem("recent") || "[]");
    let not_in_recent = true;

    if (state.length != 0) {
      const recent_zone = document.querySelector(".recent_zone");

      for (let i = state.length - 1; i > 0; i--) {
        if (i < state.length - 5) {
          break;
        }
        const recent_item_container = document.createElement("div");
        const recent_item = document.createElement("img");
        recent_item.setAttribute("src", state[i].img);
        recent_item.setAttribute('onclick', `location.href='/product/detail/${state[i].id}'`);
        recent_item_container.appendChild(recent_item);
        recent_zone.appendChild(recent_item_container);

        if (productId === state[i].id) {
          not_in_recent = false;
        }
      }
    }

    if (not_in_recent) {
      const data = {
        id: productId,
        img: product_img.src,
      };

      const recent = [...state, data];
      sessionStorage.setItem("recent", JSON.stringify(recent));
    }
  }

  product_price.innerText = numberWithCommas(product_price.dataset.value);
  product_total_price.dataset.value = product_price.dataset.value;
  product_total_price.innerText = product_price.innerText;
  adminControl();
}

// 회원 role이 admin이면 수정, 삭제 버튼 생성
function adminControl() {

  if (role === "admin") {
    const btn_admin_zone = document.querySelector(".btn_admin_zone")

    // 수정 버튼 생성
    const btn_edit = document.createElement("button");
    btn_edit.setAttribute("id", "btn_edit");
    const btn_edit_text = document.createTextNode("제품 수정");
    btn_edit.appendChild(btn_edit_text);
    btn_admin_zone.appendChild(btn_edit);

    // 삭제 버튼 생성
    const btn_del = document.createElement("button");
    btn_del.setAttribute("id", "btn_del");
    const btn_del_text = document.createTextNode("제품 삭제");
    btn_del.appendChild(btn_del_text);
    btn_admin_zone.appendChild(btn_del);

    // 버튼 클릭 이벤트
    btn_edit.addEventListener("click", editHandler);
    btn_del.addEventListener("click", delHandler);
  }
}

// 가격 단위 표현
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 수량 변경
function cnt_down() {
  let n = parseInt(product_quantity.value);
  let org_price = parseInt(product_price.dataset.value);

  if (n > 1) {
    n -= 1;
  }

  quantity.value = n;
  product_total_price.dataset.value = org_price * n;
  product_total_price.innerText = numberWithCommas(product_total_price.dataset.value);
}

function cnt_up() {
  let n = parseInt(product_quantity.value);
  let org_price = parseInt(product_price.dataset.value);

  n = n + 1;
  quantity.value = n;
  product_total_price.dataset.value = org_price * n;
  product_total_price.innerText = numberWithCommas(product_total_price.dataset.value);
}


// 제품수정 이벤트핸들러 -> 제품수정 페이지로 이동
function editHandler() {
  Swal.fire({
    title: '제품을 수정하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '네',
    denyButtonText: `아니요`,
  }).then((result) => {
    if (result.isConfirmed) {
      location.href = `/product/edit/${productId}`;
    } else if (result.isDenied) {
      Swal.fire('수정이 취소되었습니다.', '', 'info')
    }
  })
}

// 제품삭제 이벤트핸들러
function delHandler(e) {
  e.preventDefault();

  Swal.fire({
    title: '제품을 삭제하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '네',
    denyButtonText: `아니요`,
  }).then((result) => {
    if (result.isConfirmed) {
      const data = {
        id: productId,
        img: product_img.src,
        name: product_name.innerText,
        price: parseInt(product_price.dataset.value),
        company: product_company.innerText,
        description: product_description.innerText
      };

      try {
        Api.delete('/api/productDelete', productId, data);

        new Swal({
          title: '제품이 삭제되었습니다.',
          icon: 'success'
        }).then(function () {
          window.location.href = "/";
        });
      }
      catch (err) {
        console.error(err.stack);

        new Swal({
          title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
          text: `${err.message}`,
          icon: 'error'
        }).then(function () {
          window.location.href = `/product/detail/${productId}`;
        });
      }
    } else if (result.isDenied) {
      Swal.fire('삭제가 취소되었습니다.', '', 'info')
    }
  })
}

// 구매, 장바구니 모두 일단 상품을 localstorage cart에 넣음
// 중복 검사 -> localStorage에 배열로 제품 아이디, 이미지, 이름, 가격, 제조사, 수량 추가
function cartHandler(e) {
  let not_in_cart = true;
  const state = JSON.parse(localStorage.getItem("cart") || "[]");

  if (state.length !== 0) {
    for (let i = 0; i < state.length; i++) {
      if (state[i].id === productId) {
        not_in_cart = false;
        break;
      }
    }
  }

  // 중복 없을 시 제품 추가 -> 이동 권유
  if (not_in_cart) {
    const data = getData();
    const cart = [...state, data];
    localStorage.setItem("cart", JSON.stringify(cart));

    // 바로구매에서 발생한 이벤트인 경우 구매창으로 이동, 아닌 경우 장바구니로 이동 권유
    if (e.path[0].id === "btn_buy_now") {
      location.href = "/pay";
    }

    else {
      Swal.fire({
        title: '장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?',
        showDenyButton: true,
        confirmButtonText: '네',
        denyButtonText: `아니요`,
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = "/cart";
        }
      })
    }
  }

  // 중복일 시 추가 X -> 이동 권유
  else {
    Swal.fire({
      title: '이미 장바구니에 담긴 제품입니다. 장바구니로 이동하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: '네',
      denyButtonText: `아니요`,
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "/cart";
      }
    })
  }
}

function getData() {
  const data = {
    id: productId,
    img: product_img.src,
    name: product_name.innerText,
    price: parseInt(product_price.dataset.value),
    company: product_company.innerText,
    description: product_description.innerText,
    quantity: parseInt(product_quantity.value)
  };
  return data;
}

btn_cnt_down.addEventListener("click", cnt_down);
btn_cnt_up.addEventListener("click", cnt_up);

btn_buy_now.addEventListener("click", cartHandler);
btn_add_to_cart.addEventListener("click", cartHandler);