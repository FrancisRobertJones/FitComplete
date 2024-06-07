import Order from "../models/order";
import PaymentIntent, { IPaymentIntent } from "../models/paymentintent";
import { PaymentIntentData } from "../types/paymentIntent";

class OrderRepository {
  async getOne(email: string) {
    return Order.findOne({ email });
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

  /* async createNewOrder*/

  /* async refreshOrder */

  /* async cancelOrder */

  //vi kommer ha en till för när en betalning ite går genom
}
export default new OrderRepository();
