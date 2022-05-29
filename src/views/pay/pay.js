const cartPriceSum = document.querySelector(".cart-price-sum");

// 주문 가격 총 계산하기 
const paySumPriceLoaded = () => {
  const getCartStorage = JSON.parse(localStorage.getItem("cartExample"));
  const sumPrice = getCartStorage.reduce((acc , cur) => acc + cur.price , 0);
  cartPriceSum.innerHTML = sumPrice;
}

// 실행 순서 정리 
const init = () => {
  paySumPriceLoaded();
}

init();
