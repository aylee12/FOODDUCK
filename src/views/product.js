import * as Api from '/api.js';

const shopping_cart_icon_url = "https://s3.ap-northeast-2.amazonaws.com/res.kurly.com/kurly/ico/2021/cart_white_45_45.svg";
const inner_list_products = document.getElementById('inner_list_products');
// const list_products = document.getElementById('list_products');
const menu = document.querySelectorAll('ul.menu_list li');

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

for (let i = 1; i < menu.length; i++) {
    menu[i].addEventListener('click', async (e) => {
        e.preventDefault()
        const categoryName = e.target.getAttribute("id")
        // window.location.href = "/product/" + categoryName;
        displayProductForCategory(categoryName);
        // console.log(menu)
    })
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
async function toDetail(){
    try {
        const res = await Api.get('/api/productListName' , data)
        window.location.href = "/product/detail";
    } catch(err) {
        alert(err.message)
    }
}
function displayProductForCategory(categoryName){
    fetch(`http://localhost:3000/api/productListCategory/` + categoryName)
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
                const id = element.productId;
                const img = element.img;
                const price = element.price;
                const company = element.company;

                inner_list_products.innerHTML += `
                <div class="item">
                    <div class="thumbnail" >
                        <a href="" onclick="toDetail()">
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
