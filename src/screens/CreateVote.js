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
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import React, { useState } from "react";
import { doc, setDoc, collection, getDoc, updateDoc  } from "firebase/firestore"; 
import { db } from "../../firebase";
import { auth } from "../../firebase";



//Import Component
import Header from "../../components/Header";

const CreateVote = (props) => {
  const [voteTitle, setvoteTitle] = useState("");
  const [voteMessage, setvoteMessage] = useState("");
  
  const userID= auth.currentUser?.uid;
  const userEmail= auth.currentUser?.email;
  const addVote = async() => {
    

    await setDoc(doc(db, "users_vote", voteTitle),{
      userId: userID,
      user_email: userEmail,
      vote_title: voteTitle,
      vote_message: voteMessage,
      like: 0,
      unlike: 0,
      votedUp: [1],
      votedDown: [1]
    }).then(()=>{

      Alert.alert(
        "Create Vote",
        "You've successfully created your vote",
        [
          {
            text: "See Vote",
            onPress: () => {
              props.navigation.navigate("SeeVote");
            },
          },
          {
            text: "Okay",
          },
        ]
      );

      setvoteTitle("");
      setvoteMessage("");

      

        

    }).catch(error => alert(error.message))
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1, width: "100%" }}>
          <Header />
          <View style={styles.mainContainer}>
            <Text style={styles.h2}>Create Your Vote </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>Vote Title</Text>
              <TextInput
                placeholder="Title of your vote"
                value={voteTitle}
                onChangeText={(text) => setvoteTitle(text)}
                style={styles.input}
              />
              <Text style={styles.textStyle}>Vote Content</Text>
              <TextInput
                placeholder="What's your vote all about?" 
                value={voteMessage}
                onChangeText={(text) => setvoteMessage(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.buttonMain}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={addVote} style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreateVote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  mainContainer:{
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  buttonMain: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#0782F9",
  },
  buttonOutlineText: {
    padding: 15,
    color: "#0782F9",
    fontFamily: "Poppins-Bold",
  },
  buttonText: {
    color: "white",
    padding: 15,
    fontFamily: "Poppins-Bold",
  },
  textStyle: {
    fontFamily: "Poppins-Bold",
    lineHeight: 22,
    marginTop: 5,
    color: "grey",
    fontSize: 17,
  },
  h2:{
    fontFamily: 'Poppins-Bold',
    color: '#479cd5',
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10
  },
});
