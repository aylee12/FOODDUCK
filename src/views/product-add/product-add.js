import * as Api from '/api.js';
import * as ImgUpload from '/imgUpload.js';

const product_category = document.getElementById('product_category');
const imgInput = document.querySelector('#product_img');
let imgForm = null;

// 전체 카테고리 데이터 받아와서 select option에 추가
window.onload = async function () {
  /**** 접근 권한 확인(관리자) ****/
  try {
    await Api.get('/api/auth/admin');
  } catch (error) {
    new Swal({
      title: '접근권한이 없습니다.',
      text: `${error.message}`,
      icon: 'error',
    }).then(function () {
      window.location.href = '/login';
    });
  }

  try {
    const res = await Api.get('/api/categories');
    for (let i = 0; i < res.length; i++) {
      const option = document.createElement('option');
      option.value = res[i].name;
      const option_text = document.createTextNode(option.value);
      option.appendChild(option_text);
      product_category.appendChild(option);
    }
  } catch (err) {
    console.error(err.stack);
    Swal({
      title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
      text: `${err.message}`,
      icon: 'error',
    });
  }
};

imgInput.onchange = function (e) {
  e.preventDefault();
  const val_img = imgInput.value;
  const path_img = val_img.split('\\');

  const span_img = document.getElementById('span_file_name');
  span_img.innerHTML = `${path_img[2]}`;

  imgForm = ImgUpload.imgForm(imgInput);
};

// '제품 판매하기' 버튼 누르면 동작 (제품 추가)
register_product_form.onsubmit = function (e) {
  e.preventDefault();

  Swal.fire({
    title: '제품을 판매하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '네',
    denyButtonText: `아니요`,
  }).then((result) => {
    if (result.isConfirmed) {
      const product_name = this.product_name.value;
      const product_category = this.product_category.value;
      const product_company = this.product_company.value;
      const product_img = imgForm;
      const product_price = parseInt(this.product_price.value);
      const product_description = this.product_description.value;

      const data = {
        name: product_name,
        price: product_price,
        company: product_company,
        category: product_category,
        img: product_img,
        description: product_description,
      };

      try {
        productAddHandler(data);
      } catch (err) {
        console.error(err.stack);

        new Swal({
          title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
          text: `${err.message}`,
          icon: 'error',
        }).then(function () {
          window.location.href = '/mypage';
        });
      }
    }
  });
};

async function productAddHandler(data) {
  const imgUrl = await ImgUpload.imgUpload(data.img);
  data.img = imgUrl;

  // 상품 추가
  await Api.post('/api/products', data);

  new Swal({
    title: '제품 판매가 시작되었습니다.',
    icon: 'success',
  }).then(function () {
    window.location.href = '/admin/product/list';
  });
}
