// 카트 상품 업데이트 하기 ( 로컬에서 받아와서 카트 상품 업데이트 하기 )
const cartGetItems = JSON.parse(localStorage.getItem("cartExample"));

// 카트 상품이 들어오면 다시 합계 확인해보기! 
const cartInit = () => {
  const cartList = document.querySelector(".cart-list");
  let sumPriceTag = 0;
  cartGetItems.map(items => {
      const {img , company , name , price , quantity} = items;
      
      cartList.innerHTML +=
      `
      <div class="cart-items-list">
        <div class="cart-items-checkbox">
          <input type="checkbox" class="check-one">
        </div>
        <div class="cart-items-img">
          <img src="${img}" alt="">
        </div>
        <div class="cart-items-content">
          <p>${company}</p>
          <p>${name}</p>
          <div><span class="cart-items-price" data-value="${price}">${price*quantity}</span>원</div>
        </div>
        <div class="cart-items-btn">
          <input type="text" value=${quantity} class="cart-items-quantity-input" readonly>
          <div class="cart-plus-minus-wrap">
            <input type="button" class="cart-btn-minus">
            <input type="button" class="cart-btn-plus">
          </div>
        </div>
      </div>
    `
    sumPriceTag += price * quantity;
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