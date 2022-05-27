import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: '000-1234-1234',
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
      default: '12121서울특별시동대문구휘경2동',
      required: false,
    },
    gender: {
      type: String,
      required: false,
      default: 'male',
    },
    birthday: {
      type: String,
      required: false,
      default: '19000000',
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
  },
  {
    collection: 'User-info',
    timestamps: true,
  }
);

export { UserSchema };
