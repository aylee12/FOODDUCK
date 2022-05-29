import { Router } from 'express';
import { productService } from '../services';

const productRouter = Router();

//전체 상품 조회
productRouter.get('/list', async (req, res, next) => {
  try {
    //전체 상품 조회
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//카테고리별 상품 조회
productRouter.get('/list/:id', async (req, res, next) => {
  try {
    //카테고리 데이터 받아오기
    const category = req.params.id;
    const products = await productService.getCategoryProducts(category);
    res.status(200).json(products); 
  } catch (error) {
    next(error);
  }
});

//상품 추가
productRouter.post('/add', async (req, res, next) => {
  try {
    const { productId, productName, price, company, category, img } = req.body;

    const newProduct = await productService.addproduct({
      productId,
      productName,
      price,
      company,
      category,
      img,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
