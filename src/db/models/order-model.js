import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  //주문 추가
  async createOrder(order) {
    return await Order.create(order);
  }

  //주문 전체 조회
  async findAll() {
    return await Order.find({});
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
