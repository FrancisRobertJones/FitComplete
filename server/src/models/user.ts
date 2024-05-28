import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

const User = model<IUser>('User', UserSchema)

export default User
export { IUser }