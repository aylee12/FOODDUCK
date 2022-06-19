import { Router } from 'express';
import { categoryService } from '../services';
import { loginRequired, roleCheck, contentTypeCheck } from '../middlewares';

const categoryRouter = Router();

//카테고리 추가
categoryRouter.post('/categories', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    res.status(201).json(await categoryService.addCategory({ name, description }));
  } catch (error) {
    next(error);
  }
});

//카테고리 조회
categoryRouter.get('/categories', async (req, res, next) => {
  try {
    res.status(200).json(await categoryService.getAllCategories());
  } catch (error) {
    next(error);
  }
});

//카테고리 수정
categoryRouter.patch('/categories/:name', loginRequired, roleCheck, contentTypeCheck, async (req, res, next) => {
  try {
    const name = req.params.name;
    const updatelist = req.body;

    res.status(200).json(await categoryService.updateCategory(name, updatelist));
  } catch (error) {
    next(error);
  }
});

//카테고리 삭제
categoryRouter.delete('/categories/:name', loginRequired, roleCheck, async (req, res, next) => {
  try {
    const name = req.params.name;

    res.status(200).json(await categoryService.deleteCategory(name));
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
