import Subscription from "../models/subscription";

class SubscriptionRepository {
    async getOne(name: string) {
        console.log(name, "this is the name in the repo")
        return Subscription.findOne({name: name});
    }

}



export default new SubscriptionRepository()