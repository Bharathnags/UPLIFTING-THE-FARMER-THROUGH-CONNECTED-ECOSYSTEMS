import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { createStackNavigator } from '@react-navigation/stack';
import CropDetail from '../components/CropDetail'; // Adjust the import path as needed

const cropsData = [
  { id: '4', name: 'Sugarcane', price: 200, image: require('../assets/sugarcane.png') },
  { id: '5', name: 'Rice', price: 250, image: require('../assets/rice.png') },
  { id: '6', name: 'Corn', price: 180, image: require('../assets/corn.png') },
];

const Stack = createStackNavigator();

function CropsGrid({ navigation }) {
  return (
    <FlatGrid
      itemDimension={150} // Adjusted item dimension for better fit
      data={cropsData}
      style={{ marginTop: 10, flex: 1 }}
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CropDetail', { item })}>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 10, height: 150, backgroundColor: '#e2e8f0' }}>
            <Image source={item.image} style={{ width: 80, height: 80, marginBottom: 10 }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2d3748' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, color: '#38a169' }}>${item.price.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default function CropsComponent() {
  return (
    <Stack.Navigator initialRouteName="CropsGrid">
      <Stack.Screen name="CropsGrid" component={CropsGrid} options={{ title: 'Crops for Sale' }} />
      <Stack.Screen name="CropDetail" component={CropDetail} options={{ title: 'Crop Details' }} />
    </Stack.Navigator>
  );
}
