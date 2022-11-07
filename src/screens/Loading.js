import React, { Component } from 'react';
import { View, Text, StyleSheet ,ActivityIndicator,Image} from 'react-native';

// create a component
const Loading = () => {
    return (
        <View style={styles.container}>
             <Image source={require("../../assets/VotiMania.png")} style={{width:145,height:100}}/>
            <ActivityIndicator style={styles.loadingScreen} size='large' color="#0782F9"/>
         </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor: '#fff',
    },
    loadingScreen:{
      marginTop: 30
    }
});

//make this component available to the app
export default Loading;
