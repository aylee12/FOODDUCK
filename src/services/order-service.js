import { orderModel } from '../db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  //주문 추가
  async addOrder(order) {
    return await this.orderModel.createOrder(order);
  }

  //주문 전체 조회
  async getAllOrders() {
    return await this.orderModel.findAll();
  }

  //주문 수정
  async updateOrder(orderNo, updatelist) {
    return await this.orderModel.updateOrder(orderNo, updatelist);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
