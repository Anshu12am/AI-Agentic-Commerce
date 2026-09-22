const groq = require("./groq.service");
const productModel = require("../models/product.model")
const chatLogModel = require("../models/chat-log.model")
const semanticSearchService = require("./semanticSearch.service")

module.exports.extractShoppingIntent = async(userMessage,chatHistory) =>{
    const recentHistory = (chatHistory || []).slice(-10);
   const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0,

    messages: [
      {
        role: "system",
        content: `
You are a shopping intent extraction system.

Extract structured shopping requirements from the user's message.

Return ONLY valid JSON.
Do not add markdown.
Do not add explanations.

Use exactly this structure:

{
  "category": null,
  "maxPrice": null,
  "minPrice": null,
  "brand": null,
  "requirements": []
}

Rules:
- category should be a product category such as "Laptops", "Phones", "Headphones".
- maxPrice should be a number if the user specifies a maximum budget.
- minPrice should be a number if the user specifies a minimum budget.
- brand should be a brand name if mentioned.
- requirements should contain important product requirements.
- If something is not mentioned, use null.
- requirements must always be an array.
        `,
      },
      {
        role: "user",
        content: `
Previous conversation:
${JSON.stringify(recentHistory)}

Current user message:
${userMessage}
        `,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  return JSON.parse(content);
};



module.exports.searchProductsWithSemanticSearch = async(userMessage,intent) => {
  const semanticProducts = await semanticSearchService.getProductsFromSemanticSearch(
      userMessage
    );

     const filteredProducts = semanticProducts.filter((product) => {
    if (
      intent.maxPrice !== null &&
      product.price > intent.maxPrice
    ) {
      return false;
    }

    if (
      intent.minPrice !== null &&
      product.price < intent.minPrice
    ) {
      return false;
    }

    if (
      intent.brand &&
      !product.brand
        ?.toLowerCase()
        .includes(intent.brand.toLowerCase())
    ) {
      return false;
    }

    if (
      intent.category &&
      !product.category
        ?.toLowerCase()
        .includes(intent.category.toLowerCase())
    ) {
      return false;
    }

    if (product.stock <= 0) {
      return false;
    }

    return true;
  });

  return filteredProducts;
}


module.exports.generateRecommendations = async(userMessage,intent,products,chatHistory) => {
  const productData = products.map((product) => ({
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
    stock: product.stock,
    specifications: Object.fromEntries(product.specifications || []),
    tags: product.tags,
}))

const completion = await groq.chat.completions.create({
   model: "openai/gpt-oss-20b",
    temperature: 0.3,

    messages: [
      {
        role: "system",
        content: `
You are ShopAgent, an AI shopping recommendation system.

Your job is to recommend the most relevant products
based only on the products provided to you.

Do not invent product information.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside the JSON.

Use exactly this structure:

{
  "recommendations": [
    {
      "productId": "",
      "reason": ""
    }
  ]
}

Rules:
- Only recommend products from the provided product list.
- productId must exactly match the provided product id.
- Explain why the product matches the user's requirements.
- Consider budget, category, brand and requirements.
- If no product is suitable, return an empty recommendations array.
        `,
      },
      {
        role: "user",
        content: `
        Previous conversation:
${JSON.stringify((chatHistory || []).slice(-10))}

User request:
${userMessage}

Shopping intent:
${JSON.stringify(intent)}

Available products:
${JSON.stringify(productData)}
        `,
      },
    ],
  });

    const content = completion.choices[0].message.content;

  return JSON.parse(content);
}


module.exports.generateAgentResponse = async (userMessage,intent,recommendations,chatHistory,actionResult) => {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0.5,

    messages: [
      {
        role: "system",
        content: `
You are ShopAgent, a helpful AI shopping assistant.

Respond naturally to the user's shopping request.

The previous conversation is important context.

If the user asks a follow-up question, answer it in the context
of the previous conversation.

Use the provided shopping intent and recommendations
to explain the result.

Do not invent product information.

If an action was successfully executed,
tell the user that the action was completed.

If the action failed,
clearly explain that the action could not be completed.

Do not claim that an action was completed unless
the action result says success.

If suitable products were found:
- briefly explain that you found relevant options
- mention why they match the user's request
- keep the response concise

If no suitable products were found:
- politely tell the user that no matching products were found
- do not invent alternatives

Return ONLY the response text.
Do not use JSON.
Do not use markdown.
        `,
      },

      {
        role: "user",
        content: `
        Previous conversation:
${JSON.stringify((chatHistory || []).slice(-10))}

Action result:
${JSON.stringify(actionResult)}

User request:
${userMessage}

Shopping intent:
${JSON.stringify(intent)}

Recommendations:
${JSON.stringify(recommendations)}
        `,
      },
    ],
  });

  return completion.choices[0].message.content;
}


module.exports.getChatHistory = async(userId) =>{
  let chatLog = await chatLogModel.findOne({
    user: userId,
  })
  if (!chatLog) {
    chatLog = await chatLogModel.create({
      user: userId,
      messages: [],
    });
  }

  return chatLog.messages;
}


module.exports.saveChatMessages = async (userId,userMessage,assistantMessage)=>{
  let chatLog = await chatLogModel.findOne({
    user:userId,
  });
  if (!chatLog) {
    chatLog = await chatLogModel.create({
      user: userId,
      messages: [],
    });
  }



  chatLog.messages.push({
    role:"user",
    content:userMessage
  })
  chatLog.messages.push({
    role: "assistant",
    content: assistantMessage,
  });

   await chatLog.save();

  return chatLog;
}


module.exports.detectAgentAction = async(userMessage,chatHistory) => {
  const completion = await groq.chat.completions.create({
     model: "openai/gpt-oss-20b",
    temperature: 0,

    messages: [
      {
        role: "system",
        content: `
You are ShopAgent's action detection system.

Your job is to determine whether the user's message requires
an action or is only a normal shopping conversation.

Return ONLY valid JSON.

Use exactly this structure:

{
  "action": "none",
  "productName": null,
  "quantity": 1
}

Allowed actions:

- "add_to_cart"
- "remove_from_cart"
- "update_cart"
- "none"

Rules:

- If the user wants to add a product to cart:
  action = "add_to_cart"

- If the user wants to remove a product from cart:
  action = "remove_from_cart"

- If the user wants to change quantity:
  action = "update_cart"

- If no cart action is requested:
  action = "none"

- productName should contain the product name mentioned by the user.
- If the user refers to a previously discussed product using words
  like "this", "it", or "that laptop", use the conversation history
  to identify the product.
- quantity should be a number.
- Default quantity is 1.
-For update_cart, quantity means the final quantity the user wants
  in the cart, not the amount to add

Conversation history:
${JSON.stringify(chatHistory)}
        `,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  return JSON.parse(content);
  
}


module.exports.findProductByName = async (productName) =>{
  const product = await productModel.findOne({
     name: {
      $regex: productName,
      $options: "i",
    },
    isActive: true,
  })
  return product;
}