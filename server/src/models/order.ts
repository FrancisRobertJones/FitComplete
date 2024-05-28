import { Schema, model, Document } from "mongoose";

interface IOrder extends Document {
  customerId: string;
  level: number;
  orderDate: Date;
  activeUntil: Date;
  isPaymentSuccess: boolean;
  renewStatus: boolean;
}

const OrderSchema = new Schema<IOrder>({
  customerId: { type: String, required: true },
  level: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  activeUntil: { type: Date, required: true },
  isPaymentSuccess: { type: Boolean, required: true },
  renewStatus: { type: Boolean, required: true },
});

const Order = model<IOrder>("Order", OrderSchema);

export default Order;
export { IOrder };
