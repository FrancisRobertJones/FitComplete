import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import SubscriptionService from "../services/SubscriptionService";

class SubscriptionController {
  async getOneSubscription(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const name = request.params.name;
    
    try {
      const subscription = await SubscriptionService.getOne(name);
      if (subscription) {
        response.status(200).json({ subscription: subscription });
      } else {
        return response.status(404).json({ error: "Subscription not found" });
      }
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch subscription" });
    }
  }
}

export default new SubscriptionController();
