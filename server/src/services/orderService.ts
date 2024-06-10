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

    // TODO: time 2h
    // TODO: payment unsuccess

    async createOrder(newOrderDataFromClient: NewOrderDataFromClient) {
        const renewalDate = new Date(newOrderDataFromClient.orderDate)
        let level = 0
        if (newOrderDataFromClient.paymentIntent.description === "lite") {
            level = 1
        } else if (newOrderDataFromClient.paymentIntent.description === "basic") {
            level = 2
        } else if (newOrderDataFromClient.paymentIntent.description === "premium") {
            level = 3
        }

        renewalDate.setDate(renewalDate.getDate() + 7)
        
        const orderDataForDb = new OrderDataForDb(
            newOrderDataFromClient.paymentIntent.payment_method as string,
            newOrderDataFromClient.paymentIntent.customer as string,
            newOrderDataFromClient.email,
            level,
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
