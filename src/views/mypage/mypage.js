import * as Api from '/api.js';

window.onload = async function() {  
    let role = "";
    let name = "";

    try {
        const user = await Api.get('/api/getuserInfo');
        name = user.fullName;
        role = user.role;
    }
    catch(err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
    
    document.querySelector(".name").innerHTML = name;


    // 테스트 코드
    //role = "";
    
    // 사용자가 admin이면 보여줄 버튼들, url 추가 안 된 버전
    if (role === "admin") {
        const contents = ["카테고리 관리", "제품 관리", "주문 조회"];
        const urls = ["/admin/category/list", "/admin/product/list", ""];
        const img_urls = ["http://drive.google.com/uc?export=view&id=1vG5hRXZbnWAQH1WTxmQhPymqTyYMlqt6", "http://drive.google.com/uc?export=view&id=17Y3dZeFXs3aE510naIfJAdVBLcVAVw8k", "http://drive.google.com/uc?export=view&id=1SEsdv6vng-iMRucoGP5ZIZdOzRDVOmBf"]

        buttonHandler(contents, urls, img_urls);
    } 

    // 사용자가 일반 회원이면 보여줄 버튼들, url 추가 안 된 버전
    else {
        const contents = ["회원정보 관리", "주문 조회"];
        const urls = ["/user/info/manage", ""];
        const img_urls = ["http://drive.google.com/uc?export=view&id=1HYQ2beNCRde-v5ocCx3EvgtHpsGXWn8M", "http://drive.google.com/uc?export=view&id=1SEsdv6vng-iMRucoGP5ZIZdOzRDVOmBf"]

        buttonHandler(contents, urls, img_urls);
    }
}

function buttonHandler(contents, urls, img_urls) {
    const button_container = document.querySelector(".button_container");

    for (let i = 0; i < contents.length; i++) {
        const button = document.createElement("button");

        const button_img = document.createElement("img");
        button_img.setAttribute("src", img_urls[i]);
        button.appendChild(button_img);

        const button_text = document.createTextNode(contents[i]);
        button.appendChild(button_text);

        button.setAttribute("onClick", `location.href='${urls[i]}'`);
        button.style.cssText = "cursor: pointer;"
        button_container.appendChild(button);
    }
}