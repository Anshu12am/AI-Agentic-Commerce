const index = require("./embedding.service");
const productModel = require("../models/product.model")

module.exports.semanticSearch = async (query) => {
  const results = await index.searchRecords({
    query: {
      inputs: {
        text: query,
      },
       topK: 5,
    },
   
  });

const hits = results?.result?.hits || [];

  return hits.map((hit) => ({
    productId: hit.fields.productId,
    score: hit._score,
  }));
};

module.exports.getProductsFromSemanticSearch = async(query) => {
  const semanticResults = await module.exports.semanticSearch(query);

  const productIds = semanticResults.map(
    (result) => result.productId
  );

  const products = await productModel.find(
    {
      _id:{$in: productIds},
      isActive: true,
    }
  )
  return products
}