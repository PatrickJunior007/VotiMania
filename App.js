import "react-native-gesture-handler";
import React, { useState, useContext } from "react";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { AuthContext, AuthContextProvider } from "./src/context/AuthContext";
import Router from "./navigator/Router";

const customFonts = {
  "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  "DM-Medium": require("./assets/fonts/DMSans-Bold.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);

  if (isLoaded) {
    return (
      <AuthContextProvider>
        <View style={styles.container}>
          <Router/>
        </View>
      </AuthContextProvider>
    );
  } else {
    return <AppLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Poppins-Regular",
  },
});
