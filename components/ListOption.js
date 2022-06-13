import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Candidate } from "../data/Candidate";

const { width } = Dimensions.get("screen");
const ListOption = (props) => {
  return (
    <View style={styles.optionListContainer}>
      
      <FlatList style={{width: '100%'}}
        keyExtractor={(item, index) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Candidate}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => props.navigation.navigate("DetailScreen", item)}>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={item.image}/>
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </TouchableWithoutFeedback>

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  optionListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  card: {
    height: 210,
    width: width/2-16,
    elevation: 7,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 7,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.25
    
  },
  cardImage:{
    height: 150,
    width: '100%',
    borderRadius: 10
  }, 
  cardText:{
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: 'grey',
    fontSize: 14, 
    paddingTop: 10
  }
});

export default ListOption;
