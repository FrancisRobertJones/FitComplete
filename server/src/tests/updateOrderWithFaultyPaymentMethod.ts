import DatabaseConnection from "../db/databaseConnection";
import Order from "../models/order";
import stripe from "../utils/stripeInit";

const createFaultyPaymentMethod = async () => {

    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: '4000000000009995',
                exp_month: 12,
                exp_year: 2025,
                cvc: '123',
            },
        });

        console.log('Faulty Payment Method created:', paymentMethod.id);
        return paymentMethod.id;
    } catch (error) {
        console.error('Error creating faulty payment method:', error);
    }
};


const updateOrderWithFaultyPaymentMethod = async (email: string) => {
    try {
        const db = DatabaseConnection.getInstance();
        await db.connect();
        console.log('Connected to db!');
     
            const faultyPaymentMethodId = await createFaultyPaymentMethod();
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


updateOrderWithFaultyPaymentMethod(email);