import orderRepository from "../repositories/orderRepository";

class OrderService {
    async getOne(customerId: string) {
        try {
            const order = await orderRepository.getOne(customerId);
            console.log("order retrieved:", order);

            return order;
        } catch (error) {
            console.error(`Error fetching order: ${error}`);
            throw new Error("Error fetching order");
        }
    }
} 
export default new OrderService();
