import { Router } from 'express';
import { productService } from '../services';
import { loginRequired, roleCheck, contentTypeCheck } from '../middlewares';

const productRouter = Router();

//상품 추가
productRouter.post('/productAdd', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const { name, price, company, category, img, description } = req.body;

    const product = await productService.addProduct({
      name,
      price,
      company,
      category,
      img,
      description,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

//엔드포인트 통합 (전체 상품이랑 카테고리별 상품 검색) - [GET] /product?category=meat
// productRouter.get('/productList', async (req, res, next) => {
//   try {
//     if (req.query.category) {
//       const products = await productService.getProductsByCategory(category);
//       res.status(200).json(products);
//     }
//     const products = await productService.getAllProducts();
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// });

//전체 상품 조회
productRouter.get('/productListAll', async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//카테고리별 상품 조회
productRouter.get('/productListCategory/:category', async (req, res, next) => {
  try {
    const category = req.params.category;

    const products = await productService.getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//엔드포인트 통합 (상품 ID색이랑 상품명 검색) - [GET] /product?productId=1 or /product?name=립아이
// productRouter.get('/productOne', async (req, res, next) => {
//   try {
//     if (req.query.productId) {
//       const product = await productService.getProductById(productId);
//       res.status(200).json(product);
//     }
//     if (req.query.name) {
//       const products = await productService.getProductByName(name);
//       res.status(200).json(products);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

//상품명으로 조회
productRouter.get('/productListName/:name', async (req, res, next) => {
  try {
    const name = req.params.name;

    const products = await productService.getProductByName(name);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//상품ID값으로 조회
productRouter.get('/productListId/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

//상품 수정
productRouter.patch('/productUpdate/:productId', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatelist = req.body;

    const updateResult = await productService.updateProduct(productId, updatelist);
    res.status(200).json(updateResult);
  } catch (error) {
    next(error);
  }
});

//상품 삭제
productRouter.delete(
  '/productDelete/:productId',
  loginRequired,
  roleCheck,
  contentTypeCheck,
  async (req, res, next) => {
    try {
      const productId = req.params.productId;

      const deleteResult = await productService.deleteProduct(productId);
      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

export { productRouter };
