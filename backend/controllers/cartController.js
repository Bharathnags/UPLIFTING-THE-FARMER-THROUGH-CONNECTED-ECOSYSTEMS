const User = require("../models/User");

const addToCart = async (req, res) => {
  const { userId, item } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if item is already in the cart
    const itemIndex = user.cart.findIndex(
      (cartItem) => cartItem.itemId === item.itemId
    );

    if (itemIndex !== -1) {
      user.cart[itemIndex].quantity += item.quantity; // Update quantity
    } else {
      user.cart.push(item); // Add new item to cart
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cart.findIndex(cartItem => cartItem.itemId === itemId);

    if (itemIndex !== -1) {
      user.cart[itemIndex].quantity -= 1;
      if (user.cart[itemIndex].quantity <= 0) {
        user.cart.splice(itemIndex, 1); // Remove item if quantity is 0 or less
      }
    }

    await user.save();
    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Error removing from cart", error });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Error getting cart", error });
  }
};

module.exports = { addToCart, removeFromCart, getCart };