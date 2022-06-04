import * as Api from '/api.js';

const dbCartListWrap = document.querySelector('.db_cart_list_wrap');

// 즉시 실행 함수
(async () => {
  /**** 접근 권한 확인(관리자) ****/
  try {
    await Api.get('/api/admin');
  } catch (error) {
    new Swal({
      title: '접근권한이 없습니다.',
      text: `${error.message}`,
      icon: 'error',
    }).then(function () {
      window.location.href = '/login';
    });
  }

  const allCartData = await Api.get('/api/orderList');

  allCartData.forEach((items) => {
    const { createdAt, orderName, totalPrice } = items;
    let tempCart = '';

    dbCartListWrap.innerHTML += `
    <div class="db_cart_list_container">
      <div class="db_cart_list_items1">${orderName}</div>
      <div class="db_cart_list_items2">
        ${items.orderList
          .map((i) => {
            tempCart += `${i.productId.name}/${i.quantity}개<br>`;
          })
          .join('')}
        ${tempCart}
      </div>
      <div class="db_cart_list_items3">${createdAt.split('T')[0]}</div>
      <div class="db_cart_list_items4">${totalPrice}</div>
    </div>
    `;
  });
})();
