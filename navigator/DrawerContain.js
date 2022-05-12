import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  Text,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

const DrawerContain = (props) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        props.navigation.replace("SignIn");
      })
      .catch((error) => alert(error.message));
  };

  const toggleTheme = () => {
    setsDarkTheme(!DarkTheme);
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image size={50} source={require("../assets/user.png")} />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Welcome 👥 </Title>
                <Caption style={styles.caption}>
                  {" "}
                  {auth.currentUser?.email}
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection} title="Editor's Choice">
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons size={size} color={color} name="home-filled" />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("HomeDrawer");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  size={size}
                  color={color}
                  name="account-balance-wallet"
                />
              )}
              label="See Results"
              onPress={() => {
                props.navigation.navigate("ResultScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection} title="Personal Choice">
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  size={size}
                  color={color}
                  name="volunteer-activism"
                />
              )}
              label="Create Vote"
              onPress={() => {
                props.navigation.navigate("CreateVote");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons size={size} color={color} name="live-tv" />
              )}
              label="See All Votes"
              onPress={() => {
                props.navigation.navigate("SeeVote");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons size={size} color={color} name="person" />
              )}
              label="Your Votes"
              onPress={() => {
                props.navigation.navigate("YourVote");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialIcons size={size} color={color} name="exit-to-app" />
          )}
          label="Sign Out"
          onPress={handleSignOut}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontFamily: "Poppins-Bold",
  },
  caption: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: -7,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontFamily: "Poppins-Bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginTop: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  prefrence: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContain;
