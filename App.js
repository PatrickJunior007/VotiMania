import "react-native-gesture-handler";
import React, { useState } from "react";

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import SignIn from "./src/screens/SignIn";
import DetailScreen from "./src/screens/DetailScreen";
import DrawerNavig from "./navigator/DrawerNavig";

const customFonts = {
  "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  "DM-Medium": require("./assets/fonts/DMSans-Bold.ttf"),
}

//Creating stack navigation
const Stack = createStackNavigator();

export default function App() {

  const [isLoaded] = useFonts(customFonts);

  if (isLoaded) {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="HomeScreen" component={DrawerNavig}/>
            <Stack.Screen name="DetailScreen" component={DetailScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );

  } else {
    return (
      <AppLoading/>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Poppins-Regular",
  },
});
