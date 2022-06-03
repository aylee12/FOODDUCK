import * as Api from '/api.js';

const userCartCancel = document.querySelectorAll(".user_cart_cancel");
const dbCartList = document.querySelector(".db_cart_list_container");

// 즉시실행함수
(async() => {
  const user = await Api.get("/api/getUserInfo");
  console.log(user);
  const orderList = await Api.get(`/api/orderList`,`?userId=${user.userId}`);
  console.log(orderList);
  orderList.forEach(items =>{
    const {status ,createdAt} = items;

    dbCartList.innerHTML += 
    `
    <div class="db_cart_list_items1">${createdAt.split("T")[0]}</div>
    <div class="db_cart_list_items2">아이보리 니트 1개</div>
    <div class="db_cart_list_items3">${status}</div>
    <div class="db_cart_list_items4">
      <button type="button" class="user_cart_cancel">주문 취소</button>
    </div>
    `
  })
  
})();

// 삭제버튼을 누르면 데이터를 삭제해주기 
userCartCancel.forEach(cancleBtn => {
  cancleBtn.addEventListener("click" , () => {
    cancleBtn.parentElement.parentElement.remove();
  });
});