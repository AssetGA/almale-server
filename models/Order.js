const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    productId: { type: String, maxLength: 50 },
    deliveryPrice: { type: Number, maxLength: 20 },
    quantity: { type: Number, maxLength: 5 },
    total: { type: Number, maxLength: 20 },
    userId: { type: String, maxLength: 40 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", schema);
