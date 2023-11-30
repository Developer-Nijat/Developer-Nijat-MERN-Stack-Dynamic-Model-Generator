const mongoose = require("mongoose");
const config = require("config");

const connectionString = config.get("dbConfig.host");
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error);
  });
