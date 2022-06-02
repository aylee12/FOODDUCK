import { orderModel } from '../db';
import { userService } from './index';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  //주문 추가
  async addOrder(order) {
    order.userId = await userService.getUser(order.userId);
    if (!order.userId) {
      throw new Error('존재하지 않는 회원입니다.');
    }

    return await this.orderModel.createOrder(order);
  }

  //주문자 id로 주문내역 조회
  async getOrders(userId) {
    return await this.orderModel.findByUserId(userId);
  }

  //주문 전체 조회
  async getAllOrders() {
    return await this.orderModel.findAll();
  }

  //주문번호로 주문내역 조회
  async getOrder(orderNo) {
    return await this.orderModel.findByOrderNo(orderNo);
  }

  //주문 수정
  async updateOrder(orderNo, updatelist) {
    return await this.orderModel.updateOrder(orderNo, updatelist);
  }

  //주문 삭제
  async deleteOrder(orderNo) {
    return await this.orderModel.deleteOrder(orderNo);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
