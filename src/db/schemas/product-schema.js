import { Schema } from 'mongoose';

const ProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  productName: {
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
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export { ProductSchema };
