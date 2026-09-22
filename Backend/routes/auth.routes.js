const express = require('express');
const authRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');

authRouter.post("/register",authController.register)

authRouter.post("/login",authController.login)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

authRouter.post("/logout",authController.logout)

module.exports = authRouter;