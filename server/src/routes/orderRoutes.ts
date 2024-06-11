import express, { request } from "express";
import OrderController from "../controllers/orderController";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post('/payment-success-status', OrderController.getOneOrder, OrderController.getPaymentSuccessStatus)
router.post("/payment-successful", orderController.createOrder);
router.post("/update-success", orderController.updateSuccess)
<<<<<<< HEAD
=======

>>>>>>> 7afb4f3 (big update to auth context, and order data including isCancelling and isInactive prepping for subscription cancellation changes. smaller changes globally to accomodate changes in auth context)
router.post('/get-one', OrderController.getOneOrder);
router.post("/unsubscribe", orderController.cancelOrder)

export default router;
