import React from 'react';
import { View, Text, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#011c0d' }}>
      <Text style={{ fontSize: 30, marginBottom: 20, color: 'white',}}>Welcome to the Farmer App</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Main')} // Navigate to Main (Machinery page)
      />
    </View>
  );
}
