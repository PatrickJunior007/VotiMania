import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';


const Header = (props) => {
  const navigation = useNavigation();
  const nav = ()=>{
    navigation.openDrawer();
    //@refresh re
  }
  return (

    <View style={styles.headerContainer}>
      <View>
        <View>
          <TouchableOpacity style={{}} onPress={()=>{nav()}}>
            <MaterialIcons name="menu" size={32} style={{ color: "black" }}/>
            
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.logoBg}>
        <Image style={styles.logo} source={require('../assets/VotiMania_text.png')}/>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer:{
    paddingVertical: 15,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    elevation: 5
  },
  logo:{
    width: '100%',
    height: '100%',
  },
  logoBg:{
    height: 35,
    width: 150,
    marginLeft: 10
  }

})