import * as Api from '/api.js';

const product_name = document.getElementById("product_name");
const product_company = document.getElementById("product_company");
const product_img = document.getElementById("product_img");
const product_price = document.getElementById("product_price");
const product_description = document.getElementById("product_description");
// product/detail/:id 로
const productId = window.location.pathname.split('/').pop();

// 전체 카테고리 받아오기, API 아직 없음
try {
    const res = await Api.get('/api/get', productId);
}
catch(err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
}

// productId로 상품 정보 받아오기 미완성
try {
    const res = await Api.get('/api/get', productId);
    product_name.value = res.name;
    product_company.value = res.company;
    product_img.value = res.img;
    product_price.dataset.value = res.price;
    product_description.value = res.description;
}
catch(err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
}


// '상품 수정하기' 버튼 누르면 동작
register_product_form.onsubmit = async function() {
    const agree = confirm("상품을 수정하시겠습니까?");

    if (agree) {
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
            // 카테고리 데이터 받아와야 함,
            description: product_description
        }
        
        // 상품 수정 미완성
        try {
            endpoint, params = "", data
            const res = await Api.get('/api/patch', productId, data);

            alert("상품 정보가 수정되었습니다.");
            // 상품 상세 페이지로 이동
            window.location.href = `../../detail/:${productId}`;
        }
        catch(err) {
            console.error(err.stack);
            alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
        }
    }
}