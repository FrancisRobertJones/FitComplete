import express from "express";
import SubscriptionController from "../controllers/subscriptionController";
const router = express.Router();
import stripe from "../utils/stripeInit";

router.get("/:name", SubscriptionController.getOneSubscription);
router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const calculateOrderAmount = (items: string) => {
    return 5000
  }

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "sek",
      payment_method_types: ['card'],

    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating payment intent:", error.message);
      res.status(500).send({ error: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).send({ error: "An unknown error occurred" });
    }
  }
});

export default router;
