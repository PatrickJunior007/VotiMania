import React, { useState, useContext, useEffect } from "react";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import SignIn from "../src/screens/SignIn";
import DetailScreen from "../src/screens/DetailScreen";
import DrawerNavig from "../navigator/DrawerNavig";
import { AuthContext } from "../src/context/AuthContext";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../src/screens/Loading";

//Creating stack navigation
const Stack = createStackNavigator();

const Router = () => {
  const [initializer, setInitializer] = useState(true);

  //Context Function containing login, logout, currentUser and Register
  const { currentUser, login, register, setCurrentUser } = useContext(AuthContext);

  const onAuthState = (user) =>{
    setCurrentUser(user);
    if (initializer) setInitializer(false);
  }

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(onAuthState);
    return subscribe;
  }, []);

  if (initializer) return <Loading/>;
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {currentUser ? (
            <>
              <Stack.Screen name="HomeScreen" component={DrawerNavig} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Router;

const styles = StyleSheet.create({});
