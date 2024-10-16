import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { createStackNavigator } from '@react-navigation/stack';
import ToolDetail from '../components/ToolDetail'; // Adjust the import path as needed

const toolsData = [
  { id: '1', name: 'Tractor', price: 5000, image: require('../assets/tractor.png') },
  { id: '2', name: 'Plow', price: 1500, image: require('../assets/plow.png') },
  { id: '3', name: 'Harvester', price: 7000, image: require('../assets/harvester.png') },
];

const Stack = createStackNavigator();

function ToolsGrid({ navigation }) {
  return (  
    <FlatGrid
      itemDimension={150}
      data={toolsData}
      style={{ marginTop: 10, flex: 1,backgroundColor:'#042211',}}
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ToolDetail', { item })}>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 15, padding: 10, height: 150, backgroundColor: '#f5fcf8' }}>
            <Image source={item.image} style={{ width: 80, height: 80, marginBottom: 10,borderRadius:5 }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2d3748' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, color: '#011c0d' }}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default function MachineryComponent() {
  return (
    <Stack.Navigator initialRouteName="ToolsGrid">
      <Stack.Screen name="ToolsGrid" component={ToolsGrid} options={{ title: 'Tools for rent' }} style={{backgroundColor:'#1E293B'}} />
      <Stack.Screen name="ToolDetail" component={ToolDetail} options={{ title: 'Tool Details' }} />
    </Stack.Navigator>
  );
}
