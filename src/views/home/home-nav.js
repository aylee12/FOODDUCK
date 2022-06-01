import * as Api from '/api.js';

const navBar = document.querySelector("#navbar");

// 기본 로직은 admin인지 아닌지 확인하고 프론트에 뿌려주면 될 것 같다.
try {
  // const user = Api.get("url주소");
  // console.log(user);

  navBar.innerHTML = 
  `
  <li><a href="/login">로그아웃</a></li>
  <li><a href="/register">나의 정보</a></li>
  <li>
    <a href="/cart" aria-current="page">
      <span class="icon">
        <i class="fas fa-cart-shopping"></i>
      </span>
      <span>카트</span>
    </a>
  </li>
  `
} catch(e){
  console.log(`에러입니다.`);
}

