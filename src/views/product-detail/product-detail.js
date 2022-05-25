window.onload = function() {
  // 제품 정보 가져오기
  fetch('api 주소')
    .then(res => res.json())
    .then(res => {
      // data를 응답 받은 후의 로직

      document.getElementById("").innerText = res;

    });

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
  const n_elem = document.getElementById("n");
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