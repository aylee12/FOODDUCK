import { connection } from 'mongoose';
import { Schema } from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const ProductSchema = new Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    company: {
      type: String,
      required: true,
    },
    category: {
      // type: Schema.Types.ObjectId,
      // ref: 'categories',
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

ProductSchema.plugin(autoIncrement.plugin, {
  model: 'products',
  field: 'productId',
  startAt: 1,
  increment: 1,
});

export { ProductSchema };
