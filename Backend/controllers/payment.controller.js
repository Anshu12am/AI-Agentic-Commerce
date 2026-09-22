const razorpay = require("../services/razorpay.service");
const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model")
const crypto = require("crypto");

module.exports.createRazorpayOrder = async (req, res) => {
  try{
    const { orderId } = req.body;

     if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
      });
    }

    const order = await orderModel.findOne({
      _id: orderId,
      user: req.user._id,
    })

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

     if (order.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Order is already paid",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "INR",
      receipt: `order_${order._id}`,
    })

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();
    
    return res.status(200).json({
      message: "Razorpay order created successfully",

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      key:process.env.RAZORPAY_KEY_ID,
    });
  }catch (error) {
    console.error("Razorpay order error:", error);

    return res.status(500).json({
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
}


module.exports.verifyPayment = async(req,res) => {

  try{
   const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body; 


     if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Payment details are required",
      });
    }


    const order = await orderModel.findOne({
      razorpayOrderId : razorpay_order_id,
      user: req.user._id
    })


     if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Create signature using Razorpay secret
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");


      // Compare signatures
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

     order.paymentStatus = "paid";
    order.status = "confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();

    const cart = await cartModel.findOne({
      user: req.user_id,
    })

    if(cart){
       cart.items = [];
      await cart.save();
    }

    return res.status(200).json({
      message: "Payment verified successfully",
      order,
    });
  }catch (error) {
    console.error("Payment verification error:", error);

    return res.status(500).json({
      message: "Failed to verify payment",
      error: error.message,
    });
  }
}