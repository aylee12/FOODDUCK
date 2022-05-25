window.onload = function() {
  // 제품 데이터 가져오기
  // fetch('api 주소')
  //   .then(res => res.json())
  //   .then(res => {
  //     // data를 응답 받은 후의 로직
  //     document.getElementById("product_img").innerText = res;
  //     document.getElementById("product_name").innerText = res;
  //     document.getElementById("product_price").innerText = res;
  //     document.getElementById("product_sales_unit").innerText = res;
  //     document.getElementById("product_volume").innerText = res;
  //     document.getElementById("prodcut_origin").innerText = res;
  //     document.getElementById("product_description").innerText = res;
  //     document.getElementById("product_detail_information").innerText = res;
  //     document.getElementById("product_review").innerText = res;
  //   });

  const org_elem = document.getElementById("product_price");
  let org = parseInt(org_elem.innerText);
  document.getElementById("sum").innerText = org;
}

var aTags = document.querySelectorAll('div a');
for(var i = 0; i < aTags.length; i ++) {
    aTags[i].onclick = function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute("href"));

        window.scrollTo({
            'behavior': 'smooth',
            'top': target.offsetTop
        })
    }
}

function count(type) {
  const n_elem = document.getElementById("quantity");
  let n = parseInt(n_elem.value);
  
  const org_elem = document.getElementById("product_price");
  let org = parseInt(org_elem.innerText);

  if (type === "plus") {
    n = n + 1;
  } else if (type === "minus" && n > 1) {
    n = n - 1;
  }
  
  n_elem.value = n;
  
  document.getElementById("sum").innerText = org * n;
}

function addToCart() {
  // 사진, 이름, 가격, 수량, 총 가격
  const img = document.getElementById("product_img").innerText;
  const name = document.getElementById("product_name").innerText;
  const price = document.getElementById("product_price").innerText;
  const quantity = document.getElementById("quantity").innerText;
  const total_price = document.getElementById("sum").innerText;

  const product = {img: img, name: name, price: price, quantity: quantity, total_price: total_price};

  localStorage.setItem('cart', JSON.stringify(product));
  alert("장바구니에 추가되었습니다.");
}