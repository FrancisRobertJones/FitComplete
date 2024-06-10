import { Request, Response } from "express";
import stripe from "../utils/stripeInit";
import {
  IOrderDataFromFrontEnd,
  NewOrderDataFromClient,
} from "../types/interfaces/orders";
import orderRepository from "../repositories/orderRepository";
import { PaymentIntentData } from "../types/paymentIntent";
import orderService from "../services/orderService";
import subscriptionRepository from "../repositories/subscriptionRepository";
import ngrok from "@ngrok/ngrok";
import userRepository from "../repositories/userRepository";
import { DateTime } from "luxon";
import { IOrder } from "../models/order";

class StripeController {

  async createCustomerAndOrder(request: Request, response: Response) {
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

      newOrderDataFromClient.paymentIntent.customer = customer.id;

      const savedOrder = await orderService.createOrder(newOrderDataFromClient);

      response.status(200).json({ success: true, order: savedOrder });
    } catch (error) {
      response.status(500).json({ error: "Failed to create order" });
      console.log(error);
    }
  }

  async createPaymentIntent(request: Request, response: Response) {
    console.log("create paymentintent hit once")
    const { userData, subscriptionName } = request.body;


    const orderDate = new Date();
    // const calculateOrderAmount = (items: string) => {
    //   return 5000;
    // };
    let price = 0
    try {
      let subscriptionData = await subscriptionRepository.getOne(subscriptionName)
      if (subscriptionData) {
         price = subscriptionData.price;
      }
    } catch (error) {
      console.log("problem fetching subscription data price")
      throw Error
    }
    
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        description: subscriptionName,
        currency: "SEK",
        // payment_method_types: ["card"],
        automatic_payment_methods: {
          enabled: true,
        },
        setup_future_usage: "off_session",
      });

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
    console.log("cronjob running");

    try {
      const allOrder = await orderRepository.getAllOrder();
      const now = DateTime.now();

      for (const order of allOrder) {
        const orderId = order._id as string;
        const renewStatus = order.renewStatus;
        const activeUntilISO = order.activeUntil.toISOString();
        const renewalDate = DateTime.fromISO(activeUntilISO);

        if (renewStatus && now >= renewalDate) {
          console.log(`Order ${orderId} needs to be renewed.`);
          const newRenewalDate = renewalDate.plus({ days: 7 }).toJSDate();
          console.log(newRenewalDate);

          const result = await orderRepository.updateRenewalDate(
            orderId,
            newRenewalDate
          );

          

          const paymentIntent = await stripe.paymentIntents.create({
            amount: order.amount,
            currency: order.currency,
            customer: order.stripeCustomerId,
            payment_method: order.paymentMethod,
            off_session: true,
            confirm: true,
          });

          console.log("paymentmethod<<<<<<<<<<", order.paymentMethod);
          console.log("paymentintent<<<<<<<<<<<<<", paymentIntent);
          

          response.status(200).json({ "new date": renewalDate });
        } else {
          console.log(`Order ${orderId} is still valid.`);
        }
      }
    } catch (error) {
      response.status(500).send({ error: error });
    }
  }

  async checkIfUserHasOrder(userEmail: string) {
    try {
      const allOrder = await orderRepository.getAllOrder();
    } catch (error) {}
  }
}

export default new StripeController();
