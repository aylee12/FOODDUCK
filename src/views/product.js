import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const shopping_cart_icon_url = "https://s3.ap-northeast-2.amazonaws.com/res.kurly.com/kurly/ico/2021/cart_white_45_45.svg";
const inner_list_products = document.getElementById('inner_list_products');
const categoryTemp = window.location.href.split("/")
const category = categoryTemp[categoryTemp.length-2]
DataHandler(category)
categoryDisplay();

function categoryDisplay(){
    const menu = document.querySelectorAll('ul.menu_list li');
    for (let i = 1; i < menu.length; i++) {
        menu[i].addEventListener('click', async (e) => {
            const category = e.target.getAttribute("class")          
            window.location.href = "/product/" + category;
        })
    }
}
async function DataHandler (category) {
    try {
        // 카테고리 상품 데이터 가져오기
        const url = category ? '/api/productListCategory/' + category : '/api/productListAll';
        const data = await Api.get(url)

        displayProductForCategory(data, category)
    }
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

async function displayProductForCategory(data, category){
    const url = category ? "/product/" + category : `/product`;
    // window.location.href = url;
    inner_list_products.innerHTML = ""
    data.forEach(element => {
        const name = element.name;
        const img = element.img;
        const price = addCommas(element.price);
        const company = element.company;

        inner_list_products.innerHTML += `
        <div class="item">
            <div class="thumbnail" >
                <a href="" onclick="toDetail(${name})">
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
    return;
}