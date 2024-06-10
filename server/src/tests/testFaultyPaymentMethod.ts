import DatabaseConnection from "../db/databaseConnection";
import Order from "../models/order";
import stripe from "../utils/stripeInit";

const faultyPaymentMethodId = 'pm_card_chargeCustomerFail'


const updateOrderWithFaultyPaymentMethod = async (email: string, faultyPaymentMethodId: string) => {
    try {
        const db = DatabaseConnection.getInstance();
        await db.connect();
        console.log('Connected to db!');
     
            faultyPaymentMethodId;
            const order = await Order.findOne({ email });
            if (order && faultyPaymentMethodId) {
                order.paymentMethod = faultyPaymentMethodId;
                await order.save();
                console.log(`Order updated with faulty payment method: ${faultyPaymentMethodId}`);
            } else {
                console.log('Order not found for email:', email);
            } 
    } catch (error) {
        console.error('Error updating order:', error);
    } 
}

const email = "failtest@gmail.com"


updateOrderWithFaultyPaymentMethod(email, faultyPaymentMethodId);