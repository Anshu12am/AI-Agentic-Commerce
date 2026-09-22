const express = require('express');
const orderRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');

orderRouter.post("/create", authMiddleware.authUser, orderController.createOrder);

orderRouter.get("/", authMiddleware.authUser, orderController.getMyOrders);

orderRouter.get("/:id", authMiddleware.authUser, orderController.getOrderById);

module.exports = orderRouter;