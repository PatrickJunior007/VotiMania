//Part 2
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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const SeeVote = () => {
  const [data, setData] = useState([]);

  const [thumbUp, setthumbUp] = useState(false);
  const [thumbDown, setthumbDown] = useState(false);

  const userID = auth.currentUser?.uid;

  const handleLike = (item) => {
    const isLike = doc(db, "users_vote", item.id);
    getDoc(doc(db, "users_vote", item.id))
      .then((docSnap) => {
        if (docSnap.exists()) {
          const checkDown = docSnap.data().votedDown.includes(userID);
          const checkUp = docSnap.data().votedUp.includes(userID);
          if (checkUp == checkDown) {
            //Check if the user has voted and remove its data
            if (checkUp) {
              updateDoc(isLike, {
                votedUp: arrayRemove(userID),
              })
                .then(() => {
                  
                    var liking = docSnap.data().like - 1;
                    if (docSnap.data().like <= 0) {
                      updateDoc(isLike, {
                        like: 0,
                      });
                    } else {
                      updateDoc(isLike, {
                        like: liking,
                      });
                    }
                 
                })
              .catch((error) => alert(error.message));
            } else {
              //if the user hasn't voted add his data
              if(checkDown){
                updateDoc(isLike, {
                  votedDown: arrayRemove(userID),
                })
                  .then(() => {
                    if (checkUp == checkDown) {
                      if (docSnap.data().unlike <= 0) {
                        updateDoc(isLike, {
                          unlike: 0,
                        });
                      } else {
                        var unliking = docSnap.data().unlike - 1;
                        updateDoc(isLike, {
                          unlike: unliking,
                        });
                      }
                    }
                  })
                  .catch((error) => alert(error.message));
              }


              updateDoc(isLike, {
                votedUp: arrayUnion(userID),
              })
                .then(() => {
                  if (checkUp == checkDown) {
                    var liking = docSnap.data().like + 1;
                    updateDoc(isLike, {
                      like: liking,
                    });
                  }
                })
                .catch((error) => alert(error.message));
            }
          } else {
            //Check if the user has voted and remove its data
            if (checkUp) {
              updateDoc(isLike, {
                votedUp: arrayRemove(userID),
              })
                .then(() => {
                  
                    var liking = docSnap.data().like - 1;
                    if (docSnap.data().like <= 0) {
                      updateDoc(isLike, {
                        like: 0,
                      });
                    } else {
                      updateDoc(isLike, {
                        like: liking,
                      });
                    }
                 
                })
              .catch((error) => alert(error.message));
            } else {
              if(checkDown){
                updateDoc(isLike, {
                  votedDown: arrayRemove(userID),
                })
                  .then(() => {
                    if (checkUp !== checkDown) {
                      var unliking = docSnap.data().unlike - 1;
                      if (docSnap.data().unlike <= 0) {
                        updateDoc(isLike, {
                          unlike: 0,
                        });
                      } else {
                        updateDoc(isLike, {
                          unlike: unliking,
                        });
                      }
                    }
                  })
                  .catch((error) => alert(error.message));
              }


              updateDoc(isLike, {
                votedUp: arrayUnion(userID),
              })
                .then(() => {
                  if (checkUp !== checkDown) {
                    var liking = docSnap.data().like + 1;
                    updateDoc(isLike, {
                      like: liking,
                    });
                  }
                })
                .catch((error) => alert(error.message));
            }
          }
        }
      })
      .catch((error) => alert(error.message));
  };



  //For the Unlike Check
  const handleUnlike = (item) => {
   
    const isLike = doc(db, "users_vote", item.id);
    getDoc(doc(db, "users_vote", item.id))
      .then((docSnap) => {
        if (docSnap.exists()) {
          const checkDown = docSnap.data().votedDown.includes(userID);
          const checkUp = docSnap.data().votedUp.includes(userID);
          if (checkDown == checkUp) {
            //Check if the user has voted and remove its data
            if (checkDown) {
              updateDoc(isLike, {
                votedDown: arrayRemove(userID),
              })
                .then(() => {
                  
                    if (docSnap.data().unlike <= 0) {
                      updateDoc(isLike, {
                        unlike: 0,
                      });
                    } else {
                      var unliking = docSnap.data().unlike - 1;
                      updateDoc(isLike, {
                        unlike: unliking,
                      });
                    }
                 
                })
                .catch((error) => alert(error.message));
            } else {
              //if the user hasn't voted add his data
              if(checkUp){
                updateDoc(isLike, {
                  votedUp: arrayRemove(userID),
                })
                  .then(() => {
                    if (checkDown == checkUp) {
                      var liking = docSnap.data().like - 1;
                      if (docSnap.data().like <= 0) {
                        updateDoc(isLike, {
                          like: 0,
                        });
                      } else {
                        updateDoc(isLike, {
                          like: liking,
                        });
                      }
                    }
                  })
                .catch((error) => alert(error.message));
              }


              updateDoc(isLike, {
                votedDown: arrayUnion(userID),
              })
                .then(() => {
                  if (checkDown == checkUp) {
                    var unliking = docSnap.data().unlike + 1;
                    updateDoc(isLike, {
                      unlike: unliking,
                    });
                  }
                })
              .catch((error) => alert(error.message));



            }
          } else {
            


            //Check if the user has voted and remove its data
            if (checkDown) {
              updateDoc(isLike, {
                votedDown: arrayRemove(userID),
              })
                .then(() => {
                  
                    if (docSnap.data().unlike <= 0) {
                      updateDoc(isLike, {
                        unlike: 0,
                      });
                    } else {
                      var unliking = docSnap.data().unlike - 1;
                      updateDoc(isLike, {
                        unlike: unliking,
                      });
                    }
                 
                })
                .catch((error) => alert(error.message));
            } else {
              //if the user hasn't voted add his data
              if(checkUp){
                updateDoc(isLike, {
                  votedUp: arrayRemove(userID),
                })
                  .then(() => {
                    if (checkDown !== checkUp) {
                      var liking = docSnap.data().like - 1;
                      if (docSnap.data().like <= 0) {
                        updateDoc(isLike, {
                          like: 0,
                        });
                      } else {
                        updateDoc(isLike, {
                          like: liking,
                        });
                      }
                    }
                  })
                .catch((error) => alert(error.message));
              }


              updateDoc(isLike, {
                votedDown: arrayUnion(userID),
              })
                .then(() => {
                  if (checkDown !== checkUp) {
                    var unliking = docSnap.data().unlike + 1;
                    updateDoc(isLike, {
                      unlike: unliking,
                    });
                  }
                })
              .catch((error) => alert(error.message));
            }
          }
        }
      })
      .catch((error) => alert(error.message));
  };

  //Prototype

  useEffect(() => {

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


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
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
                  {/* <Text>{""}</Text> */}
                  <View>{item.votedUp.includes(userID)|| item.votedDown.includes(userID)?<Text style={styles.alreadyVoted}>Voted</Text>:<Text></Text>}</View>
                  <View style={styles.voteDecision}>
                    <TouchableOpacity
                      style={{
                        paddingRight: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => handleLike(item)}
                    >
                      {item.votedUp.includes(userID) ? (
                        <MaterialIcons
                          size={34}
                          color="#479cd5"
                          name="thumb-up-alt"
                        />
                      ) : (
                        <MaterialIcons
                          size={34}
                          color="#479cd5"
                          name="thumb-up-off-alt"
                        />
                      )}
                      <Text style={styles.voteNum}>{item.like}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => handleUnlike(item)}
                    >
                      {item.votedDown.includes(userID) ? (
                        <MaterialIcons
                          size={34}
                          color="red"
                          name="thumb-down-alt"
                        />
                      ) : (
                        <MaterialIcons
                          size={34}
                          color="red"
                          name="thumb-down-off-alt"
                        />
                      )}
                      <Text style={styles.voteNum}>{item.unlike}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        
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
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.25
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
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  voteDecision: {
    flexDirection: "row",
    margin: 4,
    justifyContent: "flex-end",
    paddingRight: 5,
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
  alreadyVoted:{
    color: "#009a3d",
    fontFamily: "DM-Medium",
    fontSize: 16
  }
});
