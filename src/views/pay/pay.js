import * as Api from '/api.js';

/**** 접근 권한 확인(유저) ****/
try {
  await Api.get('/api/user');
} catch (error) {
  new Swal({
    title: '로그인이 필요한 페이지입니다.',
    text: `${error.message}`,
    icon: 'error',
  }).then(function () {
    window.location.href = '/login';
  });
}

const cartPriceSum = document.querySelector('.cart-price-sum');
const payButton = document.querySelector('#payButton');

// 주문 가격 총 계산하기
const paySumPriceLoaded = () => {
  const getCartStorage = JSON.parse(localStorage.getItem('cart'));
  const sumPrice = getCartStorage.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  cartPriceSum.innerHTML = sumPrice;
};
const user = await Api.get('/api/getUserInfo');

// 구매하기를 누를시에 Storage를 전부 비워주고 홈으로 이동시킨다.
const handlePayBtn = async (e) => {
  e.preventDefault();
  // 카트 정보를 가져와서 필요한 부분만 추출한다.
  const cartStorage = JSON.parse(localStorage.getItem('cart'));
  console.log(cartStorage);
  const orderStorage = cartStorage.map((el) => {
    const { id: productId, name, quantity } = el;
    return { productId, name, quantity };
  });
  // 비구조화 할당 적용
  const { fullName, phoneNumber, userId } = user;
  const { postalCode, address1, address2, address3 } = user.address;

  // 합계 구하기
  const totalPrice = cartStorage.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  const data = {
    userId,
    orderName: fullName, // 유저 이름
    phoneNumber, // 핸드폰 번호
    address: {
      postalCode,
      address1,
      address2,
      address3,
    },
    orderList: orderStorage,
    totalPrice,
  };
  const userCart = await Api.post('/api/orderAdd', data);
  console.log(userCart);

  localStorage.removeItem('cart');
  window.location.href = '/';
  alert('결제가 완료되었습니다.');
};

const postCodeInput = document.querySelector('#postcode');
const addressInput = document.querySelector('#address');
const detailAddressInput = document.querySelector('#detailAddress');
const extraAddressInput = document.querySelector('#extraAddress');

const fullNameInput = document.querySelector('#fullNameInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');

// 실행 순서 정리
const init = async () => {
  try {
    console.log('리턴된 유저 데이터', user);
    // 유저의 데이터들이 담긴다.
    fullNameInput.value = `${user.fullName}`;
    phoneNumberInput.value = `${user.phoneNumber}`;
    postCodeInput.value = `${user.address.postalCode}`;
    addressInput.value = `${user.address.address1}`;
    detailAddressInput.value = `${user.address.address2}`;
    extraAddressInput.value = `${user.address.address3}`;
  } catch (e) {
    console.log(e.message);
  }

  paySumPriceLoaded();
};

init();

payButton.addEventListener('click', handlePayBtn);
