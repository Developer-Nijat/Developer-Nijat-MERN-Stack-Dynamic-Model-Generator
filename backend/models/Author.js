const mongoose = require("mongoose");
  const { Schema } = mongoose;
  
  const AuthorSchema = new Schema(
    {
      "name": { type: Schema.Types.String },
    "surname": { type: Schema.Types.String },
    "book": { type: Schema.Types.ObjectId, ref: "Book" }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model(
    "Author",
    AuthorSchema
  );
  