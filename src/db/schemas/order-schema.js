import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const OrderSchema = new Schema(
  {
    orderNo: shortId,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    orderName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
          address3: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    orderList: [
      new Schema({
        product: {
          type: Schema.Types.ObjectId,
          ref: 'categories',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }),
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: '배송 준비중',
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
