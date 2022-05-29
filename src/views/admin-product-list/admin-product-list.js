import * as Api from '/api.js';


window.onload = async function() {
    const product_list_container = document.querySelector(".product_list_container");
    try {
        const res = await Api.get('/api/productListAll');
        for (let i = 0; i < res.length; i++) {
            const product_container = document.createElement("div");
            product_container.setAttribute("class", "product_container");
            // 경로 문제
            product_container.setAttribute("onclick", "location.href ='../detail/'" + res[i].name);

            const img_container = document.createElement("div");
            img_container.setAttribute("class", "category_container");
            const category = document.createTextNode(res[i].category);
            img_container.appendChild(category);

            const name_container = document.createElement("div");
            name_container.setAttribute("class", "name_container");
            const name = document.createTextNode(res[i].name);
            name_container.appendChild(name);
            
            product_container.appendChild(img_container);
            product_container.appendChild(name_container);
            product_list_container.appendChild(product_container);
        }
        console.log(product_list_container);
    } 
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}