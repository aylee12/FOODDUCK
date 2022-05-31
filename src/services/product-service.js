import { productModel } from '../db';
import { categoryService } from './index';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //상품 추가
  async addProduct(product) {
    //카테고리 확인
    product.category = await categoryService.getCategoryByName(product.category);
    if (!product.category) {
      throw new Error('카테고리가 존재하지 않습니다.');
    }
    return await this.productModel.create(product);
  }

  //상품 전체 조회
  async getAllProducts() {
    return await this.productModel.findAll();
  }

  //상품 카테고리 별 조회
  async getProductsByCategory(category) {
    //카테고리 확인
    category = await categoryService.getCategoryByName(category);
    if (!category) {
      throw new Error('카테고리가 존재하지 않습니다.');
    }
    return await this.productModel.findByCategory(category);
  }

  //상품명 조회
  async getProductByName(name) {
    return await this.productModel.findByProductName(name);
  }

  //상품ID 조회
  async getProductById(productId) {
    return await this.productModel.findByProductID(productId);
  }

  //상품 수정
  async updateProduct(productId, updatelist) {
    //카테고리 확인
    updatelist.category = await categoryService.getCategoryByName(updatelist.category);
    if (!updatelist.category) {
      throw new Error('카테고리가 존재하지 않습니다.');
    }
    return await this.productModel.updateProduct(productId, updatelist);
  }

  //상품 삭제
  async deleteProduct(productId) {
    return await this.productModel.deleteProduct(productId);
  }
}

const productService = new ProductService(productModel);

export { productService };
