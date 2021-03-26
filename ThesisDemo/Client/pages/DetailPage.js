import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Linking } from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

export default class changeRegion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={styles.headerPicContainer}>
          <Image source={require("../assets/6.jpg")} style={styles.headerPic} />
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                Presidential Proclamations on Novel Coronavirus
              </Text>
            </View>
            <View style={styles.sourceContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://china.usembassy-china.org.cn/presidential-proclamations-on-novel-coronavirus/"
                  );
                }}
              >
                <Text style={styles.sourceText}>
                  U.S. Embassy & Consulates in China
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>
                On January 25, 2021 President Biden signed a proclamation
                continuing the suspension of entry of certain travelers from the
                Schengen Area, the United Kingdom, the Republic of Ireland,
                Brazil, China, and Iran, and expanding restrictions to include
                travelers from South Africa. U.S. citizens and lawful permanent
                residents are not subject to the proclamations. Some other
                exceptions include, but are not limited to: foreign diplomats
                traveling to the United States on A or G visas and certain
                family members of U.S. citizens or lawful permanent residents
                including spouses, children under the age of 21, parents
                (provided that his/her U.S. citizen or lawful permanent resident
                child is unmarried and under the age of 21), and siblings
                (provided that both the sibling and the U.S. citizen or lawful
                permanent resident are unmarried and under the age of 21). There
                is also an exception for air and sea crew traveling to the
                United States on C, D, or C1/D visas. For the full list of
                exceptions, please refer to the proclamations.
              </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
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
    paddingTop: 5,
    paddingEnd: 5,
  },
  sourceContainer: {
    paddingTop: 5,
    paddingEnd: 5,
  },
  headerContainer: {
    paddingTop: 5,
    paddingEnd: 5,
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
    height: 900,
    padding: "5%",
  },
});
