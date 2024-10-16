import React from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import { useCart } from '../pages/CartContext'; // Adjust the import path as needed

export default function ToolDetail({ route }) {
  const { item } = route.params;
  const { addToCart } = useCart();

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#042211' }}>
      <Image source={item.image} style={{ width: 200, height: 200,borderRadius:20, alignSelf: 'center' }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 16,color:'#acf7cc' }}>{item.name}</Text>
      <Text style={{ fontSize: 20, color: '#7bf6af',padding:5 }}>${item.price}</Text>
      <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 16 }} />
      <Text style={{ fontSize: 16, color: '#d8f9e6' }}>
        This is a detailed description of the {item.name}. It includes all the features and benefits of this crop.
      </Text>
      <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 16 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#d8f9e6' }}>${item.price}</Text>
        <Button title="Add to Cart" onPress={() => addToCart(item)} color="#841584" />
      </View>
    </ScrollView>
  );
}
