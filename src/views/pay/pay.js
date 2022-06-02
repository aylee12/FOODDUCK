import * as Api from '/api.js';

const cartPriceSum = document.querySelector(".cart-price-sum");
const payButton = document.querySelector("#payButton");

// 주문 가격 총 계산하기 
const paySumPriceLoaded = () => {
  const getCartStorage = JSON.parse(localStorage.getItem("cart"));
  const sumPrice = getCartStorage.reduce((acc , cur) => acc + cur.price * cur.quantity , 0);
  cartPriceSum.innerHTML = sumPrice;
}

// 구매하기를 누를시에 Storage를 전부 비워주고 홈으로 이동시킨다.
const handlePayBtn = (e) => {
  e.preventDefault();
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
    /* 결제가 완료되면 아래와 같은 형식으로 데이터를 보내드리면 된다. 
    userId(로그인한 사용자),
    orderName(주문자명),
    phoneNumber(휴대폰번호),
    address(주문자주소),
    orderList(주문 목록) -> 데이터 형식 [{productId, name, quantity}] 으로 보내주셨으면 합니다,
    totalPrice(총액),

    const data = {
      userId,
      orderName,
      phoneNumber,
      address,
      orderList : [
        {
          productId,
          name,
          quantity
        }
      ],
      totalPrice
    }
    */ 
  } catch(e) {
    console.log(e.message);
  }
  paySumPriceLoaded();
}
payButton.addEventListener("click" , handlePayBtn);

init();
