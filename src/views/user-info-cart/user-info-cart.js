const userCartCancel = document.querySelectorAll(".user_cart_cancel");

// 삭제버튼을 누르면 데이터를 삭제해주기 
userCartCancel.forEach(cancleBtn => {
  cancleBtn.addEventListener("click" , () => {
    cancleBtn.parentElement.parentElement.remove();
  });
});