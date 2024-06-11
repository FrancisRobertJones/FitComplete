import { Schema, model, Document } from "mongoose";

interface IOrder extends Document {
  paymentMethod: string;
  stripeCustomerId: string;
  email: string;
  level: number;
  orderDate: Date;
  activeUntil: Date;
  isPaymentSuccess: boolean;
  renewStatus: boolean;
  transactionId: string,
  amount: number,
  currency: string,
  isActive: boolean,
  isCancelling: boolean

}

const OrderSchema = new Schema<IOrder>({
  paymentMethod: { type: String, required: true },
  stripeCustomerId: { type: String, required: true },
  email: { type: String, required: true },
  level: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  activeUntil: { type: Date, required: true },
  isPaymentSuccess: { type: Boolean, required: true },
  renewStatus: { type: Boolean, required: true },
  transactionId: { type: String, required: true, index: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  isCancelling: { type: Boolean, required: true, default: false }
});

const Order = model<IOrder>("Order", OrderSchema);

export default Order;
export { IOrder };
