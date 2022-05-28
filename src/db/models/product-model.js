import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  //상품 전체 조회
  async findAll() {
    return await Product.find({});
  }

  //상품명 조회
  async findByProductName(productName) {
    return await Product.findOne({ productName });
  }

  //상품 카테고리 별 조회
  async findByCategory(category) {
    return await Product.find({ category });
  }

  //상품 추가
  async createProduct(productInfo) {
    return await Product.create(productInfo);
  }

  //상품 수정
  async updateProduct(productId, updatelist) {
    const updateProduct = await Product.findOneAndUpdate(
      { productId },
      { updatelist },
      { returnOriginal: false }
    );

    console.log('리턴', updateProduct);

    return updateProduct;
  }

  //상품 삭제
  async deleteProduct(itemInfo) {
    const deleteProduct = await Product.findOneAndDelete({ itemInfo });
    return deleteProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
