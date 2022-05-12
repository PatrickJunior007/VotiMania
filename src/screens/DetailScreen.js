import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc, collection, getDoc, updateDoc  } from "firebase/firestore"; 
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { useNavigation } from '@react-navigation/native';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const { width } = Dimensions.get("screen");



const DetailScreen = (props) => {
  const navigation = useNavigation();
  
  const NavigationHandler = () => {
    props.navigation.goBack();
  };



  





  const [initialImage, setinitialImage] = useState(props.route.params.image);

  //Button State to check if the user has already sign in
  const [buttonColor, setbuttonColor] = useState("black");
  const [buttonText, setbuttonText] = useState("Vote");

  //button execute one time
  const [buttonClicked, setButtonClicked] = useState(false);

  const playerName = props.route.params.name;

  const sendVote = async () =>{
    if(!buttonClicked){
      setbuttonColor("#009a3d");
      setbuttonText("Voted");
      setButtonClicked(true);
      //console.log(auth.currentUser?.uid);

      const userID= auth.currentUser?.uid;

      

      // Add a new document in collection "cities"
      if(playerName == "C. Ronaldo"){
        setDoc(doc(db, "football", userID), {
          Cristiano_Ronaldo: 1,
        }).then(()=>{
          
          const updates = doc(db, "total", "result");
          
          getDoc(doc(db, "total", "result")).then(docSnap=>{
            if(docSnap.exists()){
              var cristiano = docSnap.data().cristiano_ronaldo + 1;

              updateDoc(updates, {
                cristiano_ronaldo: cristiano
              }).then(()=>{
                //console.log("cr updated sucessfully")
              }).catch((error) => alert(error.message));
            }
    
          }).catch((error) => alert(error.message));



          Alert.alert("Voted", "You've successfully voted",[
            {
              text: "Okay",
              style: "destructive" 
            },
          ]);
        }).catch(error => alert(error.message))
      }else{
        setDoc(doc(db, "football", userID), {
          Lionel_Messi: 1,
        }).then(()=>{

          const updatesMessi = doc(db, "total", "result");
          
          getDoc(doc(db, "total", "result")).then(docSnap=>{
            if(docSnap.exists()){
              var messi = docSnap.data().lionel_messi + 1;

              updateDoc(updatesMessi, {
                lionel_messi: messi
              }).then(()=>{
                //console.log("messi updated sucessfully")
              }).catch((error) => alert(error.message));
            }
    
          }).catch((error) => alert(error.message));


          Alert.alert("Voted", "You've successfully voted",[
            {
              text: "Okay",
              style: "destructive"
            },
          ]);
        }).catch(error => alert(error.message))
      }

    }
    

  }

  useEffect(() => {
    const userID= auth.currentUser?.uid;
    

    getDoc(doc(db, "football", userID)).then(docSnap => {
      if (docSnap.exists()) {
        setbuttonText("Voted");
        setbuttonColor("#009a3d");
        setButtonClicked(true);

        Alert.alert("Voted", "You've Already Voted", [
          
            {
              text: "Okay",
              style: "destructive",
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          
        ]);

        //console.log("Document data:", docSnap.data());
      } else {
        //console.log("No such document!");
      }
    }).catch(error => alert(error.message))
  }, [])


  

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: "white" }}>
      <StatusBar translucent={false} />
      <ScrollView>
        <View style={styles.backgroundImageContainer}>
          <ImageBackground
            resizeMode={"cover"}
            style={styles.imageContainer}
            source={initialImage}
          >
            <View style={styles.btnContainer}>
              <TouchableWithoutFeedback onPress={NavigationHandler} >
                <View style={styles.btn}>
                  <MaterialIcons
                    size={30}
                    color="black"
                    name="keyboard-arrow-left"
                  />
                </View>
              </TouchableWithoutFeedback>

              <View style={styles.btn}>
                <MaterialIcons size={30} color="red" name="favorite" />
              </View>
            </View>
          </ImageBackground>
          <View style={styles.virtualTour}>
            <Text style={{ fontFamily: "Poppins-Regular", color: "white" }}>
            {props.route.params.name}
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 42,
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 17,
                  flexWrap: "wrap",
                }}
              >
                {props.route.params.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.btnRating}>
                <Text style={{ fontFamily: "Poppins-Regular", color: "white" }}>
                  {props.route.params.number}
                </Text>
              </View>
              <Text style={{ fontFamily: "Poppins-Regular", paddingLeft: 7 }}>
              {props.route.params.post}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              lineHeight: 22,
              color: "grey",
            }}
          >
            {props.route.params.club}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.textDetContainer}>
              <MaterialIcons size={21} name="speed" />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "grey",
                  paddingLeft: 3,
                }}
              >
                {props.route.params.speed}
              </Text>
            </View>
            <View style={styles.textDetContainer}>
              <MaterialIcons size={21} name="star" />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "grey",
                  paddingLeft: 3,
                }}
              >
                {props.route.params.age}
              </Text>
            </View>
            <View style={styles.textDetContainer}>
              <MaterialIcons size={21} name="euro" />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "grey",
                  paddingLeft: 3,
                }}
              >
                {props.route.params.salary}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              lineHeight: 20,
              marginTop: 15,
              color: "grey",
            }}
          >
            {props.route.params.history}
          </Text>
          <FlatList
            data={props.route.params.interiors}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={()=>{setinitialImage(item)}}>
                <View style={styles.cardDesciptionImg} key={item}>
                  <Image style={styles.cardImg} source={item} />
                </View>
              </TouchableWithoutFeedback>

            )}
          />

          {/*--------------Stats------------------*/}
          <View style={styles.statSection}>
            <Text style={styles.h2}> ⭐ Stats & Awards ⭐</Text>
            <View style={[styles.statsDetails, {paddingTop: 10}]}>
              <Text style={styles.allText}> <Text style={styles.titleStat}>Total Goals:</Text> {props.route.params.totalGoal}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Total Assits:</Text> {props.route.params.totalAssits}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Total Appearance:</Text> {props.route.params.appearance}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Champions League</Text> {props.route.params.championsleague}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Total Assits:</Text> {props.route.params.totalAssits}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Ballon d'or:</Text> {props.route.params.ballodor}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Champions League Goals:</Text> {props.route.params.championsleague_goal}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Total International Goals:</Text> {props.route.params.international_goals}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>International Cups:</Text> {props.route.params.EuropeanChampionship}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Fifa Player of the Year:</Text> {props.route.params.fifaPAward}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>European Golden boots:</Text> {props.route.params.euroGoldenB}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>World Cup Golden Ball:</Text> {props.route.params.worldcupGoldenBall}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Leagues' Player of the Year:</Text> {props.route.params.playerOfTheYear}</Text>
              <Text style={styles.allText}> <Text style={[styles.titleStat, styles.noPadd]}>Uefa Player of the Year:</Text> {props.route.params.uefaPlayerOfTheYear}</Text>
            </View>
          </View>
          {/*--------------Stats End------------------*/}

          <View style={styles.booking}>
            <View>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 20,
                  color: "#479cd5",
                }}
              >
                {props.route.params.name}
              </Text>
              <Text
                style={{
                  lineHeight: 20,
                  fontFamily: "Poppins-Regular",
                  color: "grey",
                }}
              >
                Choose Wisely
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={sendVote} >
              <View style={{
                  backgroundColor: buttonColor,
                  paddingHorizontal: 25,
                  paddingVertical: 17,
                  borderRadius: 10,
              }}>
                <Text style={{ fontFamily: "Poppins-Regular", color: "white" }}>
                  {buttonText}
                </Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
    borderRadius: 20,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  btnContainer: {
    marginTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  btn: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTour: {
    backgroundColor: "black",
    paddingHorizontal: 25,
    paddingVertical: 17,
    borderRadius: 10,
    marginTop: -30,
    elevation: 10,
  },
  btnRating: {
    height: 30,
    width: 30,
    backgroundColor: "#009a3d",
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textDetContainer: {
    flexDirection: "row",
    marginTop: 7,
    marginRight: 10,
  },
  cardDesciptionImg: {
    height: 88,
    width: width / 3,
    elevation: 11,
    marginRight: 12,
    marginVertical: 15,
    borderRadius: 20,
    marginBottom: 30
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  booking: {
    height: 78,
    backgroundColor: "#f6f6f6",
    marginVertical: 20,
    width: "100%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  h2:{
    fontFamily: 'Poppins-Bold',
    color: '#479cd5',
    fontSize: 20,
    textAlign: "center",
    marginTop: -5
  },
  allText:{
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
    marginTop: 5,
    color: "grey",
  },
  titleStat:{
    fontFamily: "Poppins-Bold",
  },

});

export default DetailScreen;
