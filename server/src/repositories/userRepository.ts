import User, { IUser } from "../models/user"
import { IUserCredentials } from "../types/interfaces/auth";

class UserRepository {
    async create(user: IUser) {
        return User.create(user);
    }

    async findByEmail(user: IUserCredentials) {
        const { email } = user;
        return User.findOne({ email }) 
    }


}



export default new UserRepository()