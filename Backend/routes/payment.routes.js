const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

paymentRouter.post("/create-order", authMiddleware.authUser, paymentController.createRazorpayOrder);

paymentRouter.post("/verify-payment",authMiddleware.authUser,paymentController.verifyPayment)

module.exports = paymentRouter;