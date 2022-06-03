import { Router } from 'express';
import { orderService } from '../services';
import { loginRequired, contentTypeCheck } from '../middlewares';

const orderRouter = Router();

//주문 추가
orderRouter.post('/orderAdd', loginRequired, contentTypeCheck, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { orderName, phoneNumber, address, orderList, totalPrice } = req.body;

    const newOrder = await orderService.addOrder({
      userId,
      orderName,
      phoneNumber,
      address,
      orderList,
      totalPrice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

//주문 조회
orderRouter.get('/orderList', async (req, res, next) => {
  try {
    //주문자 id로 주문내역 조회
    const userId = req.query.userId;
    if (userId) {
      const orders = await orderService.getOrders(userId);
      res.status(200).json(orders);
      return;
    }
    //주문자 id값이 없다면 전체 주문내역 조회
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

//주문번호로 주문내역 조회
orderRouter.get('/order/:orderNo', async (req, res, next) => {
  try {
    const orderNo = req.params.orderNo;
    const order = await orderService.getOrder(orderNo);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

//주문 수정
orderRouter.patch('/orderUpdate/:orderNo', loginRequired, contentTypeCheck, async (req, res, next) => {
  try {
    const orderNo = req.params.orderNo;
    const userId = req.currentUserId;
    const { orderName, phoneNumber, address } = req.body;

    const updateResult = await orderService.updateOrder(orderNo, userId, { orderName, phoneNumber, address });
    res.status(200).json(updateResult);
  } catch (error) {
    next(error);
  }
});

//주문 삭제
orderRouter.delete('/orderDelete/:orderNo', loginRequired, contentTypeCheck, async (req, res, next) => {
  try {
    const orderNo = req.params.orderNo;

    const deleteResult = await orderService.deleteOrder(orderNo);
    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
