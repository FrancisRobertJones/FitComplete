import express from "express";
import SubscriptionController from "../controllers/subscriptionController";
const router = express.Router();

router.get("/:name", SubscriptionController.getOneSubscription);

export default router;
