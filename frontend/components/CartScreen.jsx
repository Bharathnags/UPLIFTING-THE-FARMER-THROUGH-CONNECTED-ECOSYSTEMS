import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../pages/CartContext'; // Adjust the import path as needed

export default function CartScreen() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()} // Ensure the key is unique and a string
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Image source={item.image} style={{ width: 50, height: 50, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ fontSize: 16, color: '#28a745' }}>${(item.price * item.quantity).toFixed(2)}</Text>
              <Text style={{ fontSize: 14, color: '#555' }}>Short description or details about {item.name}.</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 30, color: '#841584' }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => addToCart(item)} style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 30, color: '#841584' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
