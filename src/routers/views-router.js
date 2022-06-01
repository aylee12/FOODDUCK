import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));

// product-detail 주소 설정
viewsRouter.use('/product/detail/:id', serveStatic('product-detail'));
// product-add 주소 설정
viewsRouter.use('/product/add', serveStatic('product-add'));
// product-edit 주소 설정
viewsRouter.use('/product/edit/:id', serveStatic('product-edit'));

// 유저 정보 변경
viewsRouter.use('/user/info/manage' , serveStatic('user-info-manage'));
viewsRouter.use('/user/info/cart' , serveStatic('user-info-cart'));

// my page 주소 설정
viewsRouter.use('/mypage', serveStatic('mypage'));

// admin-product-list 주소 설정
viewsRouter.use('/admin/product/list', serveStatic('admin-product-list'));
// admin-category-list 주소 설정
viewsRouter.use('/admin/category/list', serveStatic('admin-category-manage'));

// cart 주소 설정하기 
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/pay', serveStatic('pay'));

// 유저 정보 변경
viewsRouter.use('/user/info/manage', serveStatic('user-info-manage'));
viewsRouter.use('/product/meat', serveStatic('meat'));
viewsRouter.use('/product/fish', serveStatic('fish'));
viewsRouter.use('/product/fruit', serveStatic('fruit'));
viewsRouter.use('/product/vegetable', serveStatic('vegetable'));
viewsRouter.use('/product', serveStatic('product'));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };
  console.log(option)
  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}


export { viewsRouter };