import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  //상품 전체 조회
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  //상품명 조회
  async findByProductName(productName) {
    const product = await Product.findOne({ productName });
    return product;
  }

  //상품 카테고리 별 조회
  async findByCategory(category) {
    const products = await Product.find({ category });
    return products;
  }

  //상품 추가
  async createProduct(productInfo) {
    const createProduct = await Product.create(productInfo);
    return createProduct;
  }

  //상품 수정
  // async updateItem(itemInfo) {
  //   const updateItem = await Product.findOneAndUpdate
  // }

  //상품 삭제
  async deleteProduct(itemInfo) {
    const deleteProduct = await Product.findOneAndDelete({ itemInfo });
    return deleteProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
