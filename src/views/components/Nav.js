class Nav extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div id="navbar_menu" class="sticky">
      <div class="menu_main">
        <ul class="menu_list">
          <li class="menu category_toggle">
              <div class="toggle">
                <img width="16px" height="14px" src="https://res.kurly.com/pc/service/common/1908/ico_gnb_all_off_x2.png" alt="">
                <span>전체 카테고리</span>
              </div>
            <div class="category_wrap">
              <ul id="inner_nav">
                <li><a onclick="location.href='/product/meat'" class="meat"><span>고기</span></a></li>
                <li><a onclick="location.href='/product/vegetable'" class="vegetable"><span>야채</span></a></li>
                <li><a onclick="location.href='/product/fruit'" class="fruit"><span>과일</span></a></li>
                <li><a onclick="location.href='/product/fish'" class="fish"><span>생선</span></a></li>
              </ul>
            </div>
          </li>
          <li class="menu menu2">
            <a href="/product/meat" class="meat">고기</a>
          </li>
          <li class="menu menu3">
            <a href="/product/vegetable" class="vegetable">채소</a>
          </li>
          <li class="menu menu4">
            <a href="/product/fruit" class="fruit">과일</a>
          </li>
          <li class="menu menu5">
            <a href="/product/fish" class="fish">생선</a>
          </li>
        </ul>
      </div>
    </div>
    `;
  }
}

customElements.define('main-nav', Nav);
