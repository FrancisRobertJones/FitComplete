import { IUser } from "../models/user"
import userRepository from "../repositories/userRepository"
import { sendWelcomeEmail } from "../utils/emailfunctions";
import bcrypt from "bcrypt";

class UserService {
  async createUser(userData: IUser): Promise<IUser> {
    //TODO write logic here to check if user already exists, hash pass, send confirmation email on signup? 
    try {
      console.log('Creating user:', userData);


      /* 
      TODO finish userexistslogic
      const userExists = await userRepository.findByEmail(userData.email);
      if (userExists) {
        throw new Error('User already exists');
      } */

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      const user = await userRepository.create(userData);
      console.log('User created:', user); // Log user creation

      //NOTE ONLY USE WHEN SENDING TO EMAIL ADDRESSES WE OWN; OR WE WILL SPAM STRANGERS
      /*             await sendWelcomeEmail(user.email, user.name);
       */
      return user;
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      throw new Error('Error creating user');
    }
  }

}


export default new UserService()