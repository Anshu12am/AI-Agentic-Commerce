const productModel = require("../models/product.model");
const agentService = require("../services/agent.service")
const cartService = require("../services/cart.service")


module.exports.chatWithAgent = async(req,res) => {
try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const chatHistory = await agentService.getChatHistory(req.user._id)

    const action = await agentService.detectAgentAction(message,chatHistory)

    let actionResult = null;

    if(action.action=="add_to_cart"){

      const product = await agentService.findProductByName(action.productName);

     if (!product) {
    actionResult = {
      success: false,
      message: "I couldn't find that product."
    };
  } else{

     await cartService.addProductToCart(
      req.user._id,
      product._id,
      action.quantity || 1)
  
   actionResult = {
      success: true,
      message: `${product.name} has been added to your cart.`,
      productId: product._id,
      quantity: action.quantity || 1
    };
  }
  }


  if(action.action === "remove_from_cart"){
    const product = await agentService.findProductByName(action.productName);

    if (!product) {
    actionResult = {
      success: false,
      message: "I couldn't find that product.",
    };
  }else{
    await cartService.removeCartItem(
      req.user._id,
      product._id
    );
     actionResult = {
      success: true,
      message: `${product.name} has been removed from your cart.`,
      productId: product._id,
    };
  }
  }
    
  if (action.action === "update_cart") {

  const product = await agentService.findProductByName(
    action.productName
  );

  if (!product) {

    actionResult = {
      success: false,
      message: "I couldn't find that product.",
    };

  } else {

    try {

      await cartService.updateCartItem(
        req.user._id,
        product._id,
        action.quantity
      );

      actionResult = {
        success: true,
        message: `${product.name} quantity has been updated to ${action.quantity}.`,
        productId: product._id,
        quantity: action.quantity,
      };

    } catch (error) {

      actionResult = {
        success: false,
        message: error.message,
      };

    }
  }
}


    const intent = await agentService.extractShoppingIntent(message,chatHistory);

const products =
  await agentService.searchProductsWithSemanticSearch(
    message,
    intent
  );
    const recommendationResult = await agentService.generateRecommendations(message,intent,products,chatHistory)

    const agentResponse = await agentService.generateAgentResponse(message,intent,recommendationResult.recommendations,chatHistory,actionResult)


    await agentService.saveChatMessages(req.user._id,message,agentResponse)

    return res.status(200).json({
      message: "Shopping intent extracted successfully",
      intent,
      products,
      recommendations:recommendationResult.recommendations,
      agentResponse
    });

  } catch (error) {
    console.error("Agent error:", error);

    return res.status(500).json({
      message: "Failed to process shopping request",
      error: error.message,
    });
  }
}

module.exports.getChatHistory = async (req, res) => {
  try {
    const messages = await agentService.getChatHistory(req.user._id);

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Get chat history error:", error);

    return res.status(500).json({
      message: "Failed to fetch chat history",
      error: error.message,
    });
  }
};