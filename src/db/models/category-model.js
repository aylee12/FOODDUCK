import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  //카테고리 추가
  async createCategory(category) {
    return await Category.create(category);
  }

  //카테고리 전체 조회
  async findAll() {
    return await Category.find({});
  }

  //카테고리 수정
  async updateCategory(name, updatelist) {
    return await Category.findOneAndUpdate({ name }, updatelist, {
      returnOriginal: false,
    });
  }

  //카테고리 삭제
  async deleteCategory(category) {
    return await Category.findOneAndDelete({ category });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
