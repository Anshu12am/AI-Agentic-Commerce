const productModel = require("../models/product.model")
const index = require("./embedding.service")


module.exports.ingestProducts = async () => {
  const products = await productModel.find({
    isActive:true,
  })

   if (!products.length) {
    console.log("No active products found.");
    return;
  }

  const records = products.map((product) => {
    const specifications = Object.fromEntries(
      product.specifications || []
    );

    const text = `
Product Name: ${product.name}
Category: ${product.category}
Brand: ${product.brand || "Not specified"}
Price: ${product.price}
Description: ${product.description}
Specifications: ${JSON.stringify(specifications)}
Tags: ${(product.tags || []).join(", ")}
    `.trim();


     return {
      _id: product._id.toString(),
      text,
      productId: product._id.toString(),
      name: product.name,
      category: product.category,
      brand: product.brand || "",
      price: product.price,
      stock: product.stock,
    };
  }) 

   await index.upsertRecords({
    records:records,
   });

  console.log(
    `${records.length} products ingested into Pinecone`
  );

}