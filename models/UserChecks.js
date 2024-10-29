const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    email: { type: String, maxLength: 200, required: true, unique: true },
    num: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("UserChecks", schema);
