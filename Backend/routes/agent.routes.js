const express = require("express")
const agentController = require("../controllers/agent.controller")
const authMiddleware = require("../middlewares/auth.middleware");

const agentRouter = express.Router();

agentRouter.post("/chat",authMiddleware.authUser,agentController.chatWithAgent);

agentRouter.get("/history",authMiddleware.authUser,agentController.getChatHistory)

module.exports = agentRouter;