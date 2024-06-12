import User, { IUser } from "../models/user";
import { IUserCredentials } from "../types/interfaces/auth";

class UserRepository {
  async create(user: IUser) {
    return User.create(user);
  }

  async findByEmail(user: IUserCredentials) {
    const { email } = user;
    return User.findOne({ email });
  }

  async getAll() {
    return User.find({});
  }

  async switchRole(email: string, role: string) {

    const newRole = role === "customer" ? "creator" : "customer"

    return User.findOneAndUpdate(
      { email: email },
      { role: newRole },
      { new: true }
    );
  }
}

export default new UserRepository();
