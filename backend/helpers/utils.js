const fs = require("fs");

function generateFields(fields) {
  // Initialize an empty string to hold the field definitions
  let fieldDefinitions = "";

  // Iterate through the array of field definitions
  fields.forEach((field, index) => {
    // Add a comma and space after each field definition except the last one
    const separator = index < fields.length - 1 ? ",\n    " : "";

    // Append the field definition to the string
    if (field.type === "ObjectId") {
      fieldDefinitions += `"${field.name}": { type: Schema.Types.${
        field.type
      }, ref: "${field.ref}" ${field?.required ? `, required: true` : ""} ${
        field?.unique ? `, unique: true` : ""
      } }${separator}`;
    } else {
      fieldDefinitions += `"${field.name}": { type: Schema.Types.${
        field.type
      } ${field?.required ? `, required: true` : ""} ${
        field?.unique ? `, unique: true` : ""
      } }${separator}`;
    }
  });

  return fieldDefinitions;
}

const makeFirstLetterCapital = (str) => {
  str = str.charAt(0).toUpperCase() + str.substring(1);
  return str;
};

const getModelFiles = () => {
  return new Promise((resolve, reject) => {
    try {
      const routes = [];
      fs.readdirSync("./models").forEach((file) => {
        const modelName = file.replace(".js", "");
        routes.push(modelName);
      });
      resolve(routes);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateFields,
  makeFirstLetterCapital,
  getModelFiles,
};
