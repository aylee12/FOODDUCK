import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

// 회원 정보 수정
const checkSlider = document.querySelectorAll('.slider');
const inputAble = document.querySelectorAll('.input_able');
const checkPwAble = document.querySelector('.check_pw_able');
const checkPostAble = document.querySelectorAll('.check_post_able');
const userInfoMange = document.querySelector("#user_info_manage");

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
const postCodeInput = document.querySelector('#postcode');
const addressInput = document.querySelector('#address');
const detailAddressInput = document.querySelector('#detailAddress');
const extraAddressInput = document.querySelector('#extraAddress');

async function handleSubmitUpdate() {
  const currentPassword = prompt("현재 비밀번호를 입력해주세요");
  console.log(currentPassword);
  
  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  // 주소 값
  const postalCode = postCodeInput.value;
  const address1 = addressInput.value;
  const address2 = detailAddressInput.value;
  const address3 = extraAddressInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  // const isPasswordValid = password.length >= 4;
  // const isPasswordSame = password === passwordConfirm;

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
      postalCode,
      address1,
      address2,
      address3,
      phoneNumber,
    };
    console.log(data);

    //register.js 파일과 똑같은 address형식으로 해주시면 될 것 같습니다!
    //patch요청으로 유저정보 업데이트 진행되게 되는 로직은 맞는데 지금 schema쪽 작업하고 있어서 아마 안될겁니다!
    //다 수정하셨으면 저한테 알려주세용!
    // await Api.patch('/api/users', data);

    alert(`정상적으로 수정되었습니다.`);

    // 메인 페이지 이동
    location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

const handleSubmitDelete = async (e) => {
  const user = await Api.get('/api/getUserInfo');
  const answer = confirm('정말 탈퇴 하시겠습니까??');
  // db에 있는 데이터랑 비밀번호가 일치한다면 ,, 그게 안되면 위에있는 비밀번호 값이라 일치한다면 ,,
  const isPasswordCheck = prompt('비밀번호를 입력하세요');
  // 만일 db에 있는 내용이랑 같다면 승인시키고 탈퇴시키고 아니라면 다시 입력하게 하자
  // if(isPasswordCheck === user.password){
  //   alert("회원탈퇴를 하셨습니다.");
  //   localStorage.removeItem("token");
  //   window.location.href = '/';
  // }else{
  //   alert("비밀번호가 일치하지 않습니다.");
  // }
};

// 함수를 실행하는 곳
const init = async () => {
  try {
    const user = await Api.get('/api/getUserInfo');
    console.log('리턴된 유저 데이터', user);
    fullNameInput.value = `${user.fullName}`;
    phoneNumberInput.value = `${user.phoneNumber}`;
    // passwordInput.value = `${user.password}`;
    // passwordConfirmInput.value = `${user.password}`;
    postCodeInput.value = `${user.address.postalCode}`;
    addressInput.value = `${user.address.address1}`;
    detailAddressInput.value = `${user.address.address2}`;
    extraAddressInput.value = `${user.address.address3}`;

  } catch (error) {
    alert(error.message);
    window.location.href = '/';
  }
};

submitUpdate.addEventListener('click', handleSubmitUpdate);
submitDelete.addEventListener('click', handleSubmitDelete);

init();
