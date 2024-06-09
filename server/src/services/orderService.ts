import orderRepository from "../repositories/orderRepository";

class OrderService {
    async getOne(email: string) {
        try {
            const order = await orderRepository.getOne(email);
            console.log("order retrieved:", order);

            return order;
        } catch (error) {
            console.error(`Error fetching order: ${error}`);
            throw new Error("Error fetching order");
        }
    }

    async createOne() {
        
    }
} 
export default new OrderService();
