const mongoose = require("mongoose");
const User = require("../models/User");

// Add item to the cart
const addToCart = async (req, res) => {
  const { userId, item } = req.body;

  console.log('Received userId:', userId); // Debug log
  console.log('Received item:', item); // Debug log

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure itemId is treated as a string
    const itemIdStr = String(item.itemId);

    // Check if item already exists in the cart (using itemId as string key)
    if (user.cart.has(itemIdStr)) {
      // If exists, update the quantity
      user.cart.get(itemIdStr).quantity += item.quantity;
    } else {
      // Add new item to the cart
      user.cart.set(itemIdStr, {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: convertMapToArray(user.cart) });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    console.log('Received request to remove item from cart:', { userId, itemId }); // Debug log

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found"); // Debug log
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user); // Debug log

    // Ensure itemId is treated as a string
    const itemIdStr = String(itemId);

    if (user.cart.has(itemIdStr)) {
      const item = user.cart.get(itemIdStr);
      console.log("Item found in cart:", item); // Debug log

      item.quantity -= 1;

      // Remove the item if quantity is 0
      if (item.quantity <= 0) {
        user.cart.delete(itemIdStr);
        console.log("Item quantity is 0, removed from cart"); // Debug log
      } else {
        // Update the quantity in the cart
        user.cart.set(itemIdStr, item);
        console.log("Item quantity updated in cart:", item); // Debug log
      }

      await User.updateOne(
        { _id: userId },
        { $set: { cart: user.cart } }
      );
      console.log("Cart updated, user saved"); // Debug log
      res.status(200).json({ message: "Item removed from cart", cart: convertMapToArray(user.cart) });
    } else {
      console.log("Item not found in cart"); // Debug log
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Error removing from cart", error });
  }
};


// Get the user's cart
const getCart = async (req, res) => {
  const { userId } = req.params;

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert the user's cart map to an array for a proper response
    const cartItems = convertMapToArray(user.cart);

    res.status(200).json({ cart: cartItems });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Error getting cart", error });
  }
};


// Update the quantity of an item in the cart
const updateCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cart.has(itemId)) {
      const item = user.cart.get(itemId);
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        user.cart.delete(itemId);
      }

      await user.save();
      res.status(200).json({ message: "Cart updated", cart: convertMapToArray(user.cart) });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Helper function to convert Map to an array
const convertMapToArray = (map) => {
  if (!map) return []; // Ensure we have a valid map to convert
  return Array.from(map.entries()).map(([id, item]) => ({
    itemId: id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));
};

module.exports = { addToCart, removeFromCart, getCart, updateCart };
