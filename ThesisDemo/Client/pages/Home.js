import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Header from "../components/Header";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header title="Home" />
      <View>
        <Text>Travel Advisory 123</Text>
        <Image
          style={styles.tinyLogo}
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2021/02/08/22/30/wheat-5996781_960_720.jpg",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: "50%",
    height: 100,
  },
});
