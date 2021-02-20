import React from "react";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={[styles.font]}>{props.title}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#007aff",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  font: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: Platform.OS === "ios" ? 30 : StatusBar.currentHeight,
  },
});
