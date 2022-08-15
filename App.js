/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import *  as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SplashScreen  from "./screens/SplashScreen";
import { useEffect, useRef, useState } from "react";
import  HomeScreen  from "./screens/HomeScreen";
import MainScreen from "./screens/MainScreen";

const App = () => {
  const [isSplash,setIsSplash] = useState(true);
  const mountSplash = useRef(true)

  useEffect(()=>{
    if (mountSplash.current === true){
      setTimeout(()=>{setIsSplash(false)},2000)
    }
    return ()=>{
      mountSplash.current = false;
    }
  },[isSplash])
  return (
    <>
      {isSplash?<SplashScreen></SplashScreen>:<MainScreen></MainScreen>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default App;
