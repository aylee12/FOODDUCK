// import * as Api from '/api.js';


window.onload = async function() {
    const category_list_container = document.querySelector(".category_list_container");
    try {
        //const res = await Api.get('/api/categoryListAll');
        const res = ['meat', 'vegetable'];
        for (let i = 0; i < res.length; i++) {
            const category_container = document.createElement("div");
            category_container.setAttribute("class", "category_container");

            const category_name = document.createTextNode(res[i]);
            category_container.appendChild(category_name);

            const btn_zone = document.createElement("div");
            btn_zone.setAttribute("class", "btn_zone");
            category_container.appendChild(btn_zone);

            // 수정 버튼 생성
            const btn_edit = document.createElement("button");
            const btn_edit_text = document.createTextNode("수정");
            btn_edit.setAttribute("class", "btn_edit");
            btn_edit.appendChild(btn_edit_text);
            btn_zone.appendChild(btn_edit);

            // 삭제 버튼 생성
            const btn_del = document.createElement("button");
            const btn_del_text = document.createTextNode("삭제");
            btn_del.setAttribute("class", "btn_del");
            btn_del.appendChild(btn_del_text);
            btn_zone.appendChild(btn_del);

            category_container.appendChild(btn_zone);
            category_list_container.appendChild(category_container);


            // 버튼 클릭 이벤트
            btn_edit.addEventListener("click", editHandler);
            btn_del.addEventListener("click", delHandler);
        }

        // 추가 버튼 생성
        const btn_add = document.createElement("button");
        const btn_add_text = document.createTextNode("카테고리 추가");
        btn_add.setAttribute("class", "btn_add");
        btn_add.appendChild(btn_add_text);
        category_list_container.appendChild(btn_add);
    } 
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

// 상품수정 이벤트핸들러 -> 상품수정 페이지로 이동
function editHandler() {
    const confirm_result = confirm("상품을 수정하시겠습니까?");
  
    if (confirm_result) {
      location.href =  `/product/edit/:${productId}`;
    }
  }
  
  // 상품삭제 이벤트핸들러
async function delHandler(e) {
    e.preventDefault();

    const confirm_result = confirm("상품을 삭제하시겠습니까?");

    // 아직 api 없음
    if (confirm_result) {
        const data = {
            id: productId,
            img: product_img.innerText, 
            name: product_name.innerText, 
            price: product_price.dataset.value, 
            company: product_company.innerText,
            description: product_description.innerText
        };

        try {
            await Api.del('/api/delete', productId, data);
            // 메인으로 이동
            window.location.href = "../../../";
        }
        catch(err) {
            console.error(err.stack);
            alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
        }
    }
}