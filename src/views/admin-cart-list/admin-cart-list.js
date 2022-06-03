import * as Api from '/api.js';

const dbCartListWrap = document.querySelector('.db_cart_list_wrap');

// 즉시 실행 함수
(async () => {
  const allCartData = await Api.get('/api/orderList');
  console.log(allCartData);
  
  allCartData.forEach(items => {
    const {createdAt , orderName , totalPrice} = items;
    let tempCart = '';

    dbCartListWrap.innerHTML +=     
    `
    <div class="db_cart_list_container">
      <div class="db_cart_list_items1">${orderName}</div>
      <div class="db_cart_list_items2">
        ${items.orderList.map(i => {
          tempCart+=`${i.productId.name}/${i.quantity}개<br>`
        }).join('')}
        ${tempCart}
      </div>
      <div class="db_cart_list_items3">${createdAt.split("T")[0]}</div>
      <div class="db_cart_list_items4">${totalPrice}</div>
    </div>
    `
  })
})();
