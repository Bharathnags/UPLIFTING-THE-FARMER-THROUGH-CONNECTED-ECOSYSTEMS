import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';

import WelcomeScreen from './frontend/pages/WelcomeScreen'; // New Welcome Screen
import MachineryComponent from './frontend/pages/MachineryComponent';
import CropsComponent from './frontend/pages/CropsComponent';
import CartScreen from './frontend/components/CartScreen';
import LoginScreen from './frontend/pages/LoginScreen';
import SignupScreen from './frontend/pages/SignupScreen';
import ProfileScreen from './frontend/pages/ProfileScreen';
import { CartProvider } from './frontend/pages/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator for Machinery, Crops, and Cart (Profile handled separately)
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Machinery') {
            iconName = 'ios-build';
          } else if (route.name === 'Crops') {
            iconName = 'ios-leaf';
          } else if (route.name === 'Cart') {
            iconName = 'ios-cart';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Machinery" component={MachineryComponent} />
      <Tab.Screen name="Crops" component={CropsComponent} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator for the overall app flow
export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          
          {/* Welcome Screen */}
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} // Hide the header on the welcome screen
          />
          
          {/* Main Tab Screens (Machinery, Crops, Cart) */}
          <Stack.Screen 
            name="Main" 
            component={MainTabNavigator} 
            
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Login')}
                  title="Profile"
                  color="#000"
                />
              ),
            })}
          />

          {/* Profile-related screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
