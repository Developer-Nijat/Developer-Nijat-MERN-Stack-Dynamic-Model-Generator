const mongoose = require("mongoose");
const { Schema } = mongoose;

const AgentSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true, unique: true },
    address: { type: Schema.Types.String, required: true },
    status: { type: Schema.Types.Boolean },
    year: { type: Schema.Types.Number },
    info: { type: Schema.Types.Map },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", AgentSchema);
