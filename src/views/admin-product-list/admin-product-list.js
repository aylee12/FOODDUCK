import * as Api from '/api.js';

window.onload = async function() {
    // 상품 전체 div
    const product_list_container = document.querySelector(".product_list_container");
    try {
        const res = await Api.get('/api/productListAll');
        for (let i = 0; i < res.length; i++) {
            // 제품 하나당 div
            const product_container = document.createElement("div");
            product_container.setAttribute("class", "product_container");
            // 클릭시 해당 제품 상세페이지로 가게 함
            product_container.setAttribute("onclick", `location.href = '/product/detail/${res[i].productId}'`);

            // 제품 div 안에 들어갈 1. 카테고리 div
            const category_container = document.createElement("div");
            category_container.setAttribute("class", "category_container");
            const category = document.createTextNode(res[i].category.name);
            category_container.appendChild(category);

            // 제품 div 안에 들어갈 2. 제품 이름 div
            const name_container = document.createElement("div");
            name_container.setAttribute("class", "name_container");
            const name = document.createTextNode(res[i].name);
            name_container.appendChild(name);
            
            // div에 넣어줌
            product_container.appendChild(category_container);
            product_container.appendChild(name_container);
            product_list_container.appendChild(product_container);
        }
    } 
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}