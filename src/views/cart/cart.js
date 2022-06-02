// 합계 관련된 것들 
const itemsQuantity = document.querySelectorAll(".cart-items-quantity-input");
const btnMinus = document.querySelectorAll(".cart-btn-minus");
const btnPlus = document.getElementsByClassName("cart-btn-plus");
const cartItemsPrice = document.getElementsByClassName("cart-items-price");
const cartPriceSum = document.querySelector('.cart-price-sum');
const cartItemsList = document.querySelectorAll(".cart-items-list");

// checkbox 관련된 것들 
const allCheck = document.querySelector('.all-check');
const selectCheck = document.querySelector('.select-check');
const checkOne = document.querySelectorAll('.check-one');

// 버튼 관련 
const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click" , (e) => {
  e.preventDefault();
  location.href = '/pay'
});

// 총 합계 구하기 
const sumPrice = () => {
  let sum = 0; 
  const cartPriceArray = [...cartItemsPrice];
  cartPriceArray.forEach(items => sum += Number(items.innerHTML));
  cartPriceSum.innerHTML = sum;
}

// 증감 버튼 구현하기 (선택 삭제 이후에 0번째 버튼을 가리켜야 되는데 1번째 버튼을 자꾸 가리킴)
for(let i = 0 ; i < btnPlus.length;i++){
  btnPlus[i].addEventListener("click" , () =>{
    itemsQuantity[i].value = Number(itemsQuantity[i].value) + 1;
    cartItemsPrice[i].innerHTML = itemsQuantity[i].value * cartItemsPrice[i].getAttribute("data-value");
    sumPrice();
  })
}

for(let i = 0 ; i<btnPlus.length; i++){
  btnMinus[i].addEventListener("click" , () =>{
    itemsQuantity[i].value -= 1;
    // 0보다 작을때는 항상 0으로 초기화한다.
    if(itemsQuantity[i].value <= 0){
      itemsQuantity[i].value = 0;
    }
    cartItemsPrice[i].innerHTML = itemsQuantity[i].value * cartItemsPrice[i].getAttribute("data-value");
    sumPrice();
  })
}

allCheck.addEventListener("click" , () => {
  checkOne.forEach(check => {
    const checkFilter = check.checked ? false : true;
    check.checked = checkFilter;
  })
});

// 선택 삭제 
selectCheck.addEventListener("click" , () => {
  const tempCartArray = [];
  // NodeList를 배열로 변경 
  const checkArray = Array.from(checkOne);
  // checkArray가 check상태이면 그 index를 tempCartArray에 담고 checkFilter로 거른다.
  const checkFilter = checkArray.filter(check => {
    return check.checked && tempCartArray.push(checkArray.indexOf(check));
  });

  // filter된 곳에서 요소를 지우고 다시 합계를 바꿔줘야함 그리고 localStorage에서 지워야함 
  // 현재는 check된것만 골라서 그에 해당하는 cart-items-list를 지웠다.
  checkFilter.forEach(items => items.parentElement.parentElement.remove());

  const cartJSON = JSON.parse(localStorage.getItem("cart"));
  // tempCartArray에 있는 index에 해당하는 것을 cartJSON에서 지운다. 
  for(let i = 0 ; i < tempCartArray.length; i++){
    cartJSON.splice(tempCartArray[i] - i ,1);
  }
  sumPrice();
  // 제거하고 localStorage에 다시 담는다
  localStorage.setItem("cart" , JSON.stringify(cartJSON));
});

