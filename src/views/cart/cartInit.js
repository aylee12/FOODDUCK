// // // 카트 상품 업데이트 하기 ( 로컬에서 받아와서 카트 상품 업데이트 하기 )
const cartGetItems = JSON.parse(localStorage.getItem("cartExample"));

const cartInit = () => {
  const cartList = document.querySelector(".cart-list");
  cartGetItems.map(items => {
      cartList.innerHTML +=
      `
      <div class="cart-items-list">
      <div class="cart-items-checkbox">
        <input type="checkbox" name="" id="">
      </div>
      <div class="cart-items-img">
        <img src="" alt="">
      </div>
      <div class="cart-items-content">
        <p>${items.brand}</p>
        <p>${items.name}</p>
        <div><span class="cart-items-price">${items.price}</span>원</div>
      </div>
      <div class="cart-items-btn">
        <input type="text" value=${items.quantitiy} class="cart-items-quantity-input" readonly>
        <div class="cart-plus-minus-wrap">
          <input type="button" class="cart-btn-minus">
          <input type="button" class="cart-btn-plus">
        </div>
      </div>
    </div>
    `
  })
}

const btnMinus = document.querySelector(".cart-btn-minus");
console.log(btnMinus);