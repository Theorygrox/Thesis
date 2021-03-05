import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Explore() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 42.361145,
          longitude: -71.057083,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0322,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
