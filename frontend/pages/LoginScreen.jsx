import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate login logic here (or add actual login logic)
    navigation.navigate('Main', { screen: 'Machinery' }); // Navigate to 'Main' and open 'Machinery' tab
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Login</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}
