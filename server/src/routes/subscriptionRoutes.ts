import express from "express";
import SubscriptionController from "../controllers/subscriptionController";
const router = express.Router();
import stripe from "../utils/stripeInit";

router.get("/:name", SubscriptionController.getOneSubscription);
router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: /* calculateOrderAmount(items) */ 5,
      currency: "sek",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      payment_method_types: ['card'],

    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

export default router;
