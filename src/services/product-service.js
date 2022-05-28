import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //상품 전체 조회
  async getProducts() {
    return await this.productModel.findAll();
  }

  //상품 카테고리 별 조회
  async getCategoryProducts(category) {
    return await this.productModel.findByCategory(category);
  }

  //상품추가
  async addProduct(productinfo) {
    return await this.productModel.createProduct(productinfo);
  }

  //상품수정
  async updateProduct(productId, updatelist) {
    return await this.productModel.updateProduct(productId, updatelist);
  }
}

const productService = new ProductService(productModel);

export { productService };
