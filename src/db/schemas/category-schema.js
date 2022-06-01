import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  }
);

export { CategorySchema };
