import { IUser } from "../models/user"
import userRepository from "../repositories/userRepository"

class UserService {
    async createUser(userData: IUser) {
        //TODO write logic here to check if user already exists, hash pass, send confirmation email on signup? 
        try {
            const user = await userRepository.create(userData)
            console.log(user)
            return user
        } catch (error) {
            console.log(error)
        }
    }
}


export default new UserService()