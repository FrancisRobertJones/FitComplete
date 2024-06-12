import express, { request } from "express";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post('/payment-success-status', orderController.getOneOrder, orderController.getPaymentSuccessStatus)
router.post("/payment-successful", orderController.createOrder);
router.post("/update-success", orderController.updateSuccess)
router.post('/get-one', orderController.getOneOrder);
router.post("/unsubscribe", orderController.cancelOrder)
router.post("/reactivate", orderController.reactivateOrder)

export default router;
