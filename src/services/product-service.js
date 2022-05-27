import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //상품 전체 조회
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  //상품 카테고리 별 조회
  async getCategoryProducts(category) {
    const products = await this.productModel.findByCategory(category);
    return products;
  }

  //상품추가
  async addproduct(productinfo) {
    // const { productCode, productName, price, company, category } = productinfo;

    //db에 저장
    const newProduct = await this.productModel.createProduct(productinfo);
    return newProduct;
  }
}

const productService = new ProductService(productModel);

export { productService };
