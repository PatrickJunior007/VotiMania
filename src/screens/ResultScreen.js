import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ronaldo from "../../assets/images/cristianoRonaldo.jpg";
import messi from "../../assets/images/lionelMessi1.jpg";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { log } from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const ResultScreen = (props) => {
  //Refresh function

  const reFresh = () => {};

  const [buttonDisplay, setbuttonDisplay] = useState("none");
  const [dataList, setdataList] = useState("0");

  const sucessfulDelete = async () => {
    await getDoc(doc(db, "football", userID))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setbuttonDisplay("flex");

          if (docSnap.data().Cristiano_Ronaldo) {
            const updateCris = doc(db, "total", "result");
            getDoc(doc(db, "total", "result"))
              .then((docSnap) => {
                if (docSnap.exists()) {
                  var cristiano = docSnap.data().cristiano_ronaldo - 1;

                  updateDoc(updateCris, {
                    cristiano_ronaldo: cristiano,
                  })
                    .then(() => {
                      //console.log("cr deleted sucessfully");;;jv
                    })
                    .catch((error) => alert(error.message));
                }
              })
              .catch((error) => alert(error.message));
          } else {
            const updatesMessi = doc(db, "total", "result");

            getDoc(doc(db, "total", "result"))
              .then((docSnap) => {
                if (docSnap.exists()) {
                  var messi = docSnap.data().lionel_messi - 1;

                  updateDoc(updatesMessi, {
                    lionel_messi: messi,
                  })
                    .then(() => {
                      //console.log("messi deleted sucessfully");
                    })
                    .catch((error) => alert(error.message));
                }
              })
              .catch((error) => alert(error.message));
          }

          //console.log("Document data:", docSnap.data());
        } else {
          //console.log("No such document!");
        }
      })
      .catch((error) => alert(error.message));
    await deleteDoc(doc(db, "football", userID))
      .then(() => {
        setbuttonDisplay("none");

        Alert.alert("Vote Deleted", "Sucessfully deleted your vote");
        props.navigation.navigate("HomeDrawer");
      })
      .catch((error) => alert(error.message));
  };

  const userID = auth.currentUser?.uid;

  /*------------------Get data for button--------------*/

  /*------------------Get data for button--------------*/

  const getResult = () => {
    getDoc(doc(db, "total", "result"))
      .then((docSnap) => {
        if (docSnap.exists()) {
          //console.log("result");
          //console.log("Document data:", docSnap.data());
          setdataList(docSnap.data());
          // if(doc.data().lionel_messi){
          //   console.log("Document data:", docSnap.data());

          // }else{
          //   console.log("Document data:", docSnap.data());

          // }
        }
      })
      .catch((error) => alert(error.message));
  };

  //console.log(dataList);

  useEffect(() => {
    const displayButton = async () => {
      await getDoc(doc(db, "football", userID))
        .then((docSnap) => {
          if (docSnap.exists()) {
            setbuttonDisplay("flex");
            //console.log("Document data:", docSnap.data());
          } else {
            //console.log("No such document!");
            setbuttonDisplay("none");
            //Alert.alert("Vote Deleted", "Sucessfully deleted your vote");
          }
        })
        .catch((error) => alert(error.message));
    };

    displayButton();
  });

  const handleDelete = async () => {
    await getDoc(doc(db, "football", userID))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setbuttonDisplay("flex");

          Alert.alert(
            "Delete Vote",
            "Are you sure you want to delete your vote?",
            [
              {
                text: "Yes",
                onPress: () => {
                  sucessfulDelete();
                },
              },
              {
                text: "no",
              },
            ]
          );

          //console.log("Document data:", docSnap.data());
        } else {
          //console.log("No such document!");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Header />

        <View style={styles.textSection}>
          <Text style={styles.h2}>Result: </Text>
          <TouchableOpacity activeOpacity={0.6} onPress={getResult}>
            <View
              style={{
                backgroundColor: "#ffc107",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                width: 100,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Refresh
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.optionListContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={ronaldo} />
              <Text style={styles.cardText}>Cristiano Ronaldo</Text>
              <Text style={styles.allText}>
                <Text style={styles.titleStat}>Voted:</Text>{" "}
                {dataList.cristiano_ronaldo} 👍
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={messi} />
              <Text style={styles.cardText}>Lionel Messi</Text>
              <Text style={styles.allText}>
                <Text style={styles.titleStat}>Voted:</Text>{" "}
                {dataList.lionel_messi} 👍
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            paddingHorizontal: 30,
            marginTop: 15,
            display: buttonDisplay,
          }}
          onPress={() => {
            handleDelete();
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              width: "100%",
              paddingVertical: 17,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "white",
                textAlign: "center",
              }}
            >
              Delete Vote
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  h2: {
    marginTop: 20,
    fontFamily: "Poppins-Bold",
    color: "#479cd5",
    fontSize: 24,
    textAlign: "center",
  },
  optionListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 7,
  },
  card: {
    height: 220,
    width: width / 2 - 16,
    elevation: 7,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 7,
    padding: 10,
    marginBottom: 15,
    marginLeft: 2,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.25
  },
  cardImage: {
    height: 150,
    width: "100%",
    borderRadius: 10,
  },
  cardText: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "grey",
    fontSize: 14,
    paddingTop: 10,
  },
  allText: {
    fontFamily: "Poppins-Regular",
    lineHeight: 22,
    textAlign: "center",
    color: "#479cd5",
  },
  titleStat: {
    fontFamily: "Poppins-Bold",
    color: "#479cd5",
  },
  textSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
