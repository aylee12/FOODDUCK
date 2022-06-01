import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products22', ProductSchema);

export class ProductModel {
  //상품 추가
  async create(product) {
    return await Product.create(product);
  }

  //상품 전체 조회
  async findAll() {
    return await Product.find({}).populate('category', 'name');
  }

  //상품 카테고리 별 조회
  async findByCategory(category) {
    return await Product.find({ category }).populate('category', 'name');
  }

  //상품명 조회
  async findByProductName(name) {
    return await Product.findOne({ name }).populate('category', 'name');
  }

  //상품ID 조회
  async findByProductID(productId) {
    return await Product.findOne({ productId }).populate('category', 'name');
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
