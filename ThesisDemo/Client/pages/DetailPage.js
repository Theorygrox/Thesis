import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Linking } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { detailData } from "../Data/DetailPageData";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

export default function changeRegion({ route }) {
  const { itemId } = route.params;
  const [data, setdata] = useState({});

  useEffect(() => {
    var data = detailData.find((element) => {
      return element.itemId === itemId;
    });
    setdata(data);
  });

  return (
    <>
      <View style={styles.headerPicContainer}>
        <Image source={data.route} style={styles.headerPic} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{data.header}</Text>
          </View>
          <View style={styles.sourceContainer}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(data.url);
              }}
            >
              <Text style={styles.sourceText}>{data.source}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{data.content}</Text>
          </View>
          <View style={styles.space}></View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  headerText: {
    justifyContent: "center",
    color: "black",
    fontSize: 30,
  },
  sourceText: {
    fontSize: 20,
    color: "#007AFF",
    justifyContent: "center",
  },
  contentContainer: {
    paddingTop: 10,
    paddingEnd: 10,
  },
  sourceContainer: {
    paddingTop: 10,
    paddingEnd: 10,
  },
  headerContainer: {
    paddingTop: 10,
    paddingEnd: 10,
  },
  contentText: {
    fontSize: 18,
    color: "black",
    justifyContent: "center",
  },

  headerPicContainer: {
    position: "absolute",
    width: "100%",
    height: 150,
    alignItems: "center",
    backgroundColor: "white",
  },
  headerPic: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  textContainer: {
    position: "relative",
    marginTop: 150,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    padding: "5%",
  },
  space: {
    width: "100%",
    height: 50,
  },
});
