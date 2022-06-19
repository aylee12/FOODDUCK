import { Router } from 'express';
import { productService } from '../services';
import { loginRequired, roleCheck, contentTypeCheck } from '../middlewares';

const productRouter = Router();

//상품 추가
productRouter.post('/products', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
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

//전체 상품 조회
productRouter.get('/products', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getAllProducts());
  } catch (error) {
    next(error);
  }
});

//카테고리별 상품 조회
productRouter.get('/products/category/:category', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getProductsByCategory(req.params.category));
  } catch (error) {
    next(error);
  }
});

//상품명으로 조회
productRouter.get('/products/name/:name', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getProductByName(req.params.name));
  } catch (error) {
    next(error);
  }
});

//상품ID값으로 조회
productRouter.get('/products/id/:productId', async (req, res, next) => {
  try {
    res.status(200).json(await productService.getProductById(req.params.productId));
  } catch (error) {
    next(error);
  }
});

//상품 수정 => productUpdate라고 길게 End point naming할 필요가 없음. (order-router.js 참고)
productRouter.patch('/products/:productId', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatelist = req.body;

    res.status(200).json(await productService.updateProduct(productId, updatelist));
  } catch (error) {
    next(error);
  }
});

//상품 삭제
productRouter.delete('/products/:productId', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    res.status(200).json(await productService.deleteProduct(req.params.productId));
  } catch (error) {
    next(error);
  }
});

export { productRouter };
