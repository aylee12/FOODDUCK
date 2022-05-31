import * as Api from '/api.js';

window.onload = async function() {  
    let role = "";

    try {
        role = await Api.get('/api/getuserInfo').role;
    }
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
    
    // 테스트 코드
    role = "admin";

    const button_container = document.querySelector(".button_container");
    // 사용자가 admin이면 보여줄 버튼들, url 추가 안 된 버전
    if (role === "admin") {
        const contents = ["카테고리 관리", "제품 관리", "주문 관리"];
        const urls = ["/admin/category/list", "/admin/product/list", ""];
        for (let i = 0; i < contents.length; i++) {
            const button = document.createElement("button");
            const button_text = document.createTextNode(contents[i]);
            button.appendChild(button_text);
            button.setAttribute("onClick", `location.href='${urls[i]}'`);
            button.style.cssText = "cursor: pointer;"
            button_container.appendChild(button);
        }
    } 

    // 사용자가 일반 회원이면 보여줄 버튼들, url 추가 안 된 버전
    else {
        const contents = ["회원정보 관리", "주문 조회"];
        const urls = ["/user/info/manage", ""];

        for (let i = 0; i < contents.length; i++) {
            const button = document.createElement("button");
            const button_text = document.createTextNode(contents[i]);
            button.appendChild(button_text);
            button.setAttribute("onClick", `location.href='${urls[i]}'`);
            button.style.cssText = "cursor: pointer;"
            console.log(button);
            button_container.appendChild(button);
        }
    }
}