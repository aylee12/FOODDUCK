import { Router } from 'express';
import { categoryService } from '../services';
import { loginRequired, roleCheck, contentTypeCheck } from '../middlewares';

const categoryRouter = Router();

//카테고리 추가
categoryRouter.post('/categoryAdd', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
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
categoryRouter.patch('/categoryUpdate/:name', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const name = req.params.name;
    const updatelist = req.body;

    const updateResult = await categoryService.updateCategory(name, updatelist);
    res.status(200).json(updateResult);
  } catch (error) {
    next(error);
  }
});

//카테고리 삭제
categoryRouter.delete('/categoryDelete/:name', loginRequired, roleCheck, async (req, res, next) => {
  try {
    const name = req.params.name;

    const deleteResult = await categoryService.deleteCategory(name);
    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
