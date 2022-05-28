import { Router } from 'express';
import { productService } from '../services';

const productRouter = Router();

//상품 추가
productRouter.post('/', async (req, res, next) => {
  try {
    const {
      productId,
      productName,
      price,
      company,
      category,
      img,
      description,
    } = req.body;

    const newProduct = await productService.addProduct({
      productId,
      productName,
      price,
      company,
      category,
      img,
      description,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

//전체 상품 조회
productRouter.get('/listAll', async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//카테고리별 상품 조회
productRouter.get('/list/:category', async (req, res, next) => {
  try {
    const category = req.params.category;

    const products = await productService.getCategoryProducts(category);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//상품 수정
productRouter.patch('/update/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatelist = req.body;

    console.log('id:', productId);
    console.log('업데이트리스트\n', updatelist);

    const updateResult = await productService.updateProduct(
      productId,
      updatelist
    );
    res.status(200).json(updateResult);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
