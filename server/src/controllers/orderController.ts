import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import OrderService from "../services/orderService";
import Order, { IOrder } from "../models/order";

declare module "express-serve-static-core" {
    interface Request {
        order?: IOrder;
    }
}

class OrderController {


    async getOneOrder(request: Request, response: Response, next: NextFunction) {
        const customerId = request.body.customerId;
        try {
            const order = await OrderService.getOne(customerId);
            if (!order) {
                return response.status(404).json({ error: "Order not found" });
            }
            request.order = order; 
            next();
        } catch (error) {
            response.status(500).json({ error: "Failed to fetch order" });
        }
    }

    async getLevel(request: Request, response: Response) {
        try {
            const order = request.order;
            if (order) {
                response.status(200).json({ level: order.level });
            } else {
                response.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
            response.status(500).json({ error: "Failed to fetch order level" });
        }
    }
}



export default new OrderController();