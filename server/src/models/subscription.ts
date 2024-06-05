import { Schema, model, Document } from "mongoose";

interface ISubscription extends Document {
  name: string;
  price: number;
}

const SubscriptionSchema = new Schema<ISubscription>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Subscription = model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;
export { ISubscription };
