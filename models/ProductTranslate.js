const { Schema, model } = require("mongoose");

const schema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  language: {
    type: String,
    enum: ["kz", "ru", "en"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  diameter: {
    type: String,
  },
});

module.exports = model("ProductTranslation", schema);
