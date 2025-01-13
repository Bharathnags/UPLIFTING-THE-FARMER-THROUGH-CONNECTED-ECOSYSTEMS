// File: src/components/ToolDetail.js

import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { useCart } from '../pages/CartContext';
import { UserContext } from '../contexts/UserContext';

export default function ToolDetail({ route }) {
  const { item } = route.params;
  const { addToCart } = useCart();
  const { user } = useContext(UserContext);

  const BACKEND_URL = "http://10.0.2.2:5000";

  const handleAddToCart = async () => {
    const itemWithNumericPrice = {
      ...item,
      price: parseFloat(item.price.replace(',', '')), // Convert price to numeric value
      quantity: 1,
    };

    try {
      const imageUri = item.image.uri ? item.image.uri : item.image;

      const response = await fetch(`${BACKEND_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          item: {
            itemId: item.id,
            name: item.name,
            price: itemWithNumericPrice.price,
            quantity: itemWithNumericPrice.quantity,
            image: imageUri,
          },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        addToCart(itemWithNumericPrice);
        console.log("Item added to cart:", result.cart);
      } else {
        console.error("Error adding item to cart:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <View style={styles.divider} />
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.divider} />
      <View style={styles.footer}>
        <Text style={styles.footerPrice}>₹{item.price}</Text>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          color="#6200EE"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#2d3748',
  },
  price: {
    fontSize: 20,
    color: '#4caf50',
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
  },
});
