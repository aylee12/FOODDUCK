import { orderModel } from '../db';
import { userService, productService } from './index';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  //주문 추가
  async addOrder(order) {
    //회원 확인
    order.userId = await userService.getUser(order.userId);
    if (!order.userId) {
      throw new Error('존재하지 않는 회원입니다.');
    }
    //상품확인 후 상품정보 기입
    order.orderList = await Promise.all(
      order.orderList.map(async (product) => {
        product.productId = await productService.getProductById(product.productId);
        if (!product.productId) {
          throw new Error('존재하지 않는 상품입니다.');
        }
        return product;
      })
    );

    return await this.orderModel.createOrder(order);
  }

  //주문자 id로 주문내역 조회
  async getOrders(userId) {
    userId = await userService.getUser(userId);
    if (!userId) {
      throw new Error('존재하지 않는 회원입니다.');
    }
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
