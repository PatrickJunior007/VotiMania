import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const YourVote = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Header />

        <View style={styles.mainConatainer}>
          <View style={styles.box}>
            <View style={{flexDirection: "row", justifyContent:"space-between"}}>
              <Text style={styles.voteTitle}>Vote Title</Text>
              <TouchableOpacity>
                <MaterialIcons size={27} color="red" name="delete" />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.allText}>
                Lionel Andrés Messi, also known as Leo Messi, is an Argentine
                professional footballer who plays as a forward for Ligue 1 club
                Paris Saint-Germain and captains the Argentina national team.
              </Text>
            </View>
            <View style={styles.mainBg}>
              <View style={styles.voteDecision}>
                <View
                  style={{
                    paddingRight: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    size={34}
                    color="#479cd5"
                    name="thumb-up-alt"
                  />
                  <Text style={styles.voteNum}>9</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons size={34} color="red" name="thumb-down-alt" />
                  <Text style={styles.voteNum}>20</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourVote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  mainConatainer: {
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 25,
    flex: 1,
  },
  box: {
    width: "100%",
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  voteTitle: {
    fontFamily: "Poppins-Bold",
    color: "#3a3a3a",
  },
  allText: {
    fontFamily: "Poppins-Regular",
    lineHeight: 19,
    color: "grey",
    marginTop: 7,
  },
  mainBg: {
    display: "flex",
    width: "100%",
  },
  voteDecision: {
    width: "100%",
    flexDirection: "row",
    margin: 4,
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  voteNum: {
    fontFamily: "Poppins-Bold",
    lineHeight: 19,
    color: "grey",
    marginTop: 7,
    paddingHorizontal: 2.2,
  },
});
