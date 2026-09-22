const express = require('express');
const productRouter = express.Router();
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');


productRouter.get("/", productController.getProducts);

productRouter.get("/:id", productController.getProductById);

productRouter.post("/",authMiddleware.authUser, roleMiddleware.merchantOnly, productController.createProduct);

productRouter.put("/:id",authMiddleware.authUser, roleMiddleware.merchantOnly, productController.updateProduct);

productRouter.delete("/:id",authMiddleware.authUser, roleMiddleware.merchantOnly, productController.deleteProduct);


module.exports = productRouter;