const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarSchema = new Schema(
  {
    name: { type: Schema.Types.String },
    year: { type: Schema.Types.Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
