import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

const SignIn = (props) => {
  //State for Input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Context Function containing login, logout, currentUser and Register
  const {currentUser, login, register, setCurrentUser} = useContext(AuthContext)
  

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //       const uid = user.uid;
  //       console.log("itb " + currentUser);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  //Alert for signup
  const createTwoButtonAlert = () => {
    Alert.alert(
      "Welcome to VotiMania",
      "You have successfully created an account",
      [
        {
          text: "Okay",
          style: "destructive",
        },
      ]
    );
  };

  //Firebase SignUp
  const handleSignUp = () => {
    register(auth, email, password, createTwoButtonAlert);
  };

  const handleLogin = () => {
    login(auth, email, password)
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1,  alignItems: "center", justifyContent: "center"}} style={{ width: "100%", }}>
          
          <View style={styles.imgBg}>
            <Image
              style={styles.profileImage}
              source={require("../../assets/VotiMania.png")}
            />
          </View>

          <View style={styles.inputContainer}>
          {/* <Text>{currentUser.email}</Text> */}
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBg: {
    height: 100,
    width: 145,
    marginVertical: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#0782F9",
  },
  buttonOutlineText: {
    padding: 15,
    color: "#0782F9",
    fontFamily: "Poppins-Bold",
  },
  buttonText: {
    color: "white",
    padding: 15,
    fontFamily: "Poppins-Bold",
  },
});
