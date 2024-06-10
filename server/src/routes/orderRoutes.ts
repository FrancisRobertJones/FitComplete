import express, { request } from "express";
import OrderController from "../controllers/orderController";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post('/level', OrderController.getOneOrder, OrderController.getLevel);
router.post("/payment-successful", orderController.createOrder);

router.post('/getOne', (request, response) => {
    OrderController.getOneOrder(request, response, () => {
        response.status(200).json(request.order);
    });
});
router.post("/unsubscribe", orderController.cancelOrder)

export default router;
