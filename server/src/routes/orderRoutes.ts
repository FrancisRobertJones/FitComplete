import express, { request } from "express";
import OrderController from "../controllers/orderController";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post('/payment-success-status', OrderController.getOneOrder, OrderController.getPaymentSuccessStatus)
router.post("/payment-successful", orderController.createOrder);
router.post("/update-success", orderController.updateSuccess)
router.post('/get-one', OrderController.getOneOrder);
router.post("/unsubscribe", orderController.cancelOrder)

export default router;
