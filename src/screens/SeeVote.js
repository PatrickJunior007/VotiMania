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
//Components
import Header from "../../components/Header";
import image from "../../assets/images/large.jpg";

const SeeVote = () => {
  // // const [thumbUp, setthumbUp] = useState("thumb-up-off-alt");
  // // const [thumbDown, setthumbDown] = useState("thumb-down-off-alt")

  // // const handleClickedUp = () =>{
  // //   //State Handling
  // //   setthumbUp("thumb-up-alt");
  // //   setthumbDown("thumb-down-off-alt");
  // // }

  // // const handleClickedDown = () =>{
  // //   //State Handling
  // //   setthumbDown("thumb-down-alt");
  // //   setthumbUp("thumb-up-off-alt");
  // // }

  // const [thumbUp, setthumbUp] = useState(false);
  // const [thumbDown, setthumbDown] = useState(false);

  // const handleClickedUp= ()=>{
  //   setthumbUp(!thumbUp);
  //   if(setthumbDown(true)){
  //     setthumbDown(false)
  //   }
  // }

  // const handleClickedDown= ()=>{
  //   setthumbDown(!thumbDown);
  //   if(setthumbUp(true)){
  //     setthumbUp(false);
  //   }

  // }

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
                Users <Text style={{ color: "#009a3d" }}>Vote</Text>{" "}
              </Text>
              <Text style={styles.text}>Help others in making decisions</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainConatainer}>
          <View style={styles.box}>
            <Text style={styles.voteTitle}>Vote Title</Text>
            <View>
              <Text style={styles.allText}>
                Lionel Andrés Messi, also known as Leo Messi, is an Argentine
                professional footballer who plays as a forward for Ligue 1 club
                Paris Saint-Germain and captains the Argentina national team.
              </Text>
            </View>
            <View style={styles.mainBg}>
              <View style={styles.voteDecision}>
                {/*<TouchableOpacity style={{paddingRight: 10, flexDirection: "row", alignItems:"center",}} onPress={handleClickedUp}>
                  {thumbUp?<MaterialIcons size={34} color="#479cd5" name="thumb-up-off-alt"/>:<MaterialIcons size={34} color="#479cd5" name="thumb-up-alt"/>}
                  <Text style={styles.voteNum}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", alignItems:"center"}} onPress={handleClickedDown}>
                  {thumbDown?<MaterialIcons size={34} color="red" name="thumb-down-off-alt" />:<MaterialIcons size={34} color="red" name="thumb-down-alt" />}
                  <Text style={styles.voteNum}>20</Text>
                </TouchableOpacity>*/}

                <TouchableOpacity
                  style={{
                    paddingRight: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {}}
                >
                  <MaterialIcons
                    size={34}
                    color="#479cd5"
                    name="thumb-up-alt"
                  />
                  <Text style={styles.voteNum}>9</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {}}
                >
                  <MaterialIcons size={34} color="red" name="thumb-down-alt" />
                  <Text style={styles.voteNum}>20</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeVote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  mainConatainer: {
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 5,
    flex: 1,
    
  },
  box: {
    width: "100%",
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
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

  heroSection: {
    width: "100%",
    height: 170,
    overflow: "hidden",
  },
  imageHero: {
    width: "100%",
    height: 150,
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
    fontSize: 18,
    marginTop: 2
  },
  battleText: {
    fontSize: 40,
    marginBottom: -15,
    color: "#4db5ff",
  },
});
