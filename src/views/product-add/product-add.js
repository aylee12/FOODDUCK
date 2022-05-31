import * as Api from '/api.js';

const productId = window.location.pathname.split('/').pop();
const product_category = document.getElementById("product_category");

// 전체 카테고리 데이터 받아와서 select option에 추가. API 연결 안 돼 있음
window.onload = async function() {
    try {
        const res = await Api.get('/api/categoryList');
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            const option = document.createElement("option");
            option.value = res[i].name;
            const option_text = document.createTextNode(option.value);
            option.appendChild(option_text);
            product_category.appendChild(option);
        }
    }
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

// '제품 판매하기' 버튼 누르면 동작 (상품 추가)
register_product_form.onsubmit = async function(e) {
    e.preventDefault();

    const agree = confirm("상품을 판매하시겠습니까?");

    if (agree) {
        const product_name = this.product_name.value;
        const product_company = this.product_company.value;
        const product_price = parseInt(this.product_price.value);
        const product_category = this.product_category.value;

        const data = {
            name: product_name,
            price: product_price,
            company: product_company,
            category: product_category,
            // 테스트용 (지금은 img랑 description 비워서 보내면 안되는 상태)
            // img: "adfssaf",
            // description: "adsfafasfd"
        }
        try {
            // 상품 추가
            const res = await Api.post('/api/productAdd', data);
            alert("상품 판매가 시작되었습니다.");
            // 메인페이지로 이동
            window.location.href = "../../";
        }
        catch(err) {
            console.error(err.stack);
            alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
        }
    }
}