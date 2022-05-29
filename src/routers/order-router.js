import { Router } from 'express';
import { orderService } from '../services';

const orderRouter = Router();

//주문 추가
orderRouter.post('/orderAdd', async (req, res, next) => {
  try {
    const { orderNo, email, orderStatus, orderInfo } = req.body;

    const newOrder = await orderService.addOrder({
      orderNo,
      email,
      orderStatus,
      orderInfo,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

//주문 조회
orderRouter.get('/orderList', async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

//주문 수정
orderRouter.patch('/orderUpdate/:orderNo', async (req, res, next) => {
  try {
    const orderNo = req.params.orderNo;
    const updatelist = req.body;

    const updateResult = await orderService.updateProduct(orderNo, updatelist);
    res.status(200).json(updateResult);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
