'use strict';
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio, Alert, } from 'react-native';
import Button from "../components/Button";
import axios from 'axios';
import qs from "qs";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      cpasswod: '',
    };
  }
  render() {

    return (

      <View style={styles.view}>
        <View style={styles.editGroup}>
          <View style={styles.username}>
            <TextInput
              style={styles.edit}
              placeholder="Username"
              placeholderTextColor="#c4c4c4"
              onChangeText={(username) => this.setState({ username })}
            />
          </View>
          <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4' }} />
          <View style={styles.password}>
            <TextInput
              style={styles.edit}
              placeholder="Password"
              placeholderTextColor="#c4c4c4"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4' }} />
          <View style={styles.password}>
            <TextInput
              style={styles.edit}
              placeholder="Confirm Password"
              placeholderTextColor="#c4c4c4"
              secureTextEntry={true}
              onChangeText={(cpassword) => this.setState({ cpassword })}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button text="Register" onPress={this._handleClick.bind(this)} />
          </View>
        </View>
      </View>
    );
  }

  _handleClick() {

    const { navigate } = this.props.navigation;

    let config = {

      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    };

    let param = {
      "username": this.state.username,
      "password": this.state.password,
      "cpassword": this.state.cpassword
    };


    axios.post("http://localhost:5000/user/register", qs.stringify(param)).then(res => {

      switch (res.data) {
        case "error1":
          Alert.alert("The passwords do not match. Please try again");
          console.log(res.data);
          break;

        case "error2":
          Alert.alert("The name already exists, please try again");
          console.log(res.data);
          break;

        case "success":
          try {
            AsyncStorage.setItem(
              '@user_key',
              this.state.username,
            );

          } catch (error) {
            // Error saving data
          }
          navigate('Saved');
          break;
      }

    }).catch(error => {
      console.log(error);
    })

  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  editGroup: {
    margin: 20,
  },
  username: {
    marginTop: 100,
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  password: {
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  edit: {
    height: 40,
    fontSize: 13,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
});