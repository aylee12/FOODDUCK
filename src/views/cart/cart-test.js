let cartObj = [];

const obj1 = {
  price: 1000,
  quantity:1,
  company:"컬리1",
  name:"아스파라거스1"
}
cartObj.push(obj1);

const obj2 = {
  price: 2000,
  quantity:2,
  company:"컬리2",
  name:"아스파라거스2"
}
cartObj.push(obj2);
const obj3 = {
  price: 3000,
  quantity:3,
  company:"컬리3",
  name:"아스파라거스3"
}
cartObj.push(obj3);

localStorage.setItem("cartExample" ,JSON.stringify(cartObj));
