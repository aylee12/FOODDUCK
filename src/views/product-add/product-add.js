const product_category = document.getElementById("product_category");

// 카테고리 데이터 가져오기 미완성(어떤 형식으로 올지 모름)
window.onload = function() {
    fetch("/product/add")
    .then(res => res.json())
    .then(data => {
        const category_option = document.createElement("option");

        for (let i = 0; i < data.length; i++) {
            category_option.value = data[i];
            const category_option_text = document.createTextNode(category_option_value);
            category_option.appendChild(category_option_text);
            product_category.appendChild(category_option);
        }
    })
}

// '상품 추가하기' 버튼 누르면 동작
register_product_form.onsubmit = function() {
    const agree = confirm("상품을 판매하시겠습니까?");

    if (agree) {
        const product_name = this.product_name.value;
        const product_company = this.product_company.value;
        const product_price = parseInt(this.product_price.value);
        const product_category = this.product_category.value;

        const data = {
            productName: product_name,
            price: product_price,
            company: product_company,
            // 카테고리 데이터 받아와야 함
            category: product_category
        }
        
        // 상품 추가(post)
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) 
        .then(data => {
            alert("상품 판매가 시작되었습니다.");
            // 메인페이지로 이동
            window.location.href = "../";
        })
    }
}