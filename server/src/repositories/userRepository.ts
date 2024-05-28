import User, { IUser } from "../models/user"

class UserRepository {
    async create(user: IUser) {
        return User.create(user);
    }

    /* 
    TODO 
    async findByEmail(user: IUser) {
        return User.
    } */
}



export default new UserRepository()