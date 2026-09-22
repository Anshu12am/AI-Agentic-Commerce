require("dotenv").config();

const connectDB = require("./config/database");
const { ingestProducts } = require("./services/knowledgeIngestion.service");

const run = async () => {
  try {
    await connectDB();

    await ingestProducts();

    console.log("Product ingestion completed.");

    process.exit(0);
  } catch (error) {
    console.error("Product ingestion failed:", error);
    process.exit(1);
  }
};

run();