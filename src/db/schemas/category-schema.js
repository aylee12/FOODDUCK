import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    //unique와 index를 각각 true로 설정했을때 인덱스 적용이 제대로 되는지 확인해보기 (mongoose에 대해서 공부를 좀 더...)
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
