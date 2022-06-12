import * as Api from '/api.js';

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

  const category_list_container = document.querySelector('.category_list_container');
  try {
    const res = await Api.get('/api/categoryList');
    for (let i = 0; i < res.length; i++) {
      // 개별 카테고리 div
      const category_container = document.createElement('div');
      category_container.setAttribute('class', 'category_container');

      // 개별 카테고리 div 속 간격 맞춰주는 div
      const category_blank1 = document.createElement('div');
      category_blank1.setAttribute('id', 'category_blank1');
      category_container.appendChild(category_blank1);

      // 개별 카테고리 div 속 category_name
      const category_name = document.createElement('input');
      category_name.setAttribute('type', 'text');
      category_name.setAttribute('value', res[i].name);
      category_name.setAttribute('id', res[i].name);
      category_name.setAttribute('readonly', 'true');
      category_container.appendChild(category_name);

      // 개별 카테고리 div 속 간격 맞춰주는 div
      const category_blank2 = document.createElement('div');
      category_blank2.setAttribute('name', 'category_blank2');
      category_container.appendChild(category_blank2);

      // 개별 카테고리 div 속 버튼 구역 div
      const btn_zone = document.createElement('div');
      btn_zone.setAttribute('class', 'btn_zone');
      category_container.appendChild(btn_zone);

      // 버튼 구역 div 속 수정 버튼 생성
      const btn_edit = document.createElement('button');
      const btn_edit_text = document.createTextNode('수정');
      btn_edit.setAttribute('class', 'btn_edit');
      btn_edit.dataset.id = res[i].name;
      btn_edit.appendChild(btn_edit_text);
      btn_zone.appendChild(btn_edit);

      // 버튼 구역 div 속 삭제 버튼 생성
      const btn_del = document.createElement('button');
      const btn_del_text = document.createTextNode('삭제');
      btn_del.setAttribute('class', 'btn_del');
      btn_del.dataset.id = res[i].name;
      btn_del.appendChild(btn_del_text);
      btn_zone.appendChild(btn_del);

      // 버튼 구역 div를 개별 카테고리 div에 추가
      category_container.appendChild(btn_zone);

      // 개별 카테고리 div를 카테고리 목록 div에 추가
      category_list_container.appendChild(category_container);

      // 수정, 삭제 버튼 클릭 이벤트
      btn_edit.addEventListener('click', changeToEdit);
      btn_del.addEventListener('click', delHandler);
    }
  } catch (err) {
    console.error(err.stack);

    new Swal({
      title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
      text: `${err.message}`,
      icon: 'error',
    }).then(function () {
      window.location.href = '/';
    });
  }
};

// 카테고리 추가 이벤트핸들러
document.getElementById('add').onsubmit = async function addHandler(e) {
  e.preventDefault();

  Swal.fire({
    title: '카테고리를 추가하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '네',
    denyButtonText: `아니요`,
  }).then((result) => {
    if (result.isConfirmed) {
      const data = {
        name: this.new_category_name.value,
        description: 'All ' + this.new_category_name.valsue + 's',
      };

      try {
        categoryAddHandler(data);
      } catch (err) {
        console.error(err.stack);

        new Swal({
          title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
          text: `${err.message}`,
          icon: 'error',
        }).then(function () {
          window.location.reload();
        });
      }
    }
  });
};

async function categoryAddHandler(data) {
  await Api.post('/api/categoryAdd', data);

  new Swal({
    title: '카테고리가 추가되었습니다.',
    icon: 'success',
  }).then(function () {
    window.location.reload();
  });
}

// 카테고리 수정으로 상태 변경
function changeToEdit() {
  // input 수정 가능하게 변경
  const category = document.getElementById(this.dataset.id);
  category.removeAttribute('readonly');
  category.style.cssText = 'border: 2px solid rgb(95, 206, 179);';
  // 수정 버튼 문자를 저장으로 변경
  this.innerText = '저장';

  this.removeAttribute('click', editHandler);
  this.addEventListener('click', editHandler);
}

// 카테고리 수정 이벤트 핸들러
async function editHandler() {
  Swal.fire({
    title: '카테고리를 수정하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '네',
    denyButtonText: `아니요`,
  }).then((result) => {
    if (result.isConfirmed) {
      const original_name = this.dataset.id;
      const name = document.getElementById(this.dataset.id).value;

      const data = {
        name: name,
        description: 'All ' + name + 's',
      };

      try {
        categoryEditHandler(original_name, data);
      } catch (err) {
        console.error(err.stack);

        new Swal({
          title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
          text: `${err.message}`,
          icon: 'error',
        }).then(function () {
          window.location.reload();
        });
      }
    }
  });
}

async function categoryEditHandler(original_name, data) {
  await Api.patch('/api/categoryUpdate', original_name, data);
  new Swal({
    title: '카테고리가 수정되었습니다.',
    icon: 'success',
  }).then(function () {
    window.location.reload();
  });
}

// 카테고리 삭제 이벤트핸들러
async function delHandler() {
  Swal.fire({
    title: '카테고리를 삭제하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '네',
    denyButtonText: `아니요`,
  }).then((result) => {
    if (result.isConfirmed) {
      const name = document.getElementById(this.dataset.id).value;

      try {
        categoryDeleteHandler(name);
      } catch (err) {
        console.error(err.stack);

        new Swal({
          title: '문제가 발생하였습니다. 확인 후 다시 시도해 주세요',
          text: `${err.message}`,
          icon: 'error',
        }).then(function () {
          window.location.reload();
        });
      }
    }
  });
}


async function categoryDeleteHandler(name) {
  await Api.delete('/api/categoryDelete', name);

  new Swal({
    title: '카테고리가 삭제되었습니다.',
    icon: 'success',
  }).then(function () {
    window.location.reload();
  });
}