const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");

const router = express.Router();

// Routes for cart operations
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/:userId", getCart);

module.exports = router;