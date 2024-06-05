import orderRepository from "../repositories/orderRepository";
import subscriptionRepository from "../repositories/subscriptionRepository";

class SubscriptionService {
    async getOne(level: string) {
        try {
            const subscription = await subscriptionRepository.getOne(level);
            console.log("subscription retrieved:", subscription);

            return subscription;
        } catch (error) {
            console.error(`Error fetching subscription: ${error}`);
            throw new Error("Error fetching subscription");
        }
    }
} 
export default new SubscriptionService();
