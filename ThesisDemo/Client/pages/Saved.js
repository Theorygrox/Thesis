import { StyleSheet, SectionList, Text, View, Image, Alert, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../components/Button";
import axios from 'axios';
import qs from "qs";
import React, { Component } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { locations } from "../Data/Data";


export default class SavedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }


  componentDidMount() {
    this.init();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.init();
    });


  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  init() {

    var array = [];
    AsyncStorage.getItem("@user_key", (err, username) => {
      let param = {
        "username": username
      };

      axios.post("http://localhost:5000/user/savedlist", qs.stringify(param)).then(res => {

        for (let key in res.data) {
          let o = {};
          o.title = key;
          o.data = res.data[key];
          array.push(o);
        }
        this.setState({
          list: array
        });

      }).catch(error => {
        console.log(error);
      })
    });

  }


  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  Checkicon(title) {

    let iconName, color;

    switch (title) {
      case "countries":
        iconName = "md-star-outline";
        color = "#F9B110";
        break;

      case "favorites":
        iconName = "md-heart-outline";
        color = "#E02B2B";
        break;

      case "travels":
        iconName = "ios-paper-plane-outline";
        color = "#BFFFFF";
        break;

    }
    return <View style={styles.header}>
      <Text style={styles.sectionHeader}>
        <Ionicons name={iconName} size={25} color={color} />
        {" " + this.Capitalize(title)}</Text>

    </View>

  }

  deletelist(item, section) {


    return <View style={styles.deletelist}>
      <View >
        <Text
          onPress={() => {
            this.showPage(item, section.title)
          }}

          style={styles.item}>{item}
        </Text>
      </View>
      <View >
        <Ionicons
          onPress={() => {
            this.deleteSave(item, section.title)
          }}
          iconStyle={styles.delete} name={"md-close-circle"} size={25} color={"red"} />
      </View>
    </View>

  }

  deleteSave(item, section) {

    AsyncStorage.getItem("@user_key", (err, username) => {


      let param = {
        "username": username,
        "section": section,
        "item": item
      };

      console.log(param)
      axios.post("http://localhost:5000/user/deletelist", qs.stringify(param)).then(res => {

        switch (res.data) {
          case "success":
            this.init();
            console.log(res.data);
            break;
        }

      }).catch(error => {
        console.log(error);
      })


    });


  }

  showPage(item, section) {

    const { navigate } = this.props.navigation;

    switch (section) {
      case "countries":
        AsyncStorage.setItem("region", item);
        navigate("Home");

        break;

      case "favorites":

        for (const value of locations) {
          if (value.title === item) {
            Linking.openURL(
              value.link
            );
          }
        }

        break;

      case "travels":

        let param = {
          "travels": item
        };
        axios.post("http://localhost:5000/user/assessment", qs.stringify(param)).then(res => {

          if (res.data) {
            Alert.alert("The newly reported cases in last 7 days per 100000 population:",
              res.data[0].Name + " : " + res.data[0]["Cases - newly reported in last 7 days per 100000 population"] + " | " +
              res.data[1].Name + " : " + res.data[1]["Cases - newly reported in last 7 days per 100000 population"]
            )

          }

        }).catch(error => {
          console.log(error);
        })

        break;
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    const SectionListItemSeparator = () => {
      return (
        //Item Separator
        <View style={styles.sectionItemSeparatorStyle} />
      );
    };
    const ItemListItemSeparator = () => {
      return (
        //Item Separator
        <View style={styles.ItemSeparatorStyle} />
      );
    };

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.h1}>Your Lists</Text>
        </View>
        <SectionList
          sections={this.state.list}
          renderItem={({ item, section }) => this.deletelist(item, section)}
          renderSectionHeader={({ section }) => this.Checkicon(section.title)}

          SectionSeparatorComponent={SectionListItemSeparator}
          ItemSeparatorComponent={ItemListItemSeparator}
          keyExtractor={(item, index) => index}
        />


        <View style={{ marginTop: 10 }}>
          <Button text="Sign out" onPress={() => {
            try {
              AsyncStorage.removeItem(
                '@user_key'
              );
              navigate('Home');
              this.setState({
                list: []
              });

            } catch (error) {
              // Error saving data
            }
          }} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  h1: {
    color: "#389BF2",
    fontSize: 22,
    marginTop: 22,
    marginLeft: 36,
  },
  sectionHeader: {
    justifyContent: "center",
    fontSize: 20,
  },
  item: {
    paddingLeft: 55,
    fontSize: 17,
    color: '#707070',

  },

  header: {
    paddingTop: 14,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  ItemSeparatorStyle: {
    height: 0.9,
    width: '80%',
    backgroundColor: '#C8C8C8',
    marginLeft: "10%"
  },
  sectionItemSeparatorStyle: {
    height: 0.9,
    width: '90%',
    backgroundColor: '#C8C8C8',
    marginLeft: "5%"
  },
  deletelist: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 35,
    alignItems: "center",
    height: 40
  }
});