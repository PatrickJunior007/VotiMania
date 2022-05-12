import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContain from './DrawerContain';
import HomeScreen from '../src/screens/HomeScreen';
import ResultScreen from '../src/screens/ResultScreen';
import CreateVote from '../src/screens/CreateVote';
import SeeVote from '../src/screens/SeeVote';
import YourVote from '../src/screens/YourVote';

const Drawer = createDrawerNavigator();

const DrawerNavig = (props) =>{
  return(
    <Drawer.Navigator useLegacyImplementation={true} screenOptions={{headerShown: false}} drawerContent={props => <DrawerContain {...props}/>}>
      <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
      <Drawer.Screen name="ResultScreen" component={ResultScreen} />
      <Drawer.Screen  name="CreateVote" component={CreateVote}/>
      <Drawer.Screen  name="SeeVote" component={SeeVote}/>
      <Drawer.Screen  name="YourVote" component={YourVote}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavig;