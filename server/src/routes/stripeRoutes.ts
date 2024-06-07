import express from "express";
const router = express.Router();
import stripeController from "../controllers/stripeController";

router.post("/create-payment-intent", stripeController.createPaymentIntent);
router.post("/payment-successful", stripeController.createCustomer);
router.post("/renew-payment", stripeController.renewPayment);

export default router;
