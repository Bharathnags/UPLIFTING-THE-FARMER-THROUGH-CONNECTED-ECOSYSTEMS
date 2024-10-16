import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Check if item is already in the cart
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If item exists, update the quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1; // Increment quantity
      setCartItems(updatedItems);
    } else {
      // If item does not exist, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedItems = cartItems.filter(cartItem => cartItem.id !== itemId);
    setCartItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
