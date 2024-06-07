import { Schema, model, Document } from "mongoose";
import Stripe from "stripe";

interface IPaymentIntent extends Document {
  email: string;
  orderDate: Date;
  paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
}

const PaymentIntentSchema = new Schema<IPaymentIntent>({
    paymentIntent: {type: Object, required: true},
    orderDate: {type: Date, required: true},
    email: {type: String, required: true  }
});

const PaymentIntent = model<IPaymentIntent>("Payment_intent", PaymentIntentSchema);

export default PaymentIntent;
export { IPaymentIntent };
