const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection setup
require("./config/database");

app.use(require("./routes/mainRoute"));

// Load routes dynamically (require each route file)
fs.readdirSync("./routes").forEach((file) => {
  // exclude routeTemplate.js and mainRoute.js files
  if (
    file.endsWith("Route.js") &&
    file !== "routeTemplate.js" &&
    file !== "mainRoute.js"
  ) {
    app.use(require(`./routes/${file}`));
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
