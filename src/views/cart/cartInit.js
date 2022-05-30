// 카트 상품 업데이트 하기 ( 로컬에서 받아와서 카트 상품 업데이트 하기 )
const cartGetItems = JSON.parse(localStorage.getItem("cartExample"));

// 카트 상품이 들어오면 다시 합계 확인해보기! 
const cartInit = () => {
  const cartList = document.querySelector(".cart-list");
  let sumPriceTag = 0;
  cartGetItems.map(items => {
      cartList.innerHTML +=
      `
      <div class="cart-items-list">
        <div class="cart-items-checkbox">
          <input type="checkbox" class="check-one">
        </div>
        <div class="cart-items-img">
          <img src="" alt="">
        </div>
        <div class="cart-items-content">
          <p>${items.brand}</p>
          <p>${items.name}</p>
          <div><span class="cart-items-price" data-value="${items.price}">${items.price}</span>원</div>
        </div>
        <div class="cart-items-btn">
          <input type="text" value=${items.quantity} class="cart-items-quantity-input" readonly>
          <div class="cart-plus-minus-wrap">
            <input type="button" class="cart-btn-minus">
            <input type="button" class="cart-btn-plus">
          </div>
        </div>
      </div>
    `
    sumPriceTag += items.price;
  });
  cartList.innerHTML += 
  `
  <hr class="hr-items-line">
  <div class="price-sum-wrap">
    <span class="cart-price-sum">${sumPriceTag}</span>원
  </div>
  `
}
cartInit();