import orderRepository from "../repositories/orderRepository";
import subscriptionRepository from "../repositories/subscriptionRepository";

class SubscriptionService {
    async getOne(name: string) {
        try {
            const subscription = await subscriptionRepository.getOne(name);

            return subscription;
        } catch (error) {
            console.error(`Error fetching subscription: ${error}`);
            throw new Error("Error fetching subscription");
        }
    }

} 
export default new SubscriptionService();
