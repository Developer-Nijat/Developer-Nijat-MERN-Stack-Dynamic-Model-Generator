const mongoose = require("mongoose");

const connectionString = "your-mongodb-url-here";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error);
  });
