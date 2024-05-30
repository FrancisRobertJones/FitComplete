import Order from "../models/order";

class OrderRepository {
    async getOne(customerId: string) {
        return Order.findOne({ customerId });
    }
}
export default new OrderRepository()
