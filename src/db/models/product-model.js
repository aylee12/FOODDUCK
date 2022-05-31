import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  //상품 추가
  async createProduct(product) {
    return await Product.create(product);
    //.populate('email');
  }

  //상품 전체 조회
  async findAll() {
    return await Product.find({});
  }

  //상품 카테고리 별 조회
  async findByCategory(category) {
    return await Product.find({ category });
  }

  //상품명 조회
  async findByProductName(name) {
    return await Product.findOne({ name });
  }

  //상품ID 조회
  async findByProductID(productId) {
    return await Product.findOne({ productId });
  }

  //상품 수정
  async updateProduct(productId, updatelist) {
    const updatedProduct = await Product.findOneAndUpdate({ productId }, updatelist, { returnOriginal: false });

    console.log('리턴', updatedProduct);

    return updatedProduct;
  }

  //상품 삭제
  async deleteProduct(productId) {
    const deleteProduct = await Product.findOneAndDelete({ productId });
    return deleteProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
