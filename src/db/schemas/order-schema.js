import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const OrderSchema = new Schema(
  {
    orderNo: shortId,
    userId: {
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
      new Schema(
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
        {
          _id: false,
        }
      ),
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
