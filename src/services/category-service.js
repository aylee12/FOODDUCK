import { categoryModel } from '../db';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  //카테고리 추가
  async addCategory(category) {
    return await this.categoryModel.createCategory(category);
  }

  //카테고리 전체 조회
  async getAllCategories() {
    return await this.categoryModel.findAll();
  }

  //카테고리 수정
  async updateCategory(name, updatelist) {
    return await this.categoryModel.updateCategory(name, updatelist);
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
