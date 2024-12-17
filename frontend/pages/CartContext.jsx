import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1; // Increment quantity
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]); // Add with quantity 1
    }
  };

  const removeFromCart = (itemId) => {
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === itemId) {
        if (cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 }; // Decrease quantity by 1
        } else {
          return null; // Remove item if quantity is 1
        }
      }
      return cartItem;
    }).filter(item => item !== null); // Remove null values from cart (if item is to be removed completely)

    setCartItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
