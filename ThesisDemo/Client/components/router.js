import React, { useState, useEffect, useRef } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import RegisterScreen from "../pages/Register";
import SigninScreen from "../pages/Signin";
import Footer from "./Footer";
import ChangeRegion from "../pages/ChangeRegion";
import DetailPage from "../pages/DetailPage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PolicyPage from "../pages/PolicyPage";
import ErrorPage from "../pages/Error";




function goHome(navigation) {
  return () => (
    <HeaderBackButton
      onPress={() => {
        navigation.navigate("Home");
      }}
    />
  );
}

const Stack = createStackNavigator();

export default function Router() {
  const [username, setname] = useState("");


  const getHeaderTitle = (route) => {
    AsyncStorage.getItem("@user_key", (err, result) => {
      setname(result);
    });

    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    switch (routeName) {
      case "Home":
        return "Home";
      case "Explore":
        return "Explore";
      case "Saved":
        return "Hello " + username;
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("@user_key", (err, result) => {
      setname(result);
    });
  });

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="Home"
          component={Footer}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTitleStyle: {
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Signin"
          component={SigninScreen}
        // options={{ headerShown: false }}
        />
        <Stack.Screen name="ChangeRegion" component={ChangeRegion} />
        <Stack.Screen
          name="DetailPage"
          component={DetailPage}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="PolicyPage"
          component={PolicyPage}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="ErrorPage"
          component={ErrorPage}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: goHome(navigation),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
