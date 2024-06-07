import Stripe from "stripe";

export class PaymentIntentData {
    constructor(
        public email: string,
        public orderDate: Date,
        public paymentIntent: Stripe.Response<Stripe.PaymentIntent>
    ) {}
}