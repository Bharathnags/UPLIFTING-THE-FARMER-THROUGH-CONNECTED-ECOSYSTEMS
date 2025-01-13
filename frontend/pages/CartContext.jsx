import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext'; // Adjust path as necessary

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartUpdated, setCartUpdated] = useState(false); // Add state for triggering fetch
  const { user } = useContext(UserContext);
  const BACKEND_URL = 'http://10.0.2.2:5000'; // Replace with your backend URL

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/cart/${user._id}`);
        const itemsObject = response.data.cart || {};
        const itemsArray = Object.keys(itemsObject).map(key => ({
          itemId: key,
          ...itemsObject[key]
        })).filter(item => item.itemId !== 'undefined');
        console.log('Cart items array:', itemsArray); // Debug log
        setCartItems(itemsArray);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError(err.message || 'Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user?._id, cartUpdated]); // Add cartUpdated as dependency to re-fetch

  const addToCart = async (item) => {
    if (!user) {
      setError('You must be logged in to add items to the cart.');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/cart/add`, {
        userId: user._id,
        item: { ...item, quantity: 1 }
      });

      if (response.status === 200) {
        setCartUpdated(prev => !prev); // Toggle cartUpdated to trigger re-fetch
      } else {
        setError('Failed to add item to cart.');
      }
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError(err.message || 'Failed to add item to cart');
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) {
      setError('You must be logged in to remove items from the cart.');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/cart/remove`, { // Ensure POST method and correct endpoint
        userId: user._id,
        itemId,
      });

      if (response.status === 200) {
        setCartUpdated(prev => !prev); // Toggle cartUpdated to trigger re-fetch
      } else {
        setError('Failed to remove item from cart.');
      }
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError(err.message || 'Failed to remove item from cart');
    }
  };

  const clearError = () => setError(null);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        loading,
        error,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
