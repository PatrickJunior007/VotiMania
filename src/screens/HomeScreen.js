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
import React from "react";
import Header from "../../components/Header";
import image from "../../assets/images/football.jpg";
import ListOption from "../../components/ListOption";

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Header />

        <View style={styles.heroSection}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.imageHero}
          >
            <View style={styles.textView}>
              <Text style={[styles.text, styles.battleText]}>
                Battle <Text style={{ color: "#009a3d" }}>For</Text>{" "}
              </Text>
              <Text style={styles.text}>The Greatest Of All Time 🐐 </Text>
            </View>
          </ImageBackground>
        </View>

        <View>
          <View style={styles.textSection}>
            <Text style={styles.h5}>Choose Wisely 🌟</Text>
            <Text style={styles.h2}>Your Candidates</Text>
          </View>
        </View>

        <ListOption {...props} />

        <View style={styles.createVote}>
          <View style={styles.booking}>
            <View>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 20,
                  color: "#1aac96",
                }}
              >
                Guess What?
              </Text>
              <Text
                style={{
                  lineHeight: 20,
                  fontFamily: "Poppins-Regular",
                  color: "grey",
                }}
              >
                You can now create votes!
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={()=>props.navigation.navigate("CreateVote")}>
              <View
                style={{
                  backgroundColor: "#FDC04A",
                  paddingHorizontal: 25,
                  paddingVertical: 17,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontFamily: "Poppins-Regular", color: "white" }}>
                  Here
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  heroSection: {
    width: "100%",
    height: 240,
    overflow: "hidden",
  },
  imageHero: {
    width: "100%",
    height: 210,
  },
  textView: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 22,
  },
  battleText: {
    fontSize: 40,
    marginBottom: -15,
    color: "#4db5ff",
  },

  textSection: {
    marginTop: -10,
  },

  h5: {
    fontFamily: "Poppins-Bold",
    color: "grey",
    fontSize: 15,
    textAlign: "center",
  },
  h2: {
    fontFamily: "Poppins-Bold",
    color: "#0782F9",
    fontSize: 24,
    textAlign: "center",
  },
  booking: {
    height: 82,
    backgroundColor: "#f6f6f6",
    marginVertical: 16,
    width: "100%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
