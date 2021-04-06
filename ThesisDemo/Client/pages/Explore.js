import MapView, { Geojson, Marker, Callout, CalloutSubview, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert, Image, } from "react-native";
import countries from "../countries.geo.json";
import Geocoder from 'react-native-geocoding';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import qs from "qs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import { locations } from "../Data/Data";




const Explore = ({ navigation }) => {


  const ref = useRef(null);
  const mapRef = useRef(null);
  const [latitude, setLat] = useState(0);
  const [longitude, setLng] = useState(0);
  const valueRef = useRef(lo);
  const [country, setcountry] = useState("");
  const [data, setdata] = useState(0);
  const [curlocate, setcurlocate] = useState(0);
  const [lo, setlocation] = useState([0, 0]);
  const [coordinate, setcoordinate] = useState([0, 0]);

  valueRef.current = lo;

  const userclick = (e) => {
    if (e.nativeEvent.coordinate) {
      var point = Object.values(e.nativeEvent.coordinate);
      console.log(point)
      setcoordinate(point);
      Geocoder.from(point)
        .then(json => {
          var addressComponent = json.results;
          var countryname = addressComponent[0].address_components;

          const countries = countryname.filter(name => name.types[0] === "country")[0].long_name;
          setcountry(countries);

          mapRef.current.animateToRegion({
            latitude: point[0],
            longitude: point[1],
            latitudeDelta: 80,
            longitudeDelta: 80,
          });

          var region = { Name: countries };

          axios
            .post("http://localhost:5000/whoData/fetch", region)
            .then((response) => {
              //handle success
              if (response.data) {

                var countrydata = {
                  total: response.data["Cases - cumulative total"],
                  newCases:
                    response.data["Cases - newly reported in last 24 hours"],
                  death: response.data["Deaths - cumulative total"],
                };
                setdata(countrydata);
              } else {
                setdata({});

              }
              console.log(countrydata);
            })

        })
        .catch(error => console.log(error));
    }

  };

  useEffect(() => {
    Geocoder.from(valueRef.current[0], valueRef.current[1])
      .then((json) => {
        var addressComponent =
          json.results[0].address_components.filter(name => name.types[0] === "country")[0].long_name;

        console.log(lo);

        setcurlocate(addressComponent);
        console.log(curlocate);

      })
      .catch((error) => console.log(error));
  }, [valueRef.current]);

  const saveCountry = () => {

    AsyncStorage.getItem("@user_key", (err, username) => {

      if (username !== null) {
        let param = {
          "username": username,
          "country": country
        };

        axios.post("http://localhost:5000/user/addcountries", qs.stringify(param)).then(res => {

          switch (res.data) {
            case "success":
              Alert.alert("Has been successfully added to the Saved Countries list");
              console.log(res.data);
              break;
          }

        }).catch(error => {
          console.log(error);
        })

      }
      else {
        Alert.alert("Please login in!");
      }

    });

  };

  const saveFav = (title) => {

    console.log(title);
    AsyncStorage.getItem("@user_key", (err, username) => {

      if (username !== null) {
        let param = {
          "username": username,
          "favorites": title
        };

        axios.post("http://localhost:5000/user/addfavorites", qs.stringify(param)).then(res => {

          switch (res.data) {
            case "success":
              Alert.alert("Has been successfully added to the Saved Favorites list");
              console.log(res.data);
              break;
          }

        }).catch(error => {
          console.log(error);
        })

      }
      else {
        Alert.alert("Please login in!");
      }

    });


  };

  const relocate = () => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);


      if (status !== "granted") {
        console.log("Permission not granted!");
      }

      const curlocation = await Location.getCurrentPositionAsync();
      console.log(curlocation);
      valueRef.current = [curlocation.coords.latitude, curlocation.coords.longitude];
      setlocation(valueRef.current);
      mapRef.current.animateToRegion({
        latitude: curlocation.coords.latitude,
        longitude: curlocation.coords.longitude,
        latitudeDelta: 80,
        longitudeDelta: 80,
      });
      console.log(valueRef.current);

    })();
  }

  const linePress = () => {

    var AlertMe = curlocate + " --> " + country;
    console.log(AlertMe);
    if (country === curlocate || curlocate == 0) {
      Alert.alert("Please show your current location and select a different country to save a trip");

    } else {
      Alert.alert("Save this trip to the travels list?",
        curlocate == 0 ? "" : AlertMe,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {

              AsyncStorage.getItem("@user_key", (err, username) => {

                if (username !== null) {
                  let param = {
                    "username": username,
                    "start": curlocate,
                    "end": country
                  };

                  axios.post("http://localhost:5000/user/addtravels", qs.stringify(param)).then(res => {

                    switch (res.data) {
                      case "success":
                        Alert.alert("Has been successfully added to the Saved Travels list");
                        console.log(res.data);
                        break;
                    }

                  }).catch(error => {
                    console.log(error);
                  })

                }
                else {
                  Alert.alert("Please login in!");
                }

              });

              console.log("OK Pressed")
            }
          }
        ]
      );

    }



  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        maxZoomLevel={2}
        onLongPress={e => { userclick(e); }}
        ref={mapRef}

      >

        {locations.map((marker) => (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={"#007AFF"}
            key={marker.title}
          >
            <Callout tooltip>
              <View style={styles.markerCalloutContainer}>

                <Image
                  source={{ uri: marker.calloutImage }}
                  style={{
                    height: 100,
                    width: "100%",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                ></Image>
                <Text
                  style={{
                    padding: 5,
                    fontSize: 15,
                    color: "#070707",
                  }}
                >
                  {marker.title}
                </Text>
                <Text
                  style={{
                    padding: 5,
                    fontSize: 12,
                    color: "#070707",
                  }}
                >
                  {marker.description}
                </Text>
                <CalloutSubview
                  style={styles.SaveCountry}
                  onPress={saveFav.bind(this, marker.title)}


                >
                  <Text style={styles.buttonText}>Add to favorites</Text>
                </CalloutSubview>
              </View>
            </Callout>
          </Marker>
        ))}



        <Marker
          // ref={markerRef}
          coordinate={{
            latitude: coordinate[0],
            longitude: coordinate[1],
          }}
          pinColor={"red"}
        >
          <Callout tooltip
            style={styles.calloutsection}
          >
            <View style={styles.up}>

              <View style={styles.leftdata}>
                <Text style={styles.country}>{country}</Text>
                <View style={styles.dataSection}>
                  <Text>Death:</Text>
                  <Text>{data.death}</Text>
                </View>
                <View style={styles.dataSection}>
                  <Text>NewCases:</Text>
                  <Text>{data.newCases}</Text>
                </View>
                <View style={styles.dataSection}>
                  <Text>Total:</Text>
                  <Text>{data.total}</Text>
                </View>
              </View>

              <View style={styles.rightdata}>

                <CalloutSubview
                  style={styles.SaveCountry}
                  onPress={() => {
                    navigation.navigate("PolicyPage", {
                      countryName: country,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>Policy page</Text>
                </CalloutSubview>

                <CalloutSubview
                  style={styles.SaveCountry}
                  onPress={saveCountry}
                >
                  <Text style={styles.buttonText}>Save the country</Text>
                </CalloutSubview>
              </View>
            </View>
            <View style={styles.down}>
              <CalloutSubview
                style={styles.SaveCountry}
                onPress={linePress}
              >
                <Text style={styles.buttonText}>Save the trip</Text>
              </CalloutSubview>
            </View>
          </Callout>
        </Marker>
        <Marker
          coordinate={{
            latitude: lo[0],
            longitude: lo[1],
          }}
          pinColor={"orange"}
        >
        </Marker>

        <Polyline
          coordinates={[
            { latitude: lo[0], longitude: lo[1] },
            { latitude: coordinate[0], longitude: coordinate[1] }]}
          strokeColor={"#007AFF"}
          lineDashPattern={[20, 10]}
        />


        <Geojson
          geojson={countries}
        />
      </MapView>
      <View style={styles.searchBox}>
        <Ionicons name="ios-search" size={18} style={{ marginRight: 5 }} />
        <GooglePlacesAutocomplete
          fetchDetails={true}
          onPress={(details) => {



            Geocoder.from(details.description)
              .then((json) => {
                var location = json.results[0].geometry.location;
                console.log(location.lat);
                var latitude = location.lat;
                var longitude = location.lng;
                setLat(location.lat);
                setLng(location.lng);

                mapRef.current.animateToRegion({
                  latitude,
                  longitude,
                  latitudeDelta: 70,
                  longitudeDelta: 70,
                });
              })
              .catch((error) => console.warn(error));
          }}
          query={{
            key: "",
            language: "en",
          }}
        />
      </View>

      <View style={styles.curlocation}>
        <TouchableOpacity
          onPress={relocate}>
          <Ionicons name="ios-locate" size={30} color="orange" />
        </TouchableOpacity>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

  },

  subView: {
    backgroundColor: "black"

  },
  country: {
    color: "#22B4D6",
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "bold"
  },
  dataSection: {
    marginLeft: 5,
    flexDirection: "row",

  },
  buttonText: {
    color: "coral",
    fontSize: 15,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  SaveCountry: {
    backgroundColor: "oldlace",
    padding: 7,
    borderRadius: 10,
    alignItems: "center",
    margin: 5
  },
  leftdata: {
    flexDirection: "column"
  },
  up: {
    flexDirection: "row"
  },
  rightdata: {
    marginLeft: 10
  },
  bu: {
    marginTop: "50%"
  },
  calloutImage: {
    width: "100%",
    height: 20,
  },
  calloutTitle: {
    height: 60,
    width: "100%",
    backgroundColor: "red",
  },
  calloutText: {
    width: "100%",
    height: 60,
  },
  markerCalloutContainer: {
    height: "auto",
    backgroundColor: "white",
    borderRadius: 10,
    width: 200
  },
  calloutsection: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#F0E089",
    borderRadius: 10,

  },
  searchBox: {
    position: "absolute",
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    paddingLeft: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  curlocation: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 40,
    width: 40,
    height: 40,
    bottom: 10,
    right: 10,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  }
});

export default Explore;
