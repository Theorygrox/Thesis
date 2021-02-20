import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.home}>
        <Ionicons name="home" size={24} color="#999999" />
        <Text style={[styles.footerFont]}> Home</Text>
      </View>
      <View style={styles.explore}>
        <FontAwesome name="map" size={22} color="#999999" />
        <Text style={[styles.footerFont]}> Explore</Text>
      </View>
      <View style={styles.saved}>
        <MaterialIcons name="collections-bookmark" size={24} color="#999999" />
        <Text style={[styles.footerFont]}> Saved</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#F4F4F4",
    height: 90,
    alignItems: "center",
    borderTopColor: "#DBDBDB",
    borderTopWidth: 0.8,
    flexDirection: "row",
    justifyContent: "center",
  },
  home: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 30,
    justifyContent: "center",
  },
  explore: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 24,
    justifyContent: "center",
  },
  saved: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 30,
    justifyContent: "center",
  },
  footerFont: {
    fontSize: 10,
  },
});
