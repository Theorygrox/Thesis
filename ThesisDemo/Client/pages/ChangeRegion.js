import React, { Component, Fragment } from "react";
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
import Geocoder from "react-native-geocoding";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

export default class changeRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "error",
      backgroundColor: "white",
      historyData: [],
      location: {},
      errorMessage: "",
    };
    //this.DrawBlocks = this.DrawBlocks.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("historyData", (err, result) => {
      if (result !== null) {
        let Data = JSON.parse(result);
        this.setState({ historyData: Data });
      }
    });
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
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      console.log("1");

      if (status !== "granted") {
        console.log("Permission not granted!");

        this.setState({
          errorMessage: "Permission not granted!",
        });
      }

      const location = await Location.getCurrentPositionAsync();
      console.log("2");

      this.setState({
        location: location,
      });
    })();
  }

  handleRegion(e) {
    var localHistoryData = e;
    AsyncStorage.getItem("historyData", (err, result) => {
      if (result !== null) {
        let countries = JSON.parse(result);
        if (!countries.includes(localHistoryData)) {
          countries.push(localHistoryData);

          if (countries.length > 5) {
            countries.shift();
            AsyncStorage.setItem("historyData", JSON.stringify(countries));
          } else {
            AsyncStorage.setItem("historyData", JSON.stringify(countries));
          }
        } else {
          console.log("here");
        }
      } else {
        let container = [];
        container.push(localHistoryData);
        AsyncStorage.setItem("historyData", JSON.stringify(container));
      }
    });

    AsyncStorage.setItem("region", e);
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  DrawDataBlocks() {
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

  handleHistory(e) {
    //console.log(e);
    AsyncStorage.getItem("historyData", (err, result) => {
      if (result !== null) {
        let data = JSON.parse(result);
        for (let value of data) {
          if (value === e) {
            data.splice(data.indexOf(value), 1);
          }
        }
        AsyncStorage.setItem("historyData", JSON.stringify(data));
        this.setState({ historyData: data });
      }
    });
    //syncStorage.removeItem("historyData");
  }

  DrawHistroyBlocks() {
    return this.state.historyData.map((currentData) => {
      return (
        <Fragment key={currentData}>
          <View style={styles.subBlock}>
            <View style={styles.SBPart1}>
              <MaterialIcons name="history" size={20} color="#707070" />
              <Text
                style={styles.text}
                onPress={this.handleRegion.bind(this, currentData)}
              >
                {" "}
                {currentData}
              </Text>
            </View>
            <View style={styles.SBPart2}>
              <TouchableOpacity
                onPress={this.handleHistory.bind(this, currentData)}
              >
                <Text style={styles.historyButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Separator />
        </Fragment>
      );
    });
  }

  GetLocation = () => {
    var location = this.state.location;
    //console.log(location);
    if (location.coords !== undefined) {
      Geocoder.init("AIzaSyBWBeHKX8KpmT3wrqMDPZUN6qIGTps7Lgg");

      Geocoder.from(location.coords.latitude, location.coords.longitude)
        .then((json) => {
          console.log("3");
          var addressComponent = json.results[0].address_components.filter(
            (name) => name.types[0] === "country"
          )[0].long_name;
          AsyncStorage.setItem("region", addressComponent);
          const { navigate } = this.props.navigation;
          navigate("Home");
        })
        .catch((error) => console.warn(error));
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={this.GetLocation}>
          <View style={styles.currentBlock}>
            <Ionicons name="location-outline" size={20} color="#707070" />
            <Text style={styles.text}> Current Location</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.historyBlock}>{this.DrawHistroyBlocks()}</View>

        <View style={styles.listBlock}>{this.DrawDataBlocks()}</View>

        <Separator />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  historyButton: {
    fontSize: 16,
    color: "#5EADF2",
  },

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
    paddingRight: 20,
    paddingLeft: 20,
  },
  SBPart1: {
    width: "50%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  SBPart2: {
    width: "50%",
    height: 40,

    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  listBlock: {
    marginTop: 20,
    backgroundColor: "white",
    paddingBottom: 20,
  },
});
