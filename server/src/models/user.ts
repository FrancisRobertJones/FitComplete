import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    // TODO: is address necessary? / address interface? 
    address: object,
    email: string;
    password: string;
    role: string
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {type: Object, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

const User = model<IUser>('User', UserSchema)

export default User
export { IUser }