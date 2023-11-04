const fs = require("fs");
const {
  generateFields,
  makeFirstLetterCapital,
  getModelFiles,
} = require("../helpers/utils");

exports.generateModelAndRoute = (req, res) => {
  const { modelName, fields } = req.body;

  if (!modelName) {
    res.status(400).json({ message: "modelName is required" });
    return;
  }

  // Define a route template file
  const routeTemplate = fs.readFileSync("./routes/routeTemplate.js", "utf8");

  let modelSchemaString = `const mongoose = require("mongoose");
  const { Schema } = mongoose;
  
  const ${modelName}Schema = new Schema(
    {
      ${generateFields(fields)}
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model(
    "${makeFirstLetterCapital(modelName)}",
    ${modelName}Schema
  );
  `;

  fs.writeFileSync(`./models/${modelName}.js`, modelSchemaString);

  // Create a route dynamically
  const routeCode = routeTemplate
    .replaceAll("{{ModelName}}", modelName)
    .replaceAll("{{modelName}}", modelName.toLowerCase());
  fs.writeFileSync(`./routes/${modelName}Route.js`, routeCode);

  res
    .status(201)
    .json({ message: `Model '${modelName}' created successfully` });
};

exports.getModels = async (req, res) => {
  const result = await getModelFiles();
  res.json(result);
  try {
  } catch (error) {
    console.log("getModels error: ", error);
    res.status(500).json({
      message: "Fetching model files from folder failed",
      error: error,
    });
  }
};
