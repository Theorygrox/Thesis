import MapView, { Geojson, Marker, Callout, CalloutSubview } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert, Image, Platform, } from "react-native";
import countries from "../countries.geo.json";
import Geocoder from 'react-native-geocoding';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import qs from "qs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TouchableOpacity } from "react-native-gesture-handler";


import { locations } from "../Data/Data";

Geocoder.init("AIzaSyBWBeHKX8KpmT3wrqMDPZUN6qIGTps7Lgg");



const Explore = () => {

  const ref = useRef(null);
  const mapRef = useRef(null);
  const [latitude, setLat] = useState(0);
  const [longitude, setLng] = useState(0);
  const [data, setdata] = useState(0);
  const [coordinate, setcoordinate] = useState([0, 0]);

  const userclick = (e) => {
    if (e.nativeEvent.coordinate) {
      var point = Object.values(e.nativeEvent.coordinate);
      setcoordinate(point);
      Geocoder.from(point)
        .then(json => {
          var addressComponent = json.results;
          var countryname = addressComponent[0].address_components;

          const country = countryname.filter(name => name.types[0] === "country")[0].long_name;
          setdata(country);

        })
        .catch(error => console.warn(error));
    }


  };

  useEffect(() => {
    ref.current?.setAddressText("Some Text");
  }, []);

  const onPress = () => {

    AsyncStorage.getItem("@user_key", (err, username) => {

      if (username !== null) {
        let param = {
          "username": username,
          "data": data
        };

        axios.post("http://localhost:5000/user/addlist", qs.stringify(param)).then(res => {

          switch (res.data) {
            case "success":
              Alert.alert("Has been successfully added to the favorites list");
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
  const onRegionChangeComplete = () => {

    // markerRef.current.showCallout();

  };

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
            {/* <Image
              source={require("../assets/pinIcon.png")}
              style={{ height: 27, width: 20 }}
            ></Image> */}

            {/* <CustomMarker item={marker}>
            </CustomMarker> */}
            <Callout tooltip>
              <View style={styles.markerCalloutContainer}>
                {/* <View style={styles.calloutImage}></View>
                <View style={styles.calloutTitle}></View>
                <View style={styles.calloutText}></View> */}
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
          pinColor={"#007AFF"}
        >
          <Callout tooltip
            style={styles.markerCalloutContainer}
          >
            <Text style={styles.dataSection}>{data}</Text>
            <CalloutSubview
              style={styles.button}
              onPress={onPress}
            >
              <Text style={styles.buttonText}>Save</Text>
            </CalloutSubview>

          </Callout>
        </Marker>
        <Geojson
          geojson={countries}
        />
      </MapView>
      <View style={styles.searchBox}>
        <Ionicons name="ios-search" size={18} style={{ marginRight: 5 }} />
        {/* <TextInput
          placeholder="Search here"
          placeholderTextColor="#707070"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        /> */}
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails={true}
          onPress={(details) => {
            // 'details' is provided when fetchDetails = true
            Geocoder.init("AIzaSyBWBeHKX8KpmT3wrqMDPZUN6qIGTps7Lgg");

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
            key: "AIzaSyBWBeHKX8KpmT3wrqMDPZUN6qIGTps7Lgg",
            language: "en",
          }}
        />
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
  dataSection: {
    width: "100%",
    alignItems: "center",

  },
  buttonSection: {
    width: "100%",
    height: 20,
    alignContent: "flex-end",
    alignItems: "flex-end",

    backgroundColor: "red"
  },
  buttonText: {
    color: "green",
    fontSize: 18,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerCalloutContainer: {
    alignSelf: "center",
    width: 200,
    height: 120,
    backgroundColor: "white",
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "black",
    justifyContent: "center",
    //flexDirection: "row",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    height: 40,
    width: "100%",
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
    width: 200,
    height: "auto",
    backgroundColor: "white",
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
});

export default Explore;