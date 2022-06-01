import * as Api from '/api.js';

const product_name = document.getElementById("product_name");
const product_category = document.getElementById("product_category");
const product_company = document.getElementById("product_company");
const product_img = document.getElementById("product_img");
const product_price = document.getElementById("product_price");
const product_description = document.getElementById("product_description");

// url에서 productId 찾기 -> 상품정보 가져올 때 사용
const product_url = window.location.pathname.split('/');
const productId = product_url[product_url.length -2];

window.onload = async function() {
    try {
        const res = await Api.get('/api/categoryList');

        for (let i = 0; i < res.length; i++) {
            const option = document.createElement("option");
            const option_text = document.createTextNode(res[i].name);
            option.appendChild(option_text);
            product_category.appendChild(option);
        }
    }
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
        location.href = `/product/edit/${productId}`;
    }

    try {
        const res = await Api.get('/api/productListId', productId);
        product_name.value = res.name;
        product_company.value = res.company;
        product_category.value = res.category.name;
        product_img.value = res.img;
        product_price.value = res.price;
        product_description.value = res.description;
    }
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
        location.href = `/product/edit/${productId}`;
    }
}

// '상품 수정하기' 버튼 누르면 동작
register_product_form.onsubmit = async function() {
    if (confirm("상품을 수정하시겠습니까?")) {
        const product_name = this.product_name.value;
        const product_category = this.product_category.value;
        const product_company = this.product_company.value;
        const product_img = this.product_img.value;
        const product_price = parseInt(this.product_price.value);
        const product_description = this.product_description.value;

        const data = {
            name: product_name,
            category: product_category,
            company: product_company,
            img: product_img,
            price: product_price,
            description: product_description
        }
        
        try {
            await Api.patch('/api/productUpdate', productId, data);
            alert("상품 정보가 수정되었습니다.");
            location.href = `/product/detail/:${productId}`;
        }
        catch(err) {
            console.error(err.stack);
            alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
            location.href = `/product/edit/${productId}`;
        }
    }
}