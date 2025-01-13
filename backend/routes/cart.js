const express = require("express");
const { addToCart, removeFromCart, getCart, updateCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/update", updateCart);
router.get("/:userId", getCart);

module.exports = router;
