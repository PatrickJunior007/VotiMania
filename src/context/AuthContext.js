import React, { useState, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const register = async (auth, email, password, createTwoButtonAlert) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        createTwoButtonAlert();
      })
      .catch((error) => alert(error.message));
  };

  const login = async (auth, email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        
        // const storeData = async()=>{
        //   try{
        //     const userStr = JSON.stringify(user);
        //     await AsyncStorage.setItem('current_user', userStr)
        //     setCurrentUser(user)
        //     console.log(await AsyncStorage.getItem('current_user'));
        //   }catch(e){
        //     console.log(e);
        //   }
        // }
        Alert.alert("Welcome back to VotiMania", "Welcome " + user.email, [
          {
            text: "Okay",
            style: "destructive",
          },
        ]);
      })
      .catch((error) => alert(error.message));
  };

  const logout = async (auth) => {
    await signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => alert(error.message));
  };

  // useEffect(() => {
  //   const storeData = async () => {
  //     await AsyncStorage.setItem("current_user", JSON.stringify(currentUser))
  //       .then(() => {
  //         console.log(currentUser + " Inserted in the async storage");
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  //   storeData();
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
