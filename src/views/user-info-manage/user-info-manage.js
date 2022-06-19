import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

// 회원 정보 수정
const checkSlider = document.querySelectorAll('.slider');
const inputAble = document.querySelectorAll('.input_able');
const checkPwAble = document.querySelector('.check_pw_able');
const checkPostAble = document.querySelectorAll('.check_post_able');
const userInfoMange = document.querySelector('#user_info_manage');

for (let i = 0; i < checkSlider.length; i++) {
  checkSlider[i].addEventListener('click', () => {
    const checkAble = inputAble[i].disabled ? false : true;
    if (i === 1) {
      checkPwAble.disabled = checkAble;
    } else if (i === 3) {
      checkPostAble.forEach((items) => (items.disabled = checkAble));
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
  const user = await Api.get('/api/user');

  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  // 주소 값
  const postalCode = postCodeInput.value;
  const address1 = addressInput.value;
  const address2 = detailAddressInput.value;
  const address3 = extraAddressInput.value;

  const currentPassword = prompt('현재 비밀번호를 입력해주세요');

  // 현재 비밀번호가 입력되어있고 확인을 누르면
  if (currentPassword) {
    const isFullNameValid = fullName.length >= 2;
    const isPasswordValid = password.length >= 4;
    const isPasswordSame = password === passwordConfirm;

    if (!isFullNameValid) {
      return alert('이름은 2글자 이상이여야 합니다.');
    }
    if (password && !isPasswordValid) {
      return alert('비밀번호는 4글자 이상이여야 합니다.');
    }

    if (!isPasswordSame) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

    // 데이터를 백에 요청한다.
    try {
      const data = {
        currentPassword,
        fullName,
        password,
        phoneNumber,
        address: {
          postalCode,
          address1,
          address2,
          address3,
        },
      };
      console.log(user);
      await Api.patch(`/api/users`, user.userId, data);

      alert(`정상적으로 수정되었습니다.`);

      // 메인 페이지 이동
      location.href = '/';
    } catch (err) {
      console.error(err.stack);
      alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
  }
}

const handleSubmitDelete = async (e) => {
  const user = await Api.get('/api/user');
  const answer = confirm('정말 탈퇴 하시겠습니까??');
  // db에 있는 데이터랑 비밀번호가 일치한다면 ,, 그게 안되면 위에있는 비밀번호 값이라 일치한다면 ,,
  const currentPassword = prompt('현재 비밀번호를 입력하세요');

  if (currentPassword) {
    const data = {
      currentPassword,
    };
    await Api.delete(`/api/users`, user.userId, data);
    localStorage.removeItem('token');

    alert(`회원탈퇴 되었습니다.\n그동안 이용해주셔서 진심으로 감사드립니다.`);

    window.location.href = '/';
  }
};

// 함수를 실행하는 곳
const init = async () => {
  try {
    const user = await Api.get('/api/user');
    fullNameInput.value = `${user.fullName}`;
    phoneNumberInput.value = `${user.phoneNumber}`;
    postCodeInput.value = `${user.address.postalCode}`;
    addressInput.value = `${user.address.address1}`;
    detailAddressInput.value = `${user.address.address2}`;
    extraAddressInput.value = `${user.address.address3}`;
  } catch (error) {
    new Swal({
      title: '접근권한이 없습니다.',
      text: `${error.message}`,
      icon: 'error',
    }).then(function () {
      window.location.href = '/login';
    });
  }
};

submitUpdate.addEventListener('click', handleSubmitUpdate);
submitDelete.addEventListener('click', handleSubmitDelete);

init();
