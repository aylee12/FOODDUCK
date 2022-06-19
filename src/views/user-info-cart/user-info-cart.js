import * as Api from '/api.js';

const dbCartWrap = document.querySelector('.db_cart_list_wrap');
const dbCartList = document.querySelector('.db_cart_list_container');

// 즉시실행함수
(async () => {
  const user = await Api.get('/api/users/info');
  const orderList = await Api.get(`/api/orders`, `?userId=${user.userId}`);
  console.log(orderList);

  orderList.forEach((items) => {
    const { status, createdAt } = items;
    let tempCart = '';

    dbCartWrap.innerHTML += `
    <div class="db_cart_list_container">
      <div class="db_cart_list_items1">${createdAt.split('T')[0]}</div>
      <div class="db_cart_list_items2">
        ${items.orderList
          .map((i) => {
            tempCart += `${i.productId.name}/${i.quantity}개<br>`;
          })
          .join('')}
        ${tempCart}
      </div>
      <div class="db_cart_list_items3">${status}</div>
      <div class="db_cart_list_items4">
        <button type="button" class="user_cart_cancel">주문 취소</button>
      </div>
    </div>
    `;
  });
  const userCartCancel = document.querySelectorAll('.user_cart_cancel');
  console.log(userCartCancel);
  // 삭제버튼을 누르면 데이터를 삭제해주기
  userCartCancel.forEach((cancleBtn, index) => {
    cancleBtn.addEventListener('click', async () => {
      const user = await Api.get('/api/users/info');
      const orderList = await Api.get(`/api/orders`, `?userId=${user.userId}`);
      console.log(user);
      console.log(orderList);
      console.log(index);
      const userCartDelete = await Api.delete(`/api/orders`, `${orderList[index].orderNo}`);

      console.log(userCartDelete);
      console.log('들어와봐');
      cancleBtn.parentElement.parentElement.remove();
    });
  });
})();
