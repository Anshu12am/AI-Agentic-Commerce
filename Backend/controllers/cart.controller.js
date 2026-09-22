const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');

module.exports.addProductToCart = async (req, res) => {

  try{
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const requestedQuantity = quantity || 1;

    const product = await productModel.findOne({
      _id: productId,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if(product.stock < requestedQuantity){
       return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    let cart = await cartModel.findOne({
      user: req.user._id,
    }
    )
    if (!cart) {
      cart = await cartModel.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity: requestedQuantity,
          },
        ],
      });

       return res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if(existingItem){
      const newQuantity = existingItem.quantity + requestedQuantity;
    
    if (newQuantity > product.stock) {
        return res.status(400).json({
          message: "Not enough stock available",
        });
   }

   existingItem.quantity = newQuantity;
  }else{
    cart.items.push({
       product: productId,
       quantity: requestedQuantity,
    })
  }

  await cart.save();

  return res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  }catch(error){
    return res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
}


module.exports.getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({
        user: req.user._id,
      })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: {
          items: [],
        },
      });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

module.exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const product = await productModel.findOne({
      _id: productId,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    const cart = await cartModel.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    return res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update cart",
      error: error.message,
    });
  }
};


module.exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await cartModel.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove product from cart",
      error: error.message,
    });
  }
};


module.exports.clearCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};

