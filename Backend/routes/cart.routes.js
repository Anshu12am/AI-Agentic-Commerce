const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

cartRouter.post("/add",authMiddleware.authUser, cartController.addProductToCart);

cartRouter.get("/", authMiddleware.authUser, cartController.getCart);

cartRouter.put("/update/:productId", authMiddleware.authUser, cartController.updateCartItem);

cartRouter.delete("/remove/:productId", authMiddleware.authUser, cartController.removeCartItem);

cartRouter.delete("/clear", authMiddleware.authUser, cartController.clearCart);

module.exports = cartRouter;