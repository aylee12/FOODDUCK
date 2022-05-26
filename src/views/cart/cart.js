const itemsQuantity = document.querySelector(".cart-items-quantity-input");
const btnMinus = document.querySelector(".cart-btn-minus");
const btnPlus = document.querySelector(".cart-btn-plus");
// const cartItemsPrice = document.querySelector(".cart-items-price");

console.log(btnMinus);


// local에서 카트 받아오는거 구현하고 다시 보기 
btnMinus.addEventListener("click" , () => {
  itemsQuantity.value -= 1;
  // 0보다 작을때는 항상 0으로 초기화한다.
  if(itemsQuantity.value <= 0){
    itemsQuantity.value = 0;
  }
})
btnPlus.addEventListener("click" , () => {
  itemsQuantity.value = Number(itemsQuantity.value) + 1;
})

// 상품 가격 증감



