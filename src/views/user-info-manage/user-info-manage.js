import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

// 회원 정보 수정
const checkSlider = document.querySelectorAll('.slider');
const inputAble = document.querySelectorAll('.input_able');
const checkPwAble = document.querySelector('.check_pw_able');
const checkPostAble = document.querySelectorAll('.check_post_able');

for(let i = 0 ;i < checkSlider.length; i++){
  checkSlider[i].addEventListener("click" , () => {
    const checkAble = inputAble[i].disabled ? false : true;
    if(i === 1){
      checkPwAble.disabled = checkAble;
    }else if(i === 3){
      checkPostAble.forEach(items => items.disabled = checkAble);
    }
    // disabled true면 false , false면 true로 바꿈 
    inputAble[i].disabled = checkAble;
  });
}

const submitUpdate = document.querySelector('#submitUpdate');
const submitDelete = document.querySelector('#submitDelete');

const fullNameInput = document.querySelector('#fullNameInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');

// 주소 
const postCodeInput = document.querySelector("#postcode");
const addressInput = document.querySelector("#address");
const detailAddressInput = document.querySelector("#detailAddress");
const extraAddressInput = document.querySelector("#extraAddress");


function handleSubmitUpdate(){
  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  // 주소 값 
  const postCode = postCodeInput.value;
  const address = addressInput.value;
  const detailAddress = detailAddressInput.value;
  const extraAddress = extraAddressInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }
  try {
    const data = { 
      fullName,
      password,
      postCode,
      address,
      detailAddress,
      extraAddress,
      phoneNumber,
    };
    console.log(data);
    // Api.post('/api/register', data);

    alert(`정상적으로 수정되었습니다.`);

    // 메인 페이지 이동
    location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }

}

const handleSubmitDelete = (e) => {
  const answer = confirm("정말 탈퇴 하시겠습니까??");
  // db에 있는 데이터랑 비밀번호가 일치한다면 ,, 그게 안되면 위에있는 비밀번호 값이라 일치한다면 ,, 
  const isPasswordCheck = prompt("비밀번호를 입력하세요");
  // 만일 db에 있는 내용이랑 같다면 승인시키고 탈퇴시키고 아니라면 다시 입력하게 하자 
}

// 함수를 실행하는 곳 
const init = () => {
  submitUpdate.addEventListener("click" , handleSubmitUpdate);
  submitDelete.addEventListener("click" , handleSubmitDelete);
}

init();