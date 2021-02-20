import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Footer from "./components/Footer";

export default function App() {
  return (
    <View style={styles.container}>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
