import React from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import { useCart } from '../pages/CartContext'; // Adjust the import path as needed

export default function CropDetail({ route }) {
  const { item } = route.params;
  console.log(item); // Debugging line
  const { addToCart } = useCart();

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <Image source={item.image} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 16 }}>{item.name}</Text>
      <Text style={{ fontSize: 20, color: '#38a169' }}>
        ${item.price ? item.price.toFixed(2) : 'Price not available'}
      </Text>
      <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 16 }} />
      <Text style={{ fontSize: 16, color: '#555' }}>
        This is a detailed description of the {item.name}. It includes all the features and benefits of this crop.
      </Text>
      <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 16 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
          ${item.price ? item.price.toFixed(2) : 'Price not available'}
        </Text>
        <Button title="Add to Cart" onPress={() => addToCart(item)} color="#841584" />
      </View>
    </ScrollView>
  );
}
