const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    imageUrl: { type: String, required: true, maxLength: 200 },
    quantity: { type: Number },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
