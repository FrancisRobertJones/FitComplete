import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import OrderService from "../services/orderService";
import Order, { IOrder } from "../models/order";
import stripe from "../utils/stripeInit";
import { NewOrderDataFromClient } from "../types/interfaces/orders";
import orderService from "../services/orderService";

declare module "express-serve-static-core" {
  interface Request {
    order?: IOrder;
  }
}

class OrderController {
  async getOneOrder(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    try {
      const order = await OrderService.getOne(email);
      if (order) {
        response.status(200).json(order);
      } else {
        response.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch order" });
    }
  }

  async getPaymentSuccessStatus(request: Request, response: Response) {
    try {
      const order = request.order;
      if (order) {
        response.status(200).json({ paymentSuccess: order.isPaymentSuccess });
      } else {
        response.status(404).json({ error: "paymentSuccess not found" });
      }
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch order paymentSuccess" });
    }
  }

  async createOrder(request: Request, response: Response) {
    const { userData, payment_intent: paymentIntentId } = request.body;
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      const orderDate = new Date();

      const newOrderDataFromClient = new NewOrderDataFromClient(
        userData.userEmail,
        userData.level,
        orderDate,
        paymentIntent
      );

      const savedOrder = orderService.createOrder(newOrderDataFromClient);
      response.status(200).json({ success: true, order: savedOrder });
    } catch (error) {
      response.status(500).json({ error: "Failed to create order" });
      console.log(error);
    }
  }


  async updateSuccess(request: Request, response: Response) {
    const { orderId, payment_intent: paymentIntentId } = request.body;
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      const updatedOrder = orderService.updatePaymentSuccess(orderId, paymentIntent);

      response.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
      response.status(500).json({ error: "Failed to create order" });
      console.log(error);
    }
  }

  async cancelOrder(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const result = await orderService.cancelOrder(email);
      if (typeof result === "object") {
        response.status(200).json({ message: "success", order: result });
      } else {
        response.status(400).json({ message: result });
      }
    } catch (error) {
      response.status(500).json({ error: "Failed to cancel order" });
    }
  }

  async reactivateOrder(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const result = await orderService.reactivateOrder(email);
      if (typeof result === "object") {
        response.status(200).json({ message: "success", order: result });
      } else {
        response.status(400).json({ message: result });
      }
    } catch (error) {
      response.status(500).json({ error: "Failed to reactivate order" });
    }
  }
}

export default new OrderController();
