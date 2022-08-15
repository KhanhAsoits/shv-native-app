import { Animated, Image, SafeAreaView, StyleSheet } from "react-native";
import logo from "../assets/images/logo.jpg";
import React, { useEffect, useRef } from "react";

const SplashScreen = () => {
  const FadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      FadeIn,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      },
    ).start();
  }, [FadeIn]);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Animated.View style={{ ...styles.splashShotContainer, opacity: FadeIn }}>
        <Image source={logo} style={styles.splashLogo}></Image>
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  splashShotContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  splashLogo: {
    transform: [{ rotate: "90deg" }],
  },
});
export default SplashScreen;
