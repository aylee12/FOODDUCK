import { Router } from 'express';
import { categoryService } from '../services';

const categoryRouter = Router();

//카테고리 추가
categoryRouter.post('/categoryAdd', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await categoryService.addCategory({ name, description });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

//카테고리 조회
categoryRouter.get('/categoryList', async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

//카테고리 수정
categoryRouter.patch('/categoryUpdate/:name', async (req, res, next) => {
  try {
    const name = req.params.name;
    const updatelist = req.body;

    console.log('id:', name);
    console.log('업데이트리스트\n', updatelist);

    const updateResult = await categoryService.updateCategory(name, updatelist);
    res.status(200).json(updateResult);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
