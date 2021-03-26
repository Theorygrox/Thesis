import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../pages/Home";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../pages/Register";
import SigninScreen from "../pages/Signin";
import SavedScreen from "../pages/Saved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExploreScreen from "../pages/Explore";

var isLoggedIn = false;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Saved") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#007AFF",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ name: 42 }}
      />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action

            e.preventDefault();

            try {
              AsyncStorage.getItem("@user_key", (err, result) => {
                console.log(result);
                if (result !== null) {
                  isLoggedIn = true;
                } else {
                  isLoggedIn = false;
                }
                navigation.navigate(isLoggedIn ? "Saved" : "Signin");

              });
            } catch (e) {
              // error reading value
            }

          },
        })}
      />
    </Tab.Navigator>
  );
}
