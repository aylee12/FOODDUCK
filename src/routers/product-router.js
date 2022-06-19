import { Router } from 'express';
import { productService } from '../services';
import { loginRequired, roleCheck, contentTypeCheck } from '../middlewares';

const productRouter = Router();

//상품 추가
productRouter.post('/product', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const { name, price, company, category, img, description } = req.body;

    res.status(201).json(
      await productService.addProduct({
        name,
        price,
        company,
        category,
        img,
        description,
      })
    );
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
productRouter.get('/product', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getAllProducts());
  } catch (error) {
    next(error);
  }
});

//카테고리별 상품 조회
productRouter.get('/product/:category', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getProductsByCategory(req.params.category));
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
productRouter.get('/product/:name', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getProductByName(req.params.name));
  } catch (error) {
    next(error);
  }
});

//상품ID값으로 조회
productRouter.get('/product/:productId', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getProductById(req.params.productId));
  } catch (error) {
    next(error);
  }
});

//상품 수정 => productUpdate라고 길게 End point naming할 필요가 없음. (order-router.js 참고)
productRouter.patch('/product/:productId', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatelist = req.body;

    res.status(200).json(await productService.updateProduct(productId, updatelist));
  } catch (error) {
    next(error);
  }
});

//상품 삭제
productRouter.delete('/product/:productId', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    res.status(200).json(await productService.deleteProduct(req.params.productId));
  } catch (error) {
    next(error);
  }
});

export { productRouter };
