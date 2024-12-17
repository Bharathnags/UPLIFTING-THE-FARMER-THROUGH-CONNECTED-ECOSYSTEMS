import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../pages/CartContext'; // Adjust the import path as needed

export default function CartScreen() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={item.image} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Text>
                <Text style={styles.cartItemDescription}>
                  Short description about {item.name}.
                </Text>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)} // Decrease quantity or remove item
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => addToCart(item)} // Increase quantity
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#28a745',
  },
  cartItemDescription: {
    fontSize: 14,
    color: '#555',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 24,
    color: '#841584',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});
