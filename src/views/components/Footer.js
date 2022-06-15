class Footer extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <footer class="footer">
      <div id="customer_center_wrap">
        <h2 class="center_h2">고객행복센터</h2>

        <div id="call_wrap">
          <div class="call_title_wrap">
            <h3 class="call">1779-5549</h3>
          </div>
          <div id="right_call_wrap">
            <p class="customer">365고객센터</p>
            <p class="detail">오전 7시 - 오후 7시</p>
          </div>
        </div>
        <div id="question_wrap">
          <div class="question_title_wrap">
            <h3 class="cc_qna">1:1 문의</h3>
          </div>
          <div id="right_question_wrap">
            <p class="customer">24시간 접수 가능</p>
            <p class="detail">고객센터 운영시간에 순차적으로 답변해드리겠습니다.</p>
          </div>
        </div>
      </div>

      <div id="introduce_wrap" >
        <p class="footer_p">COMPANY : (주)푸드장 / OWNER : 박승준, 김호진, 이아영, 김용민, 조성호 / CALL CENTER : 1779-5549 <span>I</span></p>
        <p class="footer_p">ADDRESS : 서울 강남구 테헤란로53길 16 예안빌딩 B1층 <span>I</span></p>
        <p class="footer_p">입점문의: tmdeksdl@gmail.com <span>I</span> 채용문의: cohojin3714@gmail.com <span>I</span> aylee5117@gmail.com
        <p class="footer_p">개인정보관리책임자: bdd3452@gmail.com <span>I</span> whtjdgh104@gmail.com 
      </div>
    </footer>
    `;
  }
}

customElements.define('main-footer', Footer);
