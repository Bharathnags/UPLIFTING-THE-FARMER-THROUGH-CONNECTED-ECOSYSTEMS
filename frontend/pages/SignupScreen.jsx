import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate('Login'); // Navigate to Login screen on successful signup
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Already have an account? Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
