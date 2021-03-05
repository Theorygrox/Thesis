import * as React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../pages/Register";
import SigninScreen from "../pages/Signin";
import Footer from "./Footer";
import ChangeRegion from "../pages/ChangeRegion";

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Explore":
      return "Explore";
    case "Saved":
      return "My account";
  }
}

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="Home"
          component={Footer}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Signin"
          component={SigninScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen name="ChangeRegion" component={ChangeRegion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
