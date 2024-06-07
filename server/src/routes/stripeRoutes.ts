import express from "express";
const router = express.Router();
import stripeController from "../controllers/stripeController";
import orderController from "../controllers/orderController";

router.post("/create-payment-intent", stripeController.createPaymentIntent);
// router.post("/payment-successful", stripeController.createCustomer);
router.post("/payment-successful", orderController.createOrder);
router.post("/renew-payment", stripeController.renewPayment);

export default router;
