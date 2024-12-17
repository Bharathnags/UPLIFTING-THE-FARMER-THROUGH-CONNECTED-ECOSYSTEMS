import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { createStackNavigator } from '@react-navigation/stack';
import ToolDetail from '../components/ToolDetail'; // Adjust the import path as needed

const toolsData = [
  {
    id: 1,
    name: "Tractor",
    image: require('../assets/tractor.png'),
    description: "A versatile machine used to pull and power various farm equipment. It can perform tasks such as plowing, tilling, planting, and harvesting, making it essential for large-scale farming operations.",
    price: "800000"
  },
  {
    id: 2,
    name: "Combine Harvester",
    image: require('../assets/combineharvester.png'),
    description: "A multi-functional machine that combines tasks of harvesting, threshing, and winnowing crops in a single pass. It significantly reduces the time and labor required during harvest season.",
    price: "1500000"
  },
  {
    id: 3,
    name: "Rotavator",
    image: require('../assets/rotavator.png'),
    description: "An attachment for tractors that tills the soil, breaking up large clods to make the soil smooth and ideal for sowing. It helps in preparing fine seedbeds and controlling weeds effectively.",
    price: "90000"
  },
  {
    id: 4,
    name: "Seed Drill",
    image: require('../assets/seeddrill.png'),
    description: "A machine used for sowing seeds in well-spaced rows at the right depth. This ensures uniform growth of crops and increases the efficiency and yield of planting operations.",
    price: "50000"
  },
  {
    id: 5,
    name: "Cultivator",
    image: require('../assets/cultivator.png'),
    description: "A machine that stirs and aerates the soil, helping to control weeds and prepare a suitable seedbed. It is commonly used in row-crop cultivation and assists in soil conservation.",
    price: "35000"
  },
  {
    id: 6,
    name: "Harvester",
    image: require('../assets/harvester.png'),
    description: "A machine used for gathering mature crops from the fields. It speeds up the harvesting process, reducing labor costs and increasing the efficiency of crop collection.",
    price: "1800000"
  },
  {
    id: 7,
    name: "Irrigation System",
    image: require('../assets/irrigationsystem.png'),
    description: "A system that provides water to crops through various methods such as sprinklers, drip lines, or pivots. Efficient irrigation systems can significantly improve crop yields and water use efficiency.",
    price: "1800000"
  },
  {
    id: 8,
    name: "Sprayer",
    image: require('../assets/sprayer.png'),
    description: "A machine used to apply pesticides, herbicides, and fertilizers in liquid form across large areas effectively. It helps in protecting crops from pests and diseases while promoting healthy growth.",
    price: "31000"
  },
  {
    id: 9,
    name: "Power Tiller",
    image: require('../assets/powertiller.png'),
    description: "A compact machine suitable for tilling, weeding, and small-scale plowing. It is ideal for small and medium farms, providing versatile functionality and ease of use.",
    price: "95000"
  },
  {
    id: 10,
    name: "Sugarcane Harvester",
    image: require('../assets/sugarcaneharvester.png'),
    description: "A specialized machine used to cut and collect sugarcane in large quantities. It increases the efficiency of harvesting sugarcane while reducing the labor needed.",
    price: "2000000"
  },
  {
    id: 11,
    name: "Paddy Thresher",
    image: require('../assets/paddythresher.png'),
    description: "A machine that separates rice grains from their stalks after harvesting. It reduces manual labor and increases the efficiency of processing rice.",
    price: "1500000"
  },
  {
    id: 12,
    name: "Hydraulic Trailer",
    image: require('../assets/hydraulictrailer.png'),
    description: "A trailer used for transporting goods on the farm, equipped with a hydraulic lift for easier unloading. It facilitates the efficient movement of heavy loads within the farm.",
    price: "85000"
  },
  {
    id: 13,
    name: "Laser Land Lever",
    image: require('../assets/laserlandlever.png'),
    description: "Uses laser technology to achieve a uniform land level, improving water distribution and crop yield. It enhances field efficiency and contributes to soil conservation.",
    price: "375000"
  }
];

const Stack = createStackNavigator();

function ToolsGrid({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={150}
        data={toolsData}
        style={styles.grid}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ToolDetail', { item })}
          >
            <View style={styles.toolItemContainer}>
              <Image source={item.image} style={styles.toolImage} />
              <Text style={styles.toolName}>{item.name}</Text>
              <Text style={styles.toolPrice}>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default function MachineryComponent() {
  return (
    <Stack.Navigator initialRouteName="ToolsGrid">
      <Stack.Screen
        name="ToolsGrid"
        component={ToolsGrid}
        options={{ title: 'Machinery for Rent' }}
      />
      <Stack.Screen
        name="ToolDetail"
        component={ToolDetail}
        options={{ title: 'Machinery Details' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white', // Default background color for the entire screen
  },
  grid: {
    flex: 1,
    marginTop: 10,
  },
  toolItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    height: 150,
    backgroundColor: '#f5fcf8', // Light card background
  },
  toolImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 5,
  },
  toolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  toolPrice: {
    fontSize: 16,
    color: '#4caf50', // Highlight price in green for clarity
  },
});
