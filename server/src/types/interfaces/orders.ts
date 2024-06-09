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

export class NewOrderDataFromClient {
  constructor(
    public email: string,
    public level: string,
    public orderDate: Date,
    public paymentIntent: Stripe.Response<Stripe.PaymentIntent>
  ) { }
}

export class OrderDataForDb {
  constructor(
    public paymentMethod: string,
    public stripeCustomerId: string,
    public email: string,
    public level: number,
    public orderDate: Date,
    public activeUntil: Date,
    public isPaymentSuccess: boolean,
    public renewStatus: boolean,
    public transactionId: string,
    public amount: number,
    public currency: string,
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
