import * as Api from '/api.js';
import * as ImgUpload from '/imgUpload.js';

const product_name = document.getElementById('product_name');
const product_category = document.getElementById('product_category');
const product_company = document.getElementById('product_company');
const product_price = document.getElementById('product_price');
const product_description = document.getElementById('product_description');
const span_img = document.getElementById('span_file_name');

let original_img = '';

// url에서 productId 찾기 -> 제품정보 가져올 때 사용
const product_url = window.location.pathname.split('/');
const productId = product_url[product_url.length - 2];

window.onload = async function () {
  /**** 접근 권한 확인(관리자) ****/
  try {
    await Api.get('/api/admin');
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
    const res = await Api.get('/api/categoryList');

    for (let i = 0; i < res.length; i++) {
      const option = document.createElement('option');
      const option_text = document.createTextNode(res[i].name);
      option.appendChild(option_text);
      product_category.appendChild(option);
    }
  } catch (err) {
    console.error(err.stack);

    Swal({
      title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
      text: `${err.message}`,
      icon: 'error',
    }).then(function () {
      window.location.href = `/`;
    });
  }

  try {
    const res = await Api.get('/api/productListId', productId);
    product_name.value = res.name;
    product_company.value = res.company;
    product_category.value = res.category.name;
    original_img = res.img;
    span_img.innerHTML = original_img;
    product_price.value = res.price;
    product_description.value = res.description;
  } catch (err) {
    console.error(err.stack);

    new Swal({
      title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
      text: `${err.message}`,
      icon: 'error',
    }).then(function () {
      window.location.href = `/`;
    });
  }
};

const imgInput = document.querySelector('#product_img');
let imgForm = null;
imgInput.onchange = function (e) {
  e.preventDefault();
  const val_img = imgInput.value;
  const path_img = val_img.split('\\');
  span_img.innerHTML = `${path_img[2]}`;

  imgForm = ImgUpload.imgForm(imgInput);
};

// '제품 수정하기' 버튼 누르면 동작
register_product_form.onsubmit = function (e) {
  e.preventDefault();

  Swal.fire({
    title: '제품을 수정하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '네',
    denyButtonText: `아니요`,
  }).then((result) => {
    if (result.isConfirmed) {
      const product_name = this.product_name.value;
      const product_category = this.product_category.value;
      const product_company = this.product_company.value;
      const product_img = original_img;
      const product_price = parseInt(this.product_price.value);
      const product_description = this.product_description.value;

      const data = {
        name: product_name,
        category: product_category,
        company: product_company,
        img: product_img,
        price: product_price,
        description: product_description,
      };

      try {
        if (imgForm) {
          /************ Image Upload **********/
          const imgUrl = ImgUpload.imgUpload(imgForm);

          // data.img에 imgUrl 전달
          data.img = imgUrl;
        }
        Api.patch('/api/productUpdate', productId, data);

        new Swal({
          title: '제품 정보가 수정되었습니다.',
          icon: 'success',
        }).then(function () {
          window.location.href = `/product/detail/${productId}`;
        });
      } catch (err) {
        console.error(err.stack);

        new Swal({
          title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
          text: `${err.message}`,
          icon: 'error',
        }).then(function () {
          window.location.href = `/product/detail/${productId}`;
        });
      }
    }
  })
};
