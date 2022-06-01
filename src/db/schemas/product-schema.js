import { Schema } from 'mongoose';
import { shortId } from './types/short-id';
// import { connection } from 'mongoose';
// const autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize(connection);

const ProductSchema = new Schema(
  {
    // productId: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    //   index: true,
    // },
    productId: shortId,
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
      type: Schema.Types.ObjectId,
      ref: 'categories',
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
    collection: 'products22',
    timestamps: true,
  }
);

// ProductSchema.plugin(autoIncrement.plugin, {
//   model: 'products',
//   field: 'productId',
//   startAt: 1,
//   increment: 1,
// });

export { ProductSchema };
