import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

export default class changeRegion extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.currentBlock}>
          <Ionicons name="location-outline" size={20} color="#707070" />
          <Text style={styles.text}> Current Location</Text>
        </View>
        <View style={styles.historyBlock}>
          <View style={styles.subBlock}>
            <MaterialIcons name="history" size={20} color="#707070" />
            <Text style={styles.text}> Iceland</Text>
          </View>
          <Separator />
          <View style={styles.subBlock}>
            <MaterialIcons name="history" size={20} color="#707070" />
            <Text style={styles.text}> Finland</Text>
          </View>
        </View>
        <View style={styles.listBlock}>
          <View style={styles.subBlock}>
            <Text style={styles.text}> Afghanistan </Text>
          </View>
          <Separator />
          <View style={styles.subBlock}>
            <Text style={styles.text}> Albania </Text>
          </View>
          <Separator />
          <View style={styles.subBlock}>
            <Text style={styles.text}> Algeria </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#707070",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#E4E4E4",
  },
  currentBlock: {
    paddingLeft: 20,
    marginTop: 20,
    height: 40,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  historyBlock: {
    marginTop: 20,
    backgroundColor: "white",
  },
  subBlock: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  listBlock: {
    marginTop: 20,
    backgroundColor: "white",
  },
});
