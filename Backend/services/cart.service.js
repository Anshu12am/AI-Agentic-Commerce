const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");


module.exports.addProductToCart = async(userId,productId,quantity=1)=>{


  const product = await productModel.findOne({
    _id:productId,
    isActive:true,
  })

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Not enough stock available");
  }


  let cart = await cartModel.findOne({
    user: userId,
  });


  if (!cart) {
    cart = await cartModel.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });

    return cart;
  }

   const existingItem = cart.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new Error("Not enough stock available");
    }

    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  return cart;
}


module.exports.removeCartItem = async(userId,productId) => {



  const cart = await cartModel.findOne({
    user:userId
  });


   if (!cart) {
    throw new Error("Cart not found");
  }

    if (!Array.isArray(cart.items)) {
    cart.items = [];
  }

  const itemExists = cart.items.some((item)=>item.product.toString() === productId.toString())

  if (!itemExists) {
    throw new Error("Product not found in cart");
  }

   cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  await cart.save();



  return cart;
}


module.exports.updateCartItem = async (userId,productId,quantity)=> {

  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

   const product = await productModel.findOne({
    _id: productId,
    isActive: true,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity > product.stock) {
    throw new Error("Not enough stock available");
  }

   const cart = await cartModel.findOne({
    user: userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

   const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === productId.toString()
  );

  if (!existingItem) {
    throw new Error("Product not found in cart");
  }

  existingItem.quantity = quantity;

  await cart.save();

  return cart;
}