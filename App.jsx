import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileScreen from './frontend/pages/ProfileScreen';
import MachineryComponent from './frontend/pages/MachineryComponent';
import CropsComponent from './frontend/pages/CropsComponent';
import CartScreen from './frontend/components/CartScreen';
import LoginScreen from './frontend/pages/LoginScreen';
import SignupScreen from './frontend/pages/SignupScreen';
import MarketPrices from './frontend/pages/MarketPrices';
import LoanSchemes from './frontend/pages/LoanSchemes';
import LoanSchemeDetails from './frontend/pages/LoanSchemeDetails';
import WeatherScreen from './frontend/pages/WeatherScreen';

import { CartProvider } from './frontend/pages/CartContext';
import { UserProvider } from './frontend/contexts/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Loan Schemes Stack Navigator
function LoanSchemesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Loan Schemes" component={LoanSchemes} />
      <Stack.Screen
        name="LoanSchemeDetails"
        component={LoanSchemeDetails}
        options={{ headerShown: true, title: 'Loan Scheme Details' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Profile" // Profile is the first tab
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Machinery') iconName = 'build';
          else if (route.name === 'Crops') iconName = 'eco';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'LoanSchemes') iconName = 'account-balance';
          else if (route.name === 'Weather') iconName = 'wb-sunny';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Machinery" component={MachineryComponent} />
      <Tab.Screen name="Crops" component={CropsComponent} />
      <Tab.Screen name="LoanSchemes" component={LoanSchemesStackNavigator} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
    </Tab.Navigator>
  );
}

// App Stack Navigator
function AppStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: true, title: 'Your Cart' }}
      />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </CartProvider>
    </UserProvider>
  );
}
