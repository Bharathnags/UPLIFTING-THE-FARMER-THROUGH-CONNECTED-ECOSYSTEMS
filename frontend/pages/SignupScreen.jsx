import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const SignupScreen = () => {
  const { setUser } = useContext(UserContext); // Use setUser from context
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(''); // Added mobile state
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to handle errors

  const BACKEND_URL = "http://10.0.2.2:5000"; // Update with your backend URL

  const handleSignup = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          mobile,
          password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setUser(result.user);
        navigation.navigate("Main", { screen: "Profile" });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/TopVector.png")}
          style={styles.headerImage}
        />
        <Text style={styles.createAccountText}>Create Account</Text>
      </View>
      
      <View style={styles.inputGroup}>
        <View style={styles.inputContainer}>
          <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name={"mail"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Fontisto name={"mobile"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Mobile"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <View style={styles.inputContainer}>
          <Fontisto name={"locked"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <TouchableOpacity onPress={handleSignup} style={styles.signupButtonContainer}>
          <LinearGradient
            colors={["#F97794", "#623AA2"]}
            style={styles.linearGradient}
          >
            <Text style={styles.signupText}>Sign Up</Text>
            <AntDesign name={"arrowright"} size={24} color={"#FFF"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Image
          source={require("../assets/leftVector.png")}
          style={styles.footerImage}
        />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerImage: {
    width: "100%",
    height: 130,
  },
  createAccountText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#262626",
    marginTop: 20,
  },
  inputGroup: {
    marginHorizontal: 40,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  errorContainer: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  signupButtonContainer: {
    marginTop: 30,
    borderRadius: 25,
    overflow: "hidden",
  },
  linearGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
  signupText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  footerImage: {
    width: 150,
    height: 350,
  },
});
