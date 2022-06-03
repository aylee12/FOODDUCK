import * as Api from '/api.js';
const navBar = document.querySelector("#navbar");

// 즉시 실행함수로 함수를 실행해서 값을 만들어 놓고 인식시킨다. (로직이 쫌 복잡함)

(async () => {
  const token = localStorage.getItem("token");
  if(token){
    const user = await Api.get("/api/getUserInfo");

    if(user.role === "admin"){
      navBar.innerHTML = 
      `
      <li><a class ="nav_logout" href="/">로그아웃</a></li>
      <li><a class ="nav_admin" href="/mypage">관리자 설정</a></li>
      `
    }else{
      navBar.innerHTML = 
      `
      <li><a class ="nav_logout" href="/">로그아웃</a></li>
      <li><a class ="nav_user" href="/mypage">나의 계정</a></li>
      <li>
        <a class = "nav_cart" href="/cart" aria-current="page">
          <span class="icon">
            <i class="fas fa-cart-shopping"></i>
          </span>
          <span>카트</span>
        </a>
      </li>
      `;
    }
    const navLogout = document.querySelector(".nav_logout");
    const navUser = document.querySelector(".nav_user");

    navLogout.addEventListener("click" , () => {
      const answer = confirm("로그아웃 하시겠습니까?");
      if(answer){
        localStorage.removeItem("token");
        window.location.href = '/';
      }
    });
  }else{
    navBar.innerHTML = 
    `
    <li><a class ="nav_login" href="/login">로그인</a></li>
    <li><a class ="nav_register" href="/register">회원가입</a></li>
    `
  }
})();

const navLogin = document.querySelector(".nav_login");
const navAdmin = document.querySelector(".nav_admin");
const navRegister = document.querySelector(".nav_register");
const navCart = document.querySelector(".nav_cart");







