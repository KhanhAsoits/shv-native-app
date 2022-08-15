import { Animated, StyleSheet, View } from "react-native";
import React,{ useEffect, useRef } from "react";


const SpinComponent = () => {
  const SpinAnim = useRef(new Animated.Value(0)).current

  useEffect(()=>{
    Animated.timing(
      SpinAnim,
      {
        toValue:360,
        duration:1000,
        useNativeDriver:true
      }
    ).start()
    console.log(SpinAnim)
  },[SpinAnim])

  return <Animated.View style={{...styles.spinner,transform:[{rotate:`139deg`}]}}></Animated.View>
};

const styles = StyleSheet.create({
  spinner:{
    width:36,
    height:36,
    borderWidth:1,
    borderRadius:50,
    borderColor:"black",
    borderTopColor:"green"
  }
})

export default SpinComponent
