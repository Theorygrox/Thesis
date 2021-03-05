import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../components/Header";

const Stack = createStackNavigator();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "error",
      total: 0,
      newCases: 0,
      death: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://192.168.4.23:5000/data/")
      .then((response) => {
        // handle success
        console.log(response.data[0].region);
        this.setState({
          region: response.data[0].region,
          total: response.data[0].total,
          newCases: response.data[0].newCases,
          death: response.data[0].death,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        {/* <Header title="Home" /> */}
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            <View style={styles.DBContainer}>
              <View style={styles.DBTitleContainer}>
                <View style={styles.DBTitleTextContainer}>
                  <Text style={styles.DBTitleText}>{this.state.region}</Text>
                </View>
                <View style={styles.DBButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigate("ChangeRegion");
                    }}
                  >
                    <Text style={styles.DBButton}>Change Region</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.DBContentContainer}>
                <View style={styles.DBContent}>
                  <Text style={styles.DBContentTitleFont}>Total</Text>
                  <Text style={styles.DBContentFont}>{this.state.total}</Text>
                </View>
                <View style={styles.DBContent}>
                  <Text style={styles.DBContentTitleFont}>New Cases</Text>
                  <Text style={styles.DBContentFont}>
                    {this.state.newCases}
                  </Text>
                </View>
                <View style={styles.DBContent}>
                  <Text style={styles.DBContentTitleFont}>Death</Text>
                  <Text style={styles.DBContentFont}>{this.state.death}</Text>
                </View>
              </View>
            </View>
            <View style={styles.MainContent}>
              <View style={styles.MainContentTitleContainer}>
                <Text style={styles.MainContentTitle}>Travel Advisory</Text>
              </View>
              <View style={styles.MainContentFocus}>
                <View style={styles.MCFPictureContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL("https://google.com");
                    }}
                  >
                    <Image
                      source={require("../assets/6.jpg")}
                      style={styles.MCFPicture}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.MCFSource}>
                  <Text style={styles.MCFSourceText}>
                    U.S. Embassy & Consulates in China
                  </Text>
                </View>
                <View style={styles.MCFTitle}>
                  <Text style={styles.MCFTitleText}>
                    Presidential Proclamations on Novel Coronavirus
                  </Text>
                </View>
              </View>
              <View style={styles.MainContentSub}>
                <View style={styles.MCSubParts}>
                  <Image
                    source={require("../assets/2.jpg")}
                    style={styles.Picture}
                  />
                  <Text style={styles.MCSubPartsSource}>CDC</Text>
                  <Text style={styles.MCSubPartsTitle}>
                    Domestic Travel During the COVID-19 ...
                  </Text>
                </View>
                <View style={styles.MCSubParts}>
                  <Image
                    source={require("../assets/4.jpg")}
                    style={styles.Picture}
                  />
                  <Text style={styles.MCSubPartsSource}>CS.MFA.GOV.CN</Text>
                  <Text style={styles.MCSubPartsTitle}>
                    Exit and Entry Administration Law ...
                  </Text>
                </View>
                <View style={styles.MCSubParts}>
                  <Image
                    source={require("../assets/5.jpg")}
                    style={styles.Picture}
                  />
                  <Text style={styles.MCSubPartsSource}>CDC</Text>
                  <Text style={styles.MCSubPartsTitle}>
                    Domestic Travel During the COVID-19 ...
                  </Text>
                </View>
                <View style={styles.MCSubParts}>
                  <Image
                    source={require("../assets/1.jpg")}
                    style={styles.Picture}
                  />
                  <Text style={styles.MCSubPartsSource}>CDC</Text>
                  <Text style={styles.MCSubPartsTitle}>
                    Domestic Travel During the COVID-19 ...
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  DBContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "90%",
    height: 100,
  },
  MainContent: {
    width: "90%",
    height: 800,
  },
  DBTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 30,
  },
  DBContentContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 70,
  },
  DBTitleTextContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "40%",
    height: 30,
  },
  DBTitleText: {
    fontSize: 22,
    color: "#707070",
  },
  DBButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: "50%",
    height: 30,
  },
  DBButton: {
    fontSize: 16,
    color: "#5EADF2",
    textDecorationLine: "underline",
  },
  DBContentTitleFont: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#707070",
  },
  DBContentFont: {
    fontSize: 16,
    color: "#707070",
  },
  DBContent: {
    backgroundColor: "#F7F7F7",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 8,
    shadowOpacity: 0.18,
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 70,
  },
  MainContentTitleContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  MainContentTitle: {
    color: "#0C87F2",
    fontSize: 22,
  },
  MainContentFocus: {
    width: "100%",
    height: 220,
    justifyContent: "space-between",
  },
  MCFPictureContainer: {
    height: 145,
    width: "100%",
  },
  MCFPicture: {
    borderRadius: 10,
    height: "100%",
    width: "100%",
  },
  Picture: {
    borderRadius: 10,
    height: 160,
    width: "100%",
  },
  MCFSource: {
    height: 20,
    width: "100%",
  },
  MCFSourceText: {
    color: "#707070",
    fontSize: 14,
  },
  MCFTitle: {
    height: 45,
    width: "100%",
  },
  MCFTitleText: {
    color: "#707070",
    fontSize: 18,
  },
  MainContentSub: {
    width: "100%",
    paddingTop: "1%",
    height: 500,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  MCSubParts: {
    borderRadius: 10,
    width: "49%",
    marginTop: "2%",
    height: 225,
  },
  MCSubPartsSource: {
    marginTop: 5,
    width: "100%",
    fontSize: 14,
    fontWeight: "bold",
    height: 20,
    color: "#707070",
  },
  MCSubPartsTitle: {
    width: "100%",
    fontSize: 14,
    height: 40,
    color: "#707070",
  },
});
