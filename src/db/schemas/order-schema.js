import { connection } from 'mongoose';
import { Schema } from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const OrderSchema = new Schema(
  {
    orderNo: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
    },
    orderInfo: {
      type: String,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

OrderSchema.plugin(autoIncrement.plugin, {
  model: 'orders',
  field: 'orderNo',
  startAt: 0,
  increment: 1,
});

export { OrderSchema };
