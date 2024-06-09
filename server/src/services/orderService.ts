import orderRepository from "../repositories/orderRepository";
import { NewOrderDataFromClient, OrderDataForDb } from "../types/interfaces/orders";

class OrderService {
    async getOne(email: string) {
        try {
            const order = await orderRepository.getOne(email);

            return order;
        } catch (error) {
            console.error(`Error fetching order: ${error}`);
            throw new Error("Error fetching order");
        }
    }

    async createOrder(newOrderDataFromClient: NewOrderDataFromClient) {
        const renewalDate = new Date(newOrderDataFromClient.orderDate)
        renewalDate.setDate(renewalDate.getDate() + 7)
        
        const orderDataForDb = new OrderDataForDb(
            newOrderDataFromClient.paymentIntent.payment_method as string,
            newOrderDataFromClient.paymentIntent.customer as string,
            newOrderDataFromClient.email,
            Number(newOrderDataFromClient.level),
            newOrderDataFromClient.orderDate,
            renewalDate,
            newOrderDataFromClient.paymentIntent.status === "succeeded",
            true,
            newOrderDataFromClient.paymentIntent.id,
            newOrderDataFromClient.paymentIntent.amount,
            newOrderDataFromClient.paymentIntent.currency
        )   

        const savedOrder = await orderRepository.saveOrder(orderDataForDb)
        return savedOrder
    }
    
}
export default new OrderService();
