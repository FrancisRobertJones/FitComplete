import { Request, Response } from "express";
import stripe from "../utils/stripeInit";

class StripeController {
  async createPaymentIntent(request: Request, response: Response) {
    const { items } = request.body;
    const calculateOrderAmount = (items: string) => {
      return 5000;
    };

    try {
      // Create a PaymentIntent with the order amount and currency
      const firstPaymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        // payment_method_types: ["card"],
        automatic_payment_methods: {
          enabled: true,
        },
        setup_future_usage: "off_session",
      });

      response.send({
        clientSecret: firstPaymentIntent.client_secret,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating payment intent:", error.message);
        response.status(500).send({ error: error.message });
      } else {
        console.error("Unknown error:", error);
        response.status(500).send({ error: "An unknown error occurred" });
      }
    }
  }

  async createCustomer(request: Request, response: Response) {
    try {
      const paymentIntentId = request.body.payment_intent as string;
      console.log("payment intent id<<<<<<<<<<<<<<<<", paymentIntentId);

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      console.log(paymentIntent);

      const paymentMethodId = paymentIntent["payment_method"] as string;

      // TODO: customer email, name and more?
      const customer = await stripe.customers.create({
        name: "test",
        email: "test@test.com",
        payment_method: paymentMethodId,
      });

      response.status(200).json({ customer: customer });
    } catch (error) {
      console.error("Unknown error:", error);
      response.status(500).send({ error: "An unknown error occurred " });
    }
  }

  async renewPayment(request: Request, response: Response) {
    try {
      const customer = "";
      const weeklyPaymentIntent = await stripe.paymentIntents.create({
        // TODO: Get amount
        amount: 500,
        currency: "usd",
        confirm: true,
        off_session: true,
        customer: customer,
      });

      console.log(weeklyPaymentIntent);
      response.status(200).send({ weeklyPaymentIntent: weeklyPaymentIntent });
    } catch (error) {
      response.status(500).send({ error: error });
    }
  }
}

export default new StripeController();
