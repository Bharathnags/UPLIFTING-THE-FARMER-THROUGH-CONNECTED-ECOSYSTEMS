const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  password: { type: String, required: true },
  cart: {
    type: Map,
    of: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String, required: true },
    },
    default: {}, // Initialize cart as an empty object
  },
});

module.exports = mongoose.model("User", userSchema);
