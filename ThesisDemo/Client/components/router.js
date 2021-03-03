import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../pages/Home";
import SavedScreen from "../pages/Saved";
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from "../pages/Register";
import SigninScreen from "../pages/Signin"
import Footer from "./Footer"

const Stack = createStackNavigator();

export default function Router(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Footer}/>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      </Stack.Navigator>
      </NavigationContainer>
  );
};

