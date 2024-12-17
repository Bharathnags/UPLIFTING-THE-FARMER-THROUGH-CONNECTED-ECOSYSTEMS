const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: String, required: true }, // Unique product identifier
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String }, // Optional: URL or file path for the product image
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);