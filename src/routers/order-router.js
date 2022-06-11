import { Router } from 'express';
import { orderService } from '../services';
import { loginRequired, contentTypeCheck } from '../middlewares';

const orderRouter = Router();

//주문 추가
orderRouter.post('/order', loginRequired, contentTypeCheck, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { orderName, phoneNumber, address, orderList, totalPrice } = req.body;

    res.status(201).json(
      await orderService.addOrder({
        userId,
        orderName,
        phoneNumber,
        address,
        orderList,
        totalPrice,
      })
    );
  } catch (error) {
    next(error);
  }
});

//주문 조회
orderRouter.get('/order', async (req, res, next) => {
  try {
    //주문자 id로 주문내역 조회
    const userId = req.query.userId;
    if (userId) {
      return res.status(200).json(await orderService.getOrders(userId));
    }
    //주문자 id값이 없다면 전체 주문내역 조회
    res.status(200).json(await orderService.getAllOrders());
  } catch (error) {
    next(error);
  }
});

//주문번호로 주문내역 조회
orderRouter.get('/order/:orderNo', async (req, res, next) => {
  try {
    const orderNo = req.params.orderNo;
    res.status(200).json(await orderService.getOrder(orderNo));
  } catch (error) {
    next(error);
  }
});

//주문 수정 => End point name을 orderUpdate라고 하지 않고 order라고 해도 됨. 왜냐하면 patch HTTP method를 사용하기 때문에 충분히 이해 가능.
orderRouter.patch('/order/:orderNo', loginRequired, contentTypeCheck, async (req, res, next) => {
  try {
    const orderNo = req.params.orderNo;
    const userId = req.currentUserId;
    const { orderName, phoneNumber, address } = req.body;

    res.status(200).json(await orderService.updateOrder(orderNo, userId, { orderName, phoneNumber, address }));
  } catch (error) {
    next(error);
  }
});

//주문 삭제 => 주문 수정과 마찬가지로 바꾸자
orderRouter.delete('/order/:orderNo', loginRequired, async (req, res, next) => {
  try {
    const orderNo = req.params.orderNo;

    res.status(200).json(await orderService.deleteOrder(orderNo));
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
