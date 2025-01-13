import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../pages/CartContext';

const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart, loading, error, clearError } = useCart();

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Clear Error" onPress={clearError} color="#f44336" />
      </View>
    );
  }

  const incrementQuantity = (item) => {
    addToCart({ ...item, quantity: item.quantity + 1 });
  };

  const decrementQuantity = (item) => {
    removeFromCart(item.itemId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Ensure the local image path is handled correctly */}
      <Image source={item.image.uri ? { uri: item.image.uri } : item.image} style={styles.cartItemImage} onError={(e) => console.log('Image error', e.nativeEvent.error)} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemTotal}>Total: ₹{(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.quantityButtons}>
          <TouchableOpacity onPress={() => decrementQuantity(item)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.itemId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  listContentContainer: { paddingBottom: 20 },
  loadingText: { textAlign: 'center', marginTop: 20, fontSize: 18 },
  errorContainer: { alignItems: 'center', marginTop: 20 },
  errorText: { fontSize: 16, color: '#f44336' },
  cartItem: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, elevation: 1 },
  cartItemImage: { width: 80, height: 80, borderRadius: 8 },
  cartItemDetails: { marginLeft: 10, justifyContent: 'center', flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemPrice: { fontSize: 16, color: '#888' },
  itemQuantity: { fontSize: 16 },
  itemTotal: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  quantityButtons: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  quantityButton: { backgroundColor: '#6200EE', padding: 10, borderRadius: 5, marginHorizontal: 5 },
  quantityButtonText: { color: '#fff', fontSize: 18 },
  quantityText: { fontSize: 18, marginHorizontal: 10 },
  emptyCartText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
});

export default CartScreen;
