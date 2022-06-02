// 브라우저환경에서는 json 파일이 로드되지 않음?? => fetch api 사용... 도 안돼서 js 파일 import 식으로 변경
// import imgKey from '../../imgKey.json';
import { imgKey } from './imgKey.js'; //view 환경에 imgKey.js 파일을 위치시켜줘야 하는듯.

// 이미지 form-data 생성
function imgForm(input) {
  //form-data 생성
  const form = new FormData();
  if (input) {
    form.append('image', input.files[0]);
  }

  return form;
}

// 이미지 upload
async function imgUpload(data) {
  //img key fetch
  // const imgKey = await fetch('../../imgKey.json').then((res) => res.json());
  const Key = imgKey.KEY;

  //API 주소
  const apiUrl = `https://api.imgbb.com/1/upload?key=${Key}`;

  console.log(`%cImg Upload POST 요청: ${apiUrl}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${data}`, 'color: #296aba;');

  //이미지 요청
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: data,
  }).then((res) => res.json());

  //에러 발생시
  if (res.error) {
    throw new Error(`${res.error.message} 이미지 업로드 실패`);
  }

  console.log(res);
  const result = res.data.url;
  //img url 리턴
  return result;
}

export { imgForm, imgUpload };
