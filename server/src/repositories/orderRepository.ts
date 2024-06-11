import Stripe from "stripe";
import Order, { IOrder } from "../models/order";
import PaymentIntent, { IPaymentIntent } from "../models/paymentintent";
import { IUserCredentials } from "../types/interfaces/auth";
import { OrderDataForDb } from "../types/interfaces/orders";
import { PaymentIntentData } from "../types/paymentIntent";

class OrderRepository {
  async getOne(email: string) {
    return Order.findOne({ email });
  }

  async getAllOrder() {
    return Order.find({});
  }

  /*  async createOrder( userData ) {
    const { paymentIntent, orderDate, email } = userData;
    return Order.create({});
  } 
 */
  async createPaymentIntent(paymentIntentData: PaymentIntentData) {
    const { paymentIntent, orderDate, email } = paymentIntentData;
    try {
      const newPaymentIntent = await PaymentIntent.create({
        paymentIntent,
        orderDate,
        email,
      });

      return newPaymentIntent;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  async saveOrder(orderDataForDb: OrderDataForDb) {
    const {
      paymentMethod,
      stripeCustomerId,
      email,
      level,
      orderDate,
      activeUntil,
      isPaymentSuccess,
      renewStatus,
      transactionId,
      amount,
      currency,
    } = orderDataForDb;

    try {
      const savedOrder = await Order.create({
        paymentMethod,
        stripeCustomerId,
        email,
        level,
        orderDate,
        activeUntil,
        isPaymentSuccess,
        renewStatus,
        transactionId,
        amount,
        currency,
      });
      return savedOrder;
    } catch (error) {
      console.log("Problem creating order", error);
      throw error;
    }
  }

  async updateRenewalDate(orderId: string, newRenewalDate: Date) {
    const result = Order.findByIdAndUpdate(orderId, {
      activeUntil: newRenewalDate,
    });
    return result;
  }

  async updatePaymentSuccess(orderId: string, updateData: Partial<IOrder>) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedOrder) {
        console.log(`Order with ID ${orderId} not found`);
        return null;
      }

      console.log('Order updated successfully:', updatedOrder);
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }


  async updateSubscriptionStatus(orderId: string, updates: { isPaymentSuccess: boolean }) {
    return await Order.findByIdAndUpdate(orderId, updates)
  }

  async toggleRenewStatus(id: string) {
    try {
      return Order.findByIdAndUpdate(id, { renewStatus: false }, { new: true });
    } catch (error) {
      console.error(error);
    }

  }

  /* async createNewOrder*/

  /* async refreshOrder */

  /* async cancelOrder */

  //vi kommer ha en till för när en betalning ite går genom
}
export default new OrderRepository();
