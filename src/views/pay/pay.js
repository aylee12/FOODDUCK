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

// 실행 순서 정리 
const init = () => {
  paySumPriceLoaded();
  payButton.addEventListener("click" , handlePayBtn);
}

init();
