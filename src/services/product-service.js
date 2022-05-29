import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //상품추가
  async addProduct(product) {
    return await this.productModel.createProduct(product);
  }

  //상품 전체 조회
  async getAllProducts() {
    return await this.productModel.findAll();
  }

  //상품 카테고리 별 조회
  async getProductsByCategory(category) {
    return await this.productModel.findByCategory(category);
  }

  //상품명 조회
  async getProductByName(name) {
    return await this.productModel.findByProductName(name);
  }

  //상품수정
  async updateProduct(productId, updatelist) {
    return await this.productModel.updateProduct(productId, updatelist);
  }
}

const productService = new ProductService(productModel);

export { productService };
