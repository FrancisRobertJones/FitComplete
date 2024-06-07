import Stripe from "stripe";

export interface IPaymentIntent {
  id: string;
  object: string;
  amount: number;
  client_secret: string;
  created: number;
  currency: string;
  processing: null;
  receipt_email: null;
}

export class NewOrder {
  constructor(
    public email: string,
    public level: string,
    public orderDate: Date,
    public paymentIntent: Stripe.Response<Stripe.PaymentIntent>
  ) {}
}

export interface IOrderDataFromFrontEnd {
    userEmail: string;
    level: string;
}

export interface IOrder {
  paymentMethod: string;
  stripeCustomerId: string;
  email: string;
  level: string;
  orderDate: Date;
  activeUntil: Date;
  isPaymentSuccess: boolean;
  renewStatus: boolean;
}
