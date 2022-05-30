window.onload = async function() {  
    // localStroage에 저장된 token으로 유저 타입 파악, 미완성
    // const role = localStorage.getItem("role");
    // 최초 로그인시 유저 정보에 role이 들어가면 됨
    
    // 테스트 코드
    const role = "admin";

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