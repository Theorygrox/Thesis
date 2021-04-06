import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const Marker = ({ item }) => {
  return (
    <View style={styles.roundMarker}>
      <Image
        style={styles.roundImage}
        source={{ uri: item.markerImage }}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  roundMarker: {
    height: 27,
    width: 20,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  roundImage: {
    height: 27,
    width: 20,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
});

export default Marker;
