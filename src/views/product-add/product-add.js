import * as Api from '/api.js';

const product_category = document.getElementById('product_category');

// 전체 카테고리 데이터 받아와서 select option에 추가
window.onload = async function () {
  try {
    const res = await Api.get('/api/categoryList');
    for (let i = 0; i < res.length; i++) {
      const option = document.createElement('option');
      option.value = res[i].name;
      const option_text = document.createTextNode(option.value);
      option.appendChild(option_text);
      product_category.appendChild(option);
    }
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
};

// '제품 판매하기' 버튼 누르면 동작 (상품 추가)
register_product_form.onsubmit = async function (e) {
  e.preventDefault();

  const agree = confirm('상품을 판매하시겠습니까?');

  if (agree) {
    const product_name = this.product_name.value;
    const product_category = this.product_category.value;
    const product_company = this.product_company.value;
    const product_img = this.product_img.value;
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
      // 이미지 추가 요청
      //   const resValue = await fetch('https://api.imgbb.com/1/upload?key=652256526f52427e3c31f4fdc681f6b3', {
      //     method: 'POST',
      //     headers: {
      //       'mime-type': 'multipart/form-data',
      //     },
      //     body: `data.img`,
      //   })
      //     .then((res) => res.json())
      //     .catch((err) => console.log(err));
      //   console.log(resValue);
      const imgUrl = await Api.post('/api/imgUpload', data.img);

      // data.img에 imgUrl 전달
      data.img = imgUrl;

      // 상품 추가
      await Api.post('/api/productAdd', data);
      alert('상품 판매가 시작되었습니다.');
      // 상품 목록으로 이동
      window.location.href = '/admin/product/list';
    } catch (err) {
      console.error(err.stack);
      alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
  }
};
