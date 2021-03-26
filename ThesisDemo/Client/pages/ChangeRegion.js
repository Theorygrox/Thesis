import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

export default class changeRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "error",
      backgroundColor: "white",
    };
    //this.DrawBlocks = this.DrawBlocks.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/whoData/")
      .then((res) => {
        // handle success
        this.setState({ whoData: res.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  handleRegion(e) {
    // this.setState({ backgroundColor: "gray" });
    // setTimeout(() => {
    //   this.setState({ backgroundColor: "white" });
    // }, 100);
    // console.log(e);
    AsyncStorage.setItem("region", e);
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  DrawBlocks() {
    if (this.state.whoData) {
      return this.state.whoData.map((currentData) => {
        return (
          <TouchableOpacity
            onPress={this.handleRegion.bind(this, currentData.Name)}
            key={currentData.ID}
          >
            <View style={styles.subBlock}>
              <Text style={styles.text}> {currentData.Name} </Text>
            </View>
            <Separator />
          </TouchableOpacity>
        );
      });
    }
  }
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

        <View style={styles.listBlock}>{this.DrawBlocks()}</View>

        <Separator />
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
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  listBlock: {
    marginTop: 20,
    backgroundColor: "white",
    paddingBottom: 20,
  },
});
