import { Schema } from 'mongoose';
import { shortId } from './types/short-id';
// import { connection } from 'mongoose';
// const autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize(connection);

const OrderSchema = new Schema(
  {
    // orderNo: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    //   index: true,
    // },
    orderNo: shortId,
    email: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: '배송 준비중',
    },
    orderInfo: {
      type: new Schema({
        name: String,
        product: Array,
        totalPrice: Number,
        phoneNumber: String,
        postalCode: String,
        address1: String,
        address2: String,
        address3: String,
        requests: String,
      }),
      required: true,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

// OrderSchema.plugin(autoIncrement.plugin, {
//   model: 'orders',
//   field: 'orderNo',
//   startAt: 0,
//   increment: 1,
// });

export { OrderSchema };
