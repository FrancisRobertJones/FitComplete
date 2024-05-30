import express from "express";
import OrderController from "../controllers/orderController";

const router = express.Router();


router.post('/getOne', (request, response) => {
    OrderController.getOneOrder(request, response, () => {
        response.status(200).json(request.order);
    });
});

router.post('/level', OrderController.getOneOrder, OrderController.getLevel);

export default router;
