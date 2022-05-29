// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';

const shopping_cart_icon_url = "https://s3.ap-northeast-2.amazonaws.com/res.kurly.com/kurly/ico/2021/cart_white_45_45.svg";
const gallery = document.getElementsByClassName('gallery');
// const list_products = document.getElementById('list_products');
const menu_list = document.querySelectorAll('ul.menu_list li');

// const test = document.getElementById('test');
// test.addEventListener("click", testHandler)
// async function testHandler (e) {
//     e.preventDefault()
//     try {
//         // 상품 추가
//         const res = await Api.get('/api/productListName', data);
//         // alert("상품 판매가 시작되었습니다.");
//         window.location.href = "/product/detail";
//     }
//     catch(err) {
//         console.error(err.stack);
//         alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//     }
// }

for (let i = 1; i < menu_list.length; i++) {
    menu_list[i].addEventListener('click', async (e) => {
        e.preventDefault()
        const categoryName = e.target.getAttribute("id")
        displayProductForCategory(categoryName);
        window.location.href = "/product/" + categoryName;
    })
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function displayProductForCategory(categoryName){
    fetch(`http://localhost:3000/product/list/` + categoryName)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (inner_list_products.children[0]) {
                removeAllChildNodes(inner_list_products);
            }
            data.forEach(element => {
                // console.log(element)
                const category = element.category;
                const name = element.name;
                const img = element.img;
                // const img = "";
                const price = element.price;
                const company = element.company;

                inner_list_products.innerHTML += `
                <div class="item">
                    <div class="thumbnail" >
                        <a href="">
                            <img src="${img}" alt="임시" >
                        </a>
                    </div>
                <div class="shopping_cart">
                  <button class="shopping_cart_icon"><img src="${shopping_cart_icon_url}" alt="카트담기 아이콘" ></button>
                </div>
                <div class="description">
                  <h3 class="description_text"><a href="">[${company}] ${name}</a></h3>
                  <div class="price">
                    ${price}
                    <span>원</span>
                  </div>
                </div>
              </div>`
            });
        }).catch(err => console.log(err))
}

// function paging(totalData, currentPage) {
//     const dataPerPage = 9;
//     const pageCount = 1

//     const totalPage = Math.ceil(totalData / dataPerPage);
//     const pageGroup = Math.ceil(currentPage)
// }
