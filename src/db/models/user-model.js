import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // userId 정보를 받지 않음
  // async findById(userId) {
  //   const user = await User.findOne({ _id: userId });
  //   return user;
  // }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  // 전체 유저 목록을 조회할 케이스가 없음
  // async findAll() {
  //   const users = await User.find({});
  //   return users;
  // }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

const userModel = new UserModel();

export { userModel };
