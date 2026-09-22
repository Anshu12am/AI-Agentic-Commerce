const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');

module.exports.createOrder = async (req,res) => {
  try{
    const cart = await cartModel.findOne({
      user: req.user._id,
    }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const orderItems = [];
    let totalAmount = 0;


    for(const item of cart.items){
      const product = await productModel.findOne({
        _id: item.product._id,
        isActive: true,
      })

    if (!product) {
        return res.status(400).json({
          message: `${item.product.name} is no longer available`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      const itemTotal = product.price * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
         product: product._id,
        quantity: item.quantity,
        price: product.price,
      })
    }

    const order = await orderModel.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
    }) 

    // cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
}



module.exports.getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        user: req.user._id,
      })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


module.exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel
      .findOne({
        _id: id,
        user: req.user._id,
      })
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};