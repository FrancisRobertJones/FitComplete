import express from "express";
const router = express.Router();
import stripeController from "../controllers/stripeController";

router.post("/create-payment-intent", stripeController.createPaymentIntent);
router.post("/payment-successful", stripeController.createCustomerAndOrder);
router.get("/renew-payment", stripeController.renewPayment);
router.post("/check-user", stripeController.checkIfUserHasOrder)

export default router;
