import * as Api from '/api.js';

const cartPriceSum = document.querySelector(".cart-price-sum");
const payButton = document.querySelector("#payButton");

// 주문 가격 총 계산하기 
const paySumPriceLoaded = () => {
  const getCartStorage = JSON.parse(localStorage.getItem("cartExample"));
  const sumPrice = getCartStorage.reduce((acc , cur) => acc + cur.price*cur.quantity , 0);
  cartPriceSum.innerHTML = sumPrice;
}

// 구매하기를 누를시에 Storage를 전부 비워주고 홈으로 이동시킨다.
const handlePayBtn = () => {
  // 요청을 하면 지워주고 
  localStorage.removeItem("cart");
  window.location.href = '/';
  alert("결제가 완료되었습니다.");
}

const postCodeInput = document.querySelector('#postcode');
const addressInput = document.querySelector('#address');
const detailAddressInput = document.querySelector('#detailAddress');
const extraAddressInput = document.querySelector('#extraAddress');

const fullNameInput = document.querySelector('#fullNameInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');

// 실행 순서 정리 
const init = async () => {
  try{
    const user = await Api.get('/api/getUserInfo');
    console.log('리턴된 유저 데이터', user);
    // 유저의 데이터들이 담긴다.
    fullNameInput.value = `${user.fullName}`;
    phoneNumberInput.value = `${user.phoneNumber}`;
    postCodeInput.value = `${user.address.postalCode}`;
    addressInput.value = `${user.address.address1}`;
    detailAddressInput.value = `${user.address.address2}`;
    extraAddressInput.value = `${user.address.address3}`;
  } catch(e) {
    console.log(e.message);
  }
  paySumPriceLoaded();
}
payButton.addEventListener("click" , handlePayBtn);

init();
