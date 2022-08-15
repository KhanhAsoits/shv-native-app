import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import MyBookScreen from "./MyBookScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Backdrop } from "react-native-backdrop";
import { SafeAreaView, Text, View } from "react-native";

const AppContext = createContext(null);

const MainScreen = () => {
  //create tab
  const Tab = createBottomTabNavigator();
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [backDropContent, setBackDropContent] = useState(null);

  const handleClose = () => {
    setBackDropContent(null);
  };
  const handleOpen = () => {
    setOpenBackDrop(true);
  };

  useEffect(() => {
  }, [backDropContent]);

  const appContextValue = {
    openBackDrop, backDropContent, setBackDropContent, handleOpen: handleOpen, handleClose: handleClose,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case "home":
                  iconName = "navigate-circle-outline";
                  color = focused ? "black" : "gray";
                  size = 34;
                  break;
                case "my_books":
                  iconName = "book-outline";
                  color = focused ? "black" : "gray";
                  size = 30;
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color}></Ionicons>;
            },
            tabBarStyle: {
              height: 60,
            },
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name={"my_books"} options={{ headerShown: false }}>
            {props => <MyBookScreen appContext={AppContext} {...props}></MyBookScreen>}
          </Tab.Screen>
          <Tab.Screen name={"home"} options={{ headerShown: false }}>
            {props => <HomeScreen appContext={AppContext}></HomeScreen>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

      <Backdrop
        visible={backDropContent !== null}
        handleOpen={handleOpen}
        closeOnBackButton={true}
        handleClose={handleClose}
        closedHeight={0}
        swipeConfig={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        overlayColor="rgba(0,0,0,0.32)"
        backdropStyle={{
          backgroundColor: "#fff",
        }}>
        <SafeAreaView>
          <Text></Text>
          {backDropContent}
        </SafeAreaView>
      </Backdrop>
    </AppContext.Provider>
  );
};
export default MainScreen;
