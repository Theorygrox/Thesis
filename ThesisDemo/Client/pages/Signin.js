'use strict';
import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio, Alert, } from 'react-native';
import Button from "../components/Button";
import axios from 'axios';
import  qs  from "qs";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class SigninScreen extends Component {
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
              onChangeText={(username) => this.setState({username})}
              />
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
            <View style={styles.password}>
              <TextInput
              style={styles.edit}
              placeholder="Password"
              placeholderTextColor="#c4c4c4"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Button text="Sign In" onPress={this._handleClick.bind(this)}/>
            </View>
            <View style={{marginTop: 10}}>
            
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
      };


axios.post("http://localhost:5000/signin", qs.stringify(param)).then(res => {
  
        switch (res.data) {
          case "error":
            Alert.alert("Please make sure the username and password you entered are correct!");
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
            console.log(res.data);
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
  edit:{
    height: 40,
    fontSize: 13,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  h1: {
    color: "#389BF2",
    fontSize: 22,
    marginTop: 100,
    marginLeft: 36,
    height: 100,
    alignItems: "center",
  }, 
});