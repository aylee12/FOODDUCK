import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const radioInput = document.querySelector('input[type=radio]:checked');
const yearInput = document.querySelector('#yearInput');
const monthInput = document.querySelector('#monthInput');
const dayInput = document.querySelector('#dayInput');

// 주소
const postCodeInput = document.querySelector('#postcode');
const addressInput = document.querySelector('#address');
const detailAddressInput = document.querySelector('#detailAddress');
const extraAddressInput = document.querySelector('#extraAddress');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  // 주소 값
  const postalCode = postCodeInput.value;
  const address1 = addressInput.value;
  const address2 = detailAddressInput.value;
  const address3 = extraAddressInput.value;
  //const address = { postalCode, address1, address2, address3 } 이렇게 보내주시면 감사하겠습니다!

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  // 회원가입 api 요청
  try {
    const address = {
      postalCode,
      address1,
      address2,
      address3,
    }
    const data = {
      address,
      fullName,
      email,
      password,
      phoneNumber,
    };
    
    console.log('입력데이터', data);
    await Api.post('/api/register', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
