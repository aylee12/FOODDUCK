// localStorage에 데이터를 가상으로 넣어봤습니다. 데이터가 넘어오면 지우겠습니다.
const arr = [];
const obj1 = {
    price:1000,
    brand:"마켓컬리1",
    name:"커피1",
    quantity:1
};
arr.push(obj1);

const obj2 = {
  price:2000,
  brand:"마켓컬리2",
  name:"커피2",
  quantity:2
};
arr.push(obj2);

const obj3 = {
  price:3000,
  brand:"마켓컬리3",
  name:"커피3",
  quantity:3
};
arr.push(obj3);


localStorage.setItem("cartExample" , JSON.stringify(arr));