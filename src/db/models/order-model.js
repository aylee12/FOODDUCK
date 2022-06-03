import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  //주문 추가
  async createOrder(order) {
    return await Order.create(order);
  }

  //주문자 id로 주문내역 조회
  async findByUserId(userId) {
    return await Order.find({ userId }).populate('userId').populate('orderList.productId');
  }

  //주문 전체 조회
  async findAll() {
    return await Order.find({});
  }

  //주문번호로 주문내역 조회
  async findByOrderNo(orderNo) {
    return await Order.findOne({ orderNo }).populate('userId').populate('orderList.productId');
  }

  //상품 수정
  async updateOrder(orderNo, updatelist) {
    return await Order.findOneAndUpdate({ orderNo }, updatelist, {
      returnOriginal: false,
    });
  }

  //상품 삭제
  async deleteOrder(orderNo) {
    return await Order.findOneAndDelete({ orderNo });
  }
}

const orderModel = new OrderModel();

export { orderModel };
