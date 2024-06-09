import { Request, Response } from "express";
import stripe from "../utils/stripeInit";
import { IOrderDataFromFrontEnd, NewOrderDataFromClient } from "../types/interfaces/orders";
import orderRepository from "../repositories/orderRepository";
import { PaymentIntentData } from "../types/paymentIntent";
import orderService from "../services/orderService";

class StripeController {

  async createCustomerAndOrder(request: Request, response: Response){
    const { userData, payment_intent: paymentIntentId } = request.body;
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      const paymentMethodId = paymentIntent.payment_method as string;

      const customer = await stripe.customers.create({
        name: userData.name,
        email: userData.userEmail,
        payment_method: paymentMethodId,
      });

      await stripe.paymentIntents.update(paymentIntentId, {
        customer: customer.id,
      });

      const orderDate = new Date();
      const newOrderDataFromClient = new NewOrderDataFromClient(
        userData.userEmail,
        userData.level,
        orderDate,
        paymentIntent
      );

      newOrderDataFromClient.paymentIntent.customer = customer.id

      const savedOrder = await orderService.createOrder(newOrderDataFromClient);

      response.status(200).json({ success: true, order: savedOrder });
    } catch (error) {
      response.status(500).json({ error: 'Failed to create order' });
      console.log(error)
    }
  }




  async createPaymentIntent(request: Request, response: Response) {
    console.log("create paymentintent hit once")
    const { userData } = request.body;

    const orderDate = new Date();
    // const calculateOrderAmount = (items: string) => {
    //   return 5000;
    // };

    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        // Get from DB
        amount: 5000,
        currency: "usd",
        // payment_method_types: ["card"],
        automatic_payment_methods: {
          enabled: true,
        },
        setup_future_usage: "off_session",
      });

    //   const newOrderData = new NewOrder(
    //     userData.userEmail,
    //     userData.level,
    //     orderDate,
    //     paymentIntent
    //   );

      const paymentIntentData = new PaymentIntentData(
        userData.userEmail,
        orderDate,
        paymentIntent
      );

      await orderRepository.createPaymentIntent(paymentIntentData);

      response.send({
        clientSecret: paymentIntent.client_secret,
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
