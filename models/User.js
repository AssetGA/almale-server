const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    mobile: { type: String, required: true, maxLength: 30 },
    street: { type: String, maxLength: 100 },
    city: { type: String, maxLength: 200 },
    postalCode: { type: String, maxLength: 20 },
    email: { type: String, maxLength: 200, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", schema);
