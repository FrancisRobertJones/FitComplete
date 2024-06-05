import Subscription from "../models/subscription";

class SubscriptionRepository {
    async getOne(name: string) {
        return Subscription.findOne();
    }

}



export default new SubscriptionRepository()