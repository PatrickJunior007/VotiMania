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
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
//Components
import Header from "../../components/Header";
import image from "../../assets/images/large.jpg";

import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const SeeVote = () => {
  const [data, setData] = useState([]);

  //Prototype
  

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users_vote"));
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       //console.log(doc.id, " => ", doc.data());
    //       list.push({ id: doc.id, ...doc.data() });

    //     });
    //     setData(list);
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // };

    // fetchData();

    //REALTIME UPDATES
    const unsub = onSnapshot(
      collection(db, "users_vote"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        alert(error.message);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  //console.log(data);

  const handleLike = (item) => {
    const isLike = doc(db, "users_vote", item.id);

    getDoc(doc(db, "users_vote",  item.id))
    .then((docSnap) => {
      if (docSnap.exists()) {
        var liking = docSnap.data().like + 1;

        updateDoc(isLike, {
          like: liking,
        })
          .then(() => {
           
          })
          .catch((error) => alert(error.message));
      }
    })
    .catch((error) => alert(error.message));
  };

  const handleUnlike = (item) => {
    const isUnLike = doc(db, "users_vote", item.id);

    getDoc(doc(db, "users_vote",  item.id))
    .then((docSnap) => {
      if (docSnap.exists()) {
        var unliking = docSnap.data().unlike + 1;

        updateDoc(isUnLike, {
          unlike: unliking,
        })
          .then(() => {
            
          })
          .catch((error) => alert(error.message));
      }
    })
    .catch((error) => alert(error.message));
    
  };

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

        {data.map((item, index) => {
          

          return (
            
            <View key={item.id} style={styles.mainConatainer}>
              <View style={styles.box}>
                <Text style={styles.voteTitle}>{item.vote_title}</Text>
                <View>
                  <Text style={styles.allText}>{item.vote_message}</Text>
                </View>
                <View style={styles.mainBg}>
                  <View style={styles.voteDecision}>
                    <TouchableOpacity
                      style={{
                        paddingRight: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => handleLike(item)}
                    >
                      <MaterialIcons
                        size={34}
                        color="#479cd5"
                        name="thumb-up-alt"
                      />
                      <Text style={styles.voteNum}>{item.like}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => handleUnlike(item)}
                    >
                      <MaterialIcons
                        size={34}
                        color="red"
                        name="thumb-down-alt"
                      />
                      <Text style={styles.voteNum}>{item.unlike}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        {data.map(() => {})}
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
    marginTop: 2,
  },
  battleText: {
    fontSize: 40,
    marginBottom: -15,
    color: "#4db5ff",
  },
});
