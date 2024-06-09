import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import OrderService from "../services/orderService";
import Order, { IOrder } from "../models/order";
import stripe from "../utils/stripeInit";
import { NewOrder } from "../types/interfaces/orders";

declare module "express-serve-static-core" {
  interface Request {
    order?: IOrder;
  }
}

class OrderController {
  async getOneOrder(request: Request, response: Response, next: NextFunction) {

    const email = request.body.email;
    console.log("email in order", email)

    try {
      const order = await OrderService.getOne(email);
      console.log("order in order<<<<<<<<<<", order)

      if (!order) {
        return response.status(404).json({ error: "Order not found" });
      }
      request.order = order;
      next();
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch order" });
    }
  }

  async getLevel(request: Request, response: Response) {
    try {

      const order = request.order;
      if (order) {
        response.status(200).json({ level: order.level });
      } else {
        response.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch order level" });
    }
  }

  async createOrder(request: Request, response: Response) {
    console.log("req.body<<<<<<<<<<<<<", request.body);

    const { userData, payment_intent: paymentIntentId } = request.body;
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      const orderDate = new Date();

      const newOrderData = new NewOrder(
        userData.userEmail,
        userData.level,
        orderDate,
        paymentIntent
      );
      console.log("neworderdata<<<<<<<<<<<<<<", newOrderData);

    } catch (error) {
      console.log(error)
    }
  }
}

export default new OrderController();
