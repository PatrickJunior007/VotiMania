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
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const YourVote = (props) => {
  const [data, setData] = useState([]);
  const userID= auth.currentUser?.uid;

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users_vote"));
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       //console.log(doc.id, " => ", doc.data());

    //       if(doc.data().userId == userID){
    //         list.push({id: doc.id, ...doc.data()});
    //       }

          
    //     });
    //     setData(list);
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // };

    // fetchData();


    //REALTIME UPDATES
    const unsub = onSnapshot(collection(db, "users_vote"), (snapShot)=>{
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });      
      });
      setData(list);
    }, (error)=>{
      alert(error.message);
    });

    return ()=>{
      unsub();
    }
    
  }, []);

  

  
  const deletePost = async(item) => {
    //console.log(item.id);
    Alert.alert(
      "Delete Vote",
      "Are you sure you want to delete this vote?",
      [
        {
          text: "Yes",
          onPress: async() => {
            await deleteDoc(doc(db, "users_vote", item.id))
            .then(() => {
              Alert.alert("Vote Deleted", "Sucessfully deleted your vote");
              setData(data.filter((content)=>content.id !== item.id))
            })
            .catch((error) => alert(error.message)); 
          },
        },
        {
          text: "no",
        },
      ]
    );
  }

  

  //console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Header />
        <View style={{paddingTop: 20}}>
          {data.map((item, index) => (
            <View key={item.id} style={styles.mainConatainer}>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.voteTitle}>{item.vote_title}</Text>
                  <TouchableOpacity onPress={() => deletePost(item)}>
                    <MaterialIcons size={27} color="red" name="delete" />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.allText}>{item.vote_message}</Text>
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
                      <Text style={styles.voteNum}>{item.like}</Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <MaterialIcons
                        size={34}
                        color="red"
                        name="thumb-down-alt"
                      />
                      <Text style={styles.voteNum}>{item.unlike}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
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
});
